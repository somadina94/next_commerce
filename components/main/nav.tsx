import Link from "next/link";
import classes from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <Link href="/products">PRODUCTS</Link>
      <Link href="/sign-up">SIGNUP</Link>
      <Link href="/sign-in">SIGNIN</Link>
      <button className={classes.signout}>SIGN OUT</button>
    </nav>
  );
}
