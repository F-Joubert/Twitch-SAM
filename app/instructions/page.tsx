import Link from "next/link";
import { inter } from "../ui/fonts";

export default function Page() {
  return (
    <main>
        <h1 className={`${inter.className} mb-10 text-xl md:text-3xl pb-4 border-b-2 border-fuchsia-950`}>
          Instructions Page
        </h1>
        <div>
          <p className={`${inter.className} mb-4 text-m md:text-xl`}>Work in progress, currently only configured for <a href="https://www.twitch.tv/denz1000">denz1000.</a></p>
        </div>
        <div>
          <p className={`${inter.className} mb-4 text-m md:text-l`}>
            Custom voices: Any enabled event messages that begin with the name of your custom voice, followed by a colon (e.g. witch:) will be played in that voice's settings.
          </p>
          <p className={`${inter.className} mb-4 text-m md:text-l`}>
            Speed: Lower values make SAM speak faster, this is a quirk of the original engine.
          </p>
          <p className={`${inter.className} mb-4 text-m md:text-l`}>
            You can find more information in the <a className="text-fuchsia-600 underline" href="http://www.retrobits.net/atari/sam.shtml#ch5.0">original manual</a>.
          </p>
        </div>
    </main>
  );
}
