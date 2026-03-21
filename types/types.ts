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

// Cart

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

