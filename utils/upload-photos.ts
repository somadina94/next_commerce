import cloudinary from "@/utils/cloudinary";

interface UploadResult {
  overviewPhoto: string;
  galleryPhotos: string[];
}

export const uploadPhotos = async (
  overviewPhoto: string,
  galleryPhotos: string[]
): Promise<UploadResult> => {
  // Upload overview photo
  const overviewUpload = await cloudinary.uploader.upload(overviewPhoto, {
    folder: "next-commerce/products/overview",
  });

  // Upload gallery photos
  const galleryUploadPromises = galleryPhotos.map((photo) =>
    cloudinary.uploader.upload(photo, {
      folder: "next-commerce/products/gallery",
    })
  );
  const galleryResults = await Promise.all(galleryUploadPromises);

  return {
    overviewPhoto: overviewUpload.secure_url,
    galleryPhotos: galleryResults.map((result) => result.secure_url),
  };
};
