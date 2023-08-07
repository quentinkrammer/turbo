import { createApi } from "@reduxjs/toolkit/query/react";
import { trpcClient } from "../trpcClient";

function noopQuery() {
  return () => {
    return { data: null };
  };
}

const api = createApi({
  reducerPath: "api",
  baseQuery: noopQuery(),
  endpoints: (builder) => ({
    userById: builder.query({
      //   query: () => ({ trpcClient, trpcProcedure: "userById" }),
      queryFn: async (foo: string) => {
        const data = await trpcClient.userById.query(foo);
        if (data) {
          return { data };
        }
        return { error: "no data" };
      },
    }),
  }),
});

const { useUserByIdQuery } = api;
