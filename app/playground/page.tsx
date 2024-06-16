import Form from "@/app/ui/playground/create-form";
import { inter } from "@/app/ui/fonts";

export default function Page() {
    return (
        <div>
            <h1 className={`${inter.className} mb-10 text-xl md:text-3xl pb-4 border-b-2 border-fuchsia-950`}>
                Playground
            </h1>
            <Form />
        </div>
    );
}