  
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
      <div>
          <img src={photoUrl?photoUrl:'/globe.jpg'} className='h-[340px] w-full object-cover rounded'/>
          
          <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
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
      </div>
    )
  }

  export default InfoSection