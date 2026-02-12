import MinimalHeroPreview from "@/components/SampleTemplatePreview/MinimalHeroPreview";
import ContentFocusPreview from "@/components/SampleTemplatePreview/ContentFocusPreview";
import PortfolioCenterPreview from "@/components/SampleTemplatePreview/PortfolioCenterPreview";
import { useTemplateBuilder } from "@/context/TemplateBuilderContextStore";

export function TemplateList() {
  const { selectTemplate } = useTemplateBuilder();

  return (
    <div className="template-grid">
      <MinimalHeroPreview
        handleSelect={() => selectTemplate("minimal-hero")}
      />

      <ContentFocusPreview
        handleSelect={() => selectTemplate("content-focus")}
      />

      <PortfolioCenterPreview
        handleSelect={() => selectTemplate("portfolio-center")}
      />
    </div>
  );
}

