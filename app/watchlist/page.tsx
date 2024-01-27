import { watchlist } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { get, media } from "../lib/api";
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
          <div className="grid grid-cols-[repeat(var(--columns),_1fr)] gap-4">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="block aspect-[2/3] snap-start"
              >
                <Image
                  src={media(500, movie.poster_path)}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="rounded"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div>You haven't added anything to your watchlist yet.</div>
        )}
      </div>
    </main>
  );
}
