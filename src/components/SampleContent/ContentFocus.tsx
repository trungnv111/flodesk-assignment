import { useTemplateBuilder } from "@/context/TemplateBuilderContextStore";
import { ImageIcon } from "@/components/Icon/ImageIcon";
import { type ElementType } from "@/types/template";
import {
  DEFAULT_HEADING_SETTINGS,
  DEFAULT_PARAGRAPH_SETTINGS,
} from "@/constant/constant";
import { contentDefaults as defaults } from "@/data/template";

export default function ContentFocus() {
  const {
    state,
    selectElement,
    updateElement,
    getHeadingSettings,
    getParagraphSettings,
    getImageSettings,
  } = useTemplateBuilder();

  const { selectedElement, pageSettings } = state;

  // Check if element is selected
  const isSelected = (id: string) => selectedElement?.id === id;

  // Get element class names
  const getElementClasses = (id: string) => {
    return `element-selectable ${isSelected(id) ? "element-selected" : ""}`;
  };

  // Get settings for each element
  const titleHeading = getHeadingSettings("content-title");
  const subtitleParagraph = getParagraphSettings("content-subtitle");
  const metaParagraph = getParagraphSettings("content-meta");
  const featuredImage = getImageSettings("content-featured-image");
  const introParagraph = getParagraphSettings("content-intro");
  const section1Heading = getHeadingSettings("content-section1-heading");
  const section1Paragraph = getParagraphSettings("content-section1-paragraph");
  const ctaHeading = getHeadingSettings("content-cta-heading");

  // Default content
  

  const defaultTextById: Record<string, string> = {
    "content-title": defaults.title,
    "content-subtitle": defaults.subtitle,
    "content-meta": defaults.meta,
    "content-intro": defaults.intro,
    "content-section1-heading": defaults.section1Title,
    "content-section1-paragraph": defaults.section1Text,
    "content-cta-heading": defaults.ctaTitle,
  };

  const handleElementClick = (
    e: React.MouseEvent,
    id: string,
    type: ElementType,
  ) => {
    e.stopPropagation();

    if (type === "heading" || type === "paragraph") {
      const defaultText = defaultTextById[id];
      if (defaultText) {
        const currentSettings =
          type === "heading"
            ? getHeadingSettings(id)
            : getParagraphSettings(id);
        const placeholderText =
          type === "heading"
            ? DEFAULT_HEADING_SETTINGS.text
            : DEFAULT_PARAGRAPH_SETTINGS.text;

        if (currentSettings.text === placeholderText) {
          updateElement(id, type, { text: defaultText });
        }
      }
    }

    selectElement({ id, type });
  };

  return (
    <div
      className={`${selectedElement?.id ? "" : "template-content-container"} content-focus`}
      style={{
        backgroundColor: pageSettings.bgColor,
        width: pageSettings.pageWidth,
      }}
    >
      <section className="content-section content-section--large">
        <div
          className="content-container"
          style={{ maxWidth: `${Math.min(pageSettings.pageWidth, 750)}px` }}
        >
          <h1
            className={`${getElementClasses("content-title")} content-title`}
            style={{
              fontWeight: titleHeading.fontWeight,
              color: titleHeading.color,
              fontSize: `${titleHeading.fontSize}px`,
            }}
            onClick={(e) => handleElementClick(e, "content-title", "heading")}
            data-hint="Click to edit title"
          >
            {titleHeading.text ? titleHeading.text : defaults.title}
          </h1>
          <p
            className={`${getElementClasses("content-subtitle")} content-subtitle`}
            style={{
              color: subtitleParagraph.color,
              fontWeight: subtitleParagraph.fontWeight,
              fontSize: `${subtitleParagraph.fontSize}px`,
            }}
            onClick={(e) =>
              handleElementClick(e, "content-subtitle", "paragraph")
            }
            data-hint="Click to edit subtitle"
          >
            {subtitleParagraph.text
              ? subtitleParagraph.text
              : defaults.subtitle}
          </p>
          <p
            className={`${getElementClasses("content-meta")} content-meta`}
            style={{
              color:
                metaParagraph.color !== "#4a5568"
                  ? metaParagraph.color
                  : "#9ca3af",
              fontSize: `${metaParagraph.fontSize}px`,
            }}
            onClick={(e) => handleElementClick(e, "content-meta", "paragraph")}
            data-hint="Click to edit metadata"
          >
            {metaParagraph.text ? metaParagraph.text : defaults.meta}
          </p>
        </div>
      </section>

      <section className="content-section content-section--medium">
        <div
          className={`${getElementClasses("content-featured-image")} content-featured-image`}
          style={{
            width: "100%",
            maxWidth: `${featuredImage.width}px`,
          }}
          onClick={(e) =>
            handleElementClick(e, "content-featured-image", "image")
          }
          data-hint="Click to edit image"
        >
          {featuredImage.src ? (
            <img
              src={featuredImage.src}
              alt="Featured"
              className="template-builder-image"
            />
          ) : (
            <div
              className="content-featured-image-placeholder"
            >
              <div className="content-featured-image-icon">
                <ImageIcon />
                <span className="content-featured-image-label">
                  Featured Image
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="content-section content-section--medium">
        <div
          className="content-container"
          style={{ maxWidth: `${Math.min(pageSettings.pageWidth, 750)}px` }}
        >
          {/* Intro paragraph */}
          <p
            className={`${getElementClasses("content-intro")} content-intro`}
            style={{
              color: introParagraph.color,
              fontWeight: introParagraph.fontWeight,
              fontSize: `${introParagraph.fontSize}px`,
            }}
            onClick={(e) => handleElementClick(e, "content-intro", "paragraph")}
            data-hint="Click to edit intro"
          >
            {introParagraph.text ? introParagraph.text : defaults.intro}
          </p>

          {/* Section 1 */}
          <h2
            className={`${getElementClasses("content-section1-heading")} content-section-heading`}
            style={{
              fontWeight: section1Heading.fontWeight,
              color: section1Heading.color,
              fontSize: `${section1Heading.fontSize}px`,
            }}
            onClick={(e) =>
              handleElementClick(e, "content-section1-heading", "heading")
            }
            data-hint="Click to edit heading"
          >
            {section1Heading.text
              ? section1Heading.text
              : defaults.section1Title}
          </h2>
          <p
            className={`${getElementClasses("content-section1-paragraph")} content-section-paragraph`}
            style={{
              color: section1Paragraph.color,
              fontWeight: section1Paragraph.fontWeight,
              fontSize: `${section1Paragraph.fontSize}px`,
            }}
            onClick={(e) =>
              handleElementClick(e, "content-section1-paragraph", "paragraph")
            }
            data-hint="Click to edit paragraph"
          >
            {section1Paragraph.text
              ? section1Paragraph.text
              : defaults.section1Text}
          </p>
        </div>
      </section>

      <section className="content-section content-section--large">
        <div
          className="content-container content-container--center"
          style={{ maxWidth: `${Math.min(pageSettings.pageWidth, 700)}px` }}
        >
          <h2
            className={`${getElementClasses("content-cta-heading")} content-cta-heading`}
            style={{
              fontWeight: ctaHeading.fontWeight,
              color: ctaHeading.color,
              fontSize: `${ctaHeading.fontSize}px`,
            }}
            onClick={(e) =>
              handleElementClick(e, "content-cta-heading", "heading")
            }
            data-hint="Click to edit heading"
          >
            {ctaHeading.text ? ctaHeading.text : defaults.ctaTitle}
          </h2>
        </div>
      </section>
    </div>
  );
}
