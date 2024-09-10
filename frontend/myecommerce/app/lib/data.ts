
import { Product, Category, User, LoginRequest} from '@/app/lib/definition';
import axios from 'axios'

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

export async function registerUser(user: User): Promise<User[]> {
  
  try {
    const userData = await axios.post('http://localhost:5000/auth/register', user);
    console.log('sending data to database: ', userData.data)
return userData.data;

} catch (err: any) {
  console.error('Error registering user:', err.response?.data || err.message || err);
  return [];
}

};

export async function userLogging(user: LoginRequest): Promise<LoginRequest | undefined> {
  try {
    const response = await axios.post<LoginRequest>('http://localhost:5000/auth/login', user);
    return response.data
  } catch (err: any) {
    console.error('Error logging in user:', err.response?.data || err.message || err);
  return undefined
  };
}