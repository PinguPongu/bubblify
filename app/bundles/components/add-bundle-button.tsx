"use client";

import { useState } from "react";
import { addProductsToCart, CART_STORAGE_KEY, type CartItem } from "@/lib/cart";
import type { Product } from "@/lib/api";

interface AddBundleButtonProps {
  /** The products included in the selected bundle. */
  products: Product[];
}

export default function AddBundleButton({
  products,
}: AddBundleButtonProps) {
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
      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
    >
      {isAdded ? "Added to cart" : "Add Bundle to Cart"}
    </button>
  );
}
