import Link from "next/link";
import classes from "./header.module.css";
import Nav from "./nav";
import CartButton from "../cart/cart-button";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <h2>NEXT COMMERCE</h2>
      </Link>
      <CartButton />
      <Nav />
    </header>
  );
}
