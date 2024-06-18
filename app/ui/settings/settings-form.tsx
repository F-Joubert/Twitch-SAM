// import { useState, useEffect } from 'react';
// import { inter } from "../fonts";

// interface VoiceSettings {
//     speed: number;
//     pitch: number;
//     mouth: number;
//     throat: number;
// }

// const SettingsPage: React.FC = () => {
//     const [speed, setSpeed] = useState<number>(72);
//     const [pitch, setPitch] = useState<number>(64);
//     const [mouth, setMouth] = useState<number>(128);
//     const [throat, setThroat] = useState<number>(128);
//     const [settingsName, setSettingsName] = useState<string>("");
//     const [savedVoices, setSavedVoices] = useState<{ [key: string]: VoiceSettings }>({});
//     const [enabledVoices, setEnabledVoices] = useState<{ [key: string]: boolean }>({});
//     const [redeemName, setRedeemName] = useState<string>("");
//     const [savedRedeems, setSavedRedeems] = useState<string[]>([]);
//     const [enabledRedeems, setEnabledRedeems] = useState<{ [key: string]: boolean }>({});
//     const [cheerThreshold, setCheerThreshold] = useState<number>(10);
//     const [savedCheerThreshold, setSavedCheerThreshold] = useState<number>(10);


//     useEffect(() => {
//         const saved = localStorage.getItem("voiceSettings");
//         if (saved) {
//             setSavedVoices(JSON.parse(saved));
//         }

//         const savedEnabledVoices = localStorage.getItem("enabledVoices");

//         if (savedEnabledVoices) {
//             setEnabledVoices(JSON.parse(savedEnabledVoices));
//         }

//         const savedRedeems = localStorage.getItem("redeemSettings");
//         if (savedRedeems) {
//             const parsedRedeems = JSON.parse(savedRedeems);
//             setSavedRedeems(parsedRedeems);
//             const enabledRedeems = parsedRedeems.reduce((store: { [key: string]: boolean }, redeem: string) => {
//                 store[redeem] = true;
//                 return store;
//             }, {});
//             setEnabledRedeems(enabledRedeems);
//         }

//         const savedCheerThreshold = localStorage.getItem("cheerThreshold");

//         if (savedCheerThreshold) {
//             setSavedCheerThreshold(Number(savedCheerThreshold));
//         }
//     }, []);

//     const saveVoice = () => {
//         if (settingsName.trim() === "") return;

//         const newSettings = {
//             ...savedVoices,
//             [settingsName.toLowerCase().trim()]: { speed, pitch, mouth, throat },
//         };

//         const newEnabledVoices = {
//             ...enabledVoices,
//             [settingsName.toLowerCase().trim()]: true,
//         };

//         setSavedVoices(newSettings);
//         setEnabledVoices({ ...enabledVoices, [settingsName]: true });
//         localStorage.setItem("voiceSettings", JSON.stringify(newSettings));
//         localStorage.setItem("enabledVoices", JSON.stringify(newEnabledVoices));
//         setSettingsName("");
//     };

//     const saveRedeem = () => {
//         if (redeemName.trim() === "") return;

//         const newRedeems = [...savedRedeems, redeemName.toLowerCase().trim()];

//         const newEnabledRedeems = {
//             ...enabledRedeems,
//             [redeemName.toLowerCase().trim()]: true,
//         };

//         setSavedRedeems(newRedeems);
//         setEnabledRedeems({ ...enabledRedeems, [redeemName]: true });
//         localStorage.setItem("redeemSettings", JSON.stringify(newRedeems));
//         localStorage.setItem("enabledRedeems", JSON.stringify(newEnabledRedeems));
//         setRedeemName("");
//     };

//     const saveCheerThreshold = () => {
//         localStorage.setItem("cheerThreshold", cheerThreshold.toString());
//         setSavedCheerThreshold(cheerThreshold);
//     };

//     const toggleRedeemEnabled = (redeem: string) => {
//         const updatedEnabledRedeems = { ...enabledRedeems, [redeem]: !enabledRedeems[redeem] };
//         setEnabledRedeems(updatedEnabledRedeems);
//         localStorage.setItem("enabledRedeems", JSON.stringify(updatedEnabledRedeems));
//     };

//     const toggleVoiceEnabled = (name: string) => {
//         const updatedEnabledVoices = { ...enabledVoices, [name]: !enabledVoices[name] };
//         console.log(updatedEnabledVoices);
//         setEnabledVoices(updatedEnabledVoices);
//         localStorage.setItem("enabledVoices", JSON.stringify(updatedEnabledVoices));
//     }

//     return (
//         <div>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4 mt-10">
//                 <div className="relative mb-4">
//                     <label
//                         className={`${inter.className} mb-4 text-l md:text-xl`}>
//                         Speed: {speed}
//                     </label>
//                     <input
//                         type="range"
//                         min="0"
//                         max="255"
//                         value={speed}
//                         className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
//                         onChange={(e) => setSpeed(parseInt(e.target.value))} />
//                 </div>
//                 <div className="relative mb-4">
//                     <label
//                         className={`${inter.className} mb-4 text-l md:text-xl`}>
//                         Pitch: {pitch}
//                     </label>
//                     <input
//                         type="range"
//                         min="0"
//                         max="255"
//                         value={pitch}
//                         className="w-full h-2 rounded-lg cursor-pointer"
//                         onChange={(e) => setPitch(parseInt(e.target.value))} />
//                 </div>
//                 <div className="relative mb-4">
//                     <label
//                         className={`${inter.className} mb-4 text-l md:text-xl`}>
//                         Mouth: {mouth}
//                     </label>
//                     <input
//                         type="range"
//                         min="0"
//                         max="255"
//                         value={mouth}
//                         className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
//                         onChange={(e) => setMouth(parseInt(e.target.value))} />
//                 </div>
//                 <div className="relative mb-4">
//                     <label
//                         className={`${inter.className} mb-4 text-l md:text-xl`}>
//                         Throat: {throat}
//                     </label>
//                     <input
//                         type="range"
//                         min="0"
//                         max="255"
//                         value={throat}
//                         className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"
//                         onChange={(e) => setThroat(parseInt(e.target.value))} />
//                 </div>
//             </div>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4 items-center">
//                 <input type="text"
//                     placeholder="Voice Name"
//                     value={settingsName}
//                     className="rounded-md border border-gray-200 w-11/12 p-1 mt-2 mr-2 text-m outline-2 placeholder:text-black text-black"
//                     onChange={(e) => setSettingsName(e.target.value.toLowerCase().trim())} />
//                 <button
//                     className="flex h-10 w-11/12 items-center rounded-lg bg-fuchsia-950 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-fuchsia-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//                     onClick={saveVoice}>Save Voice</button>
//             </div>
//             <h2 className={`${inter.className} mb-4 text-l md:text-xl mt-10 pb-2 border-b-2 border-fuchsia-950`}>Saved Voices</h2>
//             <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-3 mb-4">
//                 {Object.keys(savedVoices).map((name) => (
//                     <div key={name}>
//                         <input type="checkbox" 
//                         id={name} 
//                         name={name}
//                         checked={enabledVoices[name] || false}
//                         onChange={() => toggleVoiceEnabled(name)}
//                         className={`${inter.className} mb-4 mr-2 text-m md:text-l accent-fuchsia-950`} />
//                         <label htmlFor={name}>{name}</label>
//                     </div>
//                 ))}
//             </div>
//             {/* <h2>Enabled Channel Point Redeems</h2>
//             <div>
//                 <input type="text"
//                     placeholder="Redeem Name"
//                     value={redeemName}
//                     className="rounded-md border border-gray-200 p-1 mt-2 mr-2 text-m outline-2 placeholder:text-black text-black"
//                     onChange={(e) => setRedeemName(e.target.value)} />
//                 <button
//                     className="flex h-10 items-center rounded-lg bg-purple-800 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-fuchsia-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//                     onClick={saveRedeem}>Save Redeem</button>
//             </div>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4">
//                 {savedRedeems.map((redeem) => (
//                     <div key={redeem}>
//                         <input
//                             type="checkbox"
//                             id={redeem}
//                             name={redeem}
//                             checked={enabledRedeems[redeem] || false}
//                             onChange={() => toggleRedeemEnabled(redeem)}
//                         />
//                         <label htmlFor={redeem}>{redeem}</label>
//                     </div>
//                 ))}
//             </div>
//             <h2>Cheer Threshold</h2>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-4">
//                 <label>Minimum Bits: {cheerThreshold}</label>
//                 <input type="number"
//                     value={cheerThreshold}
//                     className="text-black"
//                     onChange={(e) => setCheerThreshold(parseInt(e.target.value))} />
//                 <button
//                     className="flex h-10 items-center rounded-lg bg-purple-800 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-fuchsia-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
//                     onClick={saveCheerThreshold}>Save Cheer Threshold</button>
//             </div> */}
//         </div>
//     );
// };

// export default SettingsPage;
