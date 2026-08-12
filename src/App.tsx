import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Loader } from "./components/Loader";
import { getFlavor } from "./content";

const HomePage = lazy(() => import("./pages/HomePage"));
const FlavorPage = lazy(() => import("./pages/FlavorPage"));

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = "https://trofimoff.tdistina.ru";
    const canonicalUrl = `${origin}${pathname === "/" ? "/" : pathname}`;
    const flavorSlug = pathname.match(/^\/flavors\/([^/]+)$/)?.[1];
    const flavor = flavorSlug ? getFlavor(decodeURIComponent(flavorSlug)) : undefined;
    const title = flavor ? `${flavor.displayName} — Trofimoff’s` : "Trofimoff’s — Flavor Catalogue";
    const description = flavor?.shortDescription ?? "Интерактивный каталог ароматов Trofimoff’s.";

    document.title = title;
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
  }, [pathname]);

  return null;
}

export default function App() {
  const [intro, setIntro] = useState(() => sessionStorage.getItem("trofimoffs-intro") !== "seen");

  const finishIntro = () => {
    sessionStorage.setItem("trofimoffs-intro", "seen");
    setIntro(false);
  };

  return (
    <>
      {intro ? <Loader onComplete={finishIntro} /> : null}
      <SeoHead />
      <ScrollReset />
      <Suspense fallback={<div className="route-loading">Загружаем коллекцию…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flavors/:slug" element={<FlavorPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}
