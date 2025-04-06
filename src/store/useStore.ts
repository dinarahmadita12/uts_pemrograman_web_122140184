import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, User, OrderHistory } from '../types';

interface Store {
  cart: CartItem[];
  user: User | null;
  orderHistory: OrderHistory[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleSelected: (productId: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  addOrder: (order: OrderHistory) => void;
  cancelOrder: (orderId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      user: null,
      orderHistory: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1, selected: true }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      toggleSelected: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, selected: !item.selected } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      setUser: (user) => set({ user }),
      // AddOrder untuk menyimpan orderHistory yang baru
      addOrder: (order: OrderHistory) =>
        set((state) => ({
          orderHistory: [order, ...state.orderHistory], 
        })),
      cancelOrder: (orderId) =>
        set((state) => ({
          orderHistory: state.orderHistory.filter((order) => order.id !== orderId),
        })),
    }),
    {
      name: 'ecommerce-storage',
    }
  )
);
