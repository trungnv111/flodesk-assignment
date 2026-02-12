import type { ReactNode } from "react";
import { DownloadIcon } from "@/components/Icon/DownloadIcon";
import { useTemplateBuilder } from "@/context/TemplateBuilderContextStore";
import { templateInfo } from "@/data/template";
import BackIcon from "@/components/Icon/BackIcon";

type Props = {
  children: ReactNode;
  onExport?: () => void;
};

export function HorizontalHeader({ children, onExport }: Props) {
  const { state, selectTemplate, deselectElement } = useTemplateBuilder();
  const { selectedTemplate } = state;

  const backToTemplates = () => {
    deselectElement();
    selectTemplate(null);
  };
  return (
    <div className="layout-shell">
      <header className="layout-header">
        <div className="layout-header-left">
          {/* Back to templates button when in builder */}
          {selectedTemplate && (
            <button
              onClick={backToTemplates}
              className="layout-back-button"
              title="Back to templates"
            >
              <BackIcon />
            </button>
          )}
          <div className="layout-logo">
            <span className="layout-logo-text">F</span>
          </div>
          <div className="layout-title">
            <span className="layout-title-text">Template Builder</span>
            {selectedTemplate && (
              <span className="layout-subtitle">
                {templateInfo[selectedTemplate].name}
              </span>
            )}
          </div>
        </div>
        <button
            type="button"
            disabled={selectedTemplate === null}
            onClick={onExport}
            className="settings-button settings-button--primary"
          >
            <DownloadIcon />
            Export
          </button>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}
