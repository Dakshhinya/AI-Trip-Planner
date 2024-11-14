import React from 'react'; 
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  console.log(trip);
  return (
    <div className="p-5">
       <h2 className="font-bold text-lg mb-4">Places To Visit</h2>
      
       {trip.tripData?.itinerary ? (
         <div>
          {trip.tripData.itinerary.map((item, dayIndex) => (
              <div className="mt-5" key={dayIndex}>
                  <h2 className="font-medium text-lg text-gray-400">Day-{item.day}</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                      {item.plan.map((place, placeIndex) => (
                          <div key={placeIndex} className="">
                               <h2 className="font-medium text-sm text-orange-600">{place.time}</h2>
                               <PlaceCardItem place={place} />
                          </div>
                      ))}
                  </div>
              </div>
          ))}
         </div>
       ) : (
         <p className="text-gray-500">No itinerary available for this trip.</p>
       )}
    </div>
  );
}

export default PlacesToVisit;
