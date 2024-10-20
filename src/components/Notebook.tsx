"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";

type Note = {
  id: string;
  name: string;
  updated_at: string;
};

type NotebookProps = {
  notes: Note[];
  currentDocumentId: string | null;
  setCurrentDocumentId: (id: string | null) => void;
  handleAddNote: () => void;
};

const Notebook = ({
  notes,
  currentDocumentId,
  setCurrentDocumentId,
  handleAddNote,
}: NotebookProps) => {
  const [width, setWidth] = useState(8); // Initial width set to 0
  const [startAnimation, setStartAnimation] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (document.documentElement.clientWidth > 768) {
        setWidth(288); // Set to initial width after 200ms
      } else {
        setWidth(document.documentElement.clientWidth); // Set width to document width
      }
      setStartAnimation(1);
    }, 1000);

    const timer2 = setTimeout(() => {
      setStartAnimation(2);
    }, 1500); // Set startAnimation to 2 after 700ms

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= 200 && newWidth <= 600) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="relative lg:h-screen bg-emerald-900"
      style={{
        width: `${width}px`,
        transition: startAnimation === 1 ? "width 500ms ease-in-out" : "none",
        boxSizing: "border-box", // Ensure padding is included in the width
      }}
    >
      <div
        className={`flex lg:flex-col gap-4 overflow-scroll p-4 h-full ${startAnimation === 2 ? "opacity-100" : "opacity-0"}`}
        style={{
          transition: "opacity 300ms ease-in-out",
        }}
      >
        <h2 className="hidden lg:block text-center text-emerald-950 font-black font-heading text-3xl select-none">
          Notebook
        </h2>
        <button
          onClick={() => handleAddNote()}
          style={{ transition: "all 0.1s ease-in-out" }}
          className="flex h-16 gap-2 p-4 rounded-xl font-heading items-center justify-center opacity-70 hover:opacity-100 border-4 text-emerald-700 border-emerald-700 border-dashed"
        >
          <Icon icon="subway:add"></Icon>
        </button>
        {notes
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .map((note) => (
            <button
              onClick={() => setCurrentDocumentId(note.id)}
              key={note.id}
              className={`flex gap-2 h-16 ${
                currentDocumentId === note.id
                  ? "bg-emerald-200"
                  : "bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600"
              } p-4 rounded-xl font-heading items-center w-full justify-between`}
            >
              <h2 className="text-xl font-bold text-emerald-950 text-ellipsis text-nowrap overflow-hidden flex-1 text-start">
                {note.name}
              </h2>
              <p
                className={`text-emerald-800 italic text-[0.8rem] text-nowrap ${
                  width < 300 ? "hidden" : ""
                }`}
              >
                (
                {note.updated_at
                  ? new Intl.DateTimeFormat("fr-FR", {
                      day: "2-digit",
                      month: "short",
                    }).format(new Date(note.updated_at)) +
                    " " +
                    new Date(note.updated_at)
                      .getHours()
                      .toString()
                      .padStart(2, "0") +
                    ":" +
                    new Date(note.updated_at)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")
                  : ""}
                )
              </p>
            </button>
          ))}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="hidden lg:block absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-emerald-800"
      />
      <p className="hidden lg:block absolute w-full text-center text-emerald-700 italic bottom-4 font-body select-none">
        Pssst, I'm resizable !
      </p>
    </div>
  );
};

export default Notebook;
