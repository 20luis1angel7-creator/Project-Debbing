export type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
};

export type UserRow = {
  id: number;
  name: string;
  email: string;
  address: string | null;
};

export type OrderItem = {
  productId: number;
  name?: string;
  price?: string;
  quantity: number;
};

export type CreateOrderPayload = {
  userId?: number;
  items?: OrderItem[];
  couponCode?: string;
  forcePaymentFail?: boolean;
};

export type OrderRow = {
  id: number;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
};

