import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getFlavorCinematic, getFlavorImage, getFlavorPreview } from "../assets";
import { BrandLogo } from "../components/BrandLogo";
import { flavors, getFlavor, lines } from "../content";
import type { LineId } from "../domain";

const scoreLabels = {
  sweetness: "СЛАДОСТЬ",
  acidity: "КИСЛИНКА",
  freshness: "СВЕЖЕСТЬ",
  spice: "ПРЯНОСТЬ",
  tobacco: "ТАБАЧНОСТЬ",
};

const getExperienceFamily = (archetype: string) => {
  const value = archetype.toLowerCase();
  if (value.includes("berry")) return "berry";
  if (value.includes("tobacco")) return "tobacco";
  if (value.includes("botanical") || value.includes("citrus")) return "botanical";
  if (value.includes("drink")) return "drink";
  if (value.includes("dessert")) return "dessert";
  return "fruit";
};

const cinematicStories: Partial<Record<string, { emphasis: [string, string]; tone: string }>> = {
  pera: { emphasis: ["JUICY", "CRISP"], tone: "fruit" },
  cantalupo: { emphasis: ["RIPE", "VELVET"], tone: "fruit" },
  taste: { emphasis: ["BOLD", "FESTIVAL"], tone: "citrus" },
  truth: { emphasis: ["RAW", "HONEST"], tone: "tobacco" },
  goodness: { emphasis: ["NOBLE", "DEEP"], tone: "tobacco" },
  beauty: { emphasis: ["DEEP", "LAYERED"], tone: "tobacco" },
  "wild-strawberry": { emphasis: ["WILD", "DARK"], tone: "terror" },
  limoncello: { emphasis: ["BRIGHT", "BITTER"], tone: "citrus" },
  jenever: { emphasis: ["DRY", "BOTANICAL"], tone: "tobacco" },
  kriek: { emphasis: ["DARK", "TART"], tone: "terror" },
  abricot: { emphasis: ["TART", "SPICED"], tone: "fruit" },
  virgin: { emphasis: ["PURE", "MELLOW"], tone: "tobacco" },
  anejo: { emphasis: ["AGED", "BALANCED"], tone: "tobacco" },
  "ruby-grapes": { emphasis: ["RUBY", "JUICY"], tone: "fruit" },
  cookies: { emphasis: ["DARK", "RICH"], tone: "tobacco" },
};

const cinematicFrameSets: Partial<Record<string, string>> = {
  pera: "pera-frames",
  cantalupo: "cantalupo-frames",
  taste: "taste-frames",
  truth: "truth-frames",
  goodness: "goodness-frames",
  beauty: "beauty-frames",
  "wild-strawberry": "wild-strawberry-terror-frames",
  limoncello: "limoncello-frames",
  jenever: "jenever-frames",
  kriek: "kriek-frames",
  abricot: "abricot-frames",
  virgin: "virgin-frames",
  anejo: "anejo-frames",
  "ruby-grapes": "ruby-grapes-frames",
  cookies: "cookies-frames",
};

const variantFrameSets: Partial<Record<string, Partial<Record<LineId, string>>>> = {
  "wild-strawberry": { burley: "wild-strawberry-burley-frames", terror: "wild-strawberry-terror-frames" },
  abricot: { burley: "abricot-frames", terror: "abricot-terror-frames" },
  kriek: { burley: "kriek-frames", terror: "kriek-terror-frames" },
};

export default function FlavorPage() {
  const { slug = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const flavor = getFlavor(slug);
  const requestedLine = searchParams.get("line") as LineId | null;
  const [variant, setVariant] = useState<LineId>(() => requestedLine && flavor?.lines.includes(requestedLine) ? requestedLine : flavor?.lines[0] ?? "burley");
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);
  const storyRef = useRef<HTMLElement>(null);
  const storyCanvasRef = useRef<HTMLCanvasElement>(null);
  const cinematicFramesRef = useRef<HTMLImageElement[]>([]);
  const experienceFamily = getExperienceFamily(flavor?.archetype ?? "fruit");
  const cinematic = getFlavorCinematic(slug);

  useEffect(() => {
    const frameSet = variantFrameSets[slug]?.[variant] ?? cinematicFrameSets[slug];
    if (!frameSet) return;
    const frames = Array.from({ length: 76 }, (_, index) => {
      const image = new Image();
      image.src = `/media/higgsfield/cinematic/${frameSet}/frame-${String(index + 1).padStart(3, "0")}.webp`;
      return image;
    });
    cinematicFramesRef.current = frames;
    const drawFrame = (image: HTMLImageElement) => {
      const canvas = storyCanvasRef.current;
      if (!canvas || !image.naturalWidth) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      canvas.getContext("2d")?.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    };
    if (frames[0].complete) drawFrame(frames[0]);
    else frames[0].addEventListener("load", () => drawFrame(frames[0]), { once: true });
    return () => { cinematicFramesRef.current = []; };
  }, [slug, variant]);

  useEffect(() => {
    if (!flavor) return;
    const nextVariant = requestedLine && flavor.lines.includes(requestedLine) ? requestedLine : flavor.lines[0];
    setVariant(nextVariant);
  }, [flavor, requestedLine]);

  const selectVariant = (lineId: LineId) => {
    setVariant(lineId);
    setSearchParams({ line: lineId }, { replace: true });
  };

  useEffect(() => {
    if (!cinematicStories[slug] || !storyRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const updateChapter = () => {
      if (!storyRef.current) return;
      const bounds = storyRef.current.getBoundingClientRect();
      const scrollRange = Math.max(1, bounds.height - window.innerHeight);
      const storyProgress = Math.max(0, Math.min(1, -bounds.top / scrollRange));
      setActiveStoryChapter(Math.min(3, Math.round(storyProgress * 3)));

      if (!reducedMotion) {
        const frames = cinematicFramesRef.current;
        const image = frames[Math.round(storyProgress * (frames.length - 1))];
        const canvas = storyCanvasRef.current;
        if (canvas && image?.complete && image.naturalWidth) {
          const ratio = window.devicePixelRatio || 1;
          if (canvas.width !== Math.round(canvas.clientWidth * ratio)) canvas.width = Math.round(canvas.clientWidth * ratio);
          if (canvas.height !== Math.round(canvas.clientHeight * ratio)) canvas.height = Math.round(canvas.clientHeight * ratio);
          const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
          const width = image.naturalWidth * scale;
          const height = image.naturalHeight * scale;
          canvas.getContext("2d")?.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
        }
      }
    };
    updateChapter();
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);

    return () => {
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
    };
  }, [slug]);
  const nextFlavor = useMemo(() => {
    const index = flavors.findIndex((item) => item.slug === slug);
    return flavors[(index + 1) % flavors.length];
  }, [slug]);

  if (!flavor) {
    return <main className="not-found"><BrandLogo /><h1>АРОМАТ НЕ НАЙДЕН</h1><Link to="/">Вернуться в каталог</Link></main>;
  }

  const story = cinematicStories[flavor.slug];
  const statementWords = flavor.shortDescription.split(" ");
  const statementLead = statementWords.slice(0, Math.min(3, statementWords.length)).join(" ");
  const statementRest = statementWords.slice(Math.min(3, statementWords.length)).join(" ");
  const cinematicMatchesVariant = Boolean(variantFrameSets[flavor.slug]?.[variant] ?? cinematicFrameSets[flavor.slug]);
  const hasCinematicStory = Boolean(story && cinematic && cinematicMatchesVariant);

  return (
    <main className={`flavor-page flavor-page--${variant}`}>
      <header className="flavor-topbar">
        <BrandLogo inverted />
        <Link to="/" className="back-link"><i aria-hidden="true" />КАТАЛОГ</Link>
      </header>

      {hasCinematicStory && story ? (
        <section ref={storyRef} className={`pera-story pera-story--${story.tone}`} style={{ "--story-chapter": activeStoryChapter } as CSSProperties}>
          <div className="pera-story__stage">
            <canvas ref={storyCanvasRef} className="pera-story__film" aria-label={`${flavor.name} — кинематографическая сцена вкуса`} />
            <img className="pera-story__poster" src={getFlavorImage(flavor.slug, variant)} alt="" />
            <div className="pera-story__shade" />
            <div className="pera-story__progress" aria-hidden="true"><i /></div>
            {flavor.lines.length > 1 ? (
              <div className="pera-story__variants" aria-label="Вариант линейки">
                {flavor.lines.map((lineId) => <button key={lineId} className={variant === lineId ? "is-active" : ""} onClick={() => selectVariant(lineId)}>{lines.find((line) => line.id === lineId)?.name}</button>)}
              </div>
            ) : null}
          </div>
          <div className="pera-story__chapters">
            <section data-story-chapter="0" className={activeStoryChapter === 0 ? "is-active" : ""}>
              <span>{lines.find((line) => line.id === variant)?.name} / {flavor.archetype.toUpperCase()}</span>
              <h1>{flavor.name}</h1>
              <p className="pera-story__cue">ЛИСТАЙТЕ, ЧТОБЫ РАСКРЫТЬ ВКУС</p>
            </section>
            <section data-story-chapter="1" className={activeStoryChapter === 1 ? "is-active" : ""}>
              {story.tone === "tobacco" ? <span>PURE BURLEY / NO AROMA</span> : null}
              <p className="pera-story__statement"><span>{statementLead}</span>{" "}{statementRest}</p>
            </section>
            <section data-story-chapter="2" className={activeStoryChapter === 2 ? "is-active" : ""}>
              <strong>{story.emphasis[0]}<br />{story.emphasis[1]}</strong>
              <p>{flavor.fullDescription}</p>
            </section>
            <section data-story-chapter="3" className={activeStoryChapter === 3 ? "is-active" : ""}>
              <span>PROFILE / {flavor.profile.toUpperCase()}</span>
              <h2>FLAVOR<br />NOTES</h2>
              <div className="pera-story__notes">{flavor.notes.map((note, index) => <p key={note}><i>{String(index + 1).padStart(2, "0")}</i>{note}</p>)}</div>
            </section>
          </div>
        </section>
      ) : (
      <>
      <section className={`flavor-hero${flavor.name.length > 10 ? " flavor-hero--long" : ""}`}>
        <div className="flavor-hero__title">
          <span>{lines.find((line) => line.id === variant)?.name} / {flavor.archetype.toUpperCase()}</span>
          <h1>{flavor.name}</h1>
        </div>
        <div className="flavor-hero__visual">
          <div className="orbit orbit--one" /><div className="orbit orbit--two" />
          <img src={getFlavorImage(flavor.slug, variant)} alt={`${flavor.name}, упаковка ${variant}`} />
        </div>
        <p>{flavor.shortDescription}</p>
        {flavor.lines.length > 1 ? (
          <div className="variant-switcher" aria-label="Вариант линейки">
            {flavor.lines.map((lineId) => <button key={lineId} className={variant === lineId ? "is-active" : ""} onClick={() => selectVariant(lineId)}>{lines.find((line) => line.id === lineId)?.name}</button>)}
          </div>
        ) : null}
      </section>

      <section id="experience" className={`experience experience--${experienceFamily}${cinematic ? " experience--cinematic" : ""}`}>
        <div className="experience__sticky">
          <span>{cinematic ? "CINEMATIC EXPERIENCE" : "STANDARD EXPERIENCE"}</span>
          {cinematic ? (
            <>
              <video
                className="experience__film"
                src={cinematic}
                poster={getFlavorImage(flavor.slug, variant)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              <img className="experience__fallback" src={getFlavorImage(flavor.slug, variant)} alt="" />
            </>
          ) : (
            <>
              <div className="experience__word" aria-hidden="true">{flavor.notes[0]}</div>
              <img src={getFlavorImage(flavor.slug, variant)} alt="" />
            </>
          )}
        </div>
      </section>

      <section className="flavor-copy">
        <span>PROFILE / {flavor.profile.toUpperCase()}</span>
        <p>{flavor.fullDescription}</p>
      </section>

      <section className="notes">
        <h2>FLAVOR<br />NOTES</h2>
        <div>{flavor.notes.map((note, index) => <span key={note}><i>{String(index + 1).padStart(2, "0")}</i>{note}</span>)}</div>
      </section>
      </>
      )}

      <section className="scores">
        <p>* Редакторская интерпретация описания, не официальные характеристики производителя.</p>
        {Object.entries(flavor.scores).map(([key, score]) => (
          <div key={key} className="score-row">
            <span>{scoreLabels[key as keyof typeof scoreLabels]}</span>
            <div aria-label={`${score} из 5`}><i style={{ width: `${score * 20}%` }} /></div>
            <strong>{score}/5</strong>
          </div>
        ))}
      </section>

      <Link className="next-flavor" to={`/flavors/${nextFlavor.slug}?line=${nextFlavor.lines[0]}`}>
        <span className="next-flavor__label">СЛЕДУЮЩИЙ АРОМАТ</span>
        <strong>{nextFlavor.name}</strong>
        <img src={getFlavorPreview(nextFlavor.slug)} alt="" />
      </Link>
    </main>
  );
}
