import { createContext, useReducer } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string };

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartItem[], action: CartAction) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state[existingItemIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems = [...state];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.concat(action.item);
    }
    return updatedItems;
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.findIndex((item) => item.id === action.id);
    const existingItem = state[existingItemIndex];
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...state];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return updatedItems;
  }
  return state;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const initialState: CartItem[] = [];
  const [items, dispatchCartAction] = useReducer(cartReducer, initialState);

  const cartContext = {
    items: items,
    addItem: (item: CartItem) => dispatchCartAction({ type: "ADD_ITEM", item }),
    removeItem: (id: string) => dispatchCartAction({ type: "REMOVE_ITEM", id }),
  };
  console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
