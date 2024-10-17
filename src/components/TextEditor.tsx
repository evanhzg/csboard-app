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
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
      Highlight,
      Paragraph,
      Text,
    ],
    content: "<p>WIP 🌎️</p>",
  });

  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-1/2 h-[25rem] overflow-hidden shadow-xl">
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
