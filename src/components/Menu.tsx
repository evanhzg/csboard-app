"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="flex lg:flex-col lg:w-[12rem] h-[4rem] lg:h-[100vh] justify-center gap-4 p-4 bg-emerald-950 text-white">
      {/* HOMEPAGE */}
      <Link
        href="/"
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`font-bold flex gap-2 items-center font-heading ${pathname === "/" ? "text-emerald-200 text-lg" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon icon="iconamoon:home-fill" />
        <span>Homepage</span>
      </Link>

      {/* TABS */}
      <Link
        href="/tabs"
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`font-bold flex gap-2 items-center font-heading ${pathname === "/tabs" ? "text-emerald-200 text-lg" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon icon="fluent:tabs-16-filled" />
        <span>Tabs</span>
      </Link>

      {/* NOTES */}
      <Link
        href="/notes"
        style={{ transition: "all 0.5s ease-in-out" }}
        className={`font-bold flex gap-2 items-center font-heading ${pathname === "/notes" ? "text-emerald-200 text-xl" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon icon="mdi:notebook" />
        <span>Notes</span>
      </Link>

      {/* BOARD */}
      <Link
        href="/board"
        style={{ transition: "all 0.5s ease-in-out" }}
        className={`font-bold flex gap-2 items-center font-heading ${pathname === "/board" ? "text-emerald-200 text-xl" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon icon="solar:palette-bold" />
        <span>Board (slow)</span>
      </Link>

      <Link
        href="/404"
        style={{ transition: "all 0.2s ease-in-out" }}
        className={`font-bold flex gap-2 items-center font-heading text-sm text-emerald-600 opacity-35 select-none pointer-events-none aria-disabled`}
      >
        <Icon icon="gravity-ui:square-dashed" />
        <span>To be added</span>
      </Link>
    </header>
  );
}
