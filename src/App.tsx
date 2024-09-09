import { useState } from "react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
  Call,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./style.css";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0NoZXdiYWNjYSIsInVzZXJfaWQiOiJDaGV3YmFjY2EiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTcyNTg2NTg5NCwiZXhwIjoxNzI2NDcwNjk0fQ.r378E6c8xduFN201mIL5tXdK4MxqqwJ2efWaqsF_yYM";
const callId = "IAUuqCKFWbMz";

export default function App() {
  const [name, setName] = useState("");
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  const handleJoinCall = async () => {
    if (name.trim()) {
      const user: User = {
        id: "Chewbacca", // You can dynamically generate or retrieve the ID as well
        name,
        image: `https://getstream.io/random_svg/?id=${name.toLowerCase()}&name=${name}`,
      };

      const client = new StreamVideoClient({ apiKey, user, token });
      const call = client.call("default", callId);

      try {
        await call.join({ create: true });
        setClient(client);
        setCall(call);
      } catch (error) {
        console.error("Error joining the call:", error);
      }
    } else {
      alert("Please enter your name.");
    }
  };

  if (!client || !call) {
    return (
      <div>
        <h2>Join the Call</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleJoinCall}>Join Call</button>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
