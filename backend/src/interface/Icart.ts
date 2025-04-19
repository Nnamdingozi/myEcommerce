export interface ICart {
    id?: number; // Optional, since new items might not have an ID initially
    userId: number; // The ID of the user who owns the cart
    productId: number; // The ID of the product in the cart
    quantity: number; // Number of units of the product in the cart
    total?: number; // Optional, since it can be calculated based on quantity * price
    name?: string; // Optional product name
    price?: number; // Optional, in case price needs to be displayed with the cart
    description?: string; // Optional product description
    image_url?: string; // Optional, if images are displayed in the cart
  }
  