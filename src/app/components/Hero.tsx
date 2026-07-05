import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Code, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { icon: Code, label: '5+ Projects', color: '#1a1a1a' },
  { icon: Brain, label: 'AI/ML & IoT Focus', color: '#1a1a1a' },
  { icon: Sparkles, label: 'Full-Stack Developer', color: '#1a1a1a' },
];

const FEATURED_PROJECTS = [
  'Smart Security Private Room (IoT)',
  'AI-Powered Financial Digital Twin',
  'Portfolio Website',
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Main heading with character reveal
      const chars = headingRef.current?.querySelectorAll('.char');
      if (chars) {
        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.2)',
          }
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Highlights
      const highlightItems = highlightsRef.current?.querySelectorAll('.highlight-item');
      if (highlightItems) {
        tl.fromTo(
          highlightItems,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }

      // Featured projects
      const projectItems = projectsRef.current?.querySelectorAll('.project-tag');
      if (projectItems) {
        tl.fromTo(
          projectItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

      // Parallax on scroll
      gsap.to(headingRef.current, {
        y: -100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char === ' ' ? ' ' : char}
      </span>
    ));
  };

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('projects');
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 overflow-hidden pt-20"
      style={{ background: '#f5f5f0', perspective: '1000px' }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #6b6b6b, transparent)',
          top: '20%',
          left: '10%',
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #4a4a4a, transparent)',
          bottom: '20%',
          right: '10%',
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7">
            {/* Main Heading */}
            <div
              ref={headingRef}
              className="mb-6 overflow-hidden"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#1a1a1a',
                transformStyle: 'preserve-3d',
              }}
            >
              {splitText("Hey, I'm Sahith")}
            </div>

            {/* Subtitle */}
            <div
              ref={subtitleRef}
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: 400,
                color: '#6b6b6b',
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              CSE (AI & ML) student passionate about building real-world projects in AI, IoT, DBMS, and web development. I enjoy creating practical solutions, participating in hackathons, and continuously learning new technologies.
            </div>

            {/* Highlights */}
            <div ref={highlightsRef} className="flex flex-wrap gap-6 mb-10">
              {HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href="#projects"
                    onClick={item.label.includes('Projects') ? handleProjectClick : undefined}
                    className={`highlight-item flex items-center gap-3 px-5 py-3 bg-white rounded-xl transition-all duration-300 ${item.label.includes('Projects') ? 'hover:scale-105 cursor-pointer' : ''}`}
                    style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
                  >
                    <Icon size={20} color={item.color} />
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#1a1a1a',
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group px-8 py-4 bg-black text-white rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="#contact"
                className="px-8 py-4 bg-transparent text-black rounded-full border-2 border-black hover:bg-black hover:text-white transition-all hover:scale-105"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Column - Featured Work (Smaller) */}
          <div ref={projectsRef} className="lg:col-span-5 space-y-3">
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: '#888',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Featured Projects
            </div>

            {FEATURED_PROJECTS.map((project, i) => (
              <div
                key={i}
                className="project-tag group cursor-pointer p-4 bg-white rounded-3xl border border-black/10 shadow-sm hover:bg-gray-100 hover:text-white transition-colors duration-300"
                style={{
                  boxShadow: '0 18px 60px rgba(15,23,42,0.06)',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="transition-colors"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#111111',
                    }}
                  >
                    {project}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-black transition-colors duration-300 group-hover:text-white"
                  />
                </div>
              </div>
            ))}

            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-black hover:gap-3 transition-all mt-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              View all projects <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: '#888',
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore
        </div>
        <div className="w-px h-16 bg-black/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-black animate-scroll" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
