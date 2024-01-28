"use client";

import Image from "next/image";
import Link from "next/link";
import { media } from "../lib/api";
import type { MovieDetails, MovieListResult } from "../lib/types";

export default function MovieGrid({
  movies,
}: {
  movies: MovieListResult[] | MovieDetails[];
}) {
  return (
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
            className="rounded opacity-0 transition-opacity duration-500"
            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          />
        </Link>
      ))}
    </div>
  );
}
