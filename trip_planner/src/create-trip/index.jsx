  import  { useEffect, useState } from 'react';
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
  import { AiOutlineLoading3Quarters } from "react-icons/ai";
  import { setDoc,doc } from 'firebase/firestore';
  import { db } from '@/service/firebaseConfig';
  import { useNavigate } from 'react-router-dom';
  
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
    
    const navigate=useNavigate();
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
        setOpenDialog(true);
      }
    });

    const handleGenerateClick = () => {
      if (!formData.noOfDays || !formData.location || !formData.budget || !formData.traveller) {
        toast("Please fill all details!");
        return;
      }

      const user = localStorage.getItem('user');
      if (!user) {
        setOpenDialog(true);
      }else {
        OnGenerateTrip();
      }

      if (!formData.noOfDays || !formData.location || !formData.budget || !formData.traveller) {
        toast("Please fill all details!");
        return;
      }
    };

  const OnGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
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
  // let tripDataObject;
  try {
    // tripDataObject = JSON.parse(TripData);
  } catch (error) {
    console.error("Invalid JSON format:", error);
    toast.error("Error: Trip data is not in the correct format.");
    setLoading(false);
    return;
  }
  await setDoc(doc(db, "AITrips", docId), {
    userSelection:formData,
    tripData:JSON.parse(TripData),
    userEmail:user?.email,
    id:docId
  });
  setLoading(false);
  navigate('/view-trip/'+docId)
    }
    useEffect(() => {
      console.log("Dialog open state:", openDialog);
    }, [openDialog]);

    return (
      <div className="relative min-h-screen flex justify-center items-center px-5">
        {/* Full-page Background Image */}
        <div className="absolute inset-0 bg-cover bg-center  w-full" style={{ backgroundImage: `url('bg2.jpg')`, filter: 'blur(8px) brightness(0.7)' }}></div>
    
        {/* Glass Container */}
        <div className="relative bg-white/30 backdrop-blur-lg p-6 shadow-lg rounded-lg border border-white/20 z-10  max-w-[900px] h-[700px] mx-5 flex flex-col justify-between">
        <h2 className="font-bold text-3xl text-blue-950 text-center mt-3">Travel Preferences</h2>
          <p className="mt-1 text-gray-700 text-lg text-center">
            Plan your trip Destination and stuffs!!
          </p>
    
          <div className="mt-6 flex flex-col gap-6">
            {/* Destination Input */}
            <div>
              <h2 className="text-lg font-semibold text-blue-950 mb-1">Destination</h2>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => { setPlace(v); handleInputChange('location', v); }
                }}
              />
            </div>
    
            {/* Duration Input */}
            <div>
              <h2 className="text-lg font-semibold text-blue-950 mb-1">Preferred Duration (Days)</h2>
              <Input
                id="noOfDays"
                name="noOfDays"
                placeholder="E.g., 3"
                type="number"
                value={formData.noOfDays}
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                onWheel={(e) => e.target.blur()}
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
    
            {/* Budget Options */}
            <div>
              <h2 className="text-lg font-semibold text-blue-950 mb-1">Select Budget</h2>
              <div className="grid grid-cols-3 gap-4">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-transform transform hover:scale-105 hover:bg-blue-100 
                      ${formData.budget === item.title ? 'bg-blue-50 border-blue-400' : 'border-gray-200'}`}
                  >
                    <h2 className="text-base font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Travel Companions */}
            <div>
              <h2 className="text-lg font-semibold text-blue-950 mb-1">Travel Companions</h2>
              <div className="grid grid-cols-3 gap-4">
                {SelectTravelsList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('traveller', item.people)}
                    className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-transform transform hover:scale-105 hover:bg-blue-100 
                      ${formData.traveller === item.people ? 'bg-blue-50 border-blue-400' : 'border-gray-200'}`}
                  >
                    <h2 className="text-base font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/* Generate Trip Button */}
          <div className="flex justify-end mt-6">
            <Button 
              disabled={loading}
              onClick={handleGenerateClick}
              className="bg-blue-950 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors mb-8"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
              ) : (
                'Generate Trip'
              )}
            </Button>
          </div>
    
          {/* Sign In Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <div className="flex items-center space-x-3"> 
                    <img src="/logo.svg" alt="Logo" />
                    <h2 className="text-xl font-semibold text-gray-800">RoamRight</h2>
                  </div>
                  
                  <h2 className="font-bold text-lg mt-6 mb-3 text-gray-800">Sign In with Google</h2>
                  <p className="mb-4 text-gray-600">Sign in to the app securely with Google authentication</p>
                  <Button 
                    onClick={login}
                    className="w-full mt-4 flex gap-4 items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                  >
                    <BsGoogle className="h-6 w-6" />
                    Sign In with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div> {/* End of glass container */}
      </div>
    );
    
  };

  export default CreateTrip;
