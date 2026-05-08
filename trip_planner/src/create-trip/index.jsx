import { useEffect, useState } from 'react';
import LocationInput from '@/components/custom/LocationInput';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTrip } from '@/service/AIModal';
import {Dialog,DialogContent,DialogDescription,DialogHeader} from "@/components/ui/dialog";
import { BsGoogle } from "react-icons/bs";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { saveTrip } from '@/service/api';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    location: '',
    noOfDays: '',
    budget: '',
    traveller: '',
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`)
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch(() => toast.error("Login failed"));
  };

  const login = useGoogleLogin({
    onSuccess: GetUserProfile,
    onError: () => setOpenDialog(true)
  });

  const handleGenerateClick = () => {
    const { location, noOfDays, budget, traveller } = formData;

   if (
  !formData.location?.label ||
  !formData.noOfDays ||
  !formData.budget ||
  !formData.traveller
) {
  toast("Please fill all details!");
  return;
}

    const user = localStorage.getItem('user');
    if (!user) setOpenDialog(true);
    else OnGenerateTrip();
  };


  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) return;

    setLoading(true);

  const FINAL_PROMPT = `
You are a JSON generator ONLY.
Generate a travel plan for ${formData.noOfDays} days to ${formData.location.label}.

Requirements:
- Generate EXACTLY ${formData.noOfDays} itinerary days
- Generate EXACTLY ${formData.noOfDays} hotel recommendations
- Each day must contain minimum 2 places
- Return ONLY valid JSON
- Do not include markdown
- Do not skip any day


STRICT RULES:
- Output ONLY valid JSON
- No markdown, no backticks
- All strings must be single line
- Escape quotes properly
- No comments
- No trailing commas

Return EXACT schema:

{
  "hotelOptions": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "rating": "string",
      "hotelImageUrl": "string (must be real image URL from Unsplash)"
    }
  ],
  "itinerary": [
    {
      "day": number,
      "plan": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "placeImageUrl": "string (Unsplash URL only)",
          "time": "string",
          "rating":"string",
          "price":"string"
        }
      ]
    }
  ]
}
`;
try {
  const responseText = await generateTrip(FINAL_PROMPT);
  console.log("RAW AI RESPONSE:", responseText);
  SaveAiTrip(responseText);
} catch (error) {
  toast.error("AI Generation Failed");
  setLoading(false);
}
};

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    let parsedData;

   const cleanJson = (text) => {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("JSON parsing failed", err);
    return null;
  }
};

parsedData = cleanJson(TripData);

if (!parsedData) {
  toast.error("AI returned invalid JSON");
  return;
}

    try {
      await saveTrip({
        userSelection: formData,
        tripData: parsedData,
        userEmail: user?.email,
        id: docId,

        tripImage:
          parsedData?.itinerary?.[0]?.plan?.[0]?.placeImageUrl ||
          parsedData?.hotelOptions?.[0]?.hotelImageUrl ||
          '/globe.jpg'
      });
      console.log("TRIP SAVED");
      navigate(`/view-trip/${docId}`);
      toast('Trip Created Successfully!')

    } catch (err) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="relative min-h-screen flex justify-center items-center px-5">
        <div className="absolute inset-0 bg-cover bg-center  w-full" style={{ backgroundImage: `url('bg2.jpg')`, filter: 'blur(8px) brightness(0.7)' }}></div>
    
        <div className="relative bg-white/30 backdrop-blur-lg p-6 shadow-lg rounded-lg border border-white/20 z-10  max-w-[900px] h-[700px] mx-5 flex flex-col justify-between">
        <h2 className="font-bold text-3xl text-blue-950 text-center mt-3">Travel Preferences</h2>
          <p className="mt-1 text-gray-700 text-lg text-center">
            Plan your trip Destination and stuffs!!
          </p>
    
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-blue-950 mb-1">Destination</h2>
              <LocationInput
                onSelect={(v) => handleInputChange('location', v)}
              />
            </div>
    
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
    
          <div className="flex justify-end mt-6">
            <Button 
              disabled={loading}
              onClick={handleGenerateClick}
              className="bg-blue-950 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors mb-8">
              {loading ? (
                <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
              ) : (
                'Generate Trip'
              )}
            </Button>
          </div>
    
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
        </div> 
      </div>
    );
};

export default CreateTrip;