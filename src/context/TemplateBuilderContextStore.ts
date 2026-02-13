import type {
  ElementType,
  HeadingSettings,
  ImageSettings,
  PageSettings,
  ParagraphSettings,
  SelectedElement,
  TemplateBuilderState,
  TemplateName,
} from "@/types/template";
import {
  DEFAULT_PAGE_SETTINGS,
  DEFAULT_PAGE_SETTINGS_BY_TEMPLATE,
} from "@/constant/constant";
import { createContext, useContext } from "react";

export type TemplateBuilderContextType = {
  state: TemplateBuilderState;
  dispatch: React.Dispatch<Action>;
  selectTemplate: (template: TemplateName | null) => void;
  selectElement: (element: SelectedElement | null) => void;
  updateElement: (
    id: string,
    type: ElementType,
    settings:
      | Partial<ImageSettings>
      | Partial<HeadingSettings>
      | Partial<ParagraphSettings>,
  ) => void;

  deselectElement: () => void;
  updatePageSettings: (settings: Partial<PageSettings>) => void;
  resetPageSettings: () => void;

  // Getters for element settings
  getImageSettings: (id: string) => ImageSettings;
  getHeadingSettings: (id: string) => HeadingSettings;
  getParagraphSettings: (id: string) => ParagraphSettings;
};

export type Action =
  | { type: "SELECT_TEMPLATE"; payload: TemplateName | null }
  | { type: "SELECT_ELEMENT"; payload: SelectedElement | null }
  | { type: "UPDATE_PAGE_SETTINGS"; payload: Partial<PageSettings> }
  | { type: "RESET_PAGE_SETTINGS" }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        id: string;
        type: ElementType;
        settings: Partial<ImageSettings | HeadingSettings | ParagraphSettings>;
      };
    }
  | { type: "DESELECT_ELEMENT" };
export const TemplateBuilderContext =
  createContext<TemplateBuilderContextType | null>(null);

export const initialState: TemplateBuilderState = {
  selectedTemplate: null,
  selectedElement: null,
  pageSettings: DEFAULT_PAGE_SETTINGS,
  pageSettingsByTemplate: DEFAULT_PAGE_SETTINGS_BY_TEMPLATE,
  elements: {},
};

export function templateBuilderReducer(
  state: TemplateBuilderState,
  action: Action,
): TemplateBuilderState {
  switch (action.type) {
    case "SELECT_TEMPLATE":
      return {
        ...state,
        selectedTemplate: action.payload,
        pageSettings: action.payload
          ? (state.pageSettingsByTemplate[action.payload] ??
            DEFAULT_PAGE_SETTINGS)
          : DEFAULT_PAGE_SETTINGS,
      };
    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedElement: action.payload,
      };
    case "UPDATE_PAGE_SETTINGS":
      if (!state.selectedTemplate) {
        return {
          ...state,
          pageSettings: {
            ...state.pageSettings,
            ...action.payload,
          },
        };
      }

      return {
        ...state,
        pageSettings: {
          ...state.pageSettings,
          ...action.payload,
        },
        pageSettingsByTemplate: {
          ...state.pageSettingsByTemplate,
          [state.selectedTemplate]: {
            ...state.pageSettingsByTemplate[state.selectedTemplate],
            ...action.payload,
          },
        },
      };
    case "RESET_PAGE_SETTINGS":
      if (!state.selectedTemplate) {
        return {
          ...state,
          pageSettings: DEFAULT_PAGE_SETTINGS,
        };
      }

      return {
        ...state,
        pageSettings:
          DEFAULT_PAGE_SETTINGS_BY_TEMPLATE[state.selectedTemplate] ??
          DEFAULT_PAGE_SETTINGS,
        pageSettingsByTemplate: {
          ...state.pageSettingsByTemplate,
          [state.selectedTemplate]:
            DEFAULT_PAGE_SETTINGS_BY_TEMPLATE[state.selectedTemplate] ??
            DEFAULT_PAGE_SETTINGS,
        },
      };
    case "UPDATE_ELEMENT": {
      const { id, type, settings } = action.payload;
      const current = state.elements[id] || {};
      const currentTypeSettings = current[type] || {};

      return {
        ...state,
        elements: {
          ...state.elements,
          [id]: {
            ...current,
            [type]: {
              ...currentTypeSettings,
              ...settings,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

export function useTemplateBuilder() {
  const context = useContext(TemplateBuilderContext);
  if (!context) {
    throw new Error(
      "useTemplateBuilder must be used within a TemplateBuilderProvider",
    );
  }
  return context;
}
