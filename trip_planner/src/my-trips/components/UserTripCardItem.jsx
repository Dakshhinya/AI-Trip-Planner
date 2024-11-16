import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


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
            <Link to={'/view-trip/' + trip?.id}>
                <div className="relative group hover:scale-105 transition-transform p-4 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer overflow-hidden">
                    
                    {/* Image Section */}
                    <img 
                        src={photoUrl ? photoUrl : '/globe.jpg'} 
                        alt="Trip Image"
                        className="rounded-t-xl h-[220px] w-full object-cover"
                    />
    
                    {/* Main Content Section */}
                    <div className="p-4">
                        <h2 className="font-semibold text-xl text-gray-800">
                            {trip?.userSelection?.location?.label}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {trip?.userSelection?.noOfDays} Days Trip with a Budget of {trip?.userSelection?.budget}
                        </p>
                    </div>
    
                    {/* Hover Popup Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center p-6 text-white space-y-2">
                            <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                            <p className="text-sm">{trip?.userSelection?.description || 'Explore the best spots and enjoy your stay.'}</p>
                            <p className="text-sm">⭐ Rating: {trip?.userSelection?.rating || '4.5'}</p>
                            <p className="text-sm">💲 Budget: {trip?.userSelection?.budget}</p>
                            <p className="text-sm">📅 Duration: {trip?.userSelection?.noOfDays} Days</p>
                        </div>
                    </div>
    
                </div>
            </Link>
        );
        
}

export default UserTripCardItem