import Link from 'next/link';
import { Category} from '@/app/lib/definition';

interface CategoryProps {
    categories: Category[];
  }
  

const Categories: React.FC<CategoryProps> = ({ categories }) => {
    console.log('received category props:', categories)
    return (
        <>
        <h1>Categories</h1>
        <ul className='space-y-2 w-[15%] h-auto mx-4 text-center text-red-800 p-4 mt-12'>
            
            {categories.map((category) => (
                <li key={category.id} className='border-2 border-red-800'><Link href={`/category/${category.id}`}>{category.category_name}</Link></li>
            ))}
        </ul>
        </>
    )
};

export default Categories;