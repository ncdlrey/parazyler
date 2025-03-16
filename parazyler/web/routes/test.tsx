import { api } from "../api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import backgroundImage from "@/components/speak_now.png";


import { Mic } from "lucide-react"

export default function KabirSucks() {
    const [transcription, setTranscription] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [command0, setCommando] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(5);
    
    const handleStartRecording = () => {
      setCommando(true); // Set commando to true when button is clicked
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks:Blob[] = [];
          
          mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
          };
          
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType });
            const formData = new FormData();
            formData.append('audio', audioBlob);
            
            setIsLoading(true);
            fetch('/text', {
              method: 'POST',
              body: formData,
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to transcribe audio');
              }
              return response.json();
            })
            .then(data => {
              console.log('Transcription:', data.transcription);
              setTranscription(data.transcription);
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Error:', error);
              setError(error.message || 'Failed to transcribe audio');
              setIsLoading(false);
            });
          };
          
          mediaRecorder.start();
          setIsRecording(true);
          setError("");
          
          setTimeout(() => {
            mediaRecorder.stop();
            setIsRecording(false);
          }, 5000);
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
          setError('Failed to access microphone. Please make sure you have granted permission.');
        });
  };

  // useEffect(() => {
  //   if (navigator.mediaDevices) {
  //     handleStartRecording();
  //   }
  // });
  
  useEffect(() => {
    let timer: number;
    
    if (isRecording) {
      setTimeRemaining(5);
      timer = window.setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTimeRemaining(5);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);
  //   const [messages, setMessages] = useState([]);
  // const [command, setCommand] = useState('');

  // useEffect(() => {
  //   const socket = new WebSocket('ws://<your-pi-ip>:8080');//need to change

  //   socket.onopen = () => {
  //     console.log('WebSocket connected');
  //   };

  //   socket.onmessage = (event) => {
  //     console.log('Message from server:', event.data);
  //     // setMessages(prevMessages => [...prevMessages, event.data]);
  //   };

  //   socket.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   socket.onclose = () => {
  //     console.log('WebSocket closed');
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // const sendCommand = () => {
  //   const socket = new WebSocket('ws://<your-pi-ip>:8080');//set
  //   socket.onopen = () => {
  //     socket.send(command);
  //     console.log(`Sent command: ${command}`);
  //   };
  // };
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
      className= "relative h-screen"
      >
      <div 
        className="flex gap-8 font-semibold text-white text-lg tracking-wide"
        style={{
          position: 'absolute',
          top: '32px',
          right: '64px',
        }}
      >
        <Link to="/mission" className="cursor-pointer hover:text-white/80 transition-colors">MISSION</Link>
        <Link to="/technology" className="cursor-pointer hover:text-white/80 transition-colors">TECHNOLOGY</Link>
        <Link to="/team" className="cursor-pointer hover:text-white/80 transition-colors">OUR TEAM</Link>
        <Link to="/" className="cursor-pointer hover:text-white/80 transition-colors">HOME</Link>
        
      </div>
      
      {/* Microphone button in fixed position at center */}
      <div 
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Button
          onClick={handleStartRecording}
          disabled={isRecording || isLoading}
          className={`w-56 h-56 rounded-full ${command0 ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          {isLoading && (<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>)}
          {!isLoading && (<Mic style={{ width: '32px', height: '32px' }}></Mic>)}
        </Button>
        {isRecording && (
          <div className="text-white text-center mt-4 text-sm opacity-80">
            Recording... {timeRemaining} seconds remaining
          </div>
        )}
      </div>
      
      {/* Error message in fixed position */}
      {error && (
        <div 
          style={{
            position: 'absolute',
            top: '65%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            maxWidth: '90%'
          }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" 
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Transcription in fixed position */}
      {transcription && !isLoading && !error && (
        <div 
          style={{
            position: 'absolute',
            top: '75%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            maxWidth: '90%'
          }}
          className="mt-4"
        >
          <h3 className="text-lg font-medium mb-2 text-white">Transcription:</h3>
          <div className="p-4 bg-gray-100 rounded-lg text-gray-800 max-h-[200px] overflow-y-auto">
            {transcription}
          </div>
        </div>
      )}
    </div>
  );
}
