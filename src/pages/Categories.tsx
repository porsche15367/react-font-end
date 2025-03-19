import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Utensils,
  Pizza,
  Sandwich,
  Cake,
  Coffee,
  IceCream,
  Apple,
  Beef,
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
  {
    id: 5,
    name: "Beverages",
    icon: Coffee,
    description: "Hot and cold drinks",
  },
  {
    id: 6,
    name: "Ice Cream",
    icon: IceCream,
    description: "Frozen treats and desserts",
  },
  {
    id: 7,
    name: "Fruits",
    icon: Apple,
    description: "Fresh fruits and produce",
  },
  {
    id: 8,
    name: "Meat",
    icon: Beef,
    description: "Fresh meat and seafood",
  },
];

export function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="container space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Food Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleCategoryClick(category.id)}
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
    </div>
  );
}
