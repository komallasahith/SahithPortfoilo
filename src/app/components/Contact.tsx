import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const links = linksRef.current?.querySelectorAll('.contact-link');
      if (links) {
        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      style={{ background: '#f5f5f0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#1a1a1a',
            }}
          >
            Let's Talk.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#6b6b6b',
              maxWidth: '600px',
            }}
          >
            Feel free to reach out for collaborations, hackathons, projects, or tech discussions. I’m always open to learning and building new things.
          </p>
        </div>

        {/* Contact links */}
        <div ref={linksRef} className="space-y-4 mb-20">
          <a
            href="mailto:komallasahith@gmail.com"
            className="contact-link group flex items-center gap-4 py-4 border-b border-black/10 transition-colors hover:border-black/30"
            style={{ textDecoration: 'none' }}
          >
            <Mail size={24} style={{ color: '#1a1a1a' }} />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              komallasahith@gmail.com
            </span>
          </a>

          <a
            href="https://github.com/komallasahith"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group flex items-center gap-4 py-4 border-b border-black/10 transition-colors hover:border-black/30"
            style={{ textDecoration: 'none' }}
          >
            <Github size={24} style={{ color: '#1a1a1a' }} />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              GitHub
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/sahithkomalla"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group flex items-center gap-4 py-4 border-b border-black/10 transition-colors hover:border-black/30"
            style={{ textDecoration: 'none' }}
          >
            <Linkedin size={24} style={{ color: '#1a1a1a' }} />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              LinkedIn
            </span>
          </a>

          <a
            href="https://www.instagram.com/sahith.kx"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group flex items-center gap-4 py-4 border-b border-black/10 transition-colors hover:border-black/30"
            style={{ textDecoration: 'none' }}
          >
            <Instagram size={24} style={{ color: '#1a1a1a' }} />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              Instagram
            </span>
          </a>


        </div>

        {/* Footer */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-black/10"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            color: '#888',
          }}
        >
          <p>&copy; 2026 Sahith. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
