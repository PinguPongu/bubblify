import products from "../resources/products.json";
import { Bundle } from "../types/bundle";
import { Predicate } from "../types/predicate";
import { Product } from "../types/product";
import { fetchWithPredicate } from "./common";

export const getProducts = (predicate?: Predicate<Product>) =>
  fetchWithPredicate(predicate, products, "products");

export const getBundles = (predicate?: Predicate<Bundle>) =>
  fetchWithPredicate(predicate, products, "bundles");
