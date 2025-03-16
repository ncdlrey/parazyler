import React, { useState, useEffect } from 'react';

export default function WebSocketExample() {
  const [messages, setMessages] = useState([]);
  const [command, setCommand] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://<your-pi-ip>:8080');//need to change

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      // setMessages(prevMessages => [...prevMessages, event.data]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendCommand = () => {
    const socket = new WebSocket('ws://<your-pi-ip>:8080');//set
    socket.onopen = () => {
      socket.send(command);
      console.log(`Sent command: ${command}`);
    };
  };

  return (
    <div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
      />
      <button onClick={sendCommand}>Send Command</button>

      <h3>Messages from Pi:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
