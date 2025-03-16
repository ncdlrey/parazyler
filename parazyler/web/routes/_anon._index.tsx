import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import backgroundImage from "@/components/background_hmpg2.png";
import logo from "@/components/unlocked_logo.png";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from "@/components/navbar"

export default function () {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Nav/>
      
      <div className="ml-[7%] mt-[5%] pt-16 relative">
        <img 
          src={logo} 
          alt="UNLOCKED LOGO"
          className="w-32 sm:w-48 md:w-64 lg:w-96 xl:w-[500px]"
        />
    
        <p className="text-white font-mono text-sm sm:text-base md:text-lg lg:text-xl tracking-wide mt-4 sm:mt-6">
          Redefine Independence with Robotics
        </p>
    
        <Link to="/test" className="block mt-4 sm:mt-6">
          <Button 
            size="lg" 
            variant="outline"
            className="font-semibold border-[#12e1b9] text-[#12e1b9] bg-transparent hover:bg-[#12e1b9]/10 hover:text-[#12e1b9] text-base sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-md h-10 sm:h-12 lg:h-16 w-32 sm:w-40 lg:w-52 font-bold tracking-wider"
          >
            SEE IT WORK
          </Button>
        </Link>
        
        <p className="text-white font-mono text-xs sm:text-sm tracking-wide mt-20 sm:mt-32">
          2025 CuHacking Challenge
        </p>
      </div>
    </div>
  );
}