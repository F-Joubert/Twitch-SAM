import Form from "@/app/ui/playground/create-form";
import { inter } from "@/app/ui/fonts";

export default function Page() {
    return (
        <div>
            <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
                Playground
            </h1>
            <Form />
        </div>
    );
}