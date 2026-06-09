"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { Bold, Italic, UnderlineIcon, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";

type RichTextEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
};

type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant={isActive ? "default" : "ghost"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "size-9 shrink-0 transition-colors",
        isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
      )}
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({
  value = "",
  onChange,
  className,
  editorClassName,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
      }),
      Underline,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[180px] w-full px-4 py-3 outline-none",
          "prose prose-sm dark:prose-invert max-w-none",
          editorClassName,
        ),
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      isBold: currentEditor?.isActive("bold"),
      isItalic: currentEditor?.isActive("italic"),
      isUnderline: currentEditor?.isActive("underline"),
      isBulletList: currentEditor?.isActive("bulletList"),
      isOrderedList: currentEditor?.isActive("orderedList"),
    }),
  });

  // Safe programmatic content updates
  React.useEffect(() => {
    // 1. Guard against uninitialized editor or schema
    if (!editor || !editor.schema) return;

    // 2. Wrap getHTML() evaluation safely
    try {
      const currentContent = editor.getHTML();
      if (value !== currentContent) {
        // Use a microtask/timeout if strict concurrent re-renders throw errors
        window.requestAnimationFrame(() => {
          if (editor && !editor.isDestroyed) {
            editor.commands.setContent(value, { emitUpdate: false });
          }
        });
      }
    } catch (error) {
      console.warn("Tiptap serialization guarded:", error);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="border">
        <div className="border-b h-12 w-full bg-input/30"></div>
        <div className="w-full min-h-45 bg-input/30 "></div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden  border bg-input/30", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editorState?.isBold}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editorState?.isItalic}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editorState?.isUnderline}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editorState?.isBulletList}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editorState?.isOrderedList}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
