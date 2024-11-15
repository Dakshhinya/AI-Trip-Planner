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
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px  mt-10 '>
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {isLoading ? (
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div 
                            key={index} 
                            className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'
                        />
                    ))
                ) : userTrips.length > 0 ? (
                    userTrips.map((trip, index) => (
                        <UserTripCardItem 
                            trip={trip} 
                            key={trip.id || index}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-10">
                        No trips found. Create your first trip!
                    </div>
                )}
        </div> 
    </div>
  )
}

export default MyTrips