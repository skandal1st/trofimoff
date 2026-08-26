import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { getFlavorPreview } from "../assets";
import { BrandLogo } from "../components/BrandLogo";
import { SearchOverlay } from "../components/SearchOverlay";
import { flavors, lines } from "../content";
import type { LineId } from "../domain";

const getCategoryVisual = (lineId: LineId) =>
  lineId === "terror"
    ? "/media/higgsfield/categories/terror-v2.png"
    : lineId === "cigarro"
      ? "/products/scenes/connecticut-cigarro-scene-v1.png"
    : `/media/higgsfield/categories/${lineId}-v1.webp`;

const getCategoryVideo = (lineId: LineId) => lineId === "cigarro" ? undefined : `/media/higgsfield/categories/${lineId}-v2.mp4`;

export default function HomePage() {
  const [activeLine, setActiveLine] = useState<LineId>("burley");
  const [searchOpen, setSearchOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const categoryVideoRef = useRef<HTMLVideoElement>(null);
  const activeFlavors = useMemo(() => flavors.filter((flavor) => flavor.lines.includes(activeLine)), [activeLine]);
  const activeLineData = lines.find((line) => line.id === activeLine) ?? lines[0];
  const categoryVisual = getCategoryVisual(activeLine);

  useEffect(() => {
    const video = categoryVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [activeLine]);

  useLayoutEffect(() => {
    if (!stageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(stageRef.current.querySelectorAll(".stage__product, .stage__fruit"),
      { opacity: 0, scale: 1.04, filter: "blur(14px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power3.out" },
    );
  }, [activeLine]);

  const activateLine = (lineId: LineId) => setActiveLine(lineId);

  return (
    <main id="top">
      <section className={`hero hero--${activeLine}`}>
        <div className="hero__brand"><BrandLogo inverted /></div>
        <button className="hero__search" onClick={() => setSearchOpen(true)}>
          SEARCH <span aria-hidden="true" className="search-mark" />
        </button>
        <div className="stage" ref={stageRef} aria-live="polite">
          <div className="stage__label">COLLECTION / {activeLineData.number}</div>
          {getCategoryVideo(activeLine) ? (
            <video
              key={activeLine}
              ref={categoryVideoRef}
              className="stage__product stage__product--video"
              src={getCategoryVideo(activeLine)}
              poster={categoryVisual}
              aria-label={`Визуальный мир категории ${activeLineData.name}`}
              autoPlay
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img className="stage__product" src={categoryVisual} alt={`Линейка ${activeLineData.name}`} />
          )}
          <div className="stage__caption"><span>{activeLineData.name}</span><small>{activeLineData.description}</small></div>
        </div>
        <nav className="line-nav" aria-label="Линейки Trofimoff’s">
          {lines.map((line) => (
            <button
              key={line.id}
              className={activeLine === line.id ? "is-active" : ""}
              onMouseEnter={() => activateLine(line.id)}
              onFocus={() => activateLine(line.id)}
              onClick={() => {
                activateLine(line.id);
                document.querySelector("#flavors")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>{line.number}</span><strong>{line.name}</strong><em>{flavors.filter((flavor) => flavor.lines.includes(line.id)).length}</em>
              <img className="line-nav__thumb" src={getCategoryVisual(line.id)} alt="" />
            </button>
          ))}
          <a href="#about"><span>06</span><strong>ABOUT</strong></a>
        </nav>
      </section>

      <section className="flavor-index" id="flavors">
        <header>
          <h1>{lines.find((line) => line.id === activeLine)?.name}</h1>
          <p>{lines.find((line) => line.id === activeLine)?.description}</p>
        </header>
        <div className="flavor-list">
          {activeFlavors.map((flavor, index) => (
            <Link to={`/flavors/${flavor.slug}?line=${activeLine}`} key={`${flavor.slug}-${activeLine}`} className="flavor-row">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{flavor.name}</strong>
              <p>{flavor.notes.slice(0, 3).join(" · ")}</p>
              <img src={getFlavorPreview(flavor.slug, activeLine)} alt="" loading="lazy" />
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div><span>TROFIMOFF’S / SAINT-PETERSBURG</span><h2>ВКУС КАК<br />МАТЕРИАЛ.</h2></div>
      </section>

      <footer><BrandLogo /><span>Информационный каталог. Не является интернет-магазином.</span><a href="#top">НАВЕРХ</a></footer>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </main>
  );
}
