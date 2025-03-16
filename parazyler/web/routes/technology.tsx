import { api } from "../api";
import backgroundImage from "@/components/backie.png";
import robotSideImage from "@/components/robot_side.jpg";
import robotArmImage from "@/components/robot_front.jpg";
import robotBuildingImage from "@/components/robot_building.jpg";
import { Link } from "react-router";
import Nav from "@/components/navbar";
import { useState, useEffect } from "react";


export default function () {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { id: 1, src: robotSideImage, label: "Robot Side View" },
    { id: 2, src: robotArmImage, label: "Robot Arm" },
    { id: 3, src: robotBuildingImage, label: "Robot Building" },
  ];

  // Auto cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >

      <Nav/>
      <p className="text-white font-mono text-l tracking-wide"
        style={{
          position: 'absolute',
          top: 'calc(25% + 10px)',
          left: '75px',
          maxWidth: '700px',
          textAlign: 'left',
        }}>
        Thanks to GNX, we integrated a Raspberry Pi to power the robot. It's equipped with essential components, including wheels and motors for mobility, as well as additional motors for a robotic arm designed to assist with lifting objects. Additionally, built-in sensors enable the robot to autonomously follow a black line, enhancing its ability to navigate environments with precision.
      </p>

      <p className="text-white font-mono text-l tracking-wide"
        style={{
          position: 'absolute',
          top: 'calc(25% + 180px)',
          left: '75px',
          maxWidth: '760px',
          textAlign: 'right',
        }}>
       With the support of Gadget, we developed a sleek and intuitive web app that serves as a control dashboard for users. Additionally, leveraging the Hugging Face Interface API, we implemented a voice transcription system, allowing users with limited hand mobility to control the robot seamlessly through verbal commands.
    </p>

      <div className="absolute right-0 top-30 w-1/3 h-3/5 flex flex-col items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                index === currentImage ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="w-4/5 h-4/5 bg-gray-800 bg-opacity-60 flex items-center justify-center border border-gray-600 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.label}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center", 
                    transform: "scale(1.05)",
                  }}
                />
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImage ? "bg-white" : "bg-gray-500"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75"
            onClick={prevImage}
          >
            &#10094;
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      </div>
      
    <div className="flex fixed bottom-0 left-0 w-full p-10">
      <div>
        <h1 className="text-5xl">UNDERLYING</h1>
        <h1 className="text-7xl font-extrabold">TECHNOLOGY</h1>
      </div>
      <hr className="border-t border-white w-full ml-4 self-end mb-8"></hr>
    </div>
      
    </div>
  );
}
