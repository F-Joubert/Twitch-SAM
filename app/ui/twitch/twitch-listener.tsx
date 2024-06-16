"use client";

import { useEffect, useState } from 'react';
import tmi from 'tmi.js';
import SamJs from "sam-js";

const TwitchChatListener: React.FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [savedSettings, setSavedSettings] = useState<{ [key: string]: any }>({});
  const [enabledRedeems, setEnabledRedeems] = useState<{ [key: string]: boolean }>({});
  const [cheerThreshold, setCheerThreshold] = useState<number>(100);

  useEffect(() => {
    const saved = localStorage.getItem("voiceSettings");

    if (saved) {
      setSavedSettings(JSON.parse(saved));
    }

    const savedRedeems = localStorage.getItem("redeemSettings");

    if (savedRedeems) {
      const parsedRedeems = JSON.parse(savedRedeems);
      const enabledRedeems = parsedRedeems.reduce((store: { [key: string]: boolean }, redeem: string) => {
        store[redeem] = true;
        return store;
      }, {});
      setEnabledRedeems(enabledRedeems);
    }

    const savedCheerThreshold = localStorage.getItem("cheerThreshold");

    if (savedCheerThreshold) {
      setCheerThreshold(Number(savedCheerThreshold));
    }
  }, []);

  useEffect(() => {
    const twitchChannel = process.env.NEXT_PUBLIC_TWITCH_CHANNEL as string;

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
    });

    // client.on("redeem", (channel: string, username: string, rewardType: string, tags: tmi.ChatUserstate) => {
    //   if (enabledRedeems[rewardType]) {
    //     handleMessage();
    //   }
    // });

    client.on("cheer", (channel: string, tags: tmi.ChatUserstate, message: string) => {
      if (Number(tags.bits) >= cheerThreshold) {
        handleMessage(message);
      }
    });

    client.on("subscription", (channel: string, username: string, methods: tmi.SubMethods, message: string, tags: tmi.SubUserstate) => {
      handleMessage(message);
    });

    client.on("resub", (channel: string, username: string, months: number, message: string, tags: tmi.SubUserstate, methods: tmi.SubMethods) => {
      handleMessage(message);
    });

    // client.on("subgift", (channel: string, username: string, streakMonths: number, recipient: string, methods: tmi.SubMethods, tags: tmi.SubGiftUserstate) => {
    //   handleMessage()
    // });

    return () => {
      client.disconnect();
    };
  }, [isAudioEnabled, audioContext, savedSettings, enabledRedeems, cheerThreshold]);

  const handleButtonClick = () => {
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
    const messageParts = message.split(":");
    const settingName = messageParts[0];
    const messageContent = messageParts.slice(1).join(":");

    if (isAudioEnabled && audioContext && savedSettings[settingName]) {
      speakMessage(`${messageContent}`, savedSettings[settingName]);
    } else if (isAudioEnabled && audioContext) {
      speakMessage(`${message}`);
    }
  }

  const speakMessage = (message: string, settings?: any) => {
    console.log(settings);

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