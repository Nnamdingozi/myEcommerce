
import { Product, Category, User, LoginRequest, LoginStatus, Cart} from '@/app/lib/definition';
import axios from 'axios'
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
    console.error('Error fetching data', err)
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
    const response = await axios.post<LoginRequest>('http://localhost:5000/auth/login', user);
    if(response.status === 200) {
      console.log('userLoggin data authenticated:', response.data)
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




export async function fetchByEmail(email: string): Promise<{id: number, username: string, email: string} | undefined> {
  try {
    const response = await axios.get(`http://localhost:5000/users/?email=${email}`);
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




export async function addToCart(userId: number, item: Cart): Promise<Cart | undefined>{
  try {
    const response = await axios.post<Cart>(`http://localhost:5000/cart/${userId}`, item);
    console.log('sending cart data to database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return undefined;
  }

};
export async function fetchUserCart(userId: number): Promise<Cart[] | undefined>{
  try {
    const response = await axios.get<Cart[]>(`http://localhost:5000/cart/${userId}`);
    console.log('getting cart data from database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return undefined;
  }

};

export async function updateCartItem(id: number, quantity: number): Promise<Cart[] | undefined>{
  try {
    const response = await axios.put<Cart[]>(`http://localhost:5000/cart/${id}`, quantity);
    console.log('getting cart data from database: ', response.data)
    return response.data
  }  catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return undefined;
  }

};