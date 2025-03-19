import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ShoppingCart } from "lucide-react";

// This would come from your API in a real app
const wishlistItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Grilled chicken patty with lettuce and special sauce",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
  },
];

export function Wishlist() {
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        <Button onClick={() => navigate("/products")}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto" />
              <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
              <p className="text-muted-foreground">
                Save items you love to your wishlist. Review them anytime and
                easily move them to the cart.
              </p>
              <Button onClick={() => navigate("/products")}>
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="group">
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">${product.price}</span>
                  <Button>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
