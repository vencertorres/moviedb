import { watchlist } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import MovieGrid from "../components/MovieGrid";
import { get } from "../lib/api";
import { auth } from "../lib/auth";
import { db } from "../lib/db";
import type { MovieDetails } from "../lib/types";

export default async function WatchList() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const rows = await db
    .select()
    .from(watchlist)
    .where(eq(watchlist.userId, Number(session?.user?.id)));

  const movies = (await Promise.all(
    rows.map((movie) => get(`/movie/${movie.movieId}`)),
  )) as MovieDetails[];

  return (
    <main>
      <div className="mx-auto max-w-7xl p-[var(--padding)]">
        <h1 className="mb-6 text-5xl font-bold">Watchlist</h1>

        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div>You haven't added anything to your watchlist yet.</div>
        )}
      </div>
    </main>
  );
}
