  
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect ,useState} from 'react'
import { IoIosSend } from "react-icons/io";

// const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({trip}) {
    
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
        <div className='relative group'>
            {/* Image Section */}
            <img 
                src={photoUrl ? photoUrl : '/globe.jpg'} 
                className='h-[340px] w-full object-cover rounded'
                alt='trip'
            />
            
            {/* Content Section */}
            <div className='flex justify-between items-center mt-5 px-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🗓️ {trip.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🍾 No. of Travellers: {trip.userSelection?.traveller}</h2>
                    </div>
                </div>
                <Button>
                    <IoIosSend />
                </Button>
            </div>
            
            {/* Hover Popup Overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center h-[340px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded'>
                <div className='text-center p-4 text-white'>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <p className='text-sm mt-2'>{trip?.userSelection?.description || 'Enjoy an exciting journey with memorable experiences.'}</p>
                    <p className='text-sm mt-2'>⭐ Rating: {trip?.userSelection?.rating || '4.5'}</p>
                    <p className='text-sm mt-2'>💲 Budget: {trip?.userSelection?.budget}</p>
                    <p className='text-sm mt-2'>📅 {trip?.userSelection?.noOfDays} Days</p>
                </div>
            </div>
        </div>
    );
    
  }

  export default InfoSection