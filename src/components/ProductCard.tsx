import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">
          <Link
            to={`/products/${product.id}`}
            className="hover:underline nav-link"
          >
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={`text-sm ${
              product.stock > 0 ? "text-green-600" : "text-destructive"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full btn-primary" disabled={product.stock === 0}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
