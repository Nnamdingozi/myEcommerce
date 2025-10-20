
    import Link from 'next/link';
    import { Category } from '@/app/lib/definition';
    
    interface CategoryProps {
        categories: Category[] | null;
    }
    
    const Categories: React.FC<CategoryProps> = ({ categories }) => {
        return (
            <div className='mt-14'>
                <h1 className='text-center text-red-800 font-bold text-xl'>CATEGORIES</h1>
                <ul className='space-y-4 w-full h-auto mx-4 p-4'>
                    {categories?.map((category) => (
                        <li 
                            key={category.id} 
                            className='rounded-lg shadow-lg bg-rose-100 hover:bg-rose-200 transition-all duration-200 transform hover:-translate-y-1'
                        >
                            <Link href={`/category/${category.id}`} className='block py-2 px-4 text-red-800 font-semibold text-center'>
                                {category.categoryName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
        
    };
    
    export default Categories;
    
