"use server";
import cloudinary from "@/utils/cloudinary";
import User from "@/models/user-model";
import connectToDatabase from "./mongodb";
import { revalidatePath } from "next/cache";
import Product, { ProductInterface } from "@/models/product-model";

interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function getUsers(): Promise<UserInterface[]> {
  try {
    await connectToDatabase();

    const users = await User.find().lean();
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    })) as UserInterface[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Error fetching users.");
    } else {
      console.log(error);
      throw new Error("Error fetching users.");
    }
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await connectToDatabase();

    await User.findByIdAndDelete(id);
    revalidatePath("/admin/users");

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Something went wrong");
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function createProduct(formData: FormData) {
  try {
    // Extract files and fields from the form
    const overviewFile = formData.get("overviewPhoto") as File | null;
    const galleryFiles = formData.getAll("galleryPhotos") as File[];

    if (!overviewFile || galleryFiles.length === 0) {
      throw new Error("Missing required files");
    }

    // Additional fields from the form
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const longDescription = formData.get("longDescription") as string;

    // Helper function to upload a file buffer
    const uploadToCloudinary = (
      fileBuffer: Buffer,
      folder: string
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result!.secure_url); // Ensure result is defined
            }
          }
        );
        uploadStream.end(fileBuffer);
      });
    };

    // Read File as Buffer
    const readFileAsBuffer = async (file: File): Promise<Buffer> => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    };

    // Upload the overview photo
    const overviewBuffer = await readFileAsBuffer(overviewFile);
    const overviewPhotoUrl = await uploadToCloudinary(
      overviewBuffer,
      "next-commerce/products/overviews"
    );

    // Upload gallery photos
    const galleryPhotoUrls = await Promise.all(
      galleryFiles.map(async (file) => {
        const buffer = await readFileAsBuffer(file);
        return uploadToCloudinary(buffer, "next-commerce/products/gallery");
      })
    );

    await connectToDatabase();

    await Product.create({
      name,
      price,
      shortDescription,
      longDescription,
      overviewPhoto: overviewPhotoUrl,
      galleryPhotos: galleryPhotoUrls.map((upload) => upload),
    });

    // Returning the result with the additional fields and file URLs
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error uploading files:", error?.message);
    } else {
      console.log(error);
    }
    return false;
  }
}

export async function getProducts(): Promise<ProductInterface[]> {
  try {
    await connectToDatabase();
    const products = await Product.find();

    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching products");
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
}
