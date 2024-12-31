"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./nav.module.css";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <nav className={classes.nav}>
      <Link href="/products">PRODUCTS</Link>
      {!session && <Link href="/sign-in">SIGNIN</Link>}
      {session && (
        <button className={classes.signout} onClick={() => signOut()}>
          SIGN OUT
        </button>
      )}
    </nav>
  );
}
