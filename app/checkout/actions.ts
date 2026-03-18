"use server";

import { redirect } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3500/api";

export async function submitOrder(formData: FormData) {
  const telephone = formData.get("telephone");
  const deliveryMethod = formData.get("deliveryMethod");
  const name = formData.get("name");
  const address = formData.get("address");
  const city = formData.get("city");
  const postalCode = formData.get("postalCode");
  const items = formData.get("items");
  const totalPrice = formData.get("totalPrice");

  if (
    typeof telephone !== "string" ||
    typeof deliveryMethod !== "string" ||
    typeof name !== "string" ||
    typeof items !== "string" ||
    typeof totalPrice !== "string"
  ) {
    throw new Error("Missing order data.");
  }

  const response = await fetch(`${API_BASE_URL}/orders/${telephone}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: {
        name,
        telephone,
        address: typeof address === "string" ? address : "",
        city: typeof city === "string" ? city : "",
        postalCode: typeof postalCode === "string" ? postalCode : "",
      },
      deliveryMethod,
      items: JSON.parse(items),
      totalPrice: Number(totalPrice),
      createdAt: new Date().toISOString(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to submit the order.");
  }

  redirect(`/checkout/success?telephone=${encodeURIComponent(telephone)}`);
}
