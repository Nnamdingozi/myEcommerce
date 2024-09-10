export type Product = {
    id: string;
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
    username: string;
    email: string;
    phone: string;
    password: string;
    country_code: string;
  };

  export type LoginRequest = {
    username: string;
    password: string;
  };
  
  export type LoginResponse = {
    status: number;
    data: string
  };