// SplashScreen.tsx
import React, { useState } from "react";
import "../style.css"; // Add your styles for splash screen here

interface SplashScreenProps {
  onJoinCall: (name: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onJoinCall }) => {
  const [name, setName] = useState<string>("");

  const handleJoinCall = () => {
    if (name.trim()) {
      onJoinCall(name);
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="splash-screen">
      <h1>Welcome to Talkie Wakie</h1>
      <p>Loading your video call experience...</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleJoinCall}>Join Call</button>
    </div>
  );
};

export default SplashScreen;
