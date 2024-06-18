"use client";

import { Button } from "../button";

export default function Channel() {
    const savedChannel = localStorage.getItem("channelName");

    const handleChannelSave = (formData: FormData) => {
        const channelName = String(formData?.get("channel")) || "nandroione";

        localStorage.setItem("channelName", channelName);
    }
    return (
            <form action={handleChannelSave}>
            <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3 bg-gray-900">
                <input type="text" 
                id="channel" 
                name="channel" 
                placeholder={savedChannel ? savedChannel : "Channel to monitor..."}
                required={true}
                className="col-span-2 place-self-center peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-black text-black mb-4"
                />
                <Button type="submit">Save</Button>
                </div>
            </form>
    )
}