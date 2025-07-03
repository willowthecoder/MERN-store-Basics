import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newproduct) => {
    if (!newproduct.name || !newproduct.price || !newproduct.image) {
      return { success: false, message: "All fields are required" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newproduct),
    });

    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product created successfully" };
  },

  fetchproducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    //Update the product in the store immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
