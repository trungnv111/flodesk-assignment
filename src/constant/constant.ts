import type { HeadingSettings, ImageSettings, PageSettings, ParagraphSettings, TemplateName } from "@/types/template";

export const DEFAULT_IMAGE_SETTINGS: ImageSettings = {
  src: "",
  width: 600,
};

export const DEFAULT_HEADING_SETTINGS: HeadingSettings = {
  text: "",
  fontWeight: 700,
  color: "#000000",
  fontSize: 36,
};

export const DEFAULT_PARAGRAPH_SETTINGS: ParagraphSettings = {
  text: "",
  fontWeight: 300,
  color: "#000000",
  fontSize: 16,
};

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  bgColor: "#FFFFFF",
  pageWidth: 900,
};

export const DEFAULT_PAGE_SETTINGS_BY_TEMPLATE: Record<TemplateName, PageSettings> = {
  "minimal-hero": { ...DEFAULT_PAGE_SETTINGS, pageWidth: 950 },
  "content-focus": { ...DEFAULT_PAGE_SETTINGS, pageWidth: 850 },
  "portfolio-center": { ...DEFAULT_PAGE_SETTINGS },
};