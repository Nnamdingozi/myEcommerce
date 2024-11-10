
import { Product, Category, User, LoginRequest, LoginStatus, NewCart, Order, Paystack} from '@/app/lib/definition';
import axios from 'axios';

//add base url later axios.defaults.baseUrl

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
console.log(backendUrl)

export async function fetchProducts(): Promise<Product[]> {
    // let products = [];
  try {
    const response = await axios.get<Product[]>(`${backendUrl}/product`);
    //  products = await response.data;
    console.log('product response received:', response.data)
     return response.data;
    
    } catch(err) {
        console.error('Error fetching data', err)
        return [];
  
      }

};
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(`${backendUrl}/product/categories`);
    console.log('catogories received:', response.data);
    return response.data

  } catch(err: any) {
    console.log('Error fetching data', err.response?.data || err.message || err)
    return [];

  }
};

export async function fetchProductsByCategoryId( id: number): Promise<Product[]> {
  
  try {
    const categoryData = await axios.get(`${backendUrl}/product/categoryProduct/${id}`);
return categoryData.data;
  } catch(err: any) {
    console.error('Error fetching data', err)
    return [];

  }
  
};

export async function registerUser(user: User): Promise<{ id: number; username: string; email: string; }> {
  
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, user);

const userData = response.data;
console.log('sending data to database: ', userData);
return {
  id: userData.id,          // Assuming the response includes these fields
  username: userData.username,
  email: userData.email,
  // phone: userData.phone,
  // country_code: userData.country_code,
};

} catch (err: any) {
  console.error('Error registering user:', err.response?.data || err.message || err);
  throw new Error("Registration failed")
}

};

export async function userLogging(user: LoginRequest): Promise<{data:LoginRequest, status: LoginStatus} | undefined> {
  try {
    console.log('user login data sent from onsubmit to api', user)
    const response = await axios.post<LoginRequest>(`${backendUrl}/auth/login`, user, {withCredentials: true });
    console.log('API Response:', response);
    if(response.status === 200) {
      console.log('userLoggin data authenticated:', response)
      return {
        data:  response.data as LoginRequest,
        status: response.status as LoginStatus
      };
    }
    
  } catch (err: any) {
    console.error('Error logging in user:', err.response?.data || err.message || err);
  return undefined
  };
};




export async function fetchByEmail(email: string): Promise<{id: number, username: string} | undefined> {
  try {
    const response = await axios.get(`${backendUrl}/users/email`, {
      params: { email }, 
    });
    console.log('Fetch user by email endpoint hit')
    if(response.status === 200) {
      console.log('user data fetched by email:', response.data)
      return response.data;
    }
    
  } catch (err: any) {
    console.error('Error fetching user:', err.response?.data || err.message || err);
  return undefined
  };
}




export async function addItemsToCart(productId: number | null, quantity: number | null): Promise<NewCart | undefined>{
  try {
    const response = await axios.post<NewCart>(`${backendUrl}/cart`, {productId, quantity}, { withCredentials: true });
    console.log('sending cart data to database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return undefined;
  }

};
export async function fetchUserCart(): Promise<NewCart[] | []>{
  try {
    const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, { withCredentials: true });
    console.log('getting cart data from database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.log('Error getting items from cart:', err.response?.data || err.message || err);
    return [];
  }

};


 
export async function updateCartItem(cartItemId: number,  quantity: number): Promise<NewCart | undefined>{
  try {
    const response = await axios.put<NewCart>(`${backendUrl}/cart/${cartItemId}`, { quantity}, { withCredentials: true });
    console.log('getting cart data from database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return undefined;
  }

};

export async function deleteUserItem(cartItemId: number) {
  console.log('cartItemId in deleteUserItem in data.ts', cartItemId)
  try {
    const response = await axios.delete(`${backendUrl}/cart/${cartItemId}`, {withCredentials: true});
    console.log('deleting cart item from database: ', response.status)
   if(response.status === 204) {
    console.log('Item successfully deleted');
    return true

   } else {
    return false;
   }
  }  catch (err: any) {
    console.error('Error deleting from cart cart:', err.response?.data || err.message || err);
    return undefined;
  }
};

export async function checkUserSession() {
  try {
    const response = await axios.get(`${backendUrl}/auth/me`, { withCredentials: true });
    if (response.status === 200 && response.data.user) {
      console.log('User data fetched in checkUserSession', response.data);
      return response.data;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Axios-specific error handling
      console.error('Error verifying user session data:', err.response?.data || err.message);
    } else {
      // Non-Axios errors (e.g., unexpected runtime errors)
      console.error('Unexpected error:', err);
    }
  }
};


export async function createOrder (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string ) {
  console.log(`values received in data.ts and passed to backend: paymentMtd: ${paymentMtd},`)
  try {
    const response = await axios.post(`${backendUrl}/order`, {paymentMtd, shippingAddy, shippingMtd, curr}, {withCredentials: true})
  if(response.data) {
    console.log('Order successfully created,', response.data);
    return response.data;
  }
  } catch (err: any) {
    console.error('Error verifying user session data', err.response?.data || err.message || err )
  }
};
 

export async function fetchUserOrder (): Promise<Order[] | null> {

  try {
    const response = await axios.get(`${backendUrl}/order`, {withCredentials: true});
    if(response){
      console.log('user order fetched in data.tsx:', response.data);
      return response.data
    }
    
  } catch (error) {
    console.error('Error fetching user orders', error)
    
  }
  return null
};

export async function fetchOrderById (orderId: number): Promise<Order | null> {

  try {
    const response = await axios.get(`${backendUrl}/order/${orderId}`, {withCredentials: true});
    if(response){
      console.log('user order with id fetched in data.tsx:', response.data);
      return response.data
    }
    
  } catch (error) {
    console.error('Error fetching user orders by id', error)
    
  }
  return null
};

export async function initializePaystack (orderId: number): Promise<Paystack | null> {
  console.log('orderId received in initializePaystack data.ts:', orderId)

  try {
    const response = await axios.post(`${backendUrl}/checkout/initialize/${orderId}`);
    if(response){
      console.log('Payment with card initialized on paystack', response.data);
      return response.data
    }
    
  } catch (error) {
    console.error('Error initializing payment with card on paystack', error)
    
  }
  return null
}

