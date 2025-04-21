export interface ICart {
    id?: number; 
    userId: number; 
    productId: number; 
    quantity: number; 
    total?: number; 
    name?: string; 
    price?: number; 
    description?: string; 
    image_url?: string; 
  }
  