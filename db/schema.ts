import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").notNull(),
  userId: integer("user_id")
    .references(() => user.id)
    .notNull(),
});
