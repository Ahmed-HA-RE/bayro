import { getAllProducts } from '@/app/actions/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Products',
  description: 'Manage all products in the admin panel.',
};

const AdminProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const query = (await searchParams).query || '';
  const category = (await searchParams).category || '';

  const products = await getAllProducts({
    page,
    query: query as string,
    category: category as string,
  });

  console.log(products);
  return (
    <section className='mt-4'>
      <h1 className='text-3xl md:text-4xl font-bold mb-4'>Products</h1>
    </section>
  );
};

export default AdminProductsPage;
