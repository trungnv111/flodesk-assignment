export type TemplateName = 'minimal-hero' | 'content-focus' | 'portfolio-center';

export interface TemplateBuilderState {
  // View state
  selectedTemplate: TemplateName | null;
  selectedElement: SelectedElement | null;

  pageSettings: PageSettings;
  pageSettingsByTemplate: Record<TemplateName, PageSettings>;
  elements: Record<string, ElementSettings>;
}

export type ElementType = 'image' | 'heading' | 'paragraph';

export interface SelectedElement {
  id: string;
  type: ElementType;
}

export interface ImageSettings {
  src?: string;
  width: number;
}

export interface ElementSettings {
  image?: ImageSettings;
  heading?: HeadingSettings;
  paragraph?: ParagraphSettings;
}

// Heading Element Settings
export interface HeadingSettings {
  text: string;
  fontWeight: number;
  color: string;
  fontSize: number;
}

// Paragraph Element Settings
export interface ParagraphSettings {
  text: string;
  fontWeight  : number;
  color: string;
  fontSize: number;
}

export interface PageSettings {
  bgColor: string;
  pageWidth: number;

}

export type CurrentElement =
  | { type: 'image'; settings: ImageSettings }
  | { type: 'heading'; settings: HeadingSettings }
  | { type: 'paragraph'; settings: ParagraphSettings }
  | null;