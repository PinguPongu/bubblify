import { Bubble, Bundle, Order, CartItem } from "@/types/types";

const API_BASE_URL = "http://localhost:3500/api";
export const CART_STORAGE_KEY = "bubblify-cart";

async function fetchFromApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getBubbles(): Promise<Bubble[]> {
  return fetchFromApi<Bubble[]>("/bubbles");
}

export function getBubble(id: number): Promise<Bubble> {
  return fetchFromApi<Bubble>(`/bubbles/${id}`);
}

export function getBundles(): Promise<Bundle[]> {
  return fetchFromApi<Bundle[]>("/bundles");
}

export function getOrdersByTelephone(telephone: string): Promise<Order[]> {
  return fetchFromApi<Order[]>(`/orders/${telephone}`);
}

export function addProductsToCart(currentItems: CartItem[], products: Bubble[]): CartItem[] {
  const nextItems = [...currentItems];

  for (const product of products) {
    const existingItem = nextItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      continue;
    }

    nextItems.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  }

  return nextItems;
}
