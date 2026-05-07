import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="p-5">
        <h2 className="font-bold text-lg mb-4">Places To Visit</h2>
        <p className="text-gray-500">No itinerary available for this trip.</p>
      </div>
    );
  }
  const getValidImage = (url) => {
  if (!url || url.includes("example.com")) {
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
  }

  return url;
};

  return (
    <div className="p-5">
      {itinerary.map((item, dayIndex) => {
        const places = item?.plan || item?.activities || [];

        return (
          <div className="mt-6" key={dayIndex}>
            <h2 className="font-medium text-lg text-gray-400 mb-3">
              Day - {item?.day || dayIndex + 1}
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {Array.isArray(places) && places.length > 0 ? (
                places.map((place, placeIndex) => (
                  <div key={placeIndex}>
                    <h2 className="font-medium text-sm text-orange-600 mb-1">
                      {place?.time || "Flexible Time"}
                    </h2>

                    <PlaceCardItem
                      place={{
                        placeName: place?.placeName || place?.name || "Unknown Place",
                        placeDetails: place?.placeDetails || place?.description || "No details available",
                        placeImageUrl: getValidImage(place?.placeImageUrl),
                        geoCoordinates: place?.geoCoordinates || "",
                        ticketPricing: place?.ticketPricing || "N/A",
                        rating: place?.rating || "N/A"
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No places listed for this day.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlacesToVisit;