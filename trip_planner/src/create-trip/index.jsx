import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions } from '@/constants/options';
import { SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';

const CreateTrip = () => {
  const [place, setPlace] = useState();

  return (
    <>
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Share with us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className='mt-20 flex flex-col gap-10'>
          <div>
            <h2 className='text-xl my-3 font-medium'>What is your choice of destination?</h2>
            {/* 
            <GooglePlacesAutocomplete
              apiKey={importmeta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v) }
              }}
            /> 
            */}
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>How many days do you prefer?</h2>
            <Input placeholder={'Ex.3'} type="number" />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>Budget💴</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow'>
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
                <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow'>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  <h2 className='text-sm text-gray-500'>{item.people}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Align the button to the right */}
        <div className='flex justify-end my-10'>
          <Button>Generate Trip</Button>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;
