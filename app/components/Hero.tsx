import Image from "next/image";
import { media } from "../lib/api";
import { MovieDetail } from "../lib/types";

export default function Hero({ movie }: { movie: MovieDetail }) {
  return (
    <div className="grid-cols-[10rem,_1fr] lg:grid">
      <div className="relative after:absolute after:bottom-0 after:h-1/2 after:w-full after:bg-gradient-to-t after:from-[#1c2128] lg:col-[2/3] lg:after:h-full lg:after:w-[40rem] lg:after:bg-gradient-to-r">
        <Image
          src={media(1280, movie.backdrop_path)}
          alt={movie.title}
          width={1280}
          height={720}
        />
      </div>

      <div className="relative lg:row-[1/2]">
        <div className="-mt-16 flex flex-col justify-center gap-2 p-[var(--padding)] lg:absolute lg:m-0 lg:h-full lg:w-[35rem]">
          <h2 className="text-4xl font-semibold">{movie.title}</h2>
          <div className="flex items-center text-sm text-[#def]">
            <div className="relative aspect-[5/1] h-4">
              <div className="absolute h-full w-full bg-[url('./star-outline.svg')]"></div>
              <div
                className="absolute h-full w-full bg-[url('./star.svg')]"
                style={{
                  clipPath: `inset(0 ${(10 - movie.vote_average) * 10}% 0 0)`,
                }}
              ></div>
            </div>
            <div>({movie.vote_count})</div>
          </div>
          <p className="text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
