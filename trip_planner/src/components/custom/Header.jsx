import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='p-3 shadow-lg flex justify-between items-center'>
        <div  className='flex items-center space-x-2'>
        <img src='/logo.svg'/>
        <h2 className='text-xl font-semibold'>RoamRight</h2>
        </div>
        <div className=''>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header