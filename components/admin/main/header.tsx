import Link from "next/link";
import classes from "./header.module.css";
import Nav from "./nav";

export default function AdminHeader() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <h2>NEXT COMMERCE</h2>
      </Link>
      <Nav />
    </header>
  );
}
