import Carousel from "@/app/components/Carousel";
import Hero from "@/app/components/Hero";
import { get } from "@/app/lib/api";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import type { MovieDetails } from "@/app/lib/types";
import { watchlist } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const movie = (await get(`/movie/${params.id}`, {
    append_to_response: "images,recommendations,videos",
  })) as MovieDetails;

  return {
    title: movie.title,
  };
}

export default async function Movie({ params }: { params: { id: string } }) {
  const session = await auth();

  let inWatchlist = false;

  if (session) {
    const rows = await db
      .select()
      .from(watchlist)
      .where(
        and(
          eq(watchlist.userId, Number(session.user?.id)),
          eq(watchlist.movieId, Number(params.id)),
        ),
      );

    inWatchlist = rows.length > 0;
  }

  const movie = (await get(`/movie/${params.id}`, {
    append_to_response: "images,recommendations,videos",
  })) as MovieDetails;

  const trailer =
    movie.videos.results.find(
      ({ iso_639_1, type }) => iso_639_1 === "en" && type === "Trailer",
    ) || movie.videos.results[0];

  function date(dateString: string) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  }

  function currency(amount: number) {
    return (
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      })
        .format(amount)
        .split(",")[0] + "M"
    );
  }

  return (
    <main>
      <Hero movie={movie} session={session} inWatchlist={inWatchlist} />

      <div className="mx-auto mb-8 grid max-w-7xl gap-8 p-[var(--padding)] lg:grid-cols-2">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <dl className="grid h-max grid-cols-[max-content_1fr] gap-4">
          <dt className="relative top-1 text-xs uppercase text-neutral-300">
            Released
          </dt>
          <dd>{date(movie.release_date)}</dd>
          <dt className="relative top-1 text-xs uppercase text-neutral-300">
            Runtime
          </dt>
          <dd>{movie.runtime} minutes</dd>
          <dt className="relative top-1 text-xs uppercase text-neutral-300">
            Budget
          </dt>
          <dd>{currency(movie.budget)}</dd>
          <dt className="relative top-1 text-xs uppercase text-neutral-300">
            Revenue
          </dt>
          <dd>{currency(movie.revenue)}</dd>
          <dt className="relative top-1 text-xs uppercase text-neutral-300">
            Genre
          </dt>
          <dd className="col-[2/5]">
            {movie.genres.map(({ name }) => name).join(", ")}
          </dd>
        </dl>
      </div>

      {movie.recommendations.results.length > 0 && (
        <Carousel
          title="More Like This"
          movies={movie.recommendations.results}
        />
      )}
    </main>
  );
}
