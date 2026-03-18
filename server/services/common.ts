import { Bundle } from "../types/bundle";
import { Predicate } from "../types/predicate";
import { Product } from "../types/product";
import { ResourceData } from "../types/resource-data";

type Resource = Product | Bundle;

export function fetchWithPredicate<T = Resource>(
  predicate: Predicate<T>,
  resource: ResourceData,
  key: string
): T[] {
  if (!predicate) {
    return resource[key] as T[];
  }
  return resource[key].filter((item: Resource) => predicate(item as T)) as T[];
}
