import { ButtonLink } from '../components/Button';
export default function NotFound() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="label muted">404</span>
        <h1 className="hero-title">Page not found</h1>
        <p>Check the address or return to the home page.</p>
        <div>
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
