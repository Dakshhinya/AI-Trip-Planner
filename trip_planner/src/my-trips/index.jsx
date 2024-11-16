import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const navigation=useNavigation();
    const [userTrips,setUserTrips]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        GetUserTrips();
    },[])
    const GetUserTrips=async()=>{
        try{
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigation('/');
            return;
        }
        setIsLoading(true); 
        const q = query(
            collection(db, 'AITrips'),
            where('userEmail', '==', user?.email)
        );

        const querySnapshot = await getDocs(q);
        const trips = querySnapshot.docs.map(doc => doc.data());
        setUserTrips(trips);
    } catch (error) {
        console.error("Error fetching trips:", error);
    } finally {
        setIsLoading(false); 
    }
};
return (
    <div className='sm:px-8 md:px-20 lg:px-40 xl:px-56 mt-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen'>
        <h2 className='font-bold text-4xl mb-6 text-gray-800'>My Trips</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {isLoading ? (
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div 
                        key={index} 
                        className='h-[250px] w-full bg-blue-200 animate-pulse rounded-lg'
                        style={{ height: `${230 + (index % 2) * 20}px` }}
                    />
                ))
            ) : userTrips.length > 0 ? (
                userTrips.map((trip, index) => (
                    <UserTripCardItem 
                        trip={trip} 
                        key={trip.id || index} 
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out border border-gray-200"
                    />
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                    <p className="text-lg">No trips found.</p>
                    <button className="mt-4 px-6 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-200">
                        Create Your First Trip
                    </button>
                </div>
            )}
        </div>
    </div>
);

}

export default MyTrips