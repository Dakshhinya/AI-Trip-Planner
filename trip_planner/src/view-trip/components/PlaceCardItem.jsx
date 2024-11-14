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
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:'/globe.jpg'}
        className='h-[130px] w-[130px] rounded-xl object-cover'/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            <h2 className='mt-2'>⭐{place.rating}</h2>
            <h2 className='mt-2'>💲{place.ticketPricing}</h2>
            {/* <Button className='sm mt-2 '><FaMapLocation/></Button> */}
        </div>
    </div>
        </Link>
  )
}

export default PlaceCardItem