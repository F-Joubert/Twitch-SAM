import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

export default function SAMLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
              src="/SAMinverted.webp"
              alt="SAM Logo"
              className="dark"
              width={200}
              height={48}
              priority
            />
      {/* <p className="text-[44px]">TwitchSAM</p> */}
    </div>
  );
}
