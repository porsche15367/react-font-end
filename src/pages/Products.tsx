import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";

export function Products() {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category")
    ? parseInt(searchParams.get("category")!)
    : undefined;

  const { data, isLoading, error } = useProducts({
    page,
    categoryId,
  });

  if (error) {
    return (
      <div className="container text-center py-12">
        <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
        <p className="text-muted-foreground">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const products = data?.items || [];
  const hasMore = data && products.length >= data.limit;

  return (
    <div className="container space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {categoryId ? "Filtered Products" : "Our Products"}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-secondary"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
            className="btn-secondary"
          >
            Next
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any products in this category. Please try another
            category.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
