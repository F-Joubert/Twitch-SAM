"use client";

import {
  FingerPrintIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  InformationCircleIcon,
  Cog8ToothIcon,
  SpeakerWaveIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Authenticate",
    href: "/authenticate",
    icon: FingerPrintIcon,
  },
  { name: "Playground", href: "/playground", icon: SpeakerWaveIcon },
  { name: "Settings", href: "/settings", icon: Cog8ToothIcon },
  { name: "Instructions", href: "/instructions", icon: InformationCircleIcon},
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-900 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-sky-100 text-purple-600": pathname === link.href,
            },
          )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
