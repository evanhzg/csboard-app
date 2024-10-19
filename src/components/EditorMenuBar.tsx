import { BubbleMenu, FloatingMenu } from "@tiptap/react";
import React from "react";
import { Icon } from "@iconify/react";

interface EditorMenuBarProps {
  editor: any;
}

const EditorMenuBar: React.FC<EditorMenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu bg-white rounded-xl p-1 flex gap-2 shadow-xl"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          {/* BOLD */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded-md p-1 ${editor.isActive("bold") ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300" : "hover:bg-gray-100 active:bg-gray-200"}`}
          >
            <Icon icon="proicons:text-bold" />
          </button>

          {/* ITALIC */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded-md p-1 ${editor.isActive("italic") ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300" : "hover:bg-gray-100 active:bg-gray-200"}`}
          >
            <Icon icon="tabler:italic" />
          </button>

          {/* HIGHLIGHT */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`rounded-md p-1 ${editor.isActive("highlight") ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300" : "hover:bg-gray-100 active:bg-gray-200"}`}
          >
            <Icon icon="bx:highlight" />
          </button>

          {/* STRIKE */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`rounded-md p-1 ${editor.isActive("strike") ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300" : "hover:bg-gray-100 active:bg-gray-200"}`}
          >
            <Icon icon="uil:text-strike-through" />
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className="floating-menu bg-white rounded-xl p-1 flex gap-2 shadow-xl"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`rounded-md p-1 ${
              editor.isActive("paragraph")
                ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}
          >
            <Icon icon="flowbite:paragraph-solid" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`rounded-md p-1 ${
              editor.isActive("heading", { level: 1 })
                ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}
          >
            <Icon icon="gravity-ui:heading-1" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`rounded-md p-1 ${
              editor.isActive("heading", { level: 2 })
                ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}
          >
            <Icon icon="gravity-ui:heading-2" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded-md p-1 ${
              editor.isActive("bulletList")
                ? "bg-emerald-200 hover:bg-emerald-100 active:bg-emerald-300"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}
          >
            <Icon icon="carbon:list-bulleted" />
          </button>
        </FloatingMenu>
      )}
      <div className="button-group bg-emerald-400 w-full flex items-center justify-center gap-4 h-16">
        {/* PARAGRAPH */}
        <button
          style={{ transition: "all 0.1s ease-in-out" }}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`text-3xl rounded-md p-1 ${editor.isActive("paragraph") ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
        >
          <Icon icon="flowbite:paragraph-solid" />
        </button>
        {/* TITLE */}
        <button
          style={{ transition: "all 0.1s ease-in-out" }}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`text-3xl rounded-md p-1 ${editor.isActive("heading", { level: 1 }) ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
        >
          <Icon icon="gravity-ui:heading-1" />
        </button>
        {/* TITLE 2 */}
        <button
          style={{ transition: "all 0.1s ease-in-out" }}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`text-3xl rounded-md p-1 ${editor.isActive("heading", { level: 2 }) ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
        >
          <Icon icon="gravity-ui:heading-2" />
        </button>
        {/* TEXT DECO GROUP */}
        <div className="hidden lg:flex button-group bg-emerald-400 items-center justify-center gap-4 h-16">
          {/* HIGHLIGHT */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`text-3xl rounded-md p-1 ${editor.isActive("highlight") ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
          >
            <Icon icon="bx:highlight" />
          </button>
          {/* BOLD */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`text-3xl rounded-md p-1 ${editor.isActive("bold") ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
          >
            <Icon icon="proicons:text-bold" />
          </button>
          {/* STRIKE */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`text-3xl rounded-md p-1 ${editor.isActive("strike") ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
          >
            <Icon icon="uil:text-strike-through" />
          </button>
          {/* ITALIC */}
          <button
            style={{ transition: "all 0.1s ease-in-out" }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`text-3xl rounded-md p-1 ${editor.isActive("italic") ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 active:text-emerald-100" : "hover:bg-emerald-500 active:bg-emerald-700"}`}
          >
            <Icon icon="tabler:italic" />
          </button>
        </div>
      </div>
    </>
  );
};

export default EditorMenuBar;
