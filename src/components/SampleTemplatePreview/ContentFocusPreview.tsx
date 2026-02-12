export default function ContentFocusPreview({
  handleSelect,
}: {
  handleSelect: (templateId: string) => void;
}) {
  return (
    <div
      onClick={() => handleSelect("content-focus")}
      className="template-card template-card--blue"
    >
      <div className="template-card-header template-card-header--blue">
        <svg
          className="template-card-icon template-card-icon--blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <div className="template-card-body">
        <h3 className="template-card-title">Content Focus</h3>
        <p className="template-card-description">
          Perfect for blogs and long-form content
        </p>
      </div>
    </div>
  );
}
