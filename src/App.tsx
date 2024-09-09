// import { useState } from "react";
// import {
//   CallControls,
//   CallingState,
//   SpeakerLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
//   User,
//   Call,
// } from "@stream-io/video-react-sdk";

// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import "./style.css";

// const apiKey = "fzy3kzvgb5v8";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGhydXYifQ.AJEljoY4wQEoCvjQFTOr0etQaUES86ijXO4Bm13K6M4";
// const callId = "IAUuqCKFWbMz";

// export default function App() {
//   const [name, setName] = useState("");
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const [call, setCall] = useState<Call | null>(null);

//   const handleJoinCall = async () => {
//     if (name.trim()) {
//       const user: User = {
//         id: "Dhruv", // You can dynamically generate or retrieve the ID as well
//         name,
//         image: `https://getstream.io/random_svg/?id=${name.toLowerCase()}&name=${name}`,
//       };

//       const client = new StreamVideoClient({ apiKey, user, token });
//       const call = client.call("default", callId);

//       try {
//         await call.join({ create: true });
//         setClient(client);
//         setCall(call);
//       } catch (error) {
//         console.error("Error joining the call:", error);
//       }
//     } else {
//       alert("Please enter your name.");
//     }
//   };

//   if (!client || !call) {
//     return (
//       <div>
//         <h2>Join the Call</h2>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button onClick={handleJoinCall}>Join Call</button>
//       </div>
//     );
//   }

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyUILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <SpeakerLayout participantsBarPosition="bottom" />
//       <CallControls />
//     </StreamTheme>
//   );
// };

import React, { useState } from "react";
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
import SplashScreen from "./component/SplashScreen";
import ThankYouScreen from "./component/ThankYouScreen";

const apiKey = "fzy3kzvgb5v8";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGhydXYifQ.AJEljoY4wQEoCvjQFTOr0etQaUES86ijXO4Bm13K6M4";
const callId = "IAUuqCKFWbMz";

const App: React.FC = () => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleJoinCall = async (name: string) => {
    const user: User = {
      id: "Dhruv",
      name,
      image: `https://getstream.io/random_svg/?id=${name.toLowerCase()}&name=${name}`,
    };

    const client = new StreamVideoClient({ apiKey, user, token });
    const call = client.call("default", callId);

    try {
      await call.join({ create: true });
      setClient(client);
      setCall(call);
      setLoading(false); // Hide splash screen once loading is done
    } catch (error) {
      console.error("Error joining the call:", error);
    }
  };

  if (loading) {
    return <SplashScreen onJoinCall={handleJoinCall} />;
  }

  if (!client || !call) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const MyUILayout: React.FC = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <ThankYouScreen />;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

export default App;
