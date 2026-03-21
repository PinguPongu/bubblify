"use client";

import { useState } from "react";
import type { Bubble } from "@/types/api";
import { addProductsToCart, CART_STORAGE_KEY, type CartItem } from "@/types/cart";

interface AddToCartButtonProps {
  product: Bubble;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
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

    const nextItems = addProductsToCart(parsedItems, [product]);

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
      className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700"
    >
      {isAdded ? "Added to cart" : "Add to cart"}
    </button>
  );
}
