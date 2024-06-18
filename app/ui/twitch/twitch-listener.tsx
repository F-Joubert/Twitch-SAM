"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import SamJs from "sam-js";

const TwitchChatListener: React.FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [savedVoices, setSavedVoices] = useState<{ [key: string]: any }>({});
  const [enabledVoices, setEnabledVoices] = useState<{ [key: string]: boolean }>({});
  const [enabledRedeems, setEnabledRedeems] = useState<{ [key: string]: boolean }>({});
  const [cheerThreshold, setCheerThreshold] = useState<number>(100);

  useEffect(() => {
    let saved = localStorage.getItem("voiceSettings");

    if (saved) {
      setSavedVoices(JSON.parse(saved));
    }

    let savedEnabledVoices = localStorage.getItem("enabledVoices");

    if (savedEnabledVoices) {
      setEnabledVoices(JSON.parse(savedEnabledVoices));
    }

    let savedRedeems = localStorage.getItem("redeemSettings");

    if (savedRedeems) {
      const parsedRedeems = JSON.parse(savedRedeems);
      const enabledRedeems = parsedRedeems.reduce((store: { [key: string]: boolean }, redeem: string) => {
        store[redeem] = true;
        return store;
      }, {});
      setEnabledRedeems(enabledRedeems);
    }

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
      if (self) return;
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
  }, [isAudioEnabled, audioContext, savedVoices, enabledVoices, enabledRedeems, cheerThreshold]);

  const handleButtonClick = () => {
    const updatedVoices = localStorage.getItem("voiceSettings");
    const updatedEnabledVoices = localStorage.getItem("enabledVoices");

    if (updatedVoices) {
      setSavedVoices(JSON.parse(updatedVoices));
    }

    if (updatedEnabledVoices) {
      setSavedVoices(JSON.parse(updatedEnabledVoices));
    }

    if (!audioContext) {
      const context = new AudioContext();
      setAudioContext(context);
      setIsAudioEnabled(true);
    } else {
      if (audioContext.state === "suspended") {
        audioContext.resume();
        setIsAudioEnabled(true);
      } else if (audioContext.state === "running") {
        audioContext.suspend();
        setIsAudioEnabled(false);
      }
    };
  };

  const handleMessage = (message: string) => {
    const sanitisedMessage = message.trim().replace(/^cheer\d+\s*/i, ""); // Regex to remove "cheer" followed by numbers and whitespace
    
    let messageContent = "";
    let settingName = "";

    if (sanitisedMessage.includes(":")) {
      const messageParts = sanitisedMessage.split(":");
      settingName = messageParts[0];
      messageContent = messageParts.slice(1).join(":");
    } else {
      messageContent = sanitisedMessage;
    }
    
    if (isAudioEnabled && audioContext && enabledVoices[settingName] === true) {
      console.log(`${enabledVoices}`)
      speakMessage(`${messageContent}`, savedVoices[settingName]);
    } else if (isAudioEnabled && audioContext) {
      speakMessage(`${messageContent}`);
    }
  }

  const speakMessage = (message: string, settings?: any) => {

    if (settings) {
      const sam = new SamJs({
        speed: settings.speed,
        pitch: settings.pitch,
        mouth: settings.mouth,
        throat: settings.throat,
      })
      sam.speak(message);
    } else {
      const sam = new SamJs();
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