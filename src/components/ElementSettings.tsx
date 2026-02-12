import { ImageIcon } from "@/components/Icon/ImageIcon";
import { ParagraphIcon } from "@/components/Icon/ParagraphIcon";
import type { CurrentElement, ImageSettings, SelectedElement } from "@/types/template";
import { HeadingIcon } from "@/components/Icon/HeadingIcon";
import { useRef } from "react";

type Props = {
  selectedElement: SelectedElement;
  currentElement: CurrentElement;
  updateElement: (
    id: string,
    type: "image" | "heading" | "paragraph",
    settings: Record<string, unknown>,
  ) => void;
};

const TextSettings =({
  elementType,
  settings,
  onChange,
}: {
  elementType: "heading" | "paragraph";
  settings: {
    text: string;
    fontWeight: number;
    color: string;
    fontSize: number;
  };
  onChange: (settings: Record<string, unknown>) => void;
}) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);

  const isHeading = elementType === "heading";
  const fontSizeMin = isHeading ? 24 : 12;
  const fontSizeMax = isHeading ? 64 : 28;
  return (
    <>
      <div>
        <label className="settings-label">
          Text color
        </label>
        <div className="settings-color-row">
          <div
            className="settings-color-swatch"
            style={{ backgroundColor: settings.color }}
            onClick={() => colorInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                colorInputRef.current?.click();
              }
            }}
          />
          <input
            ref={colorInputRef}
            type="color"
            value={settings.color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="sr-only"
          />
        </div>
      </div>
      <div>
        <label className="settings-label">
          Font weight
        </label>
        <div className="settings-weight-grid">
          {[
            { label: "Light", value: 300 },
            { label: "Regular", value: 500 },
            { label: "Bold", value: 700 },
          ].map((weight) => (
            <button
              key={weight.value}
              onClick={() => onChange({ fontWeight: weight.value })}
              className={`settings-weight-button ${
                settings.fontWeight === weight.value
                  ? "settings-weight-button--active"
                  : "settings-weight-button--inactive"
              }`}
              style={{ fontWeight: weight.value }}
            >
              {weight.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="settings-range-row">
          <label className="settings-range-label">Font size</label>
          <span className="settings-range-value">{settings.fontSize}px</span>
        </div>
        <input
          type="range"
          min={fontSizeMin}
          max={fontSizeMax}
          step="1"
          value={settings.fontSize}
          onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          className="settings-range-input"
          style={{
            background: `linear-gradient(to right, #6B46C1 0%, #6B46C1 ${((settings.fontSize - fontSizeMin) / (fontSizeMax - fontSizeMin)) * 100}%, #E5E7EB ${((settings.fontSize - fontSizeMin) / (fontSizeMax - fontSizeMin)) * 100}%, #E5E7EB 100%)`,
          }}
        />
      </div>
      <div>
        <label className="settings-label">
          {isHeading ? "Heading text" : "Paragraph text"}
        </label>
        <textarea
          rows={isHeading ? 3 : 5}
          value={settings.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder={
            isHeading ? "Enter your heading..." : "Enter your paragraph..."
          }
          className={`settings-textarea ${
            isHeading ? "settings-textarea--fixed" : ""
          }`}
        />
      </div>
    </>
  );
}

const ImageSetting = ({
  settings,
  onChange,
}: {
  settings: ImageSettings;
  onChange: (settings: Record<string, unknown>) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      onChange({ src: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div>
        <label className="settings-label">
          Image
        </label>
        <div className="settings-row">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="settings-button settings-button--primary"
          >
            Upload image
          </button>
          {settings.src ? (
            <button
              type="button"
              onClick={() => onChange({ src: "" })}
              className="settings-button settings-button--secondary"
            >
              Remove
            </button>
          ) : null}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="is-hidden"
        />
        {settings.src ? (
          <div className="settings-image-preview">
            <img
              src={settings.src}
              alt="Selected"
              className="settings-image-preview-img"
            />
          </div>
        ) : (
          <p className="settings-empty-text">No image selected</p>
        )}
      </div>

      <div>
        <div className="settings-range-row">
          <label className="settings-range-label">Width</label>
          <span className="settings-range-value">{settings.width}px</span>
        </div>
        <input
          type="range"
          min="200"
          max="1000"
          step="50"
          value={settings.width}
          onChange={(e) => onChange({ width: Number(e.target.value) })}
          className="settings-range-input"
          style={{
            background: `linear-gradient(to right, #6B46C1 0%, #6B46C1 ${((settings.width - 200) / 800) * 100}%, #E5E7EB ${((settings.width - 200) / 800) * 100}%, #E5E7EB 100%)`,
          }}
        />
      </div>
    </>
  );
}


export default function ElementSettings({
  selectedElement,
  currentElement,
  updateElement,
}: Props) {
  if (!currentElement) return null;

  const { id, type } = selectedElement;
  const { settings } = currentElement;

  const typeIcons: Record<string, React.ReactNode> = {
    image: <ImageIcon />,
    heading: <HeadingIcon />,
    paragraph: <ParagraphIcon />,
  };

  const typeLabels: Record<string, string> = {
    image: "Image",
    heading: "Heading",
    paragraph: "Paragraph",
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2 className="settings-title">
          Element Settings
        </h2>
      </div>
      <div className="settings-type">
        <div className="settings-type-icon">
          {typeIcons[type]}
        </div>
        <div>
          <h2 className="settings-type-label">
            {typeLabels[type]} 
          </h2>
        </div>
      </div>
      <div className="settings-sections">
        {type === "image" && (
          <ImageSetting
            settings={settings as ImageSettings}
            onChange={(newSettings) => updateElement(id, "image", newSettings)}
          />
        )}
        {type === "heading" && (
          <TextSettings
            elementType="heading"
            settings={
              settings as {
                text: string;
                fontWeight: number;
                color: string;
                fontSize: number;
              }
            }
            onChange={(newSettings) =>
              updateElement(id, "heading", newSettings)
            }
          />
        )}
        {type === "paragraph" && (
          <TextSettings
            elementType="paragraph"
            settings={
              settings as {
                text: string;
                fontWeight: number;
                color: string;
                fontSize: number;
              }
            }
            onChange={(newSettings) =>
              updateElement(id, "paragraph", newSettings)
            }
          />
        )}
        {/* Add other element settings components here */}
      </div>
    </div>
  );
}
