"use client";

import { inter } from "../ui/fonts";
import SettingsPage from "../ui/settings/settings-form";

export default function Page() {
    return (
        <div>
            <h1 className={`${inter.className} mb-10 text-xl md:text-3xl pb-4 border-b-2 border-fuchsia-950`}>
                    App Settings
            </h1>
            <div className="w-full">
                <SettingsPage />
            </div>
        </div>
    )
}