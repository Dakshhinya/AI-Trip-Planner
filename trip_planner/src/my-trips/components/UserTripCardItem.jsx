import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React from 'react'
import { useState,useEffect } from 'react';


function UserTripCardItem({trip}) {
    const[photoUrl,setPhotoUrl]=useState();
    const [placeData, setPlaceData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (trip) {
          getPlacePhoto();
      }
  }, [trip]);

   const getPlacePhoto = async () => {
        try {
            if (!trip?.userSelection?.location?.label) {
                throw new Error("Location label is missing");
            }

            const data = {
                textQuery: trip.userSelection.location.label  
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
    <div>
        <img src={photoUrl?photoUrl:'/globe.jpg'} 
        className='object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days Trip With {trip.userSelection?.budget} Budget</h2>
        </div>
    </div>
  )
}

export default UserTripCardItem