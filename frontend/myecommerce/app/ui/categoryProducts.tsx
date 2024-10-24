import {  Product } from '@/app/lib/definition';
import Image from 'next/image';

interface CategoryproductProps {
    categoryproducts: Product[]; 
}

const CategoryProducts: React.FC<CategoryproductProps> = ({ categoryproducts }) => {
    console.log('categoryproducts value in props:', categoryproducts);
    if(!categoryproducts || categoryproducts.length === 0) {
        return <p>No products found for this category</p>;
    }
    return (

        <div className='w-full h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16'>
      {categoryproducts.map((categoryproduct) => (
        <div key={categoryproduct.id} className='bg-gray-100 shadow-md rounded-lg overflow-hidden border-2 border-red-400 h-[500px] flex flex-col'>
          <Image 
            src={categoryproduct.image_url || '/images/img-1.jpg'}
            alt={categoryproduct.name}
            className='w-full h-1/2 object-cover'
            width={500}
            height={500}
          />
          <div className='p-4 mx-auto w-full h-[180px] '>
            <h2 className='text-xl font-semibold'>{categoryproduct.name}</h2>
            <p className='text-gray-600'>{categoryproduct.description}</p> 
            <p className='text-green-500 font-bold'>${categoryproduct.price}</p>
          </div>
          <button className='bg-red-800 text-rose-100 w-[60%] mx-auto h-6 rounded-lg hover:bg-rose-100 hover:text-red-800'>Add to Cart</button>
         
        </div>
      ))}
    </div>
        
    )
};

export default CategoryProducts

