import Form from "../ui/authenticate/create-form";
import { lusitana } from "../ui/fonts";

export default function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Twitch Authentication
            </h1>
            <Form />
        </main>
    );
}