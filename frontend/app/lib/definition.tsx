export type Product = {
  id?: number;
    name: string;
    merchant_id: number;
    price: number;
    status: string;
    category_id: number;
    description?: string;
    image_url?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
  };
  

  export type Category = {
    id: number;
    category_name: string;
    createdAt?: Date;
    updatedAt?: Date;

  };

  export type User = {
    username: string;
    email: string;
    phone: string; // Ensure this field is not optional
    password: string;
    country_code: string;
  };

  // export type LoginRequest = {
  //   id?: number
  //   username?: string
  //   email: string;
  //   password: string;
  // };
  
  export type LoginRequest = {
    email: string;
    password: string;
  };
  


  export type LoginStatus = 200 | 201 | 400 | 500;

 
  export type  ProductDetails = {
    id: number;         
    name: string;        
    price: number;       
    description: string; 
    image_url: string;   
  };
  export type NewCart = {
    id?: number;
    userId?: number;
    productId?: number;
    quantity?: number;
    total?: number;
    name?: string;
    price?: number;
    description?: string;
    image_url?: string;
    cartproduct: ProductDetails
    token: string


  };

  export type Order = {
    id?: number;
    paymentMtd: string;
    shippingAddy: string;
     shippingMtd: string;
      curr: string ;
      total?: number;
      trackingNum?: string
      orderDate?: Date;
      shipping_address?: string
      total_amount?: string;
      currency?: string;
      order_date?: Date;
      payment_method?: string;
      shipping_method?: string;
      tracking_number?: string;
      token: string
  };

  export type GetOrder = {
    shipping_address: string
    total_amount: string;
    currency: string;
    order_date: Date;
    payment_method: string;
    shipping_method: string;
    tracking_number: string;
    token: string
  };

  export type Paystack = {
    authorization_url: string
    reference: string;
    token: string

  };


  export type VerifyTransactionResponse = {
    status: boolean;
    message: string;
    transaction: {
      reference: string; 
      amount: number;
      message: string;
      customer_email: string;
      paid_at: string
    };
  }

  export type UserProfile = {
    id: number
    username: string
    email: string;
  
  };