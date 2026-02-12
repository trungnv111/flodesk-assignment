import type { ReactNode } from "react"
import { useReducer } from "react"
import {
  TemplateBuilderContext,
  initialState,
  templateBuilderReducer,
  type TemplateBuilderContextType,
} from "@/context/TemplateBuilderContextStore"
import {  type HeadingSettings, type ImageSettings, type PageSettings, type ParagraphSettings, type SelectedElement, type TemplateName } from "@/types/template";
import { DEFAULT_IMAGE_SETTINGS, DEFAULT_HEADING_SETTINGS, DEFAULT_PARAGRAPH_SETTINGS } from "@/constant/constant";

export function TemplateBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(templateBuilderReducer, initialState);

  const selectTemplate = (template: TemplateName | null) => {
    dispatch({ type: 'SELECT_TEMPLATE', payload: template });
  };

  const selectElement = (element: SelectedElement | null) => {
    dispatch({ type: "SELECT_ELEMENT", payload: element });
  };

  const updatePageSettings = (settings: Partial<PageSettings>) => {
    dispatch({ type: "UPDATE_PAGE_SETTINGS", payload: settings });
  };

  const resetPageSettings = () => {
    dispatch({ type: "RESET_PAGE_SETTINGS" });
  };

  const updateElement: TemplateBuilderContextType["updateElement"] = (
    id,
    type,
    settings,
  ) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id, type, settings } });
  };
  
  const deselectElement = () => {
    dispatch({ type: 'SELECT_ELEMENT', payload: null });
  };

  // Getters - return merged default + custom settings
  const getImageSettings = (id: string): ImageSettings => {
    const element = state.elements?.[id];
    return {
      ...DEFAULT_IMAGE_SETTINGS,
      ...(element?.image || {}),
    };
  };

  const getHeadingSettings = (id: string): HeadingSettings => {
    const element = state.elements?.[id];
    return {
      ...DEFAULT_HEADING_SETTINGS,
      ...(element?.heading || {}),
    };
  };

  const getParagraphSettings = (id: string): ParagraphSettings => {
    const element = state.elements?.[id];
    return {
      ...DEFAULT_PARAGRAPH_SETTINGS,
      ...(element?.paragraph || {}),
    };
  };

  const value = {
    state,
    dispatch,
    selectTemplate,
    selectElement,  
    deselectElement,
    updatePageSettings,
    resetPageSettings,
    updateElement,  
    getImageSettings, 
    getHeadingSettings,
    getParagraphSettings,
  };

  return (
    <TemplateBuilderContext.Provider value={value}>
      {children}
    </TemplateBuilderContext.Provider>
  );
}