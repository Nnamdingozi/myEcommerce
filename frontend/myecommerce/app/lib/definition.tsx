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

  // export type Cart = {
  //   id: number;
  //   name: string;
  //   quantity: number;
  //   price: number;
  //   description: string;
  //   image_url: string;
  //   total: number;

  // };
  export type  ProductDetails = {
    id: number;          // Product ID
    name: string;        // Product name
    price: number;       // Product price
    description: string; // Product description
    image_url: string;   // URL for the product image
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


  }