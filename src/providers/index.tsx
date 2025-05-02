"use client";

import { CivicAuthProvider } from "@civic/auth-web3/nextjs";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <CivicAuthProvider>
        <Toaster />
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </CivicAuthProvider>
    </ReactQueryProvider>
  );
}

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
