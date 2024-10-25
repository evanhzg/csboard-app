"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

type MenuProps = {
  expanded: boolean;
  setExpanded: (id: boolean | null) => void;
};

export default function Menu(props: MenuProps) {
  const { t } = useTranslation("common");

  const { expanded } = props;
  const [disabled, setDisabled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setDisabled(!disabled);
    }, 100);
  }, [expanded]);

  return (
    <section
      className={`lg:fixed flex lg:flex-col w-full ${expanded ? "lg:w-[12rem]" : "lg:w-[4rem]"} h-[4rem] lg:h-full justify-center gap-4 p-4 bg-emerald-950 text-white transition-[width] duration-300 ease-in-out`}
    >
      <button
        onClick={() => props.setExpanded(!expanded)}
        style={{ transition: "all 0.1s linear" }}
        className={`hidden lg:flex absolute top-4 font-bold  gap-2 items-center font-heading ${pathname === "/" ? "text-emerald-200 text-lg" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon
          className={`transition-all duration-300 ease-in-out ${!expanded ? "text-3xl" : ""}`}
          icon={`${expanded ? "mdi:menu-open" : "mdi:menu-close"}`}
        />
        <span
          className={`text-nowrap opacity-0 ${expanded ? "opacity-100" : ""} ${disabled ? "hidden" : ""} transition-all duration-300 ease-in-out`}
        >
          {t("menu.shrink")}
        </span>
      </button>
      {/* HOMEPAGE */}
      <Link
        href="/"
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`min-w-max font-bold flex gap-2 items-center font-heading ${pathname === "/" ? "text-emerald-200 text-lg" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon
          className={`transition-all duration-300 ease-in-out ${!expanded ? "text-3xl" : ""}`}
          icon="iconamoon:home-fill"
        />
        <span
          className={`text-nowrap opacity-0 ${expanded ? "opacity-100" : ""} ${disabled ? "hidden" : ""} transition-all duration-300 ease-in-out`}
        >
          {t("menu.home")}
        </span>
      </Link>

      {/* TABS */}
      <Link
        href="/tabs"
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`min-w-max font-bold flex gap-2 items-center font-heading ${pathname === "/tabs" ? "text-emerald-200 text-lg" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon
          className={`transition-all duration-300 ease-in-out ${!expanded ? "text-3xl" : ""}`}
          icon="fluent:tabs-16-filled"
        />
        <span
          className={`text-nowrap opacity-0 ${expanded ? "opacity-100" : ""} ${disabled ? "hidden" : ""} transition-all duration-300 ease-in-out`}
        >
          {t("menu.tabs")}
        </span>
      </Link>

      {/* NOTES */}
      <Link
        href="/notes"
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`min-w-max font-bold flex gap-2 items-center font-heading ${pathname === "/notes" ? "text-emerald-200 text-xl" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon
          className={`transition-all duration-300 ease-in-out ${!expanded ? "text-3xl" : ""}`}
          icon="mdi:notebook"
        />
        <span
          className={`text-nowrap opacity-0 ${expanded ? "opacity-100" : ""} ${disabled ? "hidden" : ""} transition-all duration-300 ease-in-out`}
        >
          {t("menu.notes")}
        </span>
      </Link>

      {/* BOARD */}
      <Link
        href="/board"
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`min-w-max font-bold flex gap-2 items-center font-heading ${pathname === "/board" ? "text-emerald-200 text-xl" : "text-sm text-emerald-600 hover:text-emerald-400 hover:text-base"}`}
      >
        <Icon
          className={`transition-all duration-300 ease-in-out ${!expanded ? "text-3xl" : ""}`}
          icon="solar:palette-bold"
        />
        <span
          className={`text-nowrap opacity-0 ${expanded ? "opacity-100" : ""} ${disabled ? "hidden" : ""} transition-all duration-300 ease-in-out`}
        >
          {t("menu.board")}
        </span>
      </Link>

      <Link
        href="/404"
        className={`min-w-max font-bold flex gap-2 items-center font-heading text-sm text-emerald-600 opacity-35 select-none pointer-events-none aria-disabled`}
      >
        <Icon
          className={`transition-all duration-300 ease-in-out ${!expanded ? "text-3xl" : ""}`}
          icon="gravity-ui:square-dashed"
        />
        <span
          className={`text-nowrap opacity-0 ${expanded ? "opacity-100" : ""} ${disabled ? "hidden" : ""} transition-all duration-300 ease-in-out`}
        >
          {t("menu.tobeadded")}
        </span>
      </Link>
    </section>
  );
}
