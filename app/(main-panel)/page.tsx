import { getProducts } from "@/lib/actions";
import classes from "./page.module.css";
import { ProductInterface } from "@/models/product-model";
import ProductItem from "@/components/products/product-item";

export default async function Home() {
  const products: ProductInterface[] = await getProducts();
  return (
    <section className={classes.products}>
      {products.map((prod) => (
        <ProductItem key={prod.id} product={prod} />
      ))}
    </section>
  );
}
