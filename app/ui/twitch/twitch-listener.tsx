"use client";

import { useEffect, useState } from "react";
import { fallbackVoice } from "@/app/lib/constants";
import tmi from "tmi.js";
import SamJs from "sam-js";

/*
    This is the main component that connects to Twitch IRC API through tmi-js (https://tmijs.com/).
    This is a child component of sidenav (https://github.com/F-Joubert/twitch-sam/blob/main/app/ui/sidenav.tsx) which is a child component of
    the main layout (https://github.com/F-Joubert/twitch-sam/edit/main/app/layout.tsx). Loading the component on all pages and maintaining connection.
*/

const TwitchChatListener: React.FC = () => {
  /* Initialise the component with no HTML Audio Element */
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  /* These were an attempt to making saving and enabling new voices more responsive, on interaction I load from local storage into these but should just use redux */
  const [savedVoices, setSavedVoices] = useState<{ [key: string]: any }>({});
  const [enabledVoices, setEnabledVoices] = useState<{ [key: string]: boolean }>({});
  
  // const [enabledRedeems, setEnabledRedeems] = useState<{ [key: string]: boolean }>({}); // Don't think we can use channel point redeems with the Twitch IRC API
  const [cheerThreshold, setCheerThreshold] = useState<number>(1); 

  useEffect(() => {
    let saved = localStorage.getItem("voiceSettings");

    if (saved) {
      setSavedVoices(JSON.parse(saved));
    }

    /* Loading saved voices and whether they're enabled from local storage into state */

    let savedEnabledVoices = localStorage.getItem("enabledVoices");

    if (savedEnabledVoices) {
      setEnabledVoices(JSON.parse(savedEnabledVoices));
    }

    // let savedRedeems = localStorage.getItem("redeemSettings"); // Redeems currently don't work

    // if (savedRedeems) {
    //   const parsedRedeems = JSON.parse(savedRedeems);
    //   const enabledRedeems = parsedRedeems.reduce((store: { [key: string]: boolean }, redeem: string) => {
    //     store[redeem] = true;
    //     return store;
    //   }, {});
    //   setEnabledRedeems(enabledRedeems);
    // }

    let savedCheerThreshold = localStorage.getItem("cheerThreshold");

    if (savedCheerThreshold) {
      setCheerThreshold(Number(savedCheerThreshold));
    }
  }, []);

  useEffect(() => {
    const twitchChannel = String(localStorage.getItem("channelName"));

    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [twitchChannel],
    });

    client.connect();

    client.on("message", (channel: string, tags: tmi.ChatUserstate, message: string, self: boolean) => {
      // if (self) return; // This is so the bot doesn't trigger off it's own messages but it doesn't have chat perms so, useless.
      handleMessage(message);
    });

    // client.on("redeem", (channel: string, username: string, rewardType: string, tags: tmi.ChatUserstate) => {
    //   if (enabledRedeems[rewardType]) {
    //     handleMessage();
    //   }
    // });

    client.on("cheer", (channel: string, tags: tmi.ChatUserstate, message: string) => {
      handleMessage(message);
      console.log(message);
    });

    client.on("subscription", (channel: string, username: string, methods: tmi.SubMethods, message: string, tags: tmi.SubUserstate) => {
      handleMessage(message);
      console.log(message);
    });

    client.on("resub", (channel: string, username: string, months: number, message: string, tags: tmi.SubUserstate, methods: tmi.SubMethods) => {
      handleMessage(message);
      console.log(message);
    });

    // client.on("subgift", (channel: string, username: string, streakMonths: number, recipient: string, methods: tmi.SubMethods, tags: tmi.SubGiftUserstate) => {
    //   handleMessage()
    // });

    return () => {
      client.disconnect();
    };
  }, [isAudioEnabled, audioContext, savedVoices, enabledVoices, cheerThreshold]);

  const handleButtonClick = () => {
    const updatedVoices = localStorage.getItem("voiceSettings"); 
    const updatedEnabledVoices = localStorage.getItem("enabledVoices"); // Should move both these to redux

    if (updatedVoices) {
      setSavedVoices(JSON.parse(updatedVoices)); 
    }

    if (updatedEnabledVoices) {
      setSavedVoices(JSON.parse(updatedEnabledVoices));
    }

    if (!audioContext) {
      const context = new AudioContext(); // Modern browsers don't like you creating an audio element without user interaction
      setAudioContext(context);
      setIsAudioEnabled(true);
    } else {
      if (audioContext.state === "suspended") {
        audioContext.resume();
        setIsAudioEnabled(true);
      } else if (audioContext.state === "running") { // This disables the bot but doesn't stop the current message.
        audioContext.suspend();
        setIsAudioEnabled(false);
      }
    };
  };

  const handleMessage = (message: string) => {
    const sanitisedMessage = message.trim().replace(/^cheer\d+\s*/i, ""); // Regex to remove "cheer" followed by numbers and whitespace
    
    let messageContent = "";
    let settingName = "";

    if (sanitisedMessage.includes(":")) {  // Remove everything before first colon and try match it to a saved voice.
      const messageParts = sanitisedMessage.split(":");
      settingName = messageParts[0];
      messageContent = messageParts.slice(1).join(":"); // Currently can't handle more than one voice, so just put rest of users message back together if they attempted to do so
    } else {
      messageContent = sanitisedMessage;
    }
    
    if (isAudioEnabled && audioContext && enabledVoices[settingName] === true) { // If user's message matches a voice, use those settings
      console.log(`${enabledVoices}`)
      speakMessage(`${messageContent}`, savedVoices[settingName]);
    } else if (isAudioEnabled && audioContext) { 
      speakMessage(`${messageContent}`);
    }
  }

  const speakMessage = (message: string, settings?: any) => {
    let defaultVoice

    try {
      defaultVoice = JSON.parse(localStorage.getItem("defaultVoice") || "{}"); // Prefer to use user's saved default over the fallback
    } catch {
      defaultVoice = fallbackVoice;
    }

    if (settings) {
      const sam = new SamJs({ // Recognises a saved voice and contructs voice engine with it's settings.
        speed: settings.speed,
        pitch: settings.pitch,
        mouth: settings.mouth,
        throat: settings.throat,
      });
      sam.speak(message);
    }
    else {
      const sam = new SamJs({   // No voice recognised, default / fallback settings.
        speed: defaultVoice.speed,
        pitch: defaultVoice.pitch,
        mouth: defaultVoice.mouth,
        throat: defaultVoice.throat,
      });
      sam.speak(message);
    }
  };

  return (
    <div>
      <button
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-900 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        onClick={handleButtonClick}>
        {isAudioEnabled ? "Disable Twitch SAM" : "Enable Twitch SAM"}
      </button>
    </div>
  );
};

export default TwitchChatListener;
