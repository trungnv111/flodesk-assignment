import { useTemplateBuilder } from "@/context/TemplateBuilderContextStore";
import { useRef } from "react";

export function PageSettings() {
  const { state, updatePageSettings } = useTemplateBuilder();
  const { pageSettings } = state;
  // Page Settings State
  const bgColor = pageSettings.bgColor ?? "#FFFFFF";
  const pageWidth =
    typeof pageSettings.pageWidth === "number" ? pageSettings.pageWidth : 900;

  const colorInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2 className="settings-title">Page Settings</h2>
      </div>
      <div className="settings-sections">
        {/* Background Section */}
        <div>
          <h3 className="settings-section-title">
            Background color
          </h3>

          {/* Current color display and picker */}
          <div className="settings-color-row settings-color-row--spaced">
            <div
              className="settings-color-swatch"
              style={{ backgroundColor: bgColor }}
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
              value={bgColor}
              onChange={(e) => {
                const value = e.target.value;
                updatePageSettings({ bgColor: value });
              }}
              className="sr-only"
            />
          </div>
        </div>

        {/* Layout Section */}
        <div className="settings-section">
          <h3 className="settings-section-title">Layout</h3>

          {/* Page Width Slider */}
          <div className="settings-field">
            <div className="settings-range-row">
              <label className="settings-range-label">
                Page width
              </label>
              <span className="settings-range-value">
                {pageWidth}px
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="1400"
              step="50"
              value={pageWidth}
              onChange={(e) => {
                const value = Number(e.target.value);
                updatePageSettings({ pageWidth: value });
              }}
              className="settings-range-input settings-range-input--thick"
              style={{
                background: `linear-gradient(to right, #7C3AED 0%, #6B46C1 ${((pageWidth - 800) / 600) * 100}%, #E5E7EB ${((pageWidth - 800) / 600) * 100}%, #E5E7EB 100%)`,
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
