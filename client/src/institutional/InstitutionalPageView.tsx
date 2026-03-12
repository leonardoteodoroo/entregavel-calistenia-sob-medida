import { siteConfig } from "@/content/siteConfig";
import {
  type InstitutionalActionLink,
  type InstitutionalPageContent,
} from "@/content/institutionalPages";

function externalAttrs(link: InstitutionalActionLink) {
  if (!link.external) return {};
  return {
    target: "_blank",
    rel: "noreferrer noopener",
  };
}

export default function InstitutionalPageView({
  page,
}: {
  page: InstitutionalPageContent;
}) {
  return (
    <section
      id={page.slug}
      className="page-card mb-8 mt-2"
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
    >
      <p
        className="font-body mb-3"
        style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-rose)",
        }}
      >
        {page.sectionLabel}
      </p>

      <h1
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        {page.title}
      </h1>

      <p
        className="font-display mb-6"
        style={{
          fontSize: "1rem",
          color: "var(--color-taupe)",
          fontStyle: "italic",
        }}
      >
        {page.subtitle}
      </p>

      <div
        style={{
          width: "2.5rem",
          height: "1px",
          backgroundColor: "var(--color-rose)",
          marginBottom: "2rem",
        }}
      />

      {page.introParagraphs?.map(paragraph => (
        <p
          key={paragraph}
          className="font-body mb-4"
          style={{
            fontSize: "0.95rem",
            color: "var(--color-charcoal-light)",
            lineHeight: 1.75,
          }}
        >
          {paragraph}
        </p>
      ))}

      {page.infoCards?.length ? (
        <div
          className="grid gap-3 mb-6"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          }}
        >
          {page.infoCards.map(card => (
            <div
              key={card.label}
              className="rounded px-5 py-4"
              style={{
                backgroundColor:
                  card.tone === "subtle" ? "var(--color-ivory-dark)" : "white",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              <p
                className="font-body mb-1"
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-taupe)",
                  fontWeight: 500,
                }}
              >
                {card.label}
              </p>

              {card.href ? (
                <a
                  href={card.href}
                  className="font-body"
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-rose)",
                    fontWeight: 600,
                  }}
                >
                  {card.value}
                </a>
              ) : (
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-charcoal)",
                    fontWeight: 500,
                  }}
                >
                  {card.value}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {page.callout ? (
        <div
          className="px-5 py-4 rounded mb-6"
          style={{
            backgroundColor: "var(--color-rose-muted)",
            borderLeft: "3px solid var(--color-rose)",
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-charcoal-light)",
              lineHeight: 1.6,
            }}
          >
            {page.callout}
          </p>
        </div>
      ) : null}

      {page.actionLinks?.length ? (
        <div className="flex flex-wrap gap-2 mb-8">
          {page.actionLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              {...externalAttrs(link)}
              className="px-3 py-2 rounded font-body"
              style={{
                fontSize: "0.74rem",
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
                color: "var(--color-charcoal)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      {page.topics?.length ? (
        <div className="space-y-3 mb-6">
          {page.topics.map((topic, index) => (
            <div
              key={topic.title}
              className="rounded px-4 py-3"
              style={{
                backgroundColor:
                  index % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              <p
                className="font-body mb-1"
                style={{
                  fontSize: "0.88rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                {topic.title}
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-warm-gray)",
                  lineHeight: 1.65,
                }}
              >
                {topic.body}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {page.faqItems?.length ? (
        <>
          {page.faqTitle ? (
            <p
              className="font-body mb-4"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-taupe)",
              }}
            >
              {page.faqTitle}
            </p>
          ) : null}

          <div className="space-y-3">
            {page.faqItems.map((item, index) => (
              <div
                key={item.q}
                className="px-4 py-3 rounded"
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <p
                  className="font-body mb-1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.q}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {page.contactPrefix ? (
        <p
          className="font-body mt-6"
          style={{
            fontSize: "0.8rem",
            color: "var(--color-warm-gray)",
            lineHeight: 1.6,
          }}
        >
          {page.contactPrefix}{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            style={{ color: "var(--color-rose)", fontWeight: 600 }}
          >
            {siteConfig.supportEmail}
          </a>
        </p>
      ) : null}
    </section>
  );
}
