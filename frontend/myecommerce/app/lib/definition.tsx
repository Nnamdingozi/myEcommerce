export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };

  export type Category = {
    id: string;
    category_name: string;
    

  };

  export type User = {
    id?: number
    username: string;
    email: string;
    phone?: string;
    password?: string;
    country_code: string;
  };

  export type LoginRequest = {
    id?: number
    username?: string
    email: string;
    password: string;
  };
  
  export type LoginStatus = 200 | 201 | 400 | 500;

  export type Cart = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image_url: string;
    total: number;

  }