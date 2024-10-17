"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import TextEditor from "@/components/TextEditor";

export default function Notes() {
  const [bold, setBold] = useState(false);
  function handleBoldButton() {
    setBold(!bold);
  }
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center "></div>
      <TextEditor className="bg-white rounded-xl w-1/2 h-[25rem] p-2" />
    </div>
  );
}
