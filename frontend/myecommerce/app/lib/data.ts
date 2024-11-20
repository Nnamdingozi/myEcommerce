
// import { Product, Category, User, LoginRequest, LoginStatus, NewCart, Order, Paystack, UserProfile, VerifyTransactionResponse, ProductDetails} from '@/app/lib/definition';
// import axios from 'axios';

// //add base url later axios.defaults.baseUrl

// const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
// console.log(backendUrl)

// export async function fetchProducts(): Promise<Product[]> {
//     // let products = [];
//   try {
//     const response = await axios.get<Product[]>(`${backendUrl}/product`);
//     //  products = await response.data;
//     console.log('product response received:', response.data)
//      return response.data;
    
//     } catch(err) {
//         console.error('Error fetching data', err)
//         return [];
  
//       }

// };
// export async function fetchCategories(): Promise<Category[]> {
//   try {
//     const response = await axios.get<Category[]>(`${backendUrl}/product/categories`);
//     console.log('catogories received:', response.data);
//     return response.data

//   } catch(err: any) {
//     console.log('Error fetching data', err.response?.data || err.message || err)
//     return [];

//   }
// };

// export async function fetchProductsByCategoryId( id: number): Promise<ProductDetails[]> {
  
//   try {
//     const categoryData = await axios.get(`${backendUrl}/product/categoryProduct/${id}`);
// return categoryData.data;
//   } catch(err: any) {
//     console.error('Error fetching data', err)
//     return [];

//   }
  
// };


// export async function registerUser(user: { username: string; email: string; phone: string; password: string; country_code: string; }): Promise<{ token: string }> {
//   try {
//     const response = await axios.post(`${backendUrl}/auth/register`, user);
//     const tokenData = response.data;  // receiving token instead of user data

//     console.log('Received token from backend:', tokenData);

//     return {
//       token: tokenData.token
//     };
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw new Error('Failed to register user');
//   }
// }


// export async function userLoggin (user:{email: string; password: string}): Promise<{ token: string }> {
//   try {
//     console.log('user login data sent from onsubmit to api', user)
//     const response = await axios.post(`${backendUrl}/auth/login`, user);
//     console.log('token from userLoggin:', response.data);

//     const tokenData = response.data; 
    
//       return {
//         token: tokenData.token
//       };
    
    
//   } catch (err: any) {
//     console.error('Error logging in user:', err.response?.data || err.message || err);
//     throw new Error('User loggin failed')
//   }
// };



// export async function userProfile(token: string): Promise<UserProfile | undefined> {
//   try {
   
//     const response = await axios.get<UserProfile>(`${backendUrl}/auth/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });

//     if (response.data) {
//       console.log('User data retrieved:', response.data);
//       return response.data;
//     }
//   } catch (error: any) {
//     console.error('Error fetching user profile:', error.response?.data || error.message || error);
//     return undefined;
//   }
// }




// export async function fetchByEmail(email: string, token: string): Promise<{id: number, username: string} | undefined> {
//   try {
//     const response = await axios.get(`${backendUrl}/users/email`, {
//       params: { email },
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     }); 
//     console.log('Fetch user by email endpoint hit')
//     if(response.status === 200) {
//       console.log('user data fetched by email:', response.data)
//       return response.data;
//     }
    
//   } catch (err: any) {
//     console.error('Error fetching user:', err.response?.data || err.message || err);
//   return undefined
//   };
// }




// export async function addItemsToCart(
//   token: string | null, 
//   productId: number | null, 
//   quantity: number | null
// ): Promise<NewCart | undefined> {
//   try {
//     const response = await axios.post<NewCart>(
//       `${backendUrl}/cart`,
//       { productId, quantity },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//         },
//       }
//     );
    
//     console.log('Sending cart data to database:', response.data);
//     return response.data;
//   } catch (err: any) {
//     console.error('Error adding to cart:', err.response?.data || err.message || err);
//     return undefined;
//   }
// };


// export async function fetchUserCart(token: string): Promise<NewCart[] | []>{
//   try {
//     const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });
//     console.log('getting cart data from database: ', response.data)
//     return response.data
//   }  catch (err: any) {
//     console.log('Error getting items from cart:', err.response?.data || err.message || err);
//     return [];
//   }

// };


 
// export async function updateCartItem(token: string, cartItemId: number,  quantity: number): Promise<NewCart | undefined>{
//   try {
//     const response = await axios.put<NewCart>(`${backendUrl}/cart/${cartItemId}`, { quantity}, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });
//     console.log('getting cart data from database: ', response.data)
//     return response.data
//   }  catch (err: any) {
//     console.error('Error adding to cart:', err.response?.data || err.message || err);
//     return undefined;
//   }

// };

// export async function deleteUserItem(token: string, cartItemId: number) {
//   console.log('cartItemId in deleteUserItem in data.ts', cartItemId)
//   try {
//     const response = await axios.delete(`${backendUrl}/cart/${cartItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });
//     console.log('deleting cart item from database: ', response.status)
//    if(response.status === 204) {
//     console.log('Item successfully deleted');
//     return true

//    } else {
//     return false;
//    }
//   }  catch (err: any) {
//     console.error('Error deleting from cart cart:', err.response?.data || err.message || err);
//     return undefined;
//   }
// };



// export async function createOrder (token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) {
//   console.log(`values received in data.ts and passed to backend: paymentMtd: ${paymentMtd},`)
//   try {
//     const response = await axios.post(`${backendUrl}/order`, {paymentMtd, shippingAddy, shippingMtd, curr}, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     })
//   if(response.data) {
//     console.log('Order successfully created,', response.data);
//     return response.data;
//   }
//   } catch (err: any) {
//     console.error('Error verifying user session data', err.response?.data || err.message || err )
//   }
// };
 

// export async function fetchUserOrder (token: string): Promise<Order[] | null> {

//   try {
//     const response = await axios.get(`${backendUrl}/order`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     }) ;
//     if(response){
//       console.log('user order fetched in data.tsx:', response.data);
//       return response.data
//     }
    
//   } catch (error) {
//     console.error('Error fetching user orders', error)
    
//   }
//   return null
// };

// export async function fetchOrderById ( token: string, orderId: number): Promise<Order | null> {

//   try {
//     const response = await axios.get(`${backendUrl}/order/${orderId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });
//     if(response){
//       console.log('user order with id fetched in data.tsx:', response.data);
//       return response.data
//     }
    
//   } catch (error) {
//     console.error('Error fetching user orders by id', error)
    
//   }
//   return null
// };

// export async function initializePaystack (token: string, orderId: number, ): Promise<Paystack | null> {
//   console.log('orderId received in initializePaystack data.ts:', orderId)

//   try {
//     const response = await axios.post(`${backendUrl}/checkout/initialize/${orderId}`, {}, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
   
//     if(response){
//       console.log('Payment with card initialized on paystack', response.data);
//       return response.data
//     }
    
//   } catch (error) {
//     console.error('Error initializing payment with card on paystack', error)
    
//   }
//   return null
// };

// export async function verifyPaystack (token: string, transactionReference: string, ): Promise<VerifyTransactionResponse | null> {
//   console.log('reference received in initializePaystack data.ts:', transactionReference)

//   try {
//     const response = await axios.get(`${backendUrl}/checkout/verify?reference=${transactionReference}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
   
//     if(response){
//       console.log('Payment with card verified on paystack', response.data);
//       return response.data
//     }
    
//   } catch (error) {
//     console.error('Error verifing payment with card on paystack', error)
    
//   }
//   return null
// }



import { 
  Product, Category, UserProfile, NewCart, Order, Paystack, VerifyTransactionResponse, ProductDetails
} from '@/app/lib/definition';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
console.log(backendUrl);

const configWithToken = (token: string | null) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${backendUrl}/product`);
    console.log('Product response received:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(`${backendUrl}/product/categories`);
    console.log('Categories received:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching categories:', err.response?.data || err.message || err);
    return [];
  }
}

export async function fetchProductsByCategoryId(id: number): Promise<ProductDetails[]> {
  try {
    const response = await axios.get(`${backendUrl}/product/categoryProduct/${id}`);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching products by category:', err);
    return [];
  }
}

export async function registerUser(user: { username: string; email: string; phone: string; password: string; country_code: string; }): Promise<{ token: string }> {
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, user);
    console.log('Received token from backend:', response.data);
    return { token: response.data.token };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
}

export async function userLogin(user: { email: string; password: string }): Promise<{ token: string }> {
  try {
    console.log('User login data sent from onsubmit to API:', user);
    const response = await axios.post(`${backendUrl}/auth/login`, user);
    console.log('Token from userLogin:', response.data);
    return { token: response.data.token };
  } catch (err: any) {
    console.error('Error logging in user:', err.response?.data || err.message || err);
    throw new Error('User login failed');
  }
}

export async function userProfile(token: string): Promise<UserProfile | undefined> {
  try {
    const response = await axios.get<UserProfile>(`${backendUrl}/auth/profile`, configWithToken(token));
    console.log('User data retrieved:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.response?.data || error.message || error);
    return undefined;
  }
}

export async function fetchByEmail(email: string, token: string): Promise<{ id: number; username: string } | undefined> {
  try {
    const response = await axios.get(`${backendUrl}/users/email`, {
      params: { email },
      ...configWithToken(token),
    });
    console.log('Fetch user by email endpoint hit, data:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching user:', err.response?.data || err.message || err);
    return undefined;
  }
}

export async function addItemsToCart(token: string | null, productId: number | null, quantity: number | null): Promise<NewCart | null> {
  try {
    const response = await axios.post<NewCart>(
      `${backendUrl}/cart`,
      { productId, quantity },
      configWithToken(token),
    );
    console.log('Cart data sent to database:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return null;
  }
}

export async function fetchUserCart(token: string): Promise<NewCart[] | undefined> {
  try {
    const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, configWithToken(token));
    console.log('Cart data retrieved:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching cart items:', err.response?.data || err.message || err);
    return undefined;
  }
}

export async function updateCartItem(token: string, cartItemId: number, quantity: number): Promise<NewCart | undefined> {
  try {
    const response = await axios.put<NewCart>(`${backendUrl}/cart/${cartItemId}`, { quantity }, configWithToken(token));
    console.log('Updated cart item:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error updating cart item:', err.response?.data || err.message || err);
    return undefined;
  }
}

export async function deleteUserItem(token: string, cartItemId: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${backendUrl}/cart/${cartItemId}`, configWithToken(token));
    console.log('Deleted cart item:', response.status);
    return response.status === 204;
  } catch (err: any) {
    console.error('Error deleting cart item:', err.response?.data || err.message || err);
    return false;
  }
}

export async function createOrder(token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) {
  try {
    const response = await axios.post(`${backendUrl}/order`, { paymentMtd, shippingAddy, shippingMtd, curr }, configWithToken(token));
    console.log('Order successfully created:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error creating order:', err.response?.data || err.message || err);
    throw new Error('Failed to create order');
  }
}

export async function fetchUserOrder(token: string): Promise<Order[] | null> {
  try {
    const response = await axios.get(`${backendUrl}/order`, configWithToken(token));
    console.log('User orders fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return null;
  }
}

export async function fetchOrderById(token: string, orderId: number): Promise<Order | null> {
  try {
    const response = await axios.get(`${backendUrl}/order/${orderId}`, configWithToken(token));
    console.log('Order details fetched by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }
}

export async function initializePaystack(orderId: number): Promise<Paystack | null> {
  try {
    const response = await axios.post(`${backendUrl}/checkout/initialize/${orderId}`, {});
    console.log('Paystack payment initialized:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error initializing Paystack payment:', error);
    return null;
  }
}

export async function verifyPaystack(reference: string): Promise<VerifyTransactionResponse | null> {
  try {
    const response = await axios.get(`${backendUrl}/checkout/verify?reference=${reference}`);
    console.log('Paystack payment verified:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    return null;
  }
}
