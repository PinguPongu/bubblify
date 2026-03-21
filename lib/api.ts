export interface Bubble {
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

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Customer {
  name: string;
  telephone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  customer: Customer;
  deliveryMethod: "pickup" | "delivery";
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
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

export function getProducts(): Promise<Bubble[]> {
  return fetchFromApi<Bubble[]>("/bubbles");
}

export function getProduct(id: number): Promise<Bubble> {
  return fetchFromApi<Bubble>(`/bubbles/${id}`);
}

export function getBundles(): Promise<Bundle[]> {
  return fetchFromApi<Bundle[]>("/bundles");
}

export function getOrdersByTelephone(telephone: string): Promise<Order[]> {
  return fetchFromApi<Order[]>(`/orders/${telephone}`);
}
