"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import EditorMenuBar from "@/components/EditorMenuBar";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./TextEditor.css";
import { Icon } from "@iconify/react/dist/iconify.js";

// Initialize Supabase client with environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// Custom document extension for tiptap editor
const CustomDocument = Document.extend({
  content: "heading block*",
});

const TextEditor = ({ documentId = "", ...props }: { documentId?: string }) => {
  // State to manage loading state and initial content
  const [loading, setLoading] = useState(true);
  const [initialContent, setInitialContent] = useState<any | null>(null);
  // State to manage the current document ID
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(
    documentId
  );

  // Effect to fetch document content based on documentId
  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notes")
        .select("data")
        .eq("id", documentId)
        .single();

      if (error) {
        console.error("Error fetching document:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setInitialContent(data.data);
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
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Title needed huh...";
          }

          return "Content needed huh...";
        },
      }),
      Highlight,
    ],

    content: initialContent ? initialContent : "",

    onUpdate: async ({ editor }) => {
      const content = editor.getJSON();
      if (!currentDocumentId) {
        const { data, error } = await supabase
          .from("notes")
          .insert([{ data: content, name: "Untitled", author: "Anonymous" }])
          .select("id")
          .single();

        if (error) {
          console.error("Error creating document:", error);
        } else {
          setCurrentDocumentId(data.id);
        }
      } else {
        const { error } = await supabase.from("notes").upsert([
          {
            id: currentDocumentId,
            data: content,
            name: "Untitled",
            author: "Anonymous",
          },
        ]);

        if (error) {
          console.error("Error updating document:", error);
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

  // Editor content and menu bar
  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-[calc(100%-2rem)] lg:w-1/2 h-[25rem] overflow-hidden shadow-xl">
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
