import React from "react";
import { JournalEditor } from "@/components/organisms/journal-editor/journal-editor";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";

export const EditJournal: React.FC<EditJournalProps> = ({
  content,
  onContentChange,
}) => {
  return (
    <div className="flex flex-col">
      <Trapezoid
        stroke="white"
        centerContent={false}
        slopeAngle={50}
        strokeWidth={4}
        className="grid h-[60px] grid-cols-2"
      >
        <button className="flex items-center justify-center border-r-[4px] border-r-[#DDBCD8] bg-[#8858B5]">
          <span className="text-[24px] font-bold text-color-2">free flow</span>
        </button>
        <button className="flex items-center justify-center">
          <span className="text-[24px] font-bold text-white">AI</span>
        </button>
      </Trapezoid>
      <div className="">
        <JournalEditor
          content={content ?? ""}
          onContentChange={onContentChange}
          editorContainerProps={{
            className: "h-[417px] w-[827px] bg-white",
          }}
        />
      </div>
    </div>
  );
};

interface EditJournalProps {
  content?: string;
  onContentChange: (content: string) => void;
}
