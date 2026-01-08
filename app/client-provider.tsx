"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/_utils/context";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
