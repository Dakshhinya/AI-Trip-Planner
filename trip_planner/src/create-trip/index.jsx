import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_PROMPT } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { BsGoogle } from "react-icons/bs";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { CgSearchLoading } from "react-icons/cg";
import { setDoc,doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
const CreateTrip = () => {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({
    location: '',
    noOfDays: '',
    budget: '',
    traveller: '',
  });

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setLoading]=useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log(formData);
  }, [formData]);

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: `Application/json`
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
      
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.log(error);
      setOpenDialog(false);
    }
  });

  const OnGenerateTrip = async () => {


    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData.noOfDays || !formData.location || !formData.budget || !formData.traveller) {
      toast("Please fill all details!");
      return;
    }

    console.log('Generated Trip:', formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget);


    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response
        ? await result.response.text()
        : await result.text();
  
      console.log(responseText);
      setLoading(false);
      SaveAiTrip(responseText)
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const SaveAiTrip=async(TripData)=>{

setLoading(true);
const user=JSON.parse(localStorage.getItem('user'));
const docId=Date.now().toString()
await setDoc(doc(db, "AITrips", docId), {
  userSelection:formData,
  tripData:TripData,
  userEmail:user?.email,
  id:docId
});
setLoading(false);
  }
  useEffect(() => {
    console.log("Dialog open state:", openDialog);
  }, [openDialog]);

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Share with us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-18 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your choice of destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days do you prefer?</h2>
          <Input
            id="noOfDays"
            name="noOfDays"
            placeholder="Ex.3"
            type="number"
            value={formData.noOfDays}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Budget💴</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData.budget === item.title && 'shadow-lg border-black'}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className='text-xl my-3 font-medium'>Travelling with?🌴</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveller', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData.traveller === item.people && 'shadow-lg border-black'}`}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className='flex justify-end my-10'>
        <Button 
        disabled={loading}
        onClick={() => setOpenDialog(true)}>
          {loading?
        <CgSearchLoading className='h-7 w-7 animate-spin' />:'Generate Trip'

          }
          </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center space-x-3"> 
                <img src="/logo.svg" alt="Logo" />
                <h2 className="text-xl font-semibold">RoamRight</h2>
              </div>
              
              <h2 className="font-bold text-lg mt-7 mb-3">Sign In with Google</h2>
              <p className="mb-4">Sign in to the app securely with Google authentication</p>
              <Button 
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                  
                <BsGoogle className="h-7 w-7" />
                Sign In with Google
             
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
