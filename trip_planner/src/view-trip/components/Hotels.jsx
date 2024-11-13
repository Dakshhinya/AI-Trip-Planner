import React from 'react';

function Hotels({ trip }) {
    console.log(trip?.tripData?.hotels);
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'> Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((item, index) => (
          <div>
            <img src='/globe.jpg' alt='image' className='rounded-xl' />
            <div>
                {/* <h2>{hotel.hotelName}</h2> */}
             </div>
          </div>

        ))
        }
      </div>
    </div>
  );
}

export default Hotels;
