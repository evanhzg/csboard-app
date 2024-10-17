"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TextEditor = ({ ...props }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>WIP 🌎️</p>",
  });

  return <EditorContent {...props} editor={editor} />;
};

export default TextEditor;
