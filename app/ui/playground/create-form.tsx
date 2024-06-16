"use client";

import { Button } from "@/app/ui/button";
import SamJs from "sam-js";

export default function Form() {
    return (
        <form action={speakSAM}>
            <div className="grid gap-10 mb-6 mt-6 sm:grid-cols-1 lg:grid-cols-2">
                <div className="relative mb-4">
                    <label htmlFor="pitch" className="mb-2 block text-sm font-medium">Pitch</label>
                    <input id="pitch" name="pitch" type="range" min="0" max="255" className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (255)</span>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="speed" className="mb-2 block text-sm font-medium">Speed</label>
                    <input id="speed" name="speed" type="range" min="0" max="255" className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (255)</span>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="mouth" className="mb-2 block text-sm font-medium">Mouth</label>
                    <input id="mouth" name="mouth" type="range" min="0" max="255" className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (255)</span>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="throat" className="mb-2 block text-sm font-medium">Throat</label>
                    <input id="throat" name="throat" type="range" min="0" max="255" className="w-full h-2 bg-black rounded-lg cursor-pointer dark:bg-gray-700 accent-linear-gradient(to right, #515151, #E6BFFF)"/>
                    <span className="text-sm text-white dark:text-gray-400 absolute start-0 -bottom-6">Min (0)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute right-10 -bottom-6">Max (255)</span>
                </div>
                <input
                    id="voiceName"
                    name="voiceName"
                    type="text"
                    placeholder="Optional: Name to save voice as."
                    className="place-self-center peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black mb-4"
                />
                <Button className="w-full justify-center" type="submit">Save Voice</Button>
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