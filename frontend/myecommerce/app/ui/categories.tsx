import Link from 'next/link';
import { Category} from '@/app/lib/definition';

interface CategoryProps {
    categories: Category[] | null;
  }
  

const Categories: React.FC<CategoryProps> = ({ categories }) => {
    return (
        <div className='mt-14'>
        <h1 className='text-center text-red-800  font-bold'>CATEGORIES</h1>
        <ul className='space-y-2 w-full h-auto mx-4 text-center text-red-800 p-4 '>
            
            {categories?.map((category) => (
                <li key={category.id} className='border-2 border-red-800'><Link href={`/category/${category.id}`}>{category.category_name}</Link></li>
            ))}
        </ul>
        </div>
    )
};

export default Categories;