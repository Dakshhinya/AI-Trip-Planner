import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';
function Hotels({ trip }) {
    console.log(trip?.tripData?.hotels);
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'> Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
           <HotelCardItem 
              key={index}
              hotelName={hotel.hotelName} 
              hotelAddress={hotel.hotelAddress} 
              price={hotel.price} 
              rating={hotel.rating}
           />
        ))
        }
      </div>
    </div>
  );
}

export default Hotels;
