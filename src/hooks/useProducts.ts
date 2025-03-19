import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { Product } from "@/types";

interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

interface UseProductsOptions {
  page?: number;
  limit?: number;
  categoryId?: number;
}

export function useProducts({
  page = 1,
  limit = 10,
  categoryId,
}: UseProductsOptions = {}) {
  return useQuery({
    queryKey: ["products", page, limit, categoryId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(categoryId && { category: categoryId.toString() }),
      });

      const { data } = await api.get<ProductsResponse>(`/products?${params}`);
      return data;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
  });
}
