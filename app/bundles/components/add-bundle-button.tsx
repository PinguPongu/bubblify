"use client";

import { useState } from "react";
import { CartItem, Bubble } from "@/types/types";
import { addProductsToCart, CART_STORAGE_KEY } from '@/services/actions'

// Hér fáum við inn lista af Bubbles, sem samsvara hvaða Bubbles eru í 
// Bundle. Þessar Bubbles eru síðan settar í cartið í staðinn fyrir allan bundle'inn.
interface AddBundleButtonProps {
  products: Bubble[];
}

export default function AddBundleButton({ products }: AddBundleButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);
    let parsedItems: CartItem[] = [];

    if (storedItems) {
      try {
        parsedItems = JSON.parse(storedItems) as CartItem[];
      } catch {
        parsedItems = [];
      }
    }

    const nextItems = addProductsToCart(parsedItems, products);

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
    >
      {isAdded ? "Added to cart" : "Add Bundle to Cart"}
    </button>
  );
}
