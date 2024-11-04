
import { Product, Category, User, LoginRequest, LoginStatus, NewCart, Order, Paystack} from '@/app/lib/definition';
import axios from 'axios';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
//add base url later axios.defaults.baseUrl


export async function fetchProducts(): Promise<Product[]> {
    // let products = [];
  try {
    const response = await axios.get<Product[]>('http://localhost:5000/product');
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
    const response = await axios.get<Category[]>('http://localhost:5000/product/categories');
    console.log('catogories received:', response.data);
    return response.data

  } catch(err: any) {
    console.log('Error fetching data', err.response?.data || err.message || err)
    return [];

  }
};

export async function fetchProductsByCategoryId( id: string): Promise<Product[]> {
  
  try {
    const categoryData = await axios.get(`http://localhost:5000/product/categoryProduct/${id}`);
return categoryData.data;
  } catch(err: any) {
    console.error('Error fetching data', err)
    return [];

  }
  
};

export async function registerUser(user: User): Promise<{ id: number; username: string; email: string; }> {
  
  try {
    const response = await axios.post('http://localhost:5000/auth/register', user);

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
    const response = await axios.post<LoginRequest>('http://localhost:5000/auth/login', user, {withCredentials: true });
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
    const response = await axios.get(`http://localhost:5000/users/email`, {
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
    const response = await axios.post<NewCart>(`http://localhost:5000/cart`, {productId, quantity}, { withCredentials: true });
    console.log('sending cart data to database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return undefined;
  }

};
export async function fetchUserCart(): Promise<NewCart[] | []>{
  try {
    const response = await axios.get<NewCart[]>(`http://localhost:5000/cart`, { withCredentials: true });
    console.log('getting cart data from database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.log('Error getting items from cart:', err.response?.data || err.message || err);
    return [];
  }

};


 
export async function updateCartItem(cartItemId: number,  quantity: number): Promise<NewCart | undefined>{
  try {
    const response = await axios.put<NewCart>(`http://localhost:5000/cart/${cartItemId}`, { quantity}, { withCredentials: true });
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
    const response = await axios.delete(`http://localhost:5000/cart/${cartItemId}`, {withCredentials: true});
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
    const response = await axios.get('http://localhost:5000/auth/me',  {withCredentials: true })
    if(response.status === 200 && response.data.user) {
      console.log(' User data fetched in checkUserSession', response.data)
    return response.data
    }
  } catch (err: any) {
    console.error('Error verifying user session data', err.response?.data || err.message || err )
  }

};

export async function createOrder (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string ) {
  console.log(`values received in data.ts and passed to backend: paymentMtd: ${paymentMtd},`)
  try {
    const response = await axios.post('http://localhost:5000/order', {paymentMtd, shippingAddy, shippingMtd, curr}, {withCredentials: true})
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
    const response = await axios.get('http://localhost:5000/order', {withCredentials: true});
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
    const response = await axios.get(`http://localhost:5000/order/${orderId}`, {withCredentials: true});
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
    const response = await axios.post(`http://localhost:5000/checkout/initialize/${orderId}`);
    if(response){
      console.log('Payment with card initialized on paystack', response.data);
      return response.data
    }
    
  } catch (error) {
    console.error('Error initializing payment with card on paystack', error)
    
  }
  return null
}

