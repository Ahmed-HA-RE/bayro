import CartTable from '@/app/components/cart/CartTable';
import { getMyCart } from '@/app/actions/cart';

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <section className='mt-2'>
      <h1 className='text-2xl md:text-3xl font-bold mb-4'>
        Your Shopping Cart
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <CartTable cart={cart} />
      </div>
    </section>
  );
};

export default CartPage;
