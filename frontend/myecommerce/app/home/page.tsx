import Image from "next/image";
import Hero from '@/app/ui/hero';
import Products from '@/app/ui/products';
import { fetchProducts } from '@/app/lib/data';
import { Product } from '@/app/lib/definition';



export default async  function Home() {
  const products: Product[] = await fetchProducts();
 
  console.log('products from fetchProducts call:', products)
  

  return (
    <div>
 <Hero />
   <Products products={products}/>
    </div>

    
  );
};
