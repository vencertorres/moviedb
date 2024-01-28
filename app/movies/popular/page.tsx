import Results from "@/app/components/Results";

export default async function Popular() {
  return (
    <main>
      <div className="mx-auto max-w-7xl p-[var(--padding)]">
        <h1 className="mb-6 text-5xl font-bold">Popular</h1>

        <Results endpoint="/movie/popular" />
      </div>
    </main>
  );
}
