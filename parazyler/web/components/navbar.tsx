import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Menu, X } from "lucide-react"; 
import logo from "@/components/toopee.png"; 
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isLine, setIsLine] = useState(false);
  useEffect(() => {
    if(location.pathname === "/mission") {
      setIsLine(true);
    } else {
      setIsLine(false);
    }
  })
  return (
    <nav className="text-white w-full z-30">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <img src={logo} className="h-14 hidden sm:block" alt="Logo" />
        {isLine && (<hr className="w-[30%] hidden lg:block"></hr>)}
        <div className="hidden md:flex gap-8 font-semibold text-lg">
          <Link to="/mission" className="hover:text-gray-300">MISSION</Link>
          <Link to="/technology" className="hover:text-gray-300">TECHNOLOGY</Link>
          <Link to="/team" className="hover:text-gray-300">OUR TEAM</Link>
          <Link to="/" className="hover:text-gray-300">HOME</Link>
        </div>
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full flex flex-col items-center gap-4 py-4 bg-[#070d29] text-white z-30">
          <Link to="/mission" className="hover:text-gray-300 py-2">MISSION</Link>
          <Link to="/technology" className="hover:text-gray-300 py-2">TECHNOLOGY</Link>
          <Link to="/team" className="hover:text-gray-300 py-2">OUR TEAM</Link>
          <Link to="/" className="hover:text-gray-300 py-2">HOME</Link>
        </div>
      )}
    </nav>
  );
}
