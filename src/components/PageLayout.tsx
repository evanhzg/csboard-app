"use client";

import { useState } from "react";
import Menu from "@/components/Menu";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Menu
        expanded={expanded}
        setExpanded={(value) => setExpanded(value !== null ? value : false)}
      />
      <section
        style={{ transition: "all 0.1s ease-in-out" }}
        className={`${expanded ? "lg:pl-[12rem]" : "lg:pl-[4rem]"} flex bg-gradient-to-br from-emerald-400 to-emerald-800 w-screen min-h-[calc(100vh-4rem)] lg:min-h-screen h-fit overflow-auto`}
      >
        {children}
      </section>
    </>
  );
}
