import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Logo entrance animation
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    }

    // Nav links stagger animation
    const links = navRef.current?.querySelectorAll('.nav-link');
    if (links) {
      gsap.fromTo(
        links,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );

      const mobileLinks = mobileMenuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(
        mobileLinks,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setIsMobileMenuOpen(false),
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9997] transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        style={{
          background: isScrolled ? 'rgba(245, 245, 240, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex items-center gap-3">
              {/* Logo Icon */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                  }}
                >
                  S
                </span>
              </div>
              {/* Logo Text */}
              <div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Sahith
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem',
                    color: '#6b6b6b',
                    letterSpacing: '0.05em',
                    marginTop: '2px',
                  }}
                >
                  AI/ML ENGINEER
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="nav-link group relative"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#6b6b6b';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a';
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"
                  style={{ bottom: '-4px' }}
                />
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="nav-link px-6 py-2.5 bg-black text-white rounded-full hover:bg-black/80 transition-all hover:scale-105"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <Menu size={24} color="#1a1a1a" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-white z-[9999] md:hidden"
            style={{
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X size={24} color="#1a1a1a" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="space-y-6">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="mobile-link block py-3 border-b border-black/5"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </a>
                ))}

                {/* Mobile CTA */}
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="mobile-link block w-full px-6 py-4 bg-black text-white rounded-full text-center hover:bg-black/80 transition-all mt-8"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Let's Talk
                </a>
              </div>

              {/* Mobile Footer */}
              <div className="mt-12 pt-6 border-t border-black/5">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: '#6b6b6b',
                    textAlign: 'center',
                  }}
                >
                  Building the future with AI
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
