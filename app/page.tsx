import Backdrop from "./components/Backdrop";
import Carousel from "./components/Carousel";
import { get } from "./lib/api";
import { MovieList } from "./lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const trending = (await get("/trending/movie/day")) as MovieList;
  const popular = (await get("/movie/popular")) as MovieList;

  return (
    <main>
      <Backdrop movie={trending.results[0]} />

      <h1 className="-mt-14 mb-8 w-full text-pretty text-center text-3xl font-semibold lg:-mt-40">
        Track, Watch, Enjoy.
        <br />
        Your movie journey starts here.
      </h1>

      <Carousel title="Trending" movies={trending} />
      <Carousel title="What's Popular" movies={popular} />
    </main>
  );
}
