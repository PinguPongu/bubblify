export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Bundle {
  id: number;
  name: string;
  items: number[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3500/api";

async function fetchFromApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getProducts(): Promise<Product[]> {
  return fetchFromApi<Product[]>("/bubbles");
}

export function getBundles(): Promise<Bundle[]> {
  return fetchFromApi<Bundle[]>("/bundles");
}
