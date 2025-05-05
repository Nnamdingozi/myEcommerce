export interface OrderAttributes {
  id: number;
  user_id: number;
  status: string;
  order_date: Date;
  createdAt: Date;
  updatedAt: Date;
  total_amount: number;
  payment_status: string;
  payment_method?: string | null;
  shipping_address: string;
  shipping_method?: string | null;
  tracking_number?: string | null;
  currency: string;
  transaction_reference?: string | null;
}

export interface OrderInput {
  payment_method?: string | null;
  shipping_address: string;
  shipping_method?: string | null;
  currency: string;
}

export interface OrderCreation {
  user_id: number;
  payment_method?: string | null;
  shipping_address: string;
  shipping_method?: string | null;
  currency: string;
  tracking_number?: string | null;
  status: string;
  total_amount: number;
  payment_status: string;
  transaction_reference?: string | null;
}
