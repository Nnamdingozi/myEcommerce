export interface ProductAttributes {
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
    
  }


  export interface CategoryAttributes {
  id: number;
  category_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

