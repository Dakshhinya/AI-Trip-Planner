import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative flex justify-center items-center min-h-[90vh] bg-gradient-to-b from-[#E0EAFC] to-[#CFDEF3]">
      {/* Full Cover Background Image */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        <img
          src="/bg3.jpg"
          alt="Hero Background"
          className="w-full h-screen object-cover shadow-xl"
        />
      </div>
  
      {/* Text Content with Animation */}
      <div className="relative z-10 flex flex-col items-end max-w-2xl mx-8 sm:mx-16 lg:mx-32 absolute top-[-5%] right-0 mt-[75px] mr-5 text-shadow-lg">
        {/* Headings with Animation */}
        <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-right text-[#f5e6b3] drop-shadow-lg leading-tight animate-slide-in">
          <span className="text-[rgb(113,226,230)]">Discover Your Next Adventure with AI:</span> <br />
          <span className="text-[hsl(120,14%,96%)]">Personalized Itineraries at Your Fingertips</span>
        </h1>
  
        <p className="font-bold text-md sm:text-lg text-[rgb(218,222,220)] text-right mt-2 mb-4 drop-shadow-md animate-fade-in">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
  
        {/* Call to Action Button */}
        <Link to="/create-trip">
          <button className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[#5ba3d9] to-[#457b9d] text-white 
            hover:from-[#457b9d] hover:to-[#5ba3d9] transition-all duration-300 hover:shadow-[0_0_10px_rgba(69,123,157,0.6)] shadow-lg">
            Let's Get Started
          </button>
        </Link>
      </div>
    </div>
);

}

export default Hero

