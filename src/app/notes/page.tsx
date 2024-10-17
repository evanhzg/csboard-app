"use client";
import { useState } from "react";
import TextEditor from "@/components/TextEditor";

export default function Notes() {
  const [bold, setBold] = useState(false);
  function handleBoldButton() {
    setBold(!bold);
  }
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full">
      <h1 className="text-3xl font-black text-emerald-950 font-heading text-center">
        React NTM
        <span className="hidden md:block">(Note Taking Manager)</span>
      </h1>
      <TextEditor />
    </div>
  );
}
