"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { results } from "../lib/actions";
import { media } from "../lib/api";
import type { MovieList } from "../lib/types";

function useIsVisible(element: RefObject<HTMLDivElement>) {
  const [state, setState] = useState(false);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState(true);
          } else {
            setState(false);
          }
        });
      });

      observer.current.observe(element.current);
    }
  }, []);

  return state;
}

export default function Results({ endpoint }: { endpoint: string }) {
  const searchParams = useSearchParams();

  // @ts-ignore
  const page = (Math.abs(searchParams.get("page")) || 1) - 1;

  const [movies, setMovies] = useState<MovieList>({
    page,
    results: [],
    total_pages: page + 1,
    total_results: 0,
  });

  const container = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(container);

  useEffect(() => {
    if (visible) {
      results(endpoint, movies.page + 1).then((res) =>
        setMovies((movies) => ({
          ...res,
          results: [...movies.results, ...res.results],
        })),
      );
    }
  }, [visible]);

  return (
    <div>
      <div className="grid grid-cols-[repeat(var(--columns),_1fr)] gap-4">
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
      {movies.page < movies.total_pages && (
        <div
          ref={container}
          className="mt-8 h-8 bg-[url('./spinner.svg')] bg-center bg-no-repeat text-white"
        ></div>
      )}
    </div>
  );
}
