export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
