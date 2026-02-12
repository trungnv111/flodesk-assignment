'use client';

import { useTemplateBuilder } from '@/context/TemplateBuilderContextStore';
import EmailIcon from '@/components/Icon/EmailIcon';
import type { ElementType } from '@/types/template';
import { DEFAULT_HEADING_SETTINGS, DEFAULT_PARAGRAPH_SETTINGS } from '@/constant/constant';
import { minimalDefaults as defaults} from '@/data/template';

export default function MinimalHero() {
  const {
    state,
    selectElement,
    updateElement,
    getHeadingSettings,
    getParagraphSettings,
    getImageSettings,
  } = useTemplateBuilder();

  const { selectedElement, pageSettings } = state;

  const defaultTextById: Record<string, string> = {
    'minimal-hero-heading': defaults.heroTitle,
    'minimal-hero-paragraph': defaults.heroSubtitle,
    'minimal-features-heading': defaults.featuresTitle,
    'minimal-features-paragraph': defaults.featuresText,
    'minimal-testimonial-heading': defaults.testimonialTitle,
    'minimal-testimonial-quote': defaults.testimonialQuote,
    'minimal-testimonial-author': defaults.testimonialAuthor,
  };

  // Handle element click
  const handleElementClick = (e: React.MouseEvent, id: string, type: ElementType) => {
    e.stopPropagation();

    if (type === 'heading' || type === 'paragraph') {
      const defaultText = defaultTextById[id];
      if (defaultText) {
        const currentSettings =
          type === 'heading' ? getHeadingSettings(id) : getParagraphSettings(id);
        const placeholderText =
          type === 'heading'
            ? DEFAULT_HEADING_SETTINGS.text
            : DEFAULT_PARAGRAPH_SETTINGS.text;

        if (currentSettings.text === placeholderText) {
          updateElement(id, type, { text: defaultText });
        }
      }
    }

    selectElement({ id, type });
  };

  // Check if element is selected
  const isSelected = (id: string) => selectedElement?.id === id;

  // Get element class names
  const getElementClasses = (id: string) => {
    return `element-selectable ${isSelected(id) ? 'element-selected' : ''}`;
  };

  // Get settings for each element
  const heroImage = getImageSettings('template-builder-image');
  const mainHeading = getHeadingSettings('minimal-hero-heading');
  const subParagraph = getParagraphSettings('minimal-hero-paragraph');
  const featuresHeading = getHeadingSettings('minimal-features-heading');
  const featuresParagraph = getParagraphSettings('minimal-features-paragraph');
  const testimonialHeading = getHeadingSettings('minimal-testimonial-heading');
  const testimonialQuote = getParagraphSettings('minimal-testimonial-quote');
  const testimonialAuthor = getParagraphSettings('minimal-testimonial-author');

  return (
    <div
      className={`${selectedElement?.id ? '' : 'template-content-container'} minimal-hero`}
      style={{ backgroundColor: pageSettings.bgColor, width: pageSettings.pageWidth }}
    >
      {/* SECTION 1: HERO SECTION */}
      <section
        className="minimal-section"
      >
        <div className="minimal-section-container" style={{ maxWidth: `${pageSettings.pageWidth}px` }}>
          <div
            className={`${getElementClasses('template-builder-image')} template-builder-image`}
            style={{
              width: '100%',
              maxWidth: `${heroImage.width}px`,
            }}
            onClick={(e) => handleElementClick(e, 'template-builder-image', 'image')}
            data-hint="Click to edit image"
          >
            {heroImage.src ? (
              <img
                src={heroImage.src}
                alt="Hero"
                className="template-builder-image"
              />
            ) : (
              <div
                className="template-builder-image-placeholder"
              >
                {/* Email icon */}
                <div className="template-builder-image-icon">
                  <EmailIcon />
                  <span className="template-builder-image-label">Hero Image</span>
                </div>
              </div>
            )}
          </div>

          {/* Main Heading */}
          <h1
            className={`${getElementClasses('minimal-hero-heading')} minimal-hero-title`}
            style={{
              fontWeight: mainHeading.fontWeight,
              color: mainHeading.color,
              fontSize: `${mainHeading.fontSize}px`,
            }}
            onClick={(e) => handleElementClick(e, 'minimal-hero-heading', 'heading')}
            data-hint="Click to edit heading"
          >
            {mainHeading.text ? mainHeading.text : defaults.heroTitle}
          </h1>

          {/* Subheading Paragraph */}
          <p
            className={`${getElementClasses('minimal-hero-paragraph')} minimal-hero-subtitle`}
            style={{
              fontSize: `${subParagraph.fontSize}px`,
              fontWeight: subParagraph.fontWeight,
              color: subParagraph.color,
            }}
            onClick={(e) => handleElementClick(e, 'minimal-hero-paragraph', 'paragraph')}
            data-hint="Click to edit paragraph"
          >
            {subParagraph.text ? subParagraph.text : defaults.heroSubtitle}
          </p>

        </div>
      </section>

      {/* SECTION 2: FEATURES SECTION */}
      <section
        className="minimal-section"
        style={{ backgroundColor: pageSettings.bgColor }}
      >
        <div className="minimal-section-container" style={{ maxWidth: `${pageSettings.pageWidth}px` }}>
          {/* Section Heading */}
          <h2
            className={`${getElementClasses('minimal-features-heading')} minimal-section-title`}
            style={{
              fontSize: `${featuresHeading.fontSize}px`,
              fontWeight: featuresHeading.fontWeight,
              color: featuresHeading.color,
            }}
            onClick={(e) => handleElementClick(e, 'minimal-features-heading', 'heading')}
            data-hint="Click to edit heading"
          >
            {featuresHeading.text ? featuresHeading.text : defaults.featuresTitle}
          </h2>

          {/* Description Paragraph */}
          <p
            className={`${getElementClasses('minimal-features-paragraph')} minimal-section-text`}
            style={{
              fontSize: `${featuresParagraph.fontSize}px`,
              fontWeight: featuresParagraph.fontWeight,
              color: featuresParagraph.color,
            }}
            onClick={(e) => handleElementClick(e, 'minimal-features-paragraph', 'paragraph')}
            data-hint="Click to edit paragraph"
          >
            {featuresParagraph.text ? featuresParagraph.text : defaults.featuresText}
          </p>
        </div>
      </section>

      {/* SECTION 3: TESTIMONIAL SECTION */}
      <section
        className="minimal-section"
        style={{ backgroundColor: pageSettings.bgColor }}
      >
        <div className="minimal-section-container" style={{ maxWidth: `${pageSettings.pageWidth}px` }}>
          {/* Testimonial Heading */}
          <h2
            className={`${getElementClasses('minimal-testimonial-heading')} minimal-testimonial-title`}
            style={{
              fontSize: `${testimonialHeading.fontSize}px`,
              fontWeight: testimonialHeading.fontWeight,
              color: testimonialHeading.color,
            }}
            onClick={(e) => handleElementClick(e, 'minimal-testimonial-heading', 'heading')}
            data-hint="Click to edit heading"
          >
            {testimonialHeading.text ? testimonialHeading.text : defaults.testimonialTitle}
          </h2>

          {/* Quote Card */}
          <div className="minimal-testimonial-card">
            <p
              className={`${getElementClasses('minimal-testimonial-quote')} minimal-testimonial-quote`}
              style={{
                fontSize: `${testimonialQuote.fontSize}px`,
                fontWeight: testimonialQuote.fontWeight,
                color: testimonialQuote.color,
              }}
              onClick={(e) => handleElementClick(e, 'minimal-testimonial-quote', 'paragraph')}
              data-hint="Click to edit quote"
            >
              {testimonialQuote.text ? testimonialQuote.text : defaults.testimonialQuote}
            </p>
            <p
              className={`${getElementClasses('minimal-testimonial-author')} minimal-testimonial-author`}
              style={{
                fontSize: `${Math.max(12, (testimonialAuthor.fontSize ?? 16) - 4)}px`,
                fontWeight: testimonialAuthor.fontWeight,
                color: testimonialAuthor.color,
              }}
              onClick={(e) => handleElementClick(e, 'minimal-testimonial-author', 'paragraph')}
              data-hint="Click to edit author"
            >
              {testimonialAuthor.text ? testimonialAuthor.text : defaults.testimonialAuthor}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
