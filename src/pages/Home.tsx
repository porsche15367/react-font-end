import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Utensils,
  Pizza,
  Sandwich,
  Cake,
  ArrowRight,
  Clock,
  Truck,
  Shield,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Main Dishes",
    icon: Utensils,
    description: "Hearty main courses and entrees",
  },
  {
    id: 2,
    name: "Pizza",
    icon: Pizza,
    description: "Fresh baked pizzas and toppings",
  },
  {
    id: 3,
    name: "Sandwiches",
    icon: Sandwich,
    description: "Fresh sandwiches and wraps",
  },
  {
    id: 4,
    name: "Desserts",
    icon: Cake,
    description: "Sweet treats and pastries",
  },
];

const features = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your food delivered in minutes",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment methods",
  },
];

export function Home() {
  const navigate = useNavigate();
  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useProducts({ limit: 4 });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary/90 to-primary">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Delicious Food Delivered To Your Doorstep
            </h1>
            <p className="text-xl text-white/90">
              Order your favorite meals from the best restaurants in town. Fast
              delivery, great prices, and amazing taste.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate("/products")}>
                Order Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle className="ml-2 text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="outline" onClick={() => navigate("/products")}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {isLoading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
            <p className="text-muted-foreground">
              Failed to load featured products. Please try again later.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts?.items?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse Categories</h2>
          <Button variant="outline" onClick={() => navigate("/categories")}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    {category.name}
                  </CardTitle>
                  <Icon className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="bg-muted">
        <div className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  20% Off on First Order
                </h3>
                <p className="mb-6">
                  Use code FIRST20 to get 20% off on your first order
                </p>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-primary/90 text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Free Delivery</h3>
                <p className="mb-6">Get free delivery on orders over $50</p>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
