'use client';

import { useState } from 'react';
import { Mail, XIcon } from 'lucide-react';

import { Button } from '@/app/components/ui/button';

const VerifyEmailBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className='dark bg-red-600 px-4 py-3 text-foreground md:py-2'>
      <div className='flex gap-2 md:items-center'>
        <div className='flex grow gap-3 md:items-center'>
          <Mail
            className='shrink-0 opacity-90 max-md:mt-0.5'
            size={16}
            aria-hidden='true'
          />
          <div className='flex grow flex-col justify-between gap-3 md:flex-row md:items-center'>
            <p className='text-sm'>
              Your account is almost ready! Check your email to verify your
              address and complete your setup.
            </p>
            <div className='flex gap-2 max-md:flex-wrap'>
              <Button size='sm' className='text-sm'>
                Verify Email
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant='ghost'
          className='group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent'
          onClick={() => setIsVisible(false)}
          aria-label='Close banner'
        >
          <XIcon
            size={16}
            className='opacity-80 transition-opacity group-hover:opacity-100'
            aria-hidden='true'
          />
        </Button>
      </div>
    </div>
  );
};
export default VerifyEmailBanner;
