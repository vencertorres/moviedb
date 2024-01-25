import { notFound } from "next/navigation";

const BASE = "https://api.themoviedb.org/3";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export async function get(endpoint: string, params?: Record<string, string>) {
  const query = new URLSearchParams(params);
  const url = `${BASE}${endpoint}?api_key=${process.env.API_KEY}&${query}`;

  const response = await fetch(url);

  if (!response.ok) {
    notFound();
  }

  return await response.json();
}

export function media(size: number, path: string) {
  return `${IMAGE_BASE}/w${size}${path}`;
}
