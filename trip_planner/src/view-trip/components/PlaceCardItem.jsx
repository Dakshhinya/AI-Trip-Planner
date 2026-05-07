import React from 'react'
import { Link } from 'react-router-dom';
function PlaceCardItem({place}){


    return (
        <Link to={'https://www.openstreetmap.org/search?query=' + place.placeName} target='_blank'>
            <div className='relative group border rounded-2xl p-4 mt-2 flex gap-5 hover:scale-105 transition-transform hover:shadow-lg cursor-pointer bg-white overflow-hidden'>
                <img 
                    src={place?.placeImageUrl || '/globe.jpg'} 
                    onError={(e) => (e.target.src = '/globe.jpg')}
                    className='h-[130px] w-[130px] rounded-xl object-cover' 
                    alt={place.placeName}
                />
    
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