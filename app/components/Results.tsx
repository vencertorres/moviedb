"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { results } from "../lib/actions";
import type { MovieList } from "../lib/types";
import MovieGrid from "./MovieGrid";

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
      <MovieGrid movies={movies.results} />

      {movies.page < movies.total_pages && (
        <div
          ref={container}
          className="mt-8 h-8 bg-[url('./spinner.svg')] bg-center bg-no-repeat text-white"
        ></div>
      )}
    </div>
  );
}
