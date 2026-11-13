import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam-search";
import { Card } from "@/components/ui/card";
import { tools } from "@/data/tools";

/**
 * Landing hero: tagline, then search bar below it.
 * No tool list here — matches surface in a dropdown as you type.
 */
export default function HomePage({ theme }: { theme: "dark" | "light" }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const blurTimer = useRef<number | null>(null);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return [];
    return tools.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [q]);
  const open = focused && q.length > 0;

  const go = (href: string) => {
    if (blurTimer.current) window.clearTimeout(blurTimer.current);
    navigate(href);
  };

  return (
    <section className="flex flex-1 flex-col justify-center px-5 py-14 text-center">
      <h1 className="mx-auto max-w-2xl text-5xl font-semibold tracking-tight text-balance md:text-6xl">
        Free tools that run in your browser
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        No accounts. No uploads. Every file stays on your device.
      </p>

      <div className="relative mx-auto mt-8 w-2xl text-left">
        <BorderBeam
          size="line"
          colorVariant="colorful"
          duration={3.1}
          borderRadius={20}
          theme={theme}
          className="w-full"
          style={{ width: "100%" }}
        >
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (blurTimer.current) window.clearTimeout(blurTimer.current);
                setFocused(true);
              }}
              onBlur={() => {
                blurTimer.current = window.setTimeout(
                  () => setFocused(false),
                  120
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (matches.length > 0) go(matches[0].href);
                  else go("/tools");
                }
                if (e.key === "Escape") setQuery("");
              }}
              placeholder="Search tools — try halftone, expo, latex…"
              aria-label="Search tools"
              aria-expanded={open}
              role="combobox"
              aria-controls="tool-suggestions"
              className="h-12 rounded-[20px] bg-popover pr-4 pl-10 text-[15px]"
            />
          </div>
        </BorderBeam>
        {open && (
          <div
            id="tool-suggestions"
            role="listbox"
            className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-md"
          >
            {matches.length === 0 ? (
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  No match — browse everything instead.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onMouseDown={() => go("/tools")}
                >
                  All tools
                </Button>
              </div>
            ) : (
              <ul>
                {matches.map((tool) => (
                  <li key={tool.slug}>
                    <button
                      type="button"
                      role="option"
                      aria-selected="false"
                      onMouseDown={() => go(tool.href)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
                    >
                      <span>
                        <span className="block text-sm font-medium">
                          {tool.title}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {tool.description}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  </li>
                ))}
                <li className="border-t border-border">
                  <button
                    type="button"
                    onMouseDown={() => go("/tools")}
                    className="w-full px-4 py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    View all tools
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            Trending tools
          </h2>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See more
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Card
                size="sm"
                className="h-full justify-center rounded-2xl py-0 transition-colors hover:bg-muted"
              >
                <Link
                  to={tool.href}
                  className="block px-3 py-2 text-center text-sm font-medium text-balance"
                  title={tool.description}
                >
                  {tool.title}
                </Link>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[13px] text-muted-foreground">
          Private by design <span aria-hidden="true">·</span> Free forever{" "}
          <span aria-hidden="true">·</span> Works offline
        </p>
      </div>
    </section>
  );
}
