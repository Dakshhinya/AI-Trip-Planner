import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
    console.log("Hotel options data:", trip?.tripData?.hotelOptions);

    // console.log("IMAGE URL:", getHotelImage(hotel?.hotelName));
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'></h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {Array.isArray(trip?.tripData?.hotelOptions) ? trip.tripData.hotelOptions.map((hotel, index) => (
           <HotelCardItem 
            key={index}
            hotelName={hotel?.hotelName}
            hotelAddress={hotel?.hotelAddress}
            price={hotel?.price}
            rating={hotel?.rating}
            hotelImageUrl={hotel?.hotelImageUrl}  
            />)) : <p className="text-red-500">Error: hotel options format is malformed.</p>
        }
      </div>
    </div>
  );
}

export default Hotels;
