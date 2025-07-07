import React, { useMemo } from "react";
import {
  JournalBlock,
  WellgorithmBlock,
} from "../types";
import { Rectagon } from "@/components/atoms/polygon/rectagon";

export const ViewJournal: React.FC<ViewJournalProps> = ({
  journal,
  width,
  previousBlock,
  nextBlock,
}) => {
  const chamferLength = useMemo(() => {
    if (!previousBlock) {
      return { topLeft: 100, topRight: 100 };
    }
    return 0;
  }, [previousBlock, nextBlock]);

  return (
    <Rectagon
      chamferLength={chamferLength}
      strokeWidth={0}
      className="bg-white px-[20px] py-[40px]"
      style={{ width }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: journal.content }}
        className="tiptap"
      ></div>
    </Rectagon>
  );
};

interface ViewJournalProps {
  journal: JournalBlock;
  width: number | string;
  previousBlock?: Partial<WellgorithmBlock>;
  nextBlock?: Partial<WellgorithmBlock>;
}
