export type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
};

export type CartItem = {
  productId: number;
  name: string;
  price: string;
  quantity: number;
};

export type Profile = {
  id: number;
  name: string;
  email: string;
  address?: {
    city?: string;
    street?: string;
  };
  city?: string;
};

export type Order = {
  id: number;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
};

