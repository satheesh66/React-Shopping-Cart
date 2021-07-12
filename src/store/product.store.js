import create from "zustand";
import { devtools } from "zustand/middleware";

const productInitialStore = {
  products: [],
};

export const ProductsStore = create(
  devtools((set, get) => {
    return {
      ...productInitialStore,
      setProducts: (data) =>
        set((state) => ({ ...state, products: data })),
    };
  })
);
