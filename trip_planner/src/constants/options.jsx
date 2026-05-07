export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in Exploration',
        icon:'✈️',
        people:'1 person'
    },
    {
        id:2,
        title:'A Couple',
        desc:'tandem travelling',
        icon:'🍻',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A perfect Family gateaway',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'fun and fun only',
        icon:'🎉',
        people:'more than 5'
    }
]
export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay concious of costs',
        icon:'💰'
    },
    {
        id:2,
        title:'Moderate',
        desc:'keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Lavish spender',
        icon:'💰'
    }
]

export const AI_PROMPT = 'Generate a Travel Plan for Location: {location}, for {totalDays} Days, for {traveller}, with a {budget} Budget. Return ONLY a valid JSON object (no extra text) with this EXACT structure: { "hotelOptions": [ { "hotelName": "", "hotelAddress": "", "price": "", "hotelImageUrl": "", "geoCoordinates": "", "rating": "", "description": "" } ], "itinerary": [ { "day": 1, "plan": [ { "placeName": "", "placeDetails": "", "placeImageUrl": "", "geoCoordinates": "", "ticketPricing": "", "rating": "", "time": "" } ] } ] }'