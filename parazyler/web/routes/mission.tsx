import { api } from "../api";
import backgroundImage from "@/components/backie.png";
import { Link } from "react-router";
import Nav from "@/components/navbar"
import { useLocation } from 'react-router-dom';

export default function () {
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
      <p className="text-white font-mono text-xl tracking-wide"
        style={{
          position: 'absolute',
          top: 'calc(25% + 10px)',
          left: '75px',
          maxWidth: '700px',
          textAlign: 'left',
        }}>
        At Unlocked, our mission is to build robots that enhance accessibility for disabled individuals, particularly those who are paralyzed. We are dedicated to developing assistive technology that empowers people to communicate and regain their independence. 
    </p>

      <p className="text-white font-mono text-xl tracking-wide"
        style={{
          position: 'absolute',
          top: 'calc(25% + 200px)',
          right: '96px',
          maxWidth: '750px',
          textAlign: 'right',
        }}>
       By combining robotics and innovative voice solutions, we strive to unlock new possibilities for those whose voices have been silenced, ensuring they can express themselves and navigate the world with greater freedom.
    </p>
    <div className="flex fixed bottom-0 left-0 w-full p-10">
      <div>
        <h1 className="text-5xl">OUR</h1>
        <h1 className="text-7xl font-extrabold">MISSION</h1>
      </div>
      <hr className="border-t border-white w-full ml-4 self-end mb-8"></hr>
    </div>
    </div>
  );
}
