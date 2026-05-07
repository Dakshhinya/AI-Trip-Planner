import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem(props) {
    // Removed Google Place Details fetching

    const img =
  props.hotelImageUrl ||
  props.imageUrl ||
  `https://source.unsplash.com/400x300/?hotel,${props.hotelName}`;



    return (
        <Link to={'https://www.openstreetmap.org/search?query=' + props.hotelName + ',' + props?.hotelAddress} target='_blank'>
            <div className='relative group hover:scale-105 transform transition-all duration-300 cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white'>

                {/* Hotel Image */}
                <img
                    src={img}
                    onError={(e) => {
                        e.target.src =
                        `https://source.unsplash.com/400x300/?hotel,${props.hotelName}`;
                    }}
                    className="h-[180px] w-full object-cover"
/>
                    
                {/* Hotel Information */}
                <div className='p-4 space-y-2'>
                    <h2 className='text-lg font-semibold text-gray-800 truncate'>{props?.hotelName}</h2>
                    <p className='text-sm text-gray-500 flex items-center'>
                        📍 <span className='ml-1'>{props?.hotelAddress}</span>
                    </p>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium text-green-600'>💲 {props?.price}</span>
                        <span className='text-sm text-yellow-500'>⭐ {props?.rating}</span>
                    </div>
                </div>

                {/* Hover Popup Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-6 text-white space-y-2">
                        <h2 className="font-bold text-lg">{props?.hotelName}</h2>
                        <p className="text-sm">{props?.hotelDescription || 'Enjoy a relaxing stay with top amenities.'}</p>
                        <p className="text-sm">⭐ Rating: {props?.rating}</p>
                        <p className="text-sm">💲 Price: {props?.price}</p>
                        <p className="text-sm">📍 Address: {props?.hotelAddress}</p>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default HotelCardItem