import React from 'react'
import { Link } from 'react-router-dom';


function UserTripCardItem({trip}) {
    console.log(trip);
        return (
            <Link to={'/view-trip/' + trip?.id}>
                <div className="relative group hover:scale-105 transition-transform p-4 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer overflow-hidden">
                    
                    <img 
                        src={trip?.tripImage || '/globe.jpg'} 
                        alt="Trip Image"
                        className="rounded-t-xl h-[220px] w-full object-cover"
                    />
                    <div className="p-4">
                        <h2 className="font-semibold text-xl text-gray-800">
                            {trip?.userSelection?.location?.label}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {trip?.userSelection?.noOfDays} Days Trip with a Budget of {trip?.userSelection?.budget}
                        </p>
                    </div>
    
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