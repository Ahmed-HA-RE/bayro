import { Button } from './components/ui/button';
import Link from 'next/link';
import Error04Illustration from '@/public/svg/errorSVG';

const NotFoundPage = () => {
  return (
    <section>
      <div className='flex min-h-screen flex-col items-center justify-center gap-12 px-8 py-8 sm:py-16 lg:justify-between lg:py-24'>
        <Error04Illustration className='h-[clamp(300px,50vh,600px)]' />

        <div className='text-center'>
          <h4 className='mb-1.5 text-2xl font-semibold'>Page Not Found️ ⚠</h4>
          <p className='mb-5'>
            We couldn&apos;t find the page you are looking for{' '}
          </p>
          <Button size='lg' className='rounded-lg text-base' asChild>
            <Link href='/'>Back to home page</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
