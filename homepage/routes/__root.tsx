import { createRootRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState, useEffect } from "react";
import { ScrollToTop } from "../src/components/ui/ScrollToTop";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <svg className="sr-only">
        <defs>
          <filter id="pencil-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </defs>
      </svg>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#5F7D61] focus:text-white focus:rounded-md"
      >
        Skip to content
      </a>
      <div className="min-h-screen overflow-x-hidden bg-[#FAF9F6] text-[#1B3022] selection:bg-[#D4A373]/30">
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6] md:bg-[#FAF9F6]/90 md:backdrop-blur-md border-b border-[#1B3022]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg className="w-7 h-7 md:w-8 md:h-8 text-[#1B3022]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5V5C4 3.89543 4.89543 3 6 3H20V17H6C4.89543 17 4 17.8954 4 19.5ZM4 19.5C4 20.6046 4.89543 21.5 6 21.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-serif text-xl md:text-2xl font-bold text-[#1B3022] tracking-tight">Pastel Sketchbook</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1B3022]/70">
          <NavLink href="/#vision" label="Vision" />
          <NavLink href="/showcase" label="Showcase" />
          <NavLink href="/podcast" label="Podcast" />
          <NavLink href="/#cycle" label="How it Works" />
          <NavLink href="/#spark" label="Spark AI" isAccent />
          <NavLink href="/#growth" label="Growth" />

          <button
            onClick={scrollToFooter}
            className="bg-[#1B3022] text-white px-6 py-2.5 rounded-full hover:bg-[#2D4536] hover:scale-105 transition-all shadow-md text-xs uppercase tracking-widest font-bold"
            aria-label="Join the Garden"
          >
            Join the Garden
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#1B3022]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar & Backdrop */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Sidebar Drawer */}
          <div
            className="md:hidden fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#FAF9F6] z-[70] shadow-2xl p-6 flex flex-col border-l border-[#1B3022]/10 animate-slide-in-right overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 -mr-2 text-[#1B3022] hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-xl font-serif italic text-[#1B3022]">
              <Link to="/" hash="vision" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5F7D61] transition-colors py-2">Vision</Link>
              <Link to="/showcase" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5F7D61] transition-colors py-2">Showcase</Link>
              <Link to="/podcast" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5F7D61] transition-colors py-2">Podcast</Link>
              <Link to="/" hash="cycle" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5F7D61] transition-colors py-2">How it Works</Link>
              <Link to="/" hash="spark" onClick={() => setIsMenuOpen(false)} className="text-[#D4A373] hover:text-[#E76F51] transition-colors py-2">Spark AI</Link>
              <Link to="/" hash="growth" onClick={() => setIsMenuOpen(false)} className="hover:text-[#5F7D61] transition-colors py-2">Growth</Link>
            </nav>

            <div className="mt-auto pt-8 pb-8">
              <button
                className="w-full bg-[#1B3022] text-white px-6 py-4 rounded-full text-base font-bold shadow-md hover:bg-[#2D4536] transition-all"
                onClick={scrollToFooter}
              >
                Join the Garden
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function NavLink({ href, label, isAccent = false }: { href: string, label: string, isAccent?: boolean }) {
  const [to, hash] = href.split("#");
  const location = useLocation();

  // Check if active using the reactive location hook
  const isCurrentPath = location.pathname === to && to !== '/';

  return (
    <Link
      to={to as "/"}
      hash={hash}
      className={`transition-colors relative group py-1 ${isAccent ? 'text-[#D4A373] hover:text-[#D4A373]' : 'hover:text-[#1B3022]'
        } ${isCurrentPath ? 'text-[#1B3022] font-bold' : ''}`}
      aria-label={`${label} section`}
    >
      {label}
      {/* Standard hover underline for non-active */}
      {!isAccent && !isCurrentPath && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A373] transition-all group-hover:w-full"></span>
      )}

      {/* Wavy active underline */}
      {isCurrentPath && (
        <span className="absolute -bottom-2 left-0 w-full h-2 text-[#E76F51]">
          <svg width="100%" height="100%" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 5 0, 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="animate-pulse" // Subtle animation
            />
          </svg>
        </span>
      )}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="bg-[#FAF9F6] pt-24 border-t border-[#1B3022]/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl italic mb-16 text-[#1B3022]">Who is this for?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="group">
              <span className="text-4xl mb-6 block transform transition-transform group-hover:scale-125 duration-300">🔍</span>
              <h4 className="font-serif italic mb-3 text-[#1B3022] text-lg md:text-xl">The Curious</h4>
              <p className="text-sm text-[#1B3022]/60 leading-relaxed">Lifelong learners always exploring new topics.</p>
            </div>
            <div className="group">
              <span className="text-4xl mb-6 block transform transition-transform group-hover:scale-125 duration-300">✏️</span>
              <h4 className="font-serif italic mb-3 text-[#1B3022] text-lg md:text-xl">The Creators</h4>
              <p className="text-sm text-[#1B3022]/60 leading-relaxed">People who enjoy making things and sharing knowledge.</p>
            </div>
            <div className="group">
              <span className="text-4xl mb-6 block transform transition-transform group-hover:scale-125 duration-300">🤝</span>
              <h4 className="font-serif italic mb-3 text-[#1B3022] text-lg md:text-xl">The Collaborators</h4>
              <p className="text-sm text-[#1B3022]/60 leading-relaxed">Believers in collective achievement over isolation.</p>
            </div>
            <div className="group">
              <span className="text-4xl mb-6 block transform transition-transform group-hover:scale-125 duration-300">🍂</span>
              <h4 className="font-serif italic mb-3 text-[#1B3022] text-lg md:text-xl">The Long-Term Thinkers</h4>
              <p className="text-sm text-[#1B3022]/60 leading-relaxed">Valuers of sustainable assets over quick wins.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF9F6] p-12 sketch-border border-[#1B3022]/20 text-center mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A373]/20 to-transparent"></div>
          <h2 className="text-4xl italic mb-4 text-[#1B3022]">Help us sketch the future.</h2>
          <p className="text-[#1B3022]/60 mb-12 max-w-lg mx-auto">We are at the very beginning of this journey. Join us as a founding member.</p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-[#1B3022]/5 w-full max-w-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-white mx-auto mb-6 flex items-center justify-center sketch-border border-[#1B3022]/10 rotate-3">
                <svg className="w-12 h-12 text-[#1B3022]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M5 8l2-2 2 2M5 16l2 2 2-2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h4 className="font-bold mb-2 text-[#1B3022] uppercase tracking-wider text-sm">Pilot Channel</h4>
              <p className="text-xs text-[#1B3022]/50 mb-6 font-serif italic">Be our first audience and see the model in action.</p>
              <a
                href="https://www.youtube.com/@ChrisH-v4e"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A373] font-bold text-sm hover:underline"
                aria-label="Visit pilot YouTube channel"
              >
                youtube.com/@ChrisH-v4e
              </a>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-[#E76F51]/10 w-full max-w-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-white mx-auto mb-6 flex items-center justify-center sketch-border border-[#E76F51]/10 -rotate-2">
                <svg className="w-12 h-12 text-[#E76F51]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-bold mb-2 text-[#1B3022] uppercase tracking-wider text-sm">Mailing List</h4>
              <p className="text-xs text-[#1B3022]/50 mb-6 font-serif italic">Get updates and be the first to know when we open.</p>
              <button className="text-[#E76F51] font-bold text-sm hover:underline" aria-label="Join mailing list">pastelsketchbook.org/join</button>
            </div>
          </div>
        </div>

        <div className="py-20 text-center border-t border-[#5F7D61]/10">
          <div className="text-6xl mb-8 opacity-20" aria-hidden="true">🌿</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl italic text-[#1B3022] mb-4">Your curiosity, compounded.</h1>
          <p className="text-[#5F7D61] font-serif mb-12">Pastel Sketchbook</p>
          <div className="flex justify-center gap-6 text-[#5F7D61]/50 text-xs">
            <span>Non-Profit 501(c)(3)</span>
            <span>•</span>
            <span>Mission Driven</span>
            <span>•</span>
            <span>Collective Ownership</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
