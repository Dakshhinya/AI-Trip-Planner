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
    <div className='p-10 md:px-20 xl:px-56'>
      {/* Information Section  */}
      <InfoSection trip={trip}/>
      {/* Recommended Hotels  */}
      {trip && Object.keys(trip).length > 0 ? (
      <Hotels trip={trip} />
    ) : (
      <p>Loading...</p>
    )}
      {/* dailyPlan  */}
      <PlacesToVisit trip={trip}/>
    </div>
  )
}

export default Viewtrip