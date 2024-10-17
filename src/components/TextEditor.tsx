"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";

import Text from "@tiptap/extension-text";
import EditorMenuBar from "@/components/EditorMenuBar";
import "./TextEditor.css";

const CustomDocument = Document.extend({
  content: "heading block*",
});

const TextEditor = ({ ...props }) => {
  const editor = useEditor({
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
      Paragraph,
      Text,
    ],
    content:
      typeof window !== "undefined"
        ? window.localStorage.getItem("editor-content")
        : "",
    onUpdate: ({ editor }) => {
      window.localStorage.setItem("editor-content", editor.getHTML());
    },
  });

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
