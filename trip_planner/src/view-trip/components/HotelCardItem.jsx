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
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <div className='relative group hover:scale-105 transform transition-all duration-300 cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white'>

                {/* Hotel Image */}
                <img 
                    src={photoUrl ? photoUrl : '/globe.jpg'} 
                    alt='hotel' 
                    className='h-[180px] w-full object-cover' 
                />
                
                {/* Hotel Information */}
                <div className='p-4 space-y-2'>
                    <h2 className='text-lg font-semibold text-gray-800 truncate'>{hotel?.hotelName}</h2>
                    <p className='text-sm text-gray-500 flex items-center'>
                        📍 <span className='ml-1'>{hotel?.hotelAddress}</span>
                    </p>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium text-green-600'>💲 {hotel?.price}</span>
                        <span className='text-sm text-yellow-500'>⭐ {hotel?.rating}</span>
                    </div>
                </div>

                {/* Hover Popup Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-6 text-white space-y-2">
                        <h2 className="font-bold text-lg">{hotel?.hotelName}</h2>
                        <p className="text-sm">{hotel?.hotelDescription || 'Enjoy a relaxing stay with top amenities.'}</p>
                        <p className="text-sm">⭐ Rating: {hotel?.rating}</p>
                        <p className="text-sm">💲 Price: {hotel?.price}</p>
                        <p className="text-sm">📍 Address: {hotel?.hotelAddress}</p>
                    </div>
                </div>

            </div>
        </Link>
    );
};


export default HotelCardItem
