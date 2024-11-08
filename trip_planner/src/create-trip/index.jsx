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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData.location || !formData.noOfDays || !formData.budget || !formData.traveller) {
      toast("Please enter all details");
      return;
    }

    console.log('Generated Trip:', formData);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };

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
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Not Logged In</DialogTitle>
            <DialogDescription>Please log in to generate a trip plan.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
