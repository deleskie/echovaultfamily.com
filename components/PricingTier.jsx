export default function PricingTier({
  name,
  price,
  description,
  features,
  highlight,
  emphasized,
  tag,
  id,
  ctaLabel
}) {
  return (
    <article
      id={id}
      className={`card pricing-card ${emphasized ? "pricing-card--emphasized" : ""}`}
    >
      {tag && <p className="pricing-tag">{tag}</p>}
      <h2 className="pricing-name">{name}</h2>
      <p className="pricing-price">{price}</p>
      <p className="pricing-description">{description}</p>
      <ul className="pricing-features">
        {features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {highlight && <p className="pricing-highlight">{highlight}</p>}
      <button type="button" className="button button-primary button-full">
        {ctaLabel || `Choose ${name}`}
      </button>
    </article>
  );
}
