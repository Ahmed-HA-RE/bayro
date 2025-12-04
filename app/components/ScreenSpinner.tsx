'use client';

import { ClipLoader, PulseLoader } from 'react-spinners';
import { RemoveScroll } from 'react-remove-scroll';

const ScreenSpinner = ({ mutate }: { mutate: boolean }) => {
  return (
    <RemoveScroll>
      <div className='fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50'>
        {mutate ? (
          <PulseLoader color='#FFBF00' size={30} margin={10} />
        ) : (
          <ClipLoader
            color='#FFBF00'
            cssOverride={{
              borderWidth: '4px',
            }}
            size={160}
          />
        )}
      </div>
    </RemoveScroll>
  );
};

export default ScreenSpinner;
