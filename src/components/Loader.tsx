import { useEffect, useState } from "react";
import { getFlavorImage, logo } from "../assets";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = getFlavorImage("pera", "burley");
    const timer = window.setTimeout(() => setReady(true), 1400);
    image.onload = () => setReady(true);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(onComplete, 650);
    return () => window.clearTimeout(timer);
  }, [onComplete, ready]);

  return (
    <div className={`loader ${ready ? "loader--ready" : ""}`} aria-live="polite">
      <div className="loader__brand"><img src={logo} alt="Trofimoff’s" /></div>
      <span>ЗАГРУЖАЕМ КОЛЛЕКЦИЮ</span>
      <div className="loader__line" />
    </div>
  );
}
