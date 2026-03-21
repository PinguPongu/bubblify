import type { Bubble } from "@/lib/api";

export const CART_STORAGE_KEY = "bubblify-cart";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export function addProductsToCart(
  currentItems: CartItem[],
  products: Bubble[]
): CartItem[] {
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
