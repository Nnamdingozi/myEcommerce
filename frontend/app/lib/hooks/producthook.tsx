import {fetchProductsByCategoryId, fetchProducts } from "../data";
import { ProductDetails} from '@/app/lib/definition';



interface ProductHookLogicProps {
    setProducts: React.Dispatch<React.SetStateAction<ProductDetails[] | []>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    products: ProductDetails[]
 
  };
  
  export const productHookLogic = ({
    products,
    setLoading,
    setError,
    setProducts

  }: ProductHookLogicProps) => {
    const getProducts = async () => {
        setLoading(true);
        try {
          const items: ProductDetails[] = await fetchProducts() || [];
          if (items) {
            setProducts(items);
            return items
            
          }
        } catch (err) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false);
        }
      };
    
      const getProductsByCategoryId = async (id: number) => {
        setLoading(true);
        try {
          const items: ProductDetails[] = await fetchProductsByCategoryId(id) || [];
          if (items) {
            setProducts(items);
            return items
            
          }
        } catch (err) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false);
        }
      };
    
      return { getProducts, getProductsByCategoryId };

  }