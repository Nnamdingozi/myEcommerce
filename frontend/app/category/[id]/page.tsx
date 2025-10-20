
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/app/lib/definition';
import CategoryProducts from '@/app/ui/categoryProducts';
import { useProduct } from '@/app/context/productContext';
import { fetchCategories } from '@/app/lib/data/product';
import { ProductCardSkeleton } from '@/app/ui/product-card-skeleton';
import { ErrorCard } from '@/app/ui/errorCard';
import { useParams } from 'next/navigation';


export default function CategoryPage() {
  const { error, loading, getProductsByCategoryId } = useProduct();
  const [catProducts, setCatProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("")

  const params = useParams();
  const categoryId = params.id ? Number(params.id) : null;


  const baseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'http://localhost:5000';



  useEffect(() => {
    const fetchByCat = async () => {
      try {
        

        if (!categoryId) {
          throw new Error("Invalid category ID provided.");
        }

        const fetchedProducts = await getProductsByCategoryId(categoryId);

        if (fetchedProducts && fetchedProducts.length > 0) {
          const modifiedProducts = fetchedProducts.map(product => ({
            ...product,
            image_url: `${baseUrl}${product.imageUrl}`,
          }));
          setCatProducts(modifiedProducts);
        } else {
          setCatProducts([])
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchByCat();
  }, [categoryId, getProductsByCategoryId, baseUrl]);


  useEffect(() => {
    if (categoryId !== null && !isNaN(categoryId)) {
      // Call the context action to fetch products for this specific category
      getProductsByCategoryId(categoryId);

      // Optional: Fetch all categories to find the name for the title
      const findCategoryName = async () => {
        try {
          const allCategories = await fetchCategories();
          const currentCategory = allCategories.find(cat => cat.id === categoryId);
          if (currentCategory) {
            setCategoryName(currentCategory.categoryName);
          }
        } catch (e) {
          console.error("Failed to fetch category name");
        }
      };
      findCategoryName();
    }
  }, [categoryId, fetchCategories]);


// --- 4. Handle the Loading State ---
  // We use the `loading` flag directly from the context.
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Skeleton for the title */}
        <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-8" />
        {/* Skeleton for the product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }


    // --- 5. Handle the Error State ---
  // We use the `error` flag directly from the context.
  if (error) {
    return <ErrorCard errorMessage={error} title="Could Not Load Products" />;
  }

  return (
    <>
      <CategoryProducts
        products={catProducts}
        categoryName = {categoryName}
      />


    </>
  );
}


// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// // --- Import our context, display component, and helper components/types ---
// import { useProduct } from '@/app/context/productContext';
// import CategoryProducts from '@/app/ui/categoryProducts';
// import { ProductCardSkeleton } from '@/app/ui/product-card-skeleton';
// import { ErrorCard } from '@/app/ui/errorCard';
// import { fetchCategories } from '@/app/lib/data/product';
// import { Category } from '@/app/lib/definition';

// export default function CategoryPage() {
//   // 1. Get the dynamic `id` from the URL using the standard `useParams` hook.
//   const params = useParams();
//   // `params.id` can be a string or string[]. We handle this safely.
//   const categoryIdParam = Array.isArray(params.id) ? params.id[0] : params.id;
//   const categoryId = categoryIdParam ? Number(categoryIdParam) : null;

//   // 2. Get ALL necessary state and actions from our ProductContext.
//   // Assuming the function is named `getProductsByCategoryId ` in your context.
//   const { products, getProductsByCategoryId , loading, error } = useProduct();
  
//   // Local state for this page to hold the category's name for the title.
//   const [categoryName, setCategoryName] = useState<string | null>(null);

//   // 3. A single, clean useEffect to trigger all data fetching for this page.
//   useEffect(() => {
//     // Only run if we have a valid, numeric category ID.
//     if (categoryId !== null && !isNaN(categoryId)) {
      
//       // a) Tell the context to fetch products for this specific category.
//       // The context will handle setting its own `products`, `loading`, and `error` states.
//       getProductsByCategoryId (categoryId);

//       // b) Fetch the category's name to display a nice title.
//       const findCategoryName = async () => {
//         try {
//           const allCategories = await fetchCategories();
//           const currentCategory = allCategories.find(cat => cat.id === categoryId);
//           if (currentCategory) {
//             setCategoryName(currentCategory.categoryName);
//           }
//         } catch (e) {
//           console.error("Failed to fetch category name:", e);
//         }
//       };
//       findCategoryName();
//     }
//   }, [categoryId, getProductsByCategoryId ]); // This effect re-runs if the user navigates to a different category.

//   // --- 4. Handle the Loading State ---
//   // We use the `loading` flag directly from the context.
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
//         {/* Skeleton for the title */}
//         <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-8" />
//         {/* Skeleton for the product grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <ProductCardSkeleton key={index} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // --- 5. Handle the Error State ---
//   // We use the `error` flag directly from the context.
//   if (error) {
//     return <ErrorCard errorMessage={error} title="Could Not Load Products" />;
//   }

//   // --- 6. Success State ---
//   // The context has finished loading and has no errors.
//   // We now pass the `products` from the context down to our display component.
//   return (
//     <CategoryProducts 
//       products={products} 
//       categoryName={categoryName || `Category #${categoryId}`} 
//     />
//   );
// }
