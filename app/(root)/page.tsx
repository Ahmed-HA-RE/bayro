import { getFeaturedProducts } from '@/lib/actions/products';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProductList from '../components/products/ProductList';

const HomePage = async () => {
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <FeaturedCarousel products={featuredProducts} />
      )}
      <ProductList />
    </>
  );
};

export default HomePage;
