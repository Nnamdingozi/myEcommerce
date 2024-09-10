import Categories from '@/app/ui/categories';
import { fetchCategories } from '@/app/lib/data';
import { Category } from '@/app/lib/definition';


export default async function HomeLayout({children}: { children: React.ReactNode})
 {
    const categories: Category[] = await fetchCategories();
    return (
        <div className="flex flex-col md:flex-row justify-center item-center border-4 border-red-800 h-auto">
         <Categories categories={categories} />
            <main className=' w-[85%]'>{children}</main>
            </div>
       );
  }
  