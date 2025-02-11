"use client";

import { useEffect, useState } from "react";
import TextEditor from "@/components/TextEditor";
import { Icon } from "@iconify/react/dist/iconify.js";
import supabase from "@/supabaseClient";
import Notebook from "@/components/Notebook";

type Note = {
  id: string;
  name: string;
  updated_at: string;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(
    null
  );

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
            if (payload.eventType === "DELETE") {
              return prevNotes.filter((note) => note.id !== payload.old.id);
            }
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

  const handleAddNote = async () => {
    const newNote = {
      name: "New Note",
      data: {},
      author: "Paul",
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("notes")
      .insert([newNote])
      .select("id")
      .single();
    if (data) {
      setNotes((prevNotes) => [...prevNotes, { ...newNote, id: data.id }]);
      setCurrentDocumentId(data.id);
    } else {
      console.error("Error creating document:", error);
    }
  };

  const handleDeleteNote = () => {
    setCurrentDocumentId(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <Notebook
        notes={notes}
        currentDocumentId={currentDocumentId}
        setCurrentDocumentId={setCurrentDocumentId}
        handleAddNote={handleAddNote}
      />
      <div className="flex flex-col gap-8 items-center justify-center w-full h-full py-16 ">
        <h1 className="text-3xl font-black text-emerald-950 font-heading text-center select-none">
          React NTM
          <span className="hidden md:block">(Note Taking Manager)</span>
        </h1>
        {currentDocumentId ? (
          <TextEditor
            documentId={currentDocumentId}
            onDelete={handleDeleteNote}
          />
        ) : (
          <button
            onClick={() => handleAddNote()}
            style={{ transition: "all 0.1s ease-in-out" }}
            className="w-[calc(100%-2rem)] lg:w-1/2 h-[25rem] flex gap-2 p-4 rounded-xl font-heading items-center justify-center opacity-70 hover:opacity-100 border-4 text-emerald-500 border-emerald-500 border-dashed text-4xl hover:text-5xl"
          >
            <Icon icon="subway:add"></Icon>
          </button>
        )}
      </div>
    </div>
  );
}

export default Notes;
