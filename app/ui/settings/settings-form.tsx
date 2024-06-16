import { useState, useEffect } from 'react';
import { inter } from "../fonts";

interface VoiceSettings {
  speed: number;
  pitch: number;
  mouth: number;
  throat: number;
}

const SettingsPage: React.FC = () => {
  const [speed, setSpeed] = useState(128);
  const [pitch, setPitch] = useState(128);
  const [mouth, setMouth] = useState(128);
  const [throat, setThroat] = useState(128);
  const [settingsName, setSettingsName] = useState("");
  const [savedSettings, setSavedSettings] = useState<{ [key: string]: VoiceSettings }>({});
  const [redeemName, setRedeemName] = useState("");
  const [savedRedeems, setSavedRedeems] = useState<string[]>([]);
  const [enabledRedeems, setEnabledRedeems] = useState<string[]>([]);
  const [cheerThreshold, setCheerThreshold] = useState(10);
  const [savedCheerThreshold, setSavedCheerThreshold] = useState<number>(10);

  useEffect(() => {
    const saved = localStorage.getItem("voiceSettings");
    if (saved) {
      setSavedSettings(JSON.parse(saved));
    }

  const savedRedeems = localStorage.getItem("redeemSettings");
    if (savedRedeems) {
        const parsedRedeems = JSON.parse(savedRedeems);
        setSavedRedeems(parsedRedeems);
        const enabledRedeems = parsedRedeems.reduce((store: { [key: string]: boolean }, redeem: string) => {
          store[redeem] = true;
          return store;
        }, {});
        setEnabledRedeems(enabledRedeems);
    }

    const savedCheerThreshold = localStorage.getItem("cheerThreshold");

    if (savedCheerThreshold) {
        setSavedCheerThreshold(Number(savedCheerThreshold));
    }
}, []);

  const saveSettings = () => {
    if (settingsName.trim() === "") return;

    const newSettings = {
      ...savedSettings,
      [settingsName]: { speed, pitch, mouth, throat },
    };

    setSavedSettings(newSettings);
    localStorage.setItem("voiceSettings", JSON.stringify(newSettings));
    setSettingsName("");
  };

  const saveRedeem = () => {
    if (redeemName.trim() === '') return;

    const newRedeems = [...savedRedeems, redeemName];
    setSavedRedeems(newRedeems);
    setEnabledRedeems({ ...enabledRedeems, [redeemName]: true });
    localStorage.setItem('redeemSettings', JSON.stringify(newRedeems));
    setRedeemName('');
  };

  const saveCheerThreshold = () => {
    localStorage.setItem('cheerThreshold', cheerThreshold.toString());
    setSavedCheerThreshold(cheerThreshold);
  };

  const toggleRedeemEnabled = (redeem: string) => {
    const updatedEnabledRedeems = { ...enabledRedeems, [redeem]: !enabledRedeems[redeem] };
    setEnabledRedeems(updatedEnabledRedeems);
  };

  return (
    <div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4 mt-10">
            <div className="relative mb-4">
                <label
                className={`${inter.className} mb-4 text-l md:text-xl`}>
                    Speed: {speed}
                </label>
                <input 
                type="range" 
                min="0" 
                max="255" 
                value={speed} 
                className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
                onChange={(e) => setSpeed(parseInt(e.target.value))} />
            </div>
            <div className="relative mb-4">
                <label
                className={`${inter.className} mb-4 text-l md:text-xl`}>
                    Pitch: {pitch}
                </label>
                <input 
                type="range" 
                min="0" 
                max="255" 
                value={pitch} 
                className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
                onChange={(e) => setPitch(parseInt(e.target.value))} />
            </div>
            <div className="relative mb-4">
                <label
                className={`${inter.className} mb-4 text-l md:text-xl`}>
                    Mouth: {mouth}
                </label>
                <input 
                type="range" 
                min="0" 
                max="255" 
                value={mouth} 
                className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
                onChange={(e) => setMouth(parseInt(e.target.value))} />
            </div>
            <div className="relative mb-4">
                <label
                className={`${inter.className} mb-4 text-l md:text-xl`}>
                    Throat: {throat}
                </label>
                <input 
                type="range" 
                min="0" 
                max="255" 
                value={throat} 
                className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
                onChange={(e) => setThroat(parseInt(e.target.value))} />
            </div>
        </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4 items-center">
        <input type="text" 
        placeholder="Voice Name" 
        value={settingsName} 
        className="rounded-md border border-gray-200 w-11/12 p-1 mt-2 mr-2 text-m outline-2 placeholder:text-black text-black"
        onChange={(e) => setSettingsName(e.target.value)} />
        <button 
        className="flex h-10 w-11/12 items-center rounded-lg bg-purple-800 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-fuchsia-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        onClick={saveSettings}>Save Voice</button>
      </div>
      <h2 className={`${inter.className} mb-4 text-l md:text-xl mt-10`}>Saved Voices</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4">
        {Object.keys(savedSettings).map((name) => (
          <div key={name}>
            <input type="checkbox" id={name} name={name} className={`${inter.className} mb-4 text-m md:text-l`} />
            <label htmlFor={name}>{name}</label>
          </div>
        ))}
      </div>
      <h2>Enabled Channel Point Redeems</h2>
      <div>
        <input type="text" 
        placeholder="Redeem Name" 
        value={redeemName} 
        className="rounded-md border border-gray-200 p-1 mt-2 mr-2 text-m outline-2 placeholder:text-black text-black"
        onChange={(e) => setRedeemName(e.target.value)} />
        <button 
        className="flex h-10 items-center rounded-lg bg-purple-800 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-fuchsia-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        onClick={saveRedeem}>Save Redeem</button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4">
        {savedRedeems.map((redeem) => (
          <div key={redeem}>
            <input
              type="checkbox"
              id={redeem}
              name={redeem}
              checked={enabledRedeems[redeem]}
              onChange={() => toggleRedeemEnabled(redeem)}
            />
            <label htmlFor={redeem}>{redeem}</label>
          </div>
        ))}
      </div>
      <h2>Cheer Threshold</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4">
        <label>Minimum Bits: {cheerThreshold}</label>
        <input type="number" 
        value={cheerThreshold} 
        className="text-black"
        onChange={(e) => setCheerThreshold(parseInt(e.target.value))} />
        <button 
        className="flex h-10 items-center rounded-lg bg-purple-800 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-fuchsia-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        onClick={saveCheerThreshold}>Save Cheer Threshold</button>
      </div>
    </div>
  );
};

export default SettingsPage;
