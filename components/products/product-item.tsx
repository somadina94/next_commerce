import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";

import classes from "./product-item.module.css";
import { ProductInterface } from "@/models/product-model";
import Link from "next/link";

export default async function ProductItem({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <div className={classes.product}>
      <div className={classes.photo}>
        <Image
          src={product.overviewPhoto}
          alt={product.name}
          width={500}
          height={500}
          quality={100}
        />
      </div>
      <span className={classes.name}>{product.name.toLocaleUpperCase()}</span>
      <span className={classes.price}>${product.price}</span>
      <span className={classes.desc}>{product.shortDescription}</span>
      <FaCartPlus className={classes.add} />
      <Link className={classes.link} href="/products">
        Details
      </Link>
    </div>
  );
}
