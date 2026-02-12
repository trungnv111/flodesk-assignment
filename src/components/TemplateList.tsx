import MinimalHeroPreview from "@/components/SampleTemplatePreview/MinimalHeroPreview";
import ContentFocusPreview from "@/components/SampleTemplatePreview/ContentFocusPreview";
import PortfolioCenterPreview from "@/components/SampleTemplatePreview/PortfolioCenterPreview";
import { useTemplateBuilder } from "@/context/TemplateBuilderContextStore";

export function TemplateList() {
  const { state, selectTemplate } = useTemplateBuilder();

  return (
    <div className="template-grid">
      {/* Card 1: Minimal Hero */}
      <MinimalHeroPreview
        handleSelect={() => selectTemplate("minimal-hero")}
      />

      {/* Card 2: Content Focus */}
      <ContentFocusPreview
        handleSelect={() => selectTemplate("content-focus")}
      />

      {/* Card 3: Portfolio Grid */}
      <PortfolioCenterPreview
        handleSelect={() => selectTemplate("portfolio-center")}
      />
    </div>
  );
}

