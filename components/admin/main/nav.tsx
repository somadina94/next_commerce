import Link from "next/link";
import classes from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <Link href="/products">PRODUCTS</Link>
      <Link href="/users">USERS</Link>
      <Link href="/orders">ORDERS</Link>
      <Link href="/sign-in">SIGN IN</Link>
      <button className={classes.signout}>SIGN OUT</button>
    </nav>
  );
}
