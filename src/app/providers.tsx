"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { PropsWithChildren } from "react";
import { ZuploProvider } from "./zuplo-provider";

export function Providers({
  children,
  token,
}: PropsWithChildren & { token: string | undefined }) {
  return (
    <UserProvider>
      <ZuploProvider token={token}>{children}</ZuploProvider>
    </UserProvider>
  );
}
