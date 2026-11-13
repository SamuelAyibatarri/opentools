import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { GithubMark } from "@/components/icons";
import Dot from "@/components/animata/background/dot";
import Navbar from "@/components/layout/Navbar";
import AdBlockBanner from "@/components/ads/AdBlockBanner";
import GutterRails from "@/components/ads/GutterRails";
import { useAdBlockDetect } from "@/hooks/useAdBlockDetect";
import HomePage from "@/pages/HomePage";
import ToolsPage from "@/pages/ToolsPage";
import ToolPage from "@/pages/ToolPage";
import PrivacyPage from "@/pages/PrivacyPage";
import { Heart } from "lucide-react";

/** Tool detail pages only — landing, listing and privacy stay ad-free. */
function useShowAds() {
  const { pathname } = useLocation();
  return pathname.startsWith("/tools/");
}

function SiteShell({
  dark,
  onToggleTheme,
}: {
  dark: boolean;
  onToggleTheme: () => void;
}) {
  const showAds = useShowAds();
  const { isBlocked, dismiss } = useAdBlockDetect();

  return (
    <Dot
      color="var(--border)"
      size={1}
      spacing={12}
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--background)" }}
    >
      {showAds && isBlocked && <AdBlockBanner onDismiss={dismiss} />}
      {showAds && <GutterRails />}

      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col border-x border-border">
        <Navbar dark={dark} onToggleTheme={onToggleTheme} />
        <Separator />

        <main className="flex flex-1 flex-col">
          <Routes>
            <Route
              path="/"
              element={<HomePage theme={dark ? "dark" : "light"} />}
            />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<ToolsPage />} />
          </Routes>
        </main>

        <Separator />
        <footer className="flex flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground sm:flex-row">
          <span>OpenTools — curated open-source utilities</span>
          <span className="flex items-center">
            Made with
            <Heart size={12} className="mx-1.5" fill="currentColor" /> by &nbsp;
            <a
              href="https://github.com/SamuelAyibatarri"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Ayiba
            </a>
          </span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <a
              href="https://www.paypal.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Donate
            </a>
            <a
              href="https://github.com/SamuelAyibatarri/opentools"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OpenTools GitHub repository"
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <GithubMark className="size-4" />
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </Dot>
  );
}

function App() {
  const [dark, setDark] = useState(() =>
    typeof window === "undefined"
      ? false
      : (localStorage.getItem("theme") ??
          (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light")) === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <BrowserRouter>
      <SiteShell dark={dark} onToggleTheme={() => setDark((d) => !d)} />
    </BrowserRouter>
  );
}

export default App;
