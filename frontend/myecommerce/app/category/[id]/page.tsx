'use client'

import { useEffect, useState } from 'react';
import { Product } from '@/app/lib/definition';
import { fetchProductsByCategoryId } from '@/app/lib/data';
import  CategoryProducts  from '@/app/ui/categoryProducts';
import { useCart } from '@/app/context/cartContext';

export default function CategoryPage({params}: { params : {id: string}}) {

    const [catProducts, setCatProducts] = useState<Product[]>([]);
    const [loading, setLoading] =  useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

const {addToCart, getUserCart} = useCart();


    useEffect(() => {
        const baseUrl = 'http://localhost:5000';
        const fetchByCat = async () => {
            try {
                const categoryproducts: Product[] = await fetchProductsByCategoryId(params.id);
    console.log('category Products fetched:', categoryproducts);

   
    const modfifiedCategoryproducts = categoryproducts.map((categoryproduct) => ({
        ...categoryproduct, 
        image_url: `${baseUrl}${categoryproduct.image_url}`
    }));
    setCatProducts(modfifiedCategoryproducts)

            } catch (err) {
                console.error('Error fetching products for this category');
                setError('Failed to fetch products for this product')
            } finally {
                setLoading(false)
            }
        }
fetchByCat()
    }, [params.id])
    
    return (
        <CategoryProducts 
        categoryproducts={catProducts}
        addToCart={addToCart}
        getUserCart={getUserCart}
         />
    )
}



