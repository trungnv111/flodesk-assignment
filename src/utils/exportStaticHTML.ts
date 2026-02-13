import type {
  HeadingSettings,
  ImageSettings,
  PageSettings,
  ParagraphSettings,
  TemplateName,
} from "@/types/template";
import { minimalDefaults, contentDefaults } from "@/data/template";

type ExportDeps = {
  selectedTemplate: TemplateName;
  pageSettings: PageSettings;
  getImageSettings: (id: string) => ImageSettings;
  getHeadingSettings: (id: string) => HeadingSettings;
  getParagraphSettings: (id: string) => ParagraphSettings;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildStaticHtml = ({
  selectedTemplate,
  pageSettings,
  getImageSettings,
  getHeadingSettings,
  getParagraphSettings,
}: ExportDeps) => {
  const { pageWidth, bgColor } = pageSettings;

  const baseStyles = `
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body { margin: 0; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans"; color: #111827;}
      .page { width: 100%; }
      .container { width: ${pageWidth}px; margin: 0 auto; box-sizing: border-box; background: ${bgColor}; transform-origin: top center; }
    `;

  const minimalHeroStyles = `
      .template-builder-image { margin: 0 auto; }
      .template-builder-image,
      .template-builder-image-placeholder { width: 100%; height: 192px; }
      .template-builder-image { object-fit: cover; box-shadow: 0 20px 25px -10px rgba(0, 0, 0, 0.25); transition: box-shadow 200ms ease; display: block; }
      .template-builder-image:hover { box-shadow: 0 25px 35px -15px rgba(0, 0, 0, 0.35); }
      .template-builder-image-placeholder { background: linear-gradient(135deg, #a855f7, #ec4899, #fb923c); box-shadow: 0 20px 25px -10px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; transition: box-shadow 200ms ease; }
      .template-builder-image-placeholder:hover { box-shadow: 0 25px 35px -15px rgba(0, 0, 0, 0.35); }
      .template-builder-image-icon { display: flex; flex-direction: column; align-items: center; color: #ffffff; }
      .template-builder-image-label { font-size: 0.875rem; font-weight: 500; opacity: 0.8; }
      .minimal-hero { min-height: 100vh; width: 100%; }
      .minimal-section { width: 100%; padding: 48px 16px; }
      .minimal-section-container { margin: 0 auto; width: 100%; }
      .minimal-hero-title { margin-top: 32px; text-align: center; font-size: 2.25rem; line-height: 1.2; }
      .minimal-hero-subtitle { margin-top: 16px; max-width: 42rem; margin-left: auto; margin-right: auto; line-height: 1.7;}
      .minimal-section-title { margin-bottom: 24px; text-align: center; }
      .minimal-section-text { max-width: 48rem; margin-left: auto; margin-right: auto; line-height: 1.7; }
      .minimal-testimonial-title { margin-bottom: 32px; text-align: center; }
      .minimal-testimonial-card { background: #ffffff; border-radius: 16px; box-shadow: 0 18px 30px -15px rgba(17, 24, 39, 0.35); padding: 24px; border: 1px solid #ede9fe; max-width: 48rem; margin: 0 auto; }
      .minimal-testimonial-quote { font-style: italic; margin-bottom: 16px; }
      .minimal-testimonial-author { font-weight: 600; }
      @media (min-width: 768px) {
        .template-builder-image,
        .template-builder-image-placeholder { height: 256px; }
        .template-builder-image-label { font-size: 1rem; }
        .minimal-section { padding: 64px 32px; }
        .minimal-hero-title { margin-top: 48px; font-size: 2.5rem; }
        .minimal-hero-subtitle { margin-top: 24px; }
        .minimal-section-title { margin-bottom: 32px; }
        .minimal-testimonial-title { margin-bottom: 40px; }
        .minimal-testimonial-quote { margin-bottom: 24px; }
      }
      @media (min-width: 1024px) {
        .minimal-section { padding: 80px 32px; }
      }
    `;

    const contentFocusStyles = `
      .template-builder-image { margin: 0 auto; width: 100%; height: 192px; object-fit: cover; display: block; box-shadow: 0 20px 25px -10px rgba(0, 0, 0, 0.25); transition: box-shadow 200ms ease; }
      .template-builder-image:hover { box-shadow: 0 25px 35px -15px rgba(0, 0, 0, 0.35); }
      .content-section { width: 100%; padding: 32px 16px; }
      .content-section--large { padding: 48px 16px; }
      .content-section--medium { padding: 32px 16px; }
      .content-container { width: 100%; margin: 0 auto; }
      .content-container--center { text-align: center; }
      .content-title { margin: 0 0 16px 0; font-size: 2rem; line-height: 1.2; }
      .content-subtitle { margin: 0 0 24px 0; font-size: 1.125rem; line-height: 1.6; }
      .content-meta { font-size: 0.875rem; }
      .content-featured-image { margin: 0 auto; }
      .content-featured-image-placeholder { width: 100%; height: 256px; background: linear-gradient(135deg, #60a5fa, #a855f7, #ec4899); box-shadow: 0 15px 25px -10px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; transition: box-shadow 200ms ease; position: relative; overflow: hidden; }
      .content-featured-image-placeholder:hover { box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.35); }
      .content-featured-image-icon { display: flex; flex-direction: column; align-items: center; color: #ffffff; }
      .content-featured-image-label { font-size: 1.125rem; font-weight: 600; opacity: 0.9; }
      .content-intro { margin-bottom: 32px; font-size: 1.125rem; line-height: 1.7; }
      .content-section-heading { margin-top: 40px; margin-bottom: 16px; font-size: 1.5rem; }
      .content-section-paragraph { margin-bottom: 24px; line-height: 1.7; }
      .content-cta-heading { margin-bottom: 24px; font-size: 1.75rem; white-space: nowrap; }
      @media (min-width: 768px) {
        .template-builder-image { height: 256px; }
        .content-section--large { padding: 64px 32px; }
        .content-section--medium { padding: 48px 32px; }
        .content-featured-image-placeholder { height: 320px; }
      }
      @media (min-width: 1024px) {
        .content-featured-image-placeholder { height: 384px; }
      }
    `;

  const portfolioCenterStyles = `
      .muted { color: #6b7280; }
    `;

  const generateMinimalHeroHTML = () => {
    const heroImage = getImageSettings("template-builder-image");
    const mainHeading = getHeadingSettings("minimal-hero-heading");
    const subParagraph = getParagraphSettings("minimal-hero-paragraph");
    const featuresHeading = getHeadingSettings("minimal-features-heading");
    const featuresParagraph = getParagraphSettings(
      "minimal-features-paragraph",
    );
    const testimonialHeading = getHeadingSettings(
      "minimal-testimonial-heading",
    );
    const testimonialQuote = getParagraphSettings("minimal-testimonial-quote");
    const testimonialAuthor = getParagraphSettings(
      "minimal-testimonial-author",
    );

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minimal Hero</title>
    <style>${baseStyles}${minimalHeroStyles}</style>
  </head>
  <body>
    <div class="page">
      <div class="container">
        <section class="minimal-section">
          <div class="minimal-section-container">
            <div class="template-builder-image" style="max-width:${heroImage.width}px;">
            ${heroImage.src ? `<img src="${escapeHtml(heroImage.src)}" alt="Hero" class="template-builder-image" />` : `<div class="template-builder-image-placeholder"><div class="template-builder-image-icon"><span class="template-builder-image-label">Hero Image</span></div></div>`}
            </div>
            <h1 class="minimal-hero-title" style="font-size:${mainHeading.fontSize}px; font-weight:${mainHeading.fontWeight}; color:${mainHeading.color};">${escapeHtml(mainHeading.text || minimalDefaults.heroTitle)}</h1>
            <p class="minimal-hero-subtitle" style="font-size:${subParagraph.fontSize}px; font-weight:${subParagraph.fontWeight}; color:${subParagraph.color};">${escapeHtml(subParagraph.text || minimalDefaults.heroSubtitle)}</p>
          </div>
        </section>
        <section class="minimal-section">
          <div class="minimal-section-container">
            <h2 class="minimal-section-title" style="font-size:${featuresHeading.fontSize}px; font-weight:${featuresHeading.fontWeight}; color:${featuresHeading.color};">${escapeHtml(featuresHeading.text || minimalDefaults.featuresTitle)}</h2>
            <p class="minimal-section-text" style="font-size:${featuresParagraph.fontSize}px; font-weight:${featuresParagraph.fontWeight}; color:${featuresParagraph.color};">${escapeHtml(featuresParagraph.text || minimalDefaults.featuresText)}</p>
          </div>
        </section>
        <section class="minimal-section">
          <div class="minimal-section-container">
            <h2 class="minimal-testimonial-title" style="font-size:${testimonialHeading.fontSize}px; font-weight:${testimonialHeading.fontWeight}; color:${testimonialHeading.color};">${escapeHtml(testimonialHeading.text || minimalDefaults.testimonialTitle)}</h2>
            <div class="minimal-testimonial-card">
              <p class="minimal-testimonial-quote" style="font-size:${testimonialQuote.fontSize}px; font-weight:${testimonialQuote.fontWeight}; color:${testimonialQuote.color};">${escapeHtml(testimonialQuote.text || minimalDefaults.testimonialQuote)}</p>
              <p class="minimal-testimonial-author" style="font-size:${Math.max(12, testimonialAuthor.fontSize - 4)}px; font-weight:${testimonialAuthor.fontWeight}; color:${testimonialAuthor.color};">${escapeHtml(testimonialAuthor.text || minimalDefaults.testimonialAuthor)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </body>
</html>`;
  };

  const generateContentFocusHTML = () => {
    const titleHeading = getHeadingSettings("content-title");
    const subtitleParagraph = getParagraphSettings("content-subtitle");
    const metaParagraph = getParagraphSettings("content-meta");
    const featuredImage = getImageSettings("content-featured-image");
    const introParagraph = getParagraphSettings("content-intro");
    const section1Heading = getHeadingSettings("content-section1-heading");
    const section1Paragraph = getParagraphSettings(
      "content-section1-paragraph",
    );
    const ctaHeading = getHeadingSettings("content-cta-heading");

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Focus</title>
    <style>${baseStyles}${contentFocusStyles}</style>
  </head>
  <body>
    <div class="page">
      <div class="container">
        <section class="content-section content-section--large">
          <div class="content-container" style="max-width:${Math.min(pageWidth, 900)}px;">
            <h1 class="content-title" style="font-size:${titleHeading.fontSize}px; font-weight:${titleHeading.fontWeight}; color:${titleHeading.color};">${escapeHtml(titleHeading.text || contentDefaults.title)}</h1>
            <p class="content-subtitle" style="font-size:${subtitleParagraph.fontSize}px; font-weight:${subtitleParagraph.fontWeight}; color:${subtitleParagraph.color};">${escapeHtml(subtitleParagraph.text || contentDefaults.subtitle)}</p>
            <p class="content-meta" style="font-size:${metaParagraph.fontSize}px; font-weight:${metaParagraph.fontWeight}; color:${metaParagraph.color !== "#4a5568" ? metaParagraph.color : "#9ca3af"};">${escapeHtml(metaParagraph.text || contentDefaults.meta)}</p>
          </div>
        </section>
        <section class="content-section content-section--medium">
          <div class="content-featured-image" style="max-width:${featuredImage.width}px;">
            ${featuredImage.src ? `<img src="${escapeHtml(featuredImage.src)}" alt="Featured" class="template-builder-image" />` : `<div class="content-featured-image-placeholder"><div class="content-featured-image-icon"><span class="content-featured-image-label">Featured Image</span></div></div>`}
          </div>
        </section>
        <section class="content-section content-section--medium">
          <div class="content-container" style="max-width:${Math.min(pageWidth, 750)}px;">
            <p class="content-intro" style="font-size:${introParagraph.fontSize}px; font-weight:${introParagraph.fontWeight}; color:${introParagraph.color};">${escapeHtml(introParagraph.text || contentDefaults.intro)}</p>
            <h2 class="content-section-heading" style="font-size:${section1Heading.fontSize}px; font-weight:${section1Heading.fontWeight}; color:${section1Heading.color};">${escapeHtml(section1Heading.text || contentDefaults.section1Title)}</h2>
            <p class="content-section-paragraph" style="font-size:${section1Paragraph.fontSize}px; font-weight:${section1Paragraph.fontWeight}; color:${section1Paragraph.color};">${escapeHtml(section1Paragraph.text || contentDefaults.section1Text)}</p>
          </div>
        </section>
        <section class="content-section content-section--large">
          <div class="content-container content-container--center" style="max-width:${Math.min(pageWidth, 700)}px;">
            <h2 class="content-cta-heading" style="font-size:${ctaHeading.fontSize}px; font-weight:${ctaHeading.fontWeight}; color:${ctaHeading.color};">${escapeHtml(ctaHeading.text || contentDefaults.ctaTitle)}</h2>
          </div>
        </section>
      </div>
    </div>
  </body>
</html>`;
  };

  const generatePortfolioFocusHTML = () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Just sample page </title>
    <style>${baseStyles}${portfolioCenterStyles}</style>
  </head>
  <body>
    <div class="page">
      <div class="container">
        <section class="section">
          <h1>Just sample page</h1>
          <p class="muted">No content here.</p>
        </section>
      </div>
    </div>
  </body>
</html>`;

  if (selectedTemplate === "minimal-hero") {
    return generateMinimalHeroHTML();
  }

  if (selectedTemplate === "content-focus") {
    return generateContentFocusHTML();
  }

  return generatePortfolioFocusHTML();
};

export const exportStaticHtml = (deps: ExportDeps) => {
  const html = buildStaticHtml(deps);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${deps.selectedTemplate}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
