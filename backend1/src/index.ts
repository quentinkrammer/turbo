import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { publicProcedure, router } from "./trpc.js";
type User = { id: string; name: string };
const db: Array<User> = [];

const appRouter = router({
  userList: publicProcedure.query(async () => {
    return db;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: searchId } = opts;

    // Retrieve the user with the given ID
    const user = db.find(({ id }) => id === searchId);

    return user;
  }),
  userCreate: publicProcedure.input(z.string()).mutation(async (opts) => {
    const { input: name } = opts;

    // Create a new user in the database
    const user = db.push({ name, id: uuidv4() });

    return user;
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

const PORT = 3000;
server.listen(PORT);
console.log(`Server listening on port ${PORT}...`);
