export default function PortfolioCenter() {
  return (
    <div className="portfolio-center">
      {/* SECTION 1: HERO SECTION */}
      <section className="portfolio-hero-section">
        <div className="portfolio-container">
          {/* Hero Image */}
          <div
            className="portfolio-hero-image"
            data-element-type="image"
          >
            <svg
              className="portfolio-hero-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Main Heading */}
          <h1
            className="portfolio-hero-title"
            data-element-type="heading"
          >
            Create Portfolio Page
          </h1>

          {/* Subheading Paragraph */}
          <p
            className="portfolio-hero-subtitle"
            data-element-type="paragraph"
          >
            Build stunning landing pages with our intuitive page builder. No
            coding required, just pure creativity.
          </p>
        </div>
      </section>
    </div>
  );
}
