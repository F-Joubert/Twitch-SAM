"use client";

import { inter } from "../ui/fonts";
import SettingsPage from "../ui/settings/settings-form";

export default function Page() {
    return (
        <div>
            <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
                    App Settings
            </h1>
            <SettingsPage />
        </div>
    )
}