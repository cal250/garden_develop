import React from "react";
import { EditorProvider } from "@tiptap/react";
import { MenuBar } from "@/components/organisms/journal-editor/menu/menu-bar";
import { extensions } from "./extensions";

export const JournalEditor: React.FC<JournalEditorProps> = ({
  content,
  onContentChange,
  editorContainerProps,
}) => {
  return (
    <EditorProvider
      editorContainerProps={editorContainerProps}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => {
        onContentChange(editor.getHTML());
      }}
      slotBefore={<MenuBar />}
    />
  );
};

interface JournalEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  editorContainerProps?: React.HTMLAttributes<HTMLDivElement>;
}
