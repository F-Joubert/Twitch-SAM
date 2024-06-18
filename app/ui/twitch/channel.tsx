"use client";

import { useEffect, useState } from "react";
import { Button } from "../button";

/* Component to save a channel name to local storage.
    Child component of SideNav    @/app/ui/sidenav */

export default function Channel() {
    const [savedChannel, setSavedChannel] = useState<string | null>(null);

    useEffect(() => {
        const channelName = localStorage.getItem("channelName");
        setSavedChannel(channelName);
    }, []);

    const handleChannelSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const channelName = String(formData.get("channel")) || "nandroione";
        localStorage.setItem("channelName", channelName);
        setSavedChannel(channelName);
    };

    return (
            <form onSubmit={handleChannelSave}>
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
