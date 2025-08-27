export interface ContextBlok {
  _uid: string;
  component: string;
  contextInfo?: StoryblokRichtext;
  contextImages?: Array<{
    filename: string;
    alt: string;
    id: number;
    title?: string;
  }>;
}