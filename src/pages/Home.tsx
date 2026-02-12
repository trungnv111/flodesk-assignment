import { HorizontalHeader } from "@/layouts/HorizontalHeader";
import { TemplateList } from "@/components/TemplateList";
import { useTemplateBuilder } from "@/context/TemplateBuilderContextStore";
import { useState } from "react";
import MinimalHero from "@/components/SampleContent/MinimalHero";
import ContentFocus from "@/components/SampleContent/ContentFocus";
import PortfolioCenter from "@/components/SampleContent/PortfolioCenter";
import { PageSettings } from "@/components/PageSettings";
import ElementSettings from "@/components/ElementSettings";
import HomeHintIcon from "@/components/Icon/HomeHintIcon";
import { exportStaticHtml } from "@/utils/exportStaticHTML";

export default function Home() {
  const {
    state,
    deselectElement,
    updateElement,
    getImageSettings,
    getHeadingSettings,
    getParagraphSettings,
  } = useTemplateBuilder();
  const { selectedTemplate, selectedElement } = state;
  const [showHint, setShowHint] = useState(true);
  const handleCanvasClick = () => {
    if (selectedTemplate) {
      deselectElement();
    }
  }

  const getCurrentElementSettings = () => {
    if (!selectedElement) return null;

    const { id, type } = selectedElement;
    switch (type) {
      case 'image':
        return { type, settings: getImageSettings(id) };
      case 'heading':
        return { type, settings: getHeadingSettings(id) };
      case 'paragraph':
        return { type, settings: getParagraphSettings(id) };
      default:
        return null;
    }
  };


  const currentElement = getCurrentElementSettings();

  const handleExport = () => {
    if (!selectedTemplate) return;
    exportStaticHtml({
      selectedTemplate,
      pageSettings: state.pageSettings,
      getImageSettings,
      getHeadingSettings,
      getParagraphSettings,
    });
  };

  
  return (
    <HorizontalHeader
      onExport={handleExport}
    >
      <div
        className={`home-canvas custom-scrollbar ${
          selectedTemplate === null
            ? "home-canvas--full"
            : "home-canvas--with-sidebar"
        }`}
        onClick={handleCanvasClick}
      >
        {selectedTemplate === null ? (
          <div className="home-empty-state">
            <div className="home-empty-inner fade-in">
              <div className="home-empty-title-wrap">
                <h1 className="home-empty-title">
                  Choose a template to start
                </h1>
              </div>
              <TemplateList />
            </div>
          </div>
        ) : (
          <div className="home-template-wrapper">
            {/* Onboarding hint - More prominent */}
            {showHint && (
              <div className="home-hint-banner">
                <div className="home-hint-left">
                  <div className="home-hint-icon pulse">
                    <HomeHintIcon />
                  </div>
                  <div>
                    <p className="home-hint-title">
                      Click any element to customize it
                    </p>
                    <p className="home-hint-subtitle">
                      Images, headings, paragraphs and more
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHint(false)}
                  className="home-hint-close"
                >
                  <svg
                    className="home-hint-close-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Template Content */}
            <div className="home-template-content">
              {selectedTemplate === "minimal-hero" && <MinimalHero />}
              {selectedTemplate === "content-focus" && <ContentFocus />}
              {selectedTemplate === "portfolio-center" && <PortfolioCenter />}
            </div>
          </div>
        )}
      </div>

      {selectedTemplate && (
        <div className="home-sidebar">
            {!selectedElement ? (<PageSettings />) 
          : (<ElementSettings selectedElement={selectedElement}
                  currentElement={currentElement}
                  updateElement={updateElement} />)}
        </div>
      )}
    </HorizontalHeader>
  );
}
