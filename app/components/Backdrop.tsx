"use client";

import Image from "next/image";
import { media } from "../lib/api";
import { MovieListResult } from "../lib/types";

export default function Backdrop({ movie }: { movie: MovieListResult }) {
  return (
    <div className="after:backdrop relative -z-10 mx-auto max-w-5xl">
      <Image
        src={media(1280, movie.backdrop_path)}
        alt={movie.title}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        width={1280}
        height={720}
        className="opacity-0 transition-opacity duration-500"
        onLoad={(e) => (e.currentTarget.style.opacity = "1")}
      />
    </div>
  );
}
