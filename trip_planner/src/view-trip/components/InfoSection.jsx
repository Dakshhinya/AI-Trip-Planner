  
import { Button } from '@/components/ui/button';
import React from 'react'
import { IoIosSend } from "react-icons/io";
import MapComponent from '@/components/custom/MapComponent';


function InfoSection({trip}) {

    const lat = trip?.userSelection?.location?.value?.lat;
    const lon = trip?.userSelection?.location?.value?.lon;

    return (
        <div className='relative group'>
            {lat && lon ? (
                <MapComponent lat={lat} lng={lon} label={trip?.userSelection?.location?.label} />
            ) : (
                <img 
                    src='/globe.jpg' 
                    className='h-[340px] w-full object-cover rounded'
                    alt='trip'
                />
            )}
            
            <div className='flex justify-between items-center mt-5 px-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🗓️ {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🍾 No. of Travellers: {trip?.userSelection?.traveller}</h2>
                    </div>
                </div>
                <Button>
                    <IoIosSend />
                </Button>
            </div>
            
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