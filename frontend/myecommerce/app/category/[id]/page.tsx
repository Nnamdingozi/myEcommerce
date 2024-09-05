import { Product } from '@/app/lib/definition';
import { fetchProductsByCategoryId } from '@/app/lib/data';
import  CategoryProducts  from '@/app/ui/categoryProducts';

export default async function CategoryPage({params}: { params : {id: string}}) {
    const categoryproducts: Product[] = await fetchProductsByCategoryId(params.id);
    console.log('category Products fetched:', categoryproducts);
    return (
        <CategoryProducts categoryproducts={categoryproducts} />
    )
}