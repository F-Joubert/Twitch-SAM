import Form from "../ui/authenticate/create-form";
import { inter } from "../ui/fonts";

export default function Page() {
    return (
        <main>
            <h1 className={`${inter.className} mb-10 text-xl md:text-3xl pb-4 border-b-2 border-fuchsia-950`}>
                Twitch Authentication
            </h1>
            <Form />
        </main>
    );
}