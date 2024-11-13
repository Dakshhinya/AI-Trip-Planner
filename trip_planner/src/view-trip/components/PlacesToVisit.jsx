import React from 'react';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg">{item.day}</h2>
            {item.plan.map((place, idx) => (
              <div key={idx}>
                <h2 className="font-medium text-sm text-orange-600">{place.time}</h2>
                <h2>{place.placeName}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
