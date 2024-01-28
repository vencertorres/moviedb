import MovieGrid from "../components/MovieGrid";
import SearchForm from "../components/SearchForm";
import { get } from "../lib/api";
import type { MovieList } from "../lib/types";

export default async function Search({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const movies = (await get("/search/movie", {
    query: searchParams?.query ?? "",
  })) as MovieList;

  return (
    <main>
      <div className="mx-auto max-w-7xl p-[var(--padding)]">
        <h1 className="mb-6 text-5xl font-bold">Search</h1>

        <SearchForm />

        {movies.results.length > 0 && <MovieGrid movies={movies.results} />}

        {searchParams?.query && movies.results.length === 0 && (
          <p>No results found</p>
        )}
      </div>
    </main>
  );
}
