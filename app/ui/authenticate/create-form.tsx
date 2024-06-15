import { Button } from "@/app/ui/button";

export default function Form() {
    return (
        <form>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {/* Client Id */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Client ID
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="clientId"
                                name="clientId"
                                type="text"
                                placeholder="Enter App's Client ID"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Client Secret */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Client Secret
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="clientSecret"
                                name="clientSecret"
                                type="password"
                                placeholder="Enter App's Client Secret"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Callback URL */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Redirect URL
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="callbackUrl"
                                name="callbackUrl"
                                type="password"
                                placeholder="http://localhost:3000"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Bot Username */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Bot Username
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="botUsername"
                                name="botUsername"
                                type="password"
                                placeholder="Enter Bot's Username"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
        <a
          href="https://dev.twitch.tv/console/apps/create"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
          target="_blank"
        >
            Register New Application
        </a>
        <Button type="submit">Authenticate</Button>
      </div>
        </form>
    )
}