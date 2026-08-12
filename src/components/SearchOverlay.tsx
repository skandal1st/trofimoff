import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getFlavorPreview } from "../assets";
import { flavors } from "../content";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !overlayRef.current) return;
      const focusable = Array.from(overlayRef.current.querySelectorAll<HTMLElement>("button, input, a[href]"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  const results = useMemo(() => {
    if (!deferredQuery) return flavors.slice(0, 6);
    return flavors.filter((flavor) =>
      [flavor.name, flavor.displayName, flavor.profile, ...flavor.notes]
        .join(" ")
        .toLowerCase()
        .includes(deferredQuery),
    );
  }, [deferredQuery]);

  if (!open) return null;

  return (
    <div ref={overlayRef} className="search-overlay" role="dialog" aria-modal="true" aria-label="Поиск ароматов">
      <button className="search-overlay__close" onClick={onClose}>ЗАКРЫТЬ</button>
      <label htmlFor="flavor-search">ЧТО ВЫ ИЩЕТЕ?</label>
      <input
        ref={inputRef}
        id="flavor-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="strawberry"
        autoComplete="off"
      />
      <div className="search-results" aria-live="polite">
        {results.length ? results.map((flavor) => (
          <Link key={flavor.slug} to={`/flavors/${flavor.slug}`} onClick={onClose}>
            <img src={getFlavorPreview(flavor.slug)} alt="" />
            <span>{flavor.name}</span>
            <small>{flavor.lines.join(" / ").toUpperCase()}</small>
          </Link>
        )) : <p>Ничего не найдено. Попробуйте название или вкусовую ноту.</p>}
      </div>
    </div>
  );
}
