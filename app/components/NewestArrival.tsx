import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const NewestArrival = () => {
  return (
    <section className='py-10'>
      <div className='relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl md:flex-row md:items-center md:justify-between'>
        {/* Pattern overlay */}
        <div className='absolute inset-0 opacity-10'>
          <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern
                id='grid'
                width='20'
                height='20'
                patternUnits='userSpaceOnUse'
              >
                <path
                  d='M 20 0 L 0 0 0 20'
                  fill='none'
                  stroke='white'
                  strokeWidth='1'
                />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>

        {/* Content */}
        <div className='z-10 space-y-3 md:flex-1/2 p-5'>
          <div className='inline-block rounded-lg bg-amber-400 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase'>
            New in Stock
          </div>
          <h2 className='text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl'>
            Nike Pegasus 21{' '}
            <span className='text-amber-400'> Running Shoes</span>
          </h2>
          <p className='max-w-xl text-sm text-gray-300 md:text-base'>
            Discover the newest Nike sneakers engineered for speed, stability,
            and all-day comfort. Fresh designs, bold style—just dropped.
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <Button
              asChild
              className='rounded-md bg-amber-400 px-6 py-2 font-medium transition-all hover:bg-amber-500'
            >
              <Link href={'/products'}>Shop Now</Link>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className='relative z-10 mt-6 h-[300px] md:h-[350px] w-full md:mt-0 md:flex-1/3'>
          <div className='absolute -top-4 -right-4 h-60 w-60 rounded-full bg-amber-400/30  blur-xl'></div>
          <div className='relative h-full md:rounded-l-2xl overflow-hidden'>
            <Image
              src='https://res.cloudinary.com/ahmed--dev/image/upload/v1764752984/bayro/q1f0ykxdhngler3bwcyv.webp'
              width={0}
              height={0}
              sizes='100vw'
              alt='Newest Arrival'
              className='w-full h-full md:rounded-l-2xl object-cover overflow-hidden'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewestArrival;
