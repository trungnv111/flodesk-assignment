import { useCallback, useMemo } from "react";
import type { MouseEvent } from "react";
import { DEFAULT_HEADING_SETTINGS, DEFAULT_PARAGRAPH_SETTINGS } from "@/constant/constant";
import type { TemplateBuilderContextType } from "@/context/TemplateBuilderContextStore";
import type { ElementType, SelectedElement } from "@/types/template";

export type DefaultTextMap = Record<string, string>;

type UseTemplateElementInteractionsArgs = {
  selectedElement: SelectedElement | null;
  selectElement: TemplateBuilderContextType["selectElement"];
  updateElement: TemplateBuilderContextType["updateElement"];
  getHeadingSettings: TemplateBuilderContextType["getHeadingSettings"];
  getParagraphSettings: TemplateBuilderContextType["getParagraphSettings"];
  defaultTextById: DefaultTextMap;
};

export function useTemplateElementInteractions({
  selectedElement,
  selectElement,
  updateElement,
  getHeadingSettings,
  getParagraphSettings,
  defaultTextById,
}: UseTemplateElementInteractionsArgs) {
  const selectedElementId = selectedElement?.id ?? null;

  const isSelected = useCallback(
    (id: string) => selectedElementId === id,
    [selectedElementId],
  );

  const getElementClasses = useCallback(
    (id: string) =>
      `element-selectable ${isSelected(id) ? "element-selected" : ""}`.trim(),
    [isSelected],
  );

  const ensureDefaultText = useCallback(
    (id: string, type: ElementType) => {
      if (type !== "heading" && type !== "paragraph") {
        return;
      }

      const defaultText = defaultTextById[id];
      if (!defaultText) {
        return;
      }

      const currentSettings =
        type === "heading" ? getHeadingSettings(id) : getParagraphSettings(id);

      const placeholderText =
        type === "heading"
          ? DEFAULT_HEADING_SETTINGS.text
          : DEFAULT_PARAGRAPH_SETTINGS.text;

      if (currentSettings.text === placeholderText) {
        updateElement(id, type, { text: defaultText });
      }
    },
    [defaultTextById, getHeadingSettings, getParagraphSettings, updateElement],
  );

  const handleElementClick = useCallback(
    (id: string, type: ElementType) =>
      (event: MouseEvent) => {
        event.stopPropagation();
        ensureDefaultText(id, type);
        selectElement({ id, type });
      },
    [ensureDefaultText, selectElement],
  );

  const createRemoveImageHandler = useCallback(
    (imageId: string) =>
      (event: MouseEvent) => {
        event.stopPropagation();
        updateElement(imageId, "image", { src: "" });
      },
    [updateElement],
  );

  return useMemo(
    () => ({
      isSelected,
      getElementClasses,
      handleElementClick,
      createRemoveImageHandler,
    }),
    [createRemoveImageHandler, getElementClasses, handleElementClick, isSelected],
  );
}
