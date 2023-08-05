import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "backend1";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
