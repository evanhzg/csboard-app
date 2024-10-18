"use client";

import { useEffect, useState } from "react";
import TextEditor from "@/components/TextEditor";
import { Icon } from "@iconify/react/dist/iconify.js";
import supabase from "@/supabaseClient";

type Note = {
  id: string;
  name: string;
  updated_at: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [documentId, setDocumentId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*");
      if (data) {
        setNotes(data);
      }
    };
    fetchNotes();

    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload: any) => {
          console.log("Change received!", payload);
          setNotes((prevNotes) => {
            const noteIndex = prevNotes.findIndex(
              (note) => note.id === payload.new.id
            );
            if (noteIndex !== -1) {
              // Update existing note
              const updatedNotes = [...prevNotes];
              updatedNotes[noteIndex] = payload.new;
              return updatedNotes;
            } else {
              // Add new note
              return [...prevNotes, payload.new];
            }
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="h-full w-[18rem] bg-emerald-900 flex flex-col w-full h-full gap-4 p-4">
        {notes.map((note) => (
          <button
            onClick={() => setDocumentId(note.id)}
            key={note.id}
            style={{ transition: "all 0.1s ease-in-out" }}
            className={`flex gap-2 h-16 ${
              documentId === note.id
                ? "bg-emerald-200"
                : "bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600"
            } p-4 rounded-xl font-heading items-center`}
          >
            <h2 className="text-xl font-bold text-emerald-950">{note.name} </h2>
            <p className="text-emerald-800 italic text-[0.8rem]">
              (
              {note.updated_at
                ? new Intl.DateTimeFormat("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                  }).format(new Date(note.updated_at)) +
                  " - " +
                  new Date(note.updated_at).getHours() +
                  ":" +
                  new Date(note.updated_at).getMinutes()
                : ""}
              )
            </p>
          </button>
        ))}
        <button
          onClick={() => setDocumentId(undefined)}
          style={{ transition: "all 0.1s ease-in-out" }}
          className="flex h-16 gap-2 p-4 rounded-xl font-heading items-center justify-center opacity-70 hover:opacity-100 border-4 text-emerald-700 border-emerald-700 border-dashed"
        >
          <Icon icon="subway:add"></Icon>
        </button>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center w-full h-full">
        <h1 className="text-3xl font-black text-emerald-950 font-heading text-center">
          React NTM
          <span className="hidden md:block">(Note Taking Manager)</span>
        </h1>
        <TextEditor documentId={documentId} />
      </div>
    </div>
  );
}
