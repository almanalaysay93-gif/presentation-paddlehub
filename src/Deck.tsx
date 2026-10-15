import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  Play,
  ExternalLink,
  ArrowRight,
  X,
  Keyboard,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export const OWNER_ORIGIN = "https://paddlebaseowner.org";
export const SITE_ORIGIN = "https://www.paddlebase.org";

interface DeckSlide {
  id: string;
  tag: string;
  category: string;
  title: string;
  subtitle: string;
  videoId: string;
  videoSrc: string;
  thumbnail: string;
  videoDuration?: string;
  bullets: string[];
  metrics: { label: string; value: string; hint?: string }[];
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  badgeColor: string;
}

const BASE_PATH = import.meta.env.BASE_URL;

const DECK_SLIDES: DeckSlide[] = [
  {
    id: "overview",
    tag: "Ecosystem Architecture",
    category: "01 / 07",
    title: "The Unified Operating System for Racket Sports",
    subtitle:
      "PaddleBase connects players, facility operators, coaches, and tournaments through a single high-performance infrastructure.",
    videoId: "1knz20cdNAW5UvPzKtapRa6Hod1FR-1fD",
    videoSrc: `${BASE_PATH}video/deck/how_it_works.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/1dZvq_r72Nbu2ORMj0KSEDkXdU1rg1avE",
    videoDuration: "1:45",
    bullets: [
      "Dual-portal ecosystem: player discovery on paddlebase.org and venue management on paddlebaseowner.org.",
      "Real-time court scheduling in Asia/Manila (PHT) with live slot occupancy and automated waitlist.",
      "Integrated checkout with GCash, cards, and counter cash reconciliation via PayMongo.",
    ],
    metrics: [
      { label: "Partner Venues", value: "34+", hint: "Davao Region" },
      { label: "Active Courts", value: "80+", hint: "Standard & covered" },
      { label: "Live Sync Rate", value: "15s", hint: "On-court TV displays" },
    ],
    primaryCta: { label: "Explore Court Directory", href: `${SITE_ORIGIN}/courts`, external: true },
    secondaryCta: { label: "Launch Interactive Map", href: `${SITE_ORIGIN}/map`, external: true },
    badgeColor: "bg-[#D4F73A] text-[#111A16]",
  },
  {
    id: "players",
    tag: "Player Portal · paddlebase.org",
    category: "02 / 07",
    title: "Book Any Court in Under Sixty Seconds",
    subtitle:
      "Zero forced account walls, verified venue pricing, GPS routing, and instant digital QR passes on your mobile device.",
    videoId: "1wjDbD3IBHmTOl2vmkDDQ9RTogiIp-TEk",
    videoSrc: `${BASE_PATH}video/deck/players.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/1uGD9LcW0SHg1k6MlMLvS3POP0owIZdxs",
    videoDuration: "2:10",
    bullets: [
      "Hourly availability grid displaying daytime and nighttime rate tiers with complete transparency.",
      "OpenStreetMap interactive navigation covering Davao City, Digos, Matanao, Bansalan, and Santa Cruz.",
      "Instant pass generation with QR code verification at venue counters.",
    ],
    metrics: [
      { label: "Booking Speed", value: "< 60s", hint: "From search to pass" },
      { label: "Account Wall", value: "0%", hint: "Guest checkout enabled" },
      { label: "Regional Municipalities", value: "5", hint: "Active coverage" },
    ],
    primaryCta: { label: "Check Live Availability", href: `${SITE_ORIGIN}/schedule`, external: true },
    secondaryCta: { label: "View Court Directory", href: `${SITE_ORIGIN}/courts`, external: true },
    badgeColor: "bg-[#D4F73A] text-[#111A16]",
  },
  {
    id: "owners",
    tag: "Operator Suite · paddlebaseowner.org",
    category: "03 / 07",
    title: "Automated Point-of-Sale Built for Court Owners",
    subtitle:
      "Replaces paper logbooks with automated booking grids, cash auditing, staff shift control, and dynamic rate rules.",
    videoId: "1mZtaysB3W0Ax-rl6qwTH3iOoBlKLAq-7",
    videoSrc: `${BASE_PATH}video/deck/owners.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/1iwIdM9ToNdtPvIMv0td3dZ7uXWL_5gWi",
    videoDuration: "2:30",
    bullets: [
      "Shift-based cashier reconciliation tracking cash, GCash, and online transactions without leakage.",
      "Automated waitlist engine that reallocates cancelled slots to waiting players immediately.",
      "Customizable rate tiers for peak evening hours, lighting surcharges, and weekend tournaments.",
    ],
    metrics: [
      { label: "Revenue Leakage", value: "0%", hint: "Full audit tracking" },
      { label: "Slot Utilization", value: "+38%", hint: "Automated waitlist" },
      { label: "POS Handover Time", value: "< 2m", hint: "Cashier shift close" },
    ],
    primaryCta: { label: "Visit paddlebaseowner.org", href: OWNER_ORIGIN, external: true },
    secondaryCta: { label: "Partner Venue Onboarding", href: `${SITE_ORIGIN}/owner-site`, external: true },
    badgeColor: "bg-[#FF5722] text-white",
  },
  {
    id: "queue",
    tag: "On-Court Technology · PaddleClub",
    category: "04 / 07",
    title: "Real-Time Queue Boards for Club Monitors",
    subtitle:
      "Digital court boards designed for ten-foot readability on facility TVs, paired with mobile paddle queue rotations.",
    videoId: "1-bg3wWQH8IexmWJUl_VYBqBqacQdMr7s",
    videoSrc: `${BASE_PATH}video/deck/queue.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/1hr8ThmQzo-uGjH03xBPMUEre_u1G8Z2N",
    videoDuration: "1:55",
    bullets: [
      "Dedicated full-screen TV view showing court in-play, next rotation, and open times.",
      "Fair paddle rotation engine that eliminates favoritism during crowded open play sessions.",
      "DUPR skill bracket integration ensuring balanced matches for competitive play.",
    ],
    metrics: [
      { label: "Display Readability", value: "10 ft", hint: "Optimized typography" },
      { label: "Rotation Dispute Rate", value: "0", hint: "Algorithmic fairness" },
      { label: "DUPR Rating Range", value: "2.0-5.5", hint: "Skill matched games" },
    ],
    primaryCta: { label: "Launch Live Queue Demo", href: `${SITE_ORIGIN}/paddleclub`, external: true },
    secondaryCta: { label: "Browse Open Play Sessions", href: `${SITE_ORIGIN}/open-play`, external: true },
    badgeColor: "bg-[#D4F73A] text-[#111A16]",
  },
  {
    id: "coaches",
    tag: "Professional Roster · Coaches & Referees",
    category: "05 / 07",
    title: "Certified Clinics and Tournament Officiating",
    subtitle:
      "Independent coaches and certified referees manage calendar availability, accept student bookings, and receive direct payouts.",
    videoId: "1zFpKt4ZucZBzL08yzlvg9av1sFN6q0H5",
    videoSrc: `${BASE_PATH}video/deck/coaches.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/1yI64wVWD8ZaSo00jeNWKMaW1sOBXcOHD",
    videoDuration: "1:40",
    bullets: [
      "Verified coaching profiles with rate tiers, specialization areas, and direct student booking.",
      "Tournament referee scheduling with automated court match assignments and score recording.",
      "Direct commission payouts and transparent transaction statements for instructors.",
    ],
    metrics: [
      { label: "Coach Booking Time", value: "1-tap", hint: "Self-serve calendar" },
      { label: "Session Payouts", value: "Direct", hint: "Automated settlements" },
      { label: "Rating Transparency", value: "100%", hint: "Verified player reviews" },
    ],
    primaryCta: { label: "Browse Coaching Directory", href: `${SITE_ORIGIN}/coaches`, external: true },
    secondaryCta: { label: "Apply as Certified Coach", href: `${SITE_ORIGIN}/coaches`, external: true },
    badgeColor: "bg-[#D4F73A] text-[#111A16]",
  },
  {
    id: "community",
    tag: "Ecosystem Economy · Feed & Marketplace",
    category: "06 / 07",
    title: "Community Social Feed and Gear Marketplace",
    subtitle:
      "A localized network for player discussions, club announcements, tournament brackets, and verified equipment trading.",
    videoId: "18IlVM6fYhlENVp-wA3mPTQOZ4GF4I5dF",
    videoSrc: `${BASE_PATH}video/deck/feed.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/14LF_Sb_w3EycH5heJCgq4AmVOuNu11Ir",
    videoDuration: "2:05",
    bullets: [
      "Real-time community feed with match results, court updates, and player interaction.",
      "Peer-to-peer equipment marketplace for paddles, bags, and shoes with local pickup safety.",
      "Open play event coordination with live attendee rosters and participant caps.",
    ],
    metrics: [
      { label: "Marketplace Safety", value: "Verified", hint: "Player verified goods" },
      { label: "Event RSVP Sync", value: "Live", hint: "Real-time roster spots" },
      { label: "Community Feed", value: "Zero spam", hint: "Local player moderated" },
    ],
    primaryCta: { label: "Explore Marketplace", href: `${SITE_ORIGIN}/marketplace`, external: true },
    secondaryCta: { label: "View Community Feed", href: `${SITE_ORIGIN}/feed`, external: true },
    badgeColor: "bg-[#FF5722] text-white",
  },
  {
    id: "investment",
    tag: "Investment Thesis · Regional Expansion",
    category: "07 / 07",
    title: "Scalable Infrastructure for Fastest Growing Sport",
    subtitle:
      "High-margin software subscriptions combined with recurring consumer transaction fees across the fastest growing racket sport in Asia.",
    videoId: "1knz20cdNAW5UvPzKtapRa6Hod1FR-1fD",
    videoSrc: `${BASE_PATH}video/deck/how_it_works.mp4`,
    thumbnail: "https://lh3.googleusercontent.com/d/1dZvq_r72Nbu2ORMj0KSEDkXdU1rg1avE",
    videoDuration: "1:45",
    bullets: [
      "Defensible physical moat: live TV queue monitors installed inside partner venues retain club loyalty.",
      "Dual monetization: monthly SaaS fees paid by venue owners plus player convenience fees on reservations.",
      "Proven architecture ready for rapid multi-city rollouts across the Philippines and Southeast Asia.",
    ],
    metrics: [
      { label: "Market Segment", value: "SaaS + FinTech", hint: "B2B & B2C" },
      { label: "Hardware Lock-in", value: "TV Displays", hint: "High retention" },
      { label: "Expansion Target", value: "ASEAN", hint: "High growth region" },
    ],
    primaryCta: {
      label: "Contact Founder & Lead Investor",
      href: "mailto:almanalaysay93@gmail.com?subject=PaddleBase%20Investment%20Inquiry",
      external: true,
    },
    secondaryCta: { label: "Enter Player Experience", href: SITE_ORIGIN, external: true },
    badgeColor: "bg-[#D4F73A] text-[#111A16]",
  },
];

export default function Deck() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<DeckSlide | null>(null);
  const [showSlideDrawer, setShowSlideDrawer] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = DECK_SLIDES[activeSlide];

  // Mouse tilt tracking for 3D parallax
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev < DECK_SLIDES.length - 1 ? prev + 1 : 0));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : DECK_SLIDES.length - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (activeVideoModal) {
        if (e.key === "Escape") {
          setActiveVideoModal(null);
        }
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveSlide(DECK_SLIDES.length - 1);
      } else if (e.key === "Escape") {
        setShowSlideDrawer(false);
        setShowShortcuts(false);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "Tab") {
        setShowSlideDrawer((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, activeVideoModal]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // 3D rotation angles derived from mouse position
  const rotateX = mousePos.y * -5.5;
  const rotateY = mousePos.x * 7.5;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#080D0A] text-[#F7F6F0] overflow-hidden select-none font-sans"
      style={{ perspective: "1200px" }}
    >
      {/* Dynamic 3D Spatial Background with Court Lines and Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Deep ambient radial glow following mouse position */}
        <div
          className="absolute -inset-[30%] opacity-40 blur-[130px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)`,
            background:
              "radial-gradient(circle at 50% 50%, rgba(212,247,58,0.18) 0%, rgba(17,26,22,0.85) 55%, transparent 75%)",
          }}
        />

        {/* Athletic Court Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D4F73A 1px, transparent 1px),
              linear-gradient(to bottom, #D4F73A 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `perspective(600px) rotateX(${rotateX * 0.4}deg) rotateY(${rotateY * 0.4}deg) translateZ(-80px)`,
            transition: "transform 0.4s ease-out",
          }}
        />

        {/* Diagonal Court Non-Volley Zone Angled Accent Lines */}
        <div className="absolute top-0 right-0 w-[55vw] h-[55vh] opacity-15 border-l-2 border-b-2 border-[#D4F73A]/30 rounded-bl-[140px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-10 border-r-2 border-t-2 border-[#FF5722]/40 rounded-tr-[120px]" />

        {/* Large slide number watermark in 3D background */}
        <div
          className="absolute right-8 top-16 md:right-16 md:top-20 text-[14vw] md:text-[18vw] font-black text-[#D4F73A]/[0.03] leading-none select-none"
          style={{
            transform: "translateZ(-100px)",
          }}
        >
          0{activeSlide + 1}
        </div>
      </div>

      {/* Top HUD: Brand & Mode Navigation Controls */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-[#D4F73A]/10 bg-[#080D0A]/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <a href={SITE_ORIGIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-[#D4F73A] flex items-center justify-center font-black text-[#111A16] shadow-md shadow-[#D4F73A]/20 transition-transform group-hover:scale-105">
              PB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  PaddleBase
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111A16] border border-[#D4F73A]/40 text-[#D4F73A]">
                  Deck 3D
                </span>
              </div>
              <p className="text-[10px] text-white/50 hidden sm:block">
                Investor &amp; Guest Presentation
              </p>
            </div>
          </a>
        </div>

        {/* Center Live Telemetry Pill */}
        <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12231A]/80 border border-[#D4F73A]/20 text-xs font-bold text-[#F7F6F0]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F73A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4F73A]"></span>
          </span>
          <span>Davao Region · 34 Venues Active · Asia/Manila (PHT)</span>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowShortcuts((prev) => !prev)}
            title="Keyboard shortcuts (Space, Arrows, F, Tab)"
            className="p-2 sm:p-2.5 rounded-xl border border-white/10 hover:border-[#D4F73A]/40 hover:bg-white/5 transition-colors text-white/80 hover:text-white"
          >
            <Keyboard className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowSlideDrawer((prev) => !prev)}
            title="Slide overview menu (Tab)"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-white/10 hover:border-[#D4F73A]/40 hover:bg-white/5 transition-colors text-xs font-bold text-white/90"
          >
            <Layers className="h-4 w-4 text-[#D4F73A]" />
            <span className="hidden sm:inline">Slides</span>
          </button>
          <button
            onClick={toggleFullscreen}
            title="Toggle fullscreen (F)"
            className="p-2 sm:p-2.5 rounded-xl border border-white/10 hover:border-[#D4F73A]/40 hover:bg-white/5 transition-colors text-white/80 hover:text-white"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <a
            href={SITE_ORIGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
          >
            <span>Live Site</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
          </a>
        </div>
      </header>

      {/* Main 3D Presentation Stage */}
      <main className="relative z-10 flex min-h-[calc(100vh-140px)] w-full items-center justify-center px-4 sm:px-8 py-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    z: -80,
                    rotateY: 8,
                    scale: 0.96,
                  }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    z: 0,
                    rotateY: 0,
                    scale: 1,
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    z: 60,
                    rotateY: -8,
                    scale: 0.98,
                  }
            }
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 140,
              mass: 0.9,
            }}
            className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Left Column: Narrative, Taxonomy, Metrics & Proof Points */}
            <div
              className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6"
              style={{
                transform: "translateZ(30px)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Category Pill & Audience Flag */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${currentSlide.badgeColor} shadow-sm`}
                >
                  {currentSlide.tag}
                </span>
                <span className="text-xs font-mono font-bold text-[#D4F73A]/80 bg-[#12231A] px-2.5 py-1 rounded-full border border-[#D4F73A]/20">
                  {currentSlide.category}
                </span>
              </div>

              {/* Slide Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-balance text-white leading-[1.12]">
                  {currentSlide.title}
                </h1>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Bullet Proof Points */}
              <div className="space-y-2.5 pt-1">
                {currentSlide.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                    <div className="h-5 w-5 rounded-full bg-[#D4F73A]/15 text-[#D4F73A] border border-[#D4F73A]/30 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                      ✓
                    </div>
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Telemetry Metric Cards Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                {currentSlide.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#12231A]/70 border border-[#D4F73A]/20 backdrop-blur-md space-y-1 hover:border-[#D4F73A]/50 transition-colors"
                  >
                    <div className="text-[11px] sm:text-xs text-white/60 font-semibold truncate">
                      {metric.label}
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-[#D4F73A] tracking-tight">
                      {metric.value}
                    </div>
                    {metric.hint && (
                      <div className="text-[10px] text-white/50 truncate">
                        {metric.hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={currentSlide.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <button className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#D4F73A] hover:bg-[#c2e428] text-[#111A16] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4F73A]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <span>{currentSlide.primaryCta.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </a>

                {currentSlide.secondaryCta && (
                  <a
                    href={currentSlide.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial"
                  >
                    <button className="w-full sm:w-auto h-11 px-5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors">
                      <span>{currentSlide.secondaryCta.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    </button>
                  </a>
                )}

                <button
                  onClick={() => setActiveVideoModal(currentSlide)}
                  className="h-11 px-4 rounded-full border border-[#FF5722]/40 bg-[#FF5722]/10 hover:bg-[#FF5722]/20 text-[#FF5722] hover:text-white font-extrabold text-xs flex items-center gap-2 transition-colors ml-auto sm:ml-0"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Watch Explainer</span>
                </button>
              </div>
            </div>

            {/* Right Column: 3D Video Parallax Theater Card */}
            <div
              className="lg:col-span-6 relative flex items-center justify-center"
              style={{
                transform: "translateZ(65px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                onClick={() => setActiveVideoModal(currentSlide)}
                className="group relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-[#D4F73A]/25 bg-[#12231A] shadow-2xl shadow-[#D4F73A]/10 cursor-pointer transition-all duration-300 hover:border-[#D4F73A]/60 hover:shadow-[#D4F73A]/20"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Ambient Looping Explainer Video */}
                <video
                  key={currentSlide.videoSrc}
                  src={currentSlide.videoSrc}
                  poster={currentSlide.thumbnail}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                />

                {/* Ambient Dark Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-transparent to-black/20 pointer-events-none" />

                {/* Corner Audio & Duration HUD Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#080D0A]/85 backdrop-blur-md border border-[#D4F73A]/30 text-[11px] font-bold text-[#D4F73A] flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F73A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4F73A]"></span>
                    </span>
                    <span>Explainer Reel</span>
                  </span>
                  {currentSlide.videoDuration && (
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white/80">
                      {currentSlide.videoDuration}
                    </span>
                  )}
                </div>

                {/* Center Pulse Play Button */}
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-20 w-20 rounded-full bg-[#D4F73A]/20 animate-ping opacity-75" />
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#D4F73A] text-[#111A16] flex items-center justify-center shadow-xl shadow-black/50 group-hover:scale-110 active:scale-95 transition-transform duration-300">
                      <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-current ml-1" />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Bar: Click to Expand Notice */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs font-bold text-white/90 z-10 bg-[#080D0A]/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 group-hover:border-[#D4F73A]/40 transition-colors">
                  <span className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-[#D4F73A]" />
                    <span>Click to Play in High-Definition with Sound</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#D4F73A] uppercase tracking-wider">
                    Theater Mode ➔
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation Dock */}
      <footer className="relative z-30 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-8 py-3.5 border-t border-[#D4F73A]/10 bg-[#080D0A]/80 backdrop-blur-xl">
        {/* Left: Previous / Next Slide Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={prevSlide}
            title="Previous slide (Arrow Left / Arrow Up)"
            className="flex items-center gap-1.5 h-10 px-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#D4F73A]/50 text-xs font-bold text-white transition-all active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 text-[#D4F73A]" />
            <span>Prev</span>
          </button>

          <span className="font-mono text-xs font-bold text-[#D4F73A] px-3 py-1 rounded-full bg-[#12231A] border border-[#D4F73A]/30">
            0{activeSlide + 1} / 0{DECK_SLIDES.length}
          </span>

          <button
            onClick={nextSlide}
            title="Next slide (Arrow Right / Space / Arrow Down)"
            className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-[#D4F73A] hover:bg-[#c2e428] text-[#111A16] text-xs font-extrabold transition-all active:scale-95 shadow-md shadow-[#D4F73A]/20"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 text-[#111A16]" />
          </button>
        </div>

        {/* Center: Segmented Slide Timeline Indicator */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto max-w-md justify-center py-1">
          {DECK_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              title={`Jump to Slide ${idx + 1}: ${slide.title}`}
              className="group relative flex-1 h-2 rounded-full overflow-hidden bg-white/15 transition-all hover:h-2.5"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  idx === activeSlide
                    ? "bg-[#D4F73A] shadow-sm shadow-[#D4F73A]"
                    : idx < activeSlide
                    ? "bg-white/60"
                    : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right: Quick Slide Titles or Direct Investor CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs text-white/50 truncate max-w-xs">
            {currentSlide.title}
          </span>
          <a
            href="mailto:almanalaysay93@gmail.com?subject=PaddleBase%20Pitch%20Deck%20Inquiry"
            className="px-3.5 py-1.5 rounded-full border border-[#D4F73A]/30 bg-[#12231A] hover:bg-[#183124] text-[11px] font-bold text-[#D4F73A] transition-colors"
          >
            Investor Connect
          </a>
        </div>
      </footer>

      {/* Video Theater Modal Dialog */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl border-2 border-[#D4F73A]/40 bg-[#080D0A] shadow-2xl shadow-black overflow-hidden flex flex-col"
            >
              {/* Theater Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#12231A]/60">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4F73A] text-[#111A16] font-black text-xs">
                    {activeVideoModal.category}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      {activeVideoModal.title}
                    </h3>
                    <p className="text-xs text-white/60">
                      {activeVideoModal.tag}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://drive.google.com/file/d/${activeVideoModal.videoId}/view?usp=sharing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white/80 transition-colors"
                    title="Open on Google Drive"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Close (Escape)"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Responsive Video Frame */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  key={activeVideoModal.videoSrc}
                  src={activeVideoModal.videoSrc}
                  poster={activeVideoModal.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Theater Footer with Quick Slide Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-white/10 bg-[#080D0A]">
                <p className="text-xs text-white/70 max-w-xl leading-relaxed">
                  {activeVideoModal.subtitle}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs font-bold text-white transition-colors"
                  >
                    Close Player
                  </button>
                  <a
                    href={activeVideoModal.primaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-4 py-2 rounded-full bg-[#D4F73A] text-[#111A16] text-xs font-extrabold hover:bg-[#c2e428] transition-colors flex items-center gap-1.5">
                      <span>{activeVideoModal.primaryCta.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Drawer / Rapid Jump Menu */}
      <AnimatePresence>
        {showSlideDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowSlideDrawer(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[#D4F73A]/30 bg-[#080D0A] p-5 sm:p-7 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white">
                    Presentation Slides Navigation
                  </h3>
                  <p className="text-xs text-white/60">
                    Jump directly to any of the 7 core pillars
                  </p>
                </div>
                <button
                  onClick={() => setShowSlideDrawer(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {DECK_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setActiveSlide(idx);
                      setShowSlideDrawer(false);
                    }}
                    className={`group text-left p-3.5 rounded-2xl border transition-all ${
                      idx === activeSlide
                        ? "border-[#D4F73A] bg-[#12231A] shadow-md shadow-[#D4F73A]/20"
                        : "border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#D4F73A]">
                        {slide.category}
                      </span>
                      <span className="text-[10px] font-bold text-white/50">
                        {slide.tag.split("·")[0]}
                      </span>
                    </div>
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-2 bg-black/40 border border-white/10 relative">
                      <img
                        src={slide.thumbnail}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-6 w-6 text-[#D4F73A] fill-current" />
                      </div>
                    </div>
                    <h4 className="font-extrabold text-xs text-white line-clamp-1 group-hover:text-[#D4F73A] transition-colors">
                      {slide.title}
                    </h4>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Cheat-sheet Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-[#D4F73A]/30 bg-[#080D0A] p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Keyboard className="h-5 w-5 text-[#D4F73A]" />
                  <h3 className="font-extrabold text-base text-white">
                    Keyboard Shortcuts
                  </h3>
                </div>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="text-white/80">Next Slide</span>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      →
                    </kbd>
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      ↓
                    </kbd>
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      Space
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="text-white/80">Previous Slide</span>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      ←
                    </kbd>
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      ↑
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="text-white/80">Slide Drawer Jump</span>
                  <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                    Tab
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="text-white/80">Toggle Fullscreen</span>
                  <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                    F
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="text-white/80">First / Last Slide</span>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      Home
                    </kbd>
                    <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                      End
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="text-white/80">Dismiss Theater / Close</span>
                  <kbd className="px-2 py-1 rounded bg-black/80 border border-white/20 font-mono text-white">
                    Esc
                  </kbd>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
