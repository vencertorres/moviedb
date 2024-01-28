"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import icon from "../search.svg";

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(searchParams);
    params.set("query", (formData.get("query") as string) ?? "");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <label htmlFor="query" className="sr-only">
          Search
        </label>
        <input
          type="query"
          name="query"
          id="query"
          placeholder="Search movies..."
          defaultValue={searchParams.get("query")?.toString()}
          className="flex-1 rounded bg-white px-3 py-2 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button>
          <Image src={icon} alt="" />
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
}
