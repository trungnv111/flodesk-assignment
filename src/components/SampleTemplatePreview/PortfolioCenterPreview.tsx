import { GridIcon } from "@/components/Icon/GridIcon";
import type { TemplateName } from "@/types/template";

export default function PortfolioCenterPreview({
  handleSelect,
}: {
  handleSelect: (id: TemplateName) => void;
}) {
  return (
    <div
      onClick={() => handleSelect("portfolio-center")}
      className="template-card template-card--purple scale-in"
      style={{ animationDelay: "100ms" }}
    >
      <div className="template-card-header template-card-header--pink">
        <GridIcon className="icon-lg icon-pink" />
      </div>
      <div className="template-card-body">
        <h3 className="template-card-title">Portfolio Center</h3>
        <p className="template-card-description">
          Clean hero section with image and call-to-action
        </p>
      </div>
    </div>
  );
}
