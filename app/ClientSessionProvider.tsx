"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({
  children,
  session, // Pass session if required (optional)
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
