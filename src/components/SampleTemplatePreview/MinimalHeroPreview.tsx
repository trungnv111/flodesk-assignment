import { ImageIcon } from "@/components/Icon/ImageIcon";

export default function MinimalHeroPreview({ handleSelect }: { handleSelect: (id: string) => void }) {
  return (
    <div
        onClick={() => handleSelect("minimal-hero")}
        className="template-card template-card--purple scale-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="template-card-header template-card-header--purple">
          <ImageIcon className="icon-lg icon-purple"/>
        </div>
        <div className="template-card-body">
          <h3 className="template-card-title">Minimal Hero</h3>
          <p className="template-card-description">
            Clean hero section with image and call-to-action
          </p>
        </div>
      </div>
  )
}
