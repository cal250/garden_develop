export type WellgorithmBlockType = "journal" | "quote" | "image";

export type Layout = "inline" | "bevel" | "full";

export interface WellgorithmBlock {
  id: string;
  type: WellgorithmBlockType;
  content: string;
  layout: Layout;
  background?: string;
  isRadialGradient?: boolean;
  fontSize?: number;
}

export interface JournalBlock extends WellgorithmBlock {
  type: "journal";
}

export interface QuoteBlock extends WellgorithmBlock {
  type: "quote";
}

export interface ImageBlock extends WellgorithmBlock {
  type: "image";
}

export type Wellgorithm = Array<JournalBlock | QuoteBlock | ImageBlock>;
