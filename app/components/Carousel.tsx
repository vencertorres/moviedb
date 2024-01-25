"use client";

import Image from "next/image";
import Link from "next/link";
import { media } from "../lib/api";
import { MovieList } from "../lib/types";

export default function Carousel({
  title,
  movies,
}: {
  title: string;
  movies: MovieList;
}) {
  return (
    <div>
      <h2 className="mx-auto mb-4 max-w-7xl px-[var(--padding)] text-2xl font-semibold">
        {title}
      </h2>
      <div className="mb-8 flex h-[clamp(10em,_25vw,_20em)] snap-x snap-mandatory scroll-pl-[var(--scroll-padding)] gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--scroll-padding)]">
        {movies.results.map((movie) => (
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
              className="rounded opacity-0 transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
