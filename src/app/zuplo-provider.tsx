"use client";

import {
  DefaultApiKeyManagerProvider,
  type ApiKeyManagerProvider,
} from "@zuplo/react-api-key-manager";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";

export const zuploContext = createContext<ApiKeyManagerProvider | undefined>(
  undefined
);

export function useZuploContext() {
  return useContext(zuploContext);
}

export const ZuploProvider = ({
  children,
  token,
}: PropsWithChildren & { token: string | undefined }) => {
  const provider = useMemo(() => {
    if (!token) return;
    return new DefaultApiKeyManagerProvider(
      process.env.NEXT_PUBLIC_ZUPLO_URL!,
      token
    );
  }, [token]);

  if (!provider) {
    return children;
  }

  return (
    <zuploContext.Provider value={provider}>{children}</zuploContext.Provider>
  );
};
