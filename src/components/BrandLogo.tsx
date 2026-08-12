import { Link } from "react-router-dom";
import { logo } from "../assets";

export function BrandLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className={`brand-logo ${inverted ? "brand-logo--inverted" : ""}`} aria-label="Trofimoff’s — на главную">
      <img src={logo} alt="Trofimoff’s" />
    </Link>
  );
}
