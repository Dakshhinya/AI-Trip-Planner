import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem(hotel) {
    const[photoUrl,setPhotoUrl]=useState();
    const [placeData, setPlaceData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (hotel) {
          getPlacePhoto();
      }
  }, [hotel]);

   const getPlacePhoto = async () => {
        try {
            if (!hotel?.hotelName) {
                throw new Error("Location label is missing");
            }

            const data = {
                textQuery: hotel?.hotelName  
            };

            const response = await GetPlaceDetails(data);
            if (response?.data) {
                setPlaceData(response.data);
                console.log("Place data:", response.data.places[0].photos[3].name);

                const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',response.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl)
            }
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch place details:", err);
        }
    };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel?.hotelAddress} target='_blank'>
          <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photoUrl?photoUrl:'/globe.jpg'} alt='image' className='rounded-xl h-[180px] w-full object-cover'  />
            <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'> 📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm'> 💲 {hotel?.price}</h2>
                <h2 className='text-xs'> ⭐ {hotel?.rating}</h2>
             </div>
          </div>
    </Link>
  )
}

export default HotelCardItem
