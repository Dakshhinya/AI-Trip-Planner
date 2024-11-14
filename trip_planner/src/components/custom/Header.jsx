import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { BsGoogle } from "react-icons/bs";
import axios from 'axios';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.log(error);
      setOpenDialog(false);
    }
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: `Application/json`
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false); // Close the dialog on successful login
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };

  return (
    <div className='p-3 shadow-lg flex justify-between items-center'>
      <div className='flex items-center space-x-2'>
        <img src='/logo.svg' alt="Logo" />
        <h2 className='text-xl font-semibold'>RoamRight</h2>
      </div>
      <div>
        {user ? (
          <div className='flex items-center gap-5'>
            <a href='/create-trip'>
            <Button variant="outline" className='rounded-full'>+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className='rounded-full'>MyTrips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="User Profile" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
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
}

export default Header;
