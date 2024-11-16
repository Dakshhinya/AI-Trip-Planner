import React, { useEffect, useState } from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
function PlaceCardItem({place}){

    const[photoUrl,setPhotoUrl]=useState();
    const [placeData, setPlaceData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (place) {
          getPlacePhoto();
      }
  }, [place]);

   const getPlacePhoto = async () => {
        try {
            if (!place.placeName) {
                throw new Error("Location label is missing");
            }

            const data = {
                textQuery: place.placeName
            };

            const response = await GetPlaceDetails(data);
            if (response?.data) {
                setPlaceData(response.data);
                const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',response.data.places[0].photos[3].name);
                setPhotoUrl(PhotoUrl)
            }
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch place details:", err);
        }
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
            <div className='relative group border rounded-2xl p-4 mt-2 flex gap-5 hover:scale-105 transition-transform hover:shadow-lg cursor-pointer bg-white overflow-hidden'>
                
                {/* Image Section */}
                <img 
                    src={photoUrl ? photoUrl : '/globe.jpg'} 
                    className='h-[130px] w-[130px] rounded-xl object-cover' 
                    alt='place'
                />
    
                {/* Content Section */}
                <div className='flex flex-col justify-between'>
                    <div>
                        <h2 className='font-semibold text-lg text-gray-800'>{place.placeName}</h2>
                        <p className='text-sm text-gray-500 mt-1'>{place.placeDetails}</p>
                    </div>
                    <div className='mt-3'>
                        <h2 className='text-sm text-yellow-500 font-medium'>⭐ {place.rating}</h2>
                        <h2 className='text-sm text-green-600 font-medium mt-1'>💲 {place.ticketPricing}</h2>
                    </div>
                </div>

                {/* Hover Popup Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4 text-white">
                        <h2 className="font-bold text-lg">{place.placeName}</h2>
                        <p className="text-sm mt-2">{place.placeDetails}</p>
                        <p className="text-sm mt-2">⭐ Rating: {place.rating}</p>
                        <p className="text-sm mt-2">💲 Price: {place.ticketPricing}</p>
                    </div>
                </div>

            </div>
        </Link>
    );
};


export default PlaceCardItem