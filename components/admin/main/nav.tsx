import Link from "next/link";
import classes from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <Link href="/admin/products">PRODUCTS</Link>
      <Link href="/admin/users">USERS</Link>
      <Link href="/admin/orders">ORDERS</Link>
      <button className={classes.signout}>SIGN OUT</button>
    </nav>
  );
}
