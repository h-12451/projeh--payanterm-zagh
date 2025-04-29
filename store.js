import { create } from 'zustand';

export const useStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        )
      };
    }
    return { cart: [...state.cart, {...product, quantity: 1}] };
  }),
}));