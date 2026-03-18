"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CART_STORAGE_KEY, type CartItem } from "@/lib/cart";

export type DeliveryMethod = "pickup" | "delivery";

export interface CustomerInfo {
  name: string;
  address: string;
  city: string;
  telephone: string;
  postalCode: string;
}

interface CheckoutContextValue {
  /** Whether checkout data has been loaded on the client. */
  hasHydrated: boolean;
  /** The selected delivery method for the order. */
  deliveryMethod: DeliveryMethod | null;
  /** The customer info collected during checkout. */
  customerInfo: CustomerInfo;
  /** The current cart items being checked out. */
  cartItems: CartItem[];
  /** The combined price of all cart items. */
  totalPrice: number;
  /** Sets the selected delivery method. */
  setDeliveryMethod: (method: DeliveryMethod) => void;
  /** Merges customer information into the stored checkout state. */
  updateCustomerInfo: (nextInfo: Partial<CustomerInfo>) => void;
  /** Clears the stored checkout state after a successful order. */
  clearCheckout: () => void;
}

interface CheckoutProviderProps {
  /** The nested checkout pages that should share the same state. */
  children: ReactNode;
}

interface PersistedCheckoutState {
  deliveryMethod: DeliveryMethod | null;
  customerInfo: CustomerInfo;
}

const CHECKOUT_STORAGE_KEY = "bubblify-checkout";

const defaultCustomerInfo: CustomerInfo = {
  name: "",
  address: "",
  city: "",
  telephone: "",
  postalCode: "",
};

const defaultPersistedState: PersistedCheckoutState = {
  deliveryMethod: null,
  customerInfo: defaultCustomerInfo,
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

function readCheckoutState(): PersistedCheckoutState {
  const storedState = window.sessionStorage.getItem(CHECKOUT_STORAGE_KEY);

  if (!storedState) {
    return defaultPersistedState;
  }

  try {
    return JSON.parse(storedState) as PersistedCheckoutState;
  } catch {
    return defaultPersistedState;
  }
}

function readCartItems(): CartItem[] {
  const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!storedItems) {
    return [];
  }

  try {
    return JSON.parse(storedItems) as CartItem[];
  } catch {
    return [];
  }
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [deliveryMethod, setDeliveryMethodState] =
    useState<DeliveryMethod | null>(null);
  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfo>(defaultCustomerInfo);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const checkoutState = readCheckoutState();

      setDeliveryMethodState(checkoutState.deliveryMethod);
      setCustomerInfo(checkoutState.customerInfo);
      setCartItems(readCartItems());
      setHasHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const nextState: PersistedCheckoutState = {
      deliveryMethod,
      customerInfo,
    };

    window.sessionStorage.setItem(
      CHECKOUT_STORAGE_KEY,
      JSON.stringify(nextState)
    );
  }, [customerInfo, deliveryMethod, hasHydrated]);

  const setDeliveryMethod = (method: DeliveryMethod) => {
    setDeliveryMethodState(method);
  };

  const updateCustomerInfo = (nextInfo: Partial<CustomerInfo>) => {
    setCustomerInfo((currentInfo) => ({
      ...currentInfo,
      ...nextInfo,
    }));
  };

  const clearCheckout = () => {
    window.sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
    window.localStorage.removeItem(CART_STORAGE_KEY);
    setDeliveryMethodState(null);
    setCustomerInfo(defaultCustomerInfo);
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CheckoutContext.Provider
      value={{
        hasHydrated,
        deliveryMethod,
        customerInfo,
        cartItems,
        totalPrice,
        setDeliveryMethod,
        updateCustomerInfo,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider.");
  }

  return context;
}
