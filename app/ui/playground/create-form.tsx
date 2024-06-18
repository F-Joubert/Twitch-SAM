"use client";

import { Button } from "@/app/ui/button";
import { useState } from "react";
import SamJs from "sam-js";
import { inter } from "../fonts";

export default function Form() {
    const [speed, setSpeed] = useState<number>(72);
    const [pitch, setPitch] = useState<number>(64);
    const [mouth, setMouth] = useState<number>(128);
    const [throat, setThroat] = useState<number>(128);

    const handleFormSubmit = (formData: FormData) => {
        const submitAction = formData.get("action")
        if (submitAction === "speak" || submitAction === "download") {
            speakSAM(formData);
        } else if (submitAction === "saveVoice") {
            saveVoice(formData);
        } else if (submitAction === "defaultVoice") {
            newDefaultVoice(formData);
        }
    }

    return (
        <form action={handleFormSubmit}>
            <div className="grid gap-10 mb-6 mt-6 sm:grid-cols-1 lg:grid-cols-2">
            <div className="relative mb-4">
                    <label className={`${inter.className} mb-4 text-l md:text-xl`}>Speed: {speed}</label>
                    <input id="speed" 
                    name="speed" 
                    type="range" 
                    min="0" max="255" 
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (255)</span>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="pitch" className={`${inter.className} mb-4 text-l md:text-xl`}>Pitch: {pitch}</label>
                    <input id="pitch" 
                    name="pitch" 
                    type="range" min="0" 
                    max="255" 
                    onChange={(e) => setPitch(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (255)</span>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="mouth" className={`${inter.className} mb-4 text-l md:text-xl`}>Mouth: {mouth}</label>
                    <input id="mouth" 
                    name="mouth" 
                    type="range" 
                    min="0" 
                    max="255" 
                    onChange={(e) => setMouth(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (255)</span>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="throat" className={`${inter.className} mb-4 text-l md:text-xl`}>Throat: {throat}</label>
                    <input id="throat" 
                    name="throat" 
                    type="range" 
                    min="0" 
                    max="255" 
                    onChange={(e) => setThroat(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-white dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute right-10 -bottom-6">Max (255)</span>
                </div>
                <div className="col-span-2 grid gap-10 sm:grid-cols-3 lg:grid-cols-4">
                <input
                    id="voiceName"
                    name="voiceName"
                    type="text"
                    placeholder="Optional: Name to save voice as."
                    className="col-span-2 place-self-center peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black mb-4"
                />
                <Button className="w-full justify-center" id="saveVoice" name="action" value="saveVoice" type="submit">Save Voice</Button>
                <Button className="w-full justify-center" id="defaultVoice" name="action" value="defaultVoice" type="submit">Set Default Voice</Button>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <input
                    id="inputText"
                    name="inputText"
                    type="text"
                    placeholder="Enter SAM's dialogue."
                    defaultValue={"Hello, my name is SAM"}
                    required={true}
                    className="place-self-center peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black mb-4"
                />
            </div>
            <div className="grid gap-10 mb-6 mt-6 w-full grid-cols-2">
                <Button className="w-full justify-center" id="speak" name="action" value="speak" type="submit">Speak</Button>
                <Button className="w-full justify-center" id="download" name="action" value="download" type="submit">Download</Button>
            </div>
        </form>
    )
}

function speakSAM(formData: FormData) {
    const rawFormData = {
        inputText: formData?.get("inputText"),
        inputSpeed: Number(formData.get("speed")),
        inputPitch: Number(formData.get("pitch")),
        inputMouth: Number(formData.get("mouth")),
        inputThroat: Number(formData.get("throat")),
        inputType: formData.get("action"),
    };

    const sam = new SamJs({
        speed: rawFormData.inputSpeed,
        pitch: rawFormData.inputPitch,
        mouth: rawFormData.inputMouth,
        throat: rawFormData.inputThroat});
    
    if (rawFormData.inputText && rawFormData.inputType === "speak") {
        sam.speak(`${rawFormData.inputText}`);
    } else if (rawFormData.inputText && rawFormData.inputType === "download") {
        sam.download(`${rawFormData.inputText}`);
    }
}

function saveVoice(formData: FormData) {
    const rawFormData = {
        inputName: String(formData?.get("voiceName") ? formData?.get("voiceName") : "Default"),
        inputSpeed: Number(formData.get("speed")),
        inputPitch: Number(formData.get("pitch")),
        inputMouth: Number(formData.get("mouth")),
        inputThroat: Number(formData.get("throat")),
    };

    let storedVoices = JSON.parse(localStorage.getItem("savedVoices") || "[]");

    const voiceIndex = storedVoices.findIndex((voice: any) => voice.hasOwnProperty(rawFormData.inputName)); // Checking if saved voice name exists since I have no duplicate handling.

    if (voiceIndex !== -1) {
        storedVoices[voiceIndex][rawFormData.inputName] = {
            "speed": rawFormData.inputSpeed,
            "pitch": rawFormData.inputPitch,
            "mouth": rawFormData.inputMouth,
            "throat": rawFormData.inputThroat
        };
    } else {
        storedVoices.push({
            [rawFormData.inputName]: {
                "speed": rawFormData.inputSpeed,
                "pitch": rawFormData.inputPitch,
                "mouth": rawFormData.inputMouth,
                "throat": rawFormData.inputThroat
            }
        });
    }

    localStorage.setItem("savedVoices", JSON.stringify(storedVoices));
}

function newDefaultVoice(formData: FormData) {
    const rawFormData = {
        inputSpeed: Number(formData.get("speed")),
        inputPitch: Number(formData.get("pitch")),
        inputMouth: Number(formData.get("mouth")),
        inputThroat: Number(formData.get("throat")),
    };

    localStorage.setItem("defaultVoice", JSON.stringify({
        "speed": rawFormData.inputSpeed,
        "pitch": rawFormData.inputPitch,
        "mouth": rawFormData.inputMouth,
        "throat": rawFormData.inputThroat
    }));
}

// || [{"Default": {"speed": 72, "pitch": 64, "mouth": 128, "throat": 128}}]
