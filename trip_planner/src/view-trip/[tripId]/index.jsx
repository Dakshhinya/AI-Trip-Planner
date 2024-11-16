import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';

function Viewtrip() {
  const {tripId}=useParams()
  const[trip,setTrip]=useState([])
useEffect(()=>{
    tripId&&GetTripData()
},[tripId])

  const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:",docSnap.data())
      setTrip(docSnap.data())
      console.log(trip);
      // setTrip(4);
    }else{
      console.log("No Such Document")
      toast('No Trip Found!')
    }
  };
  return (
    <div className='p-10 md:px-20 xl:px-56 bg-gray-50 min-h-screen'>
        
        {/* Curved Edge Container for Information Section */}
        <div className='bg-gray-100 shadow-md rounded-3xl p-6'>
            <InfoSection trip={trip} />
        </div>

        {/* Recommended Hotels */}
        {trip && Object.keys(trip).length > 0 ? (
            <div className='mt-10 bg-gray-100 shadow-md rounded-3xl p-6'>
                <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Recommended Hotels</h3>
                <Hotels trip={trip} />
            </div>
        ) : (
            <p className='text-center text-gray-500 mt-4'>Loading...</p>
        )}

        {/* Places to Visit */}
        <div className='mt-10 bg-gray-100 shadow-md rounded-3xl p-6'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Places to Visit</h3>
            <PlacesToVisit trip={trip} />
        </div>

        {/* Footer */}
        {/* <Footer trip={trip} /> */}
    </div>
);

}

export default Viewtrip