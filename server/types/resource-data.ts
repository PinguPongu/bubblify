import { Bundle } from "./bundle";
import { Product } from "./product";

export interface ResourceData {
  products: Product[];
  bundles: Bundle[];
  [key: string]: any;
}
