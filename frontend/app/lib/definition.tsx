
  
  // export type LoginRequest = {
  //   email: string;
  //   password: string;
  // };
  


//   export type LoginStatus = 200 | 201 | 400 | 500;

 
//   export type  ProductDetails = {
//     id: number;         
//     name: string;        
//     price: number;       
//     description: string; 
//     image_url: string;   
//   };
//   export type NewCart = {
//     id?: number;
//     userId?: number;
//     productId?: number;
//     quantity?: number;
//     total?: number;
//     name?: string;
//     price?: number;
//     description?: string;
//     image_url?: string;
//     cartproduct: ProductDetails
//     token: string


//   };

//   export type Order = {
//     id?: number;
//     paymentMtd: string;
//     shippingAddy: string;
//      shippingMtd: string;
//       curr: string ;
//       total?: number;
//       trackingNum?: string
//       orderDate?: Date;
//       shipping_address?: string
//       total_amount?: string;
//       currency?: string;
//       order_date?: Date;
//       payment_method?: string;
//       shipping_method?: string;
//       tracking_number?: string;
//       token: string
//   };

  // export type GetOrder = {
  //   shipping_address: string
  //   total_amount: string;
  //   currency: string;
  //   order_date: Date;
  //   payment_method: string;
  //   shipping_method: string;
  //   tracking_number: string;
  //   token: string
  // };

//   export type Paystack = {
//     authorization_url: string
//     reference: string;
//     token: string

//   };


  // export type VerifyTransactionResponse = {
  //   status: boolean;
  //   message: string;
  //   transaction: {
  //     reference: string; 
  //     amount: number;
  //     message: string;
  //     customer_email: string;
  //     paid_at: string
  //   };
  // }

//   export type UserProfile = {
//     id: number
//     username: string
//     email: string;
  
// //   };
//   // app/lib/definition.ts (or wherever your types are defined)

// export type Product = {
//   id: number;
//   name: string;
//   merchantId: number; // FIX: Changed to camelCase
//   price: string | number; // Prisma's Decimal type often serializes as a string
//   status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'ARCHIVED'; // More specific type
//   categoryId: number; // FIX: Changed to camelCase
//   description?: string | null; // Prisma can return null
//   imageUrl?: string | null; // FIX: Changed to camelCase, can be null
//   createdAt: string; // Dates are serialized as ISO strings
//   updatedAt: string;

//   // You might also receive nested objects from Prisma's `include`
//   category?: Category;
//   merchant?: Merchant;
// };

// // You should do the same for all other types
// export type Category = {
//   id: number;
//   categoryName: string; // FIX: Changed to camelCase
//   createdAt: string;
//   updatedAt: string;

// };

// export type NewCart = { // Your CartItem type
//   id: number;
//   quantity: number;
//   userId: number; // FIX: Changed to camelCase
//   productId: number; // FIX: Changed to camelCase
//   createdAt: string;
//   updatedAt: string;
//   product: Product; // This is included from your backend
// };

// // And so on for every other type...

//camel case is used here even though db is snakecase because backend uses prisma and sends camelcase in response
// app/lib/definition.ts (or wherever your types are defined)

export type Product = {
  id: number;
  name: string;
  merchantId: number; // FIX: Changed to camelCase
  price: string | number; // Prisma's Decimal type often serializes as a string
  status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'ARCHIVED'; // More specific type
  categoryId: number; // FIX: Changed to camelCase
  description?: string | null; // Prisma can return null
  imageUrl?: string | null; // FIX: Changed to camelCase, can be null
  createdAt: string; // Dates are serialized as ISO strings
  updatedAt: string;

  // You might also receive nested objects from Prisma's `include`
  category?: Category;
  // merchant?: Merchant;
};

// You should do the same for all other types
export type Category = {
  id: number;
  categoryName: string; // FIX: Changed to camelCase
  createdAt: string;
  updatedAt: string;
};

export type NewCart = { // Your CartItem type
  id: number;
  quantity: number;
  userId: number; // FIX: Changed to camelCase
  productId: number; // FIX: Changed to camelCase
  createdAt: string;
  updatedAt: string;
  product: Product; // This is included from your backend
};

  export type Order = {
    id?: number;
    paymentMtd: string;
    shippingAddy: string;
     shippingMtd: string;
      curr: string ;
      total?: number;
      trackingNum?: string
      orderDate: string; // Dates are serialized as ISO strings
      totalAmount: string;
      shippingAddress?: string
      currency: string;
      paymentMethod?: string;
      shippingMethod?: string;
      trackingNumber?: string;
      status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
      paymentStatus: 'UNPAID' | 'PAID' | 'FAILED' | 'REFUNDED';
      items: OrderItem[];
   
  };
  export type LoginStatus = 200 | 201 | 400 | 500;

  export type UserProfile = {
    id: number
    username: string
    email: string;
    phone: string
    countryCode: string
  };

  export type Paystack = {
    authorization_url: string
    reference: string;
    token: string

  };
  export type GetOrder = {
    shippingAddress: string
    totalAmount: string;
    currency: string;
    orderDate: Date;
    paymentMethod: string;
    shippingMethod: string;
    trackingNumber: string;
    token: string
  };

  
  
  export type LoginRequest = {
    email: string;
    password: string;
  };
  
 export type RegistrationPayload = {
  username: string;
  email: string;
  password: string;
  phone: string;
  countryCode: string
 };
 
 export type AuthResponse = {
  user: UserProfile;
};
export type PaystackInitResponse = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

/**
 * The response from our server after verifying a Paystack transaction.
 * It confirms the status of the payment and includes key details about the transaction.
 */
export type VerifyTransactionResponse = {
  status: boolean; // `true` if payment was successful
  message: string;
  data: {
    id: number; // Paystack's internal transaction ID
    status: string; // e.g., 'success', 'failed'
    reference: string;
    amount: number; // Amount in kobo (integer)
    gateway_response: string; // e.g., 'Successful'
    paid_at: string; // ISO date string
    created_at: string; // ISO date string
    channel: string; // e.g., 'card', 'bank'
    currency: string; // e.g., 'NGN'
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
    };
  }
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: string; // The price of the product AT THE TIME of purchase
  orderId: number;
  productId: number;
  
  // Your backend query should include the nested product details for display
  product?: Product; 
};

export type CreateOrderPayload = {
  paymentMethod: string;
  shippingAddress: string;
  shippingMethod: string;
  currency: string; // e.g., "NGN"
};