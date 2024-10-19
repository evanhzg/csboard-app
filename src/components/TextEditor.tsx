"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import EditorMenuBar from "@/components/EditorMenuBar";
import { useEffect, useState } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import "./TextEditor.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import supabase from "@/supabaseClient";

// Custom document extension for tiptap editor
const CustomDocument = Document.extend({
  content: "heading block*",
});

const TextEditor = ({
  documentId = "",
  onDelete,
  ...props
}: {
  documentId?: string;
  onDelete: () => void;
}) => {
  // State to manage loading state and initial content
  const [loading, setLoading] = useState(true);
  const [initialContent, setInitialContent] = useState<any | null>(null);
  // State to manage the current document ID and note name
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(
    documentId
  );
  const [noteName, setNoteName] = useState<string | null>("New Note");

  // Effect to fetch document content based on documentId
  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notes")
        .select("data, name")
        .eq("id", documentId)
        .single();

      if (error) {
        console.error("Error fetching document:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setInitialContent(data.data);
        setNoteName(data.name);
      }

      setLoading(false);
    };

    fetchDocument();
  }, [documentId]);

  // Initialize tiptap editor with custom configurations
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "h-full",
      },
    },

    immediatelyRender: false,

    extensions: [
      Focus.configure({
        className: "outline-none",
        mode: "all",
      }),
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),

      Highlight,
    ],

    content: initialContent ? initialContent : "",

    onUpdate: async ({ editor }) => {
      const content = editor.getJSON();
      if (documentId) {
        const { error } = await supabase
          .from("notes")
          .update([
            {
              data: content,
              updated_at: new Date().toISOString(),
            },
          ])
          .eq("id", documentId);

        if (error) {
          console.error("Error updating document:", error);
        }
      }
    },
  });

  const limit = 25;

  const name = useEditor({
    extensions: [CharacterCount.configure({ limit }), StarterKit],
    content: noteName,
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter") {
          event.preventDefault();
          return true;
        }
        return false;
      },
    },
    onUpdate: async ({ editor }) => {
      const content = editor.getJSON();
      if (documentId) {
        const { error } = await supabase
          .from("notes")
          .update([
            {
              name: content.content?.[0]?.content?.[0]?.text,
              updated_at: new Date().toISOString(),
            },
          ])
          .eq("id", documentId);

        if (error) {
          console.error("Error updating document's name:", error);
        }
      }
    },
  });

  // Effect to set initial content in the editor
  useEffect(() => {
    if (initialContent && editor) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  // Loading indicator
  if (loading) {
    return <Icon icon="line-md:loading-loop" />;
  }

  function handleNoteDelete(documentId: string) {
    supabase
      .from("notes")
      .delete()
      .eq("id", documentId)
      .then((response) => {
        if (response.error) {
          console.error("Error deleting document:", response.error);
        } else {
          console.log("Document deleted successfully");
          onDelete();
        }
      });
    setCurrentDocumentId(null);
    return currentDocumentId;
  }

  // Editor content and menu bar
  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-[calc(100%-2rem)] lg:w-1/2 h-[25rem] overflow-hidden shadow-xl relative">
      <div className="flex w-full items-center justify-between p-4 text-2xl bg-emerald-800">
        {/* NAME */}
        <EditorContent
          className="font-heading  font-bold w-full text-start text-emerald-200 "
          editor={name}
        />
        <button
          onClick={() => {
            handleNoteDelete(documentId);
          }}
          style={{ transition: "all 0.1s ease-in-out" }}
          className="text-red-300 hover:text-red-400 active:text-red-500"
        >
          <Icon icon="streamline:file-delete-alternate-solid" />
        </button>
      </div>

      {/* CONTENT */}
      <EditorContent
        className="font-body text-emerald-950 text-lg p-4 flex-1 w-full h-full overflow-y-scroll"
        {...props}
        editor={editor}
      />
      <EditorMenuBar editor={editor} />
    </div>
  );
};

export default TextEditor;
