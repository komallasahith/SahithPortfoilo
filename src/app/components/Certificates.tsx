import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATES = [
  {
    id: 1,
    title: 'Python Django 101',
    issuer: 'Simplilearn SkillUP',
    date: 'Dec 11, 2025',
    description: 'Completed the Python Django course with hands-on web development and backend integration.',
    image: '/certificates/django.png',
    color: '#00B8FF',
  },
  {
    id: 2,
    title: 'DBMS Certification',
    issuer: 'Cisco',
    date: 'Apr 3, 2026',
    description: 'Certified in core database management systems, SQL fundamentals, and database design principles.',
    image: '/certificates/infosys-dbms.jpeg',
    color: '#1D4ED8',
  },
  {
    id: 3,
    title: 'Java Certification',
    issuer: 'Cisco',
    date: 'Mar 1, 2026',
    description: 'Validated Java programming skills, object-oriented concepts, and software design principles.',
    image: '/certificates/java.jpeg',
    color: '#F59E0B',
  },
  {
    id: 4,
    title: 'IoT Bootcamp Certificate',
    issuer: 'ABTechVille / VJIT',
    date: 'Mar 25–26, 2026',
    description: 'Hands-on IoT bootcamp covering sensors, microcontrollers, cloud integration, and real-time product development.',
    image: '/certificates/iot.jpeg',
    color: '#10B981',
  },
  {
    id: 5,
    title: 'Python Essentials Certification',
    issuer: 'Cisco',
    date: 'Oct 23, 2025',
    description: 'Completed Python essentials training focusing on programming fundamentals and basic data structures.',
    image: '/certificates/python-essentials-1.jpeg',
    color: '#6366F1',
  },
  {
    id: 6,
    title: 'Python Essentials Certification (Advanced)',
    issuer: 'Cisco',
    date: 'Oct 23, 2025',
    description: 'Advanced Python certification covering object-oriented programming, package management, and file handling.',
    image: '/certificates/python-essentials-2.jpeg',
    color: '#EF4444',
  },
];

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CERTIFICATES.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % CERTIFICATES.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length);
  };

  const getCardStyle = (index: number) => {
    const absIndex = (index - activeIndex + CERTIFICATES.length) % CERTIFICATES.length;
    let transform = '';
    let opacity = 1;
    let zIndex = 0;
    let scale = 1;

    if (absIndex === 0) {
      transform = 'translateX(0) rotateY(0deg) translateZ(0px)';
      zIndex = 10;
      scale = 1;
      opacity = 1;
    } else if (absIndex === 1) {
      transform = 'translateX(60%) rotateY(-35deg) translateZ(-200px)';
      zIndex = 5;
      scale = 0.85;
      opacity = 0.6;
    } else if (absIndex === CERTIFICATES.length - 1) {
      transform = 'translateX(-60%) rotateY(35deg) translateZ(-200px)';
      zIndex = 5;
      scale = 0.85;
      opacity = 0.6;
    } else {
      transform = 'translateX(0) rotateY(0deg) translateZ(-400px)';
      zIndex = 0;
      scale = 0.7;
      opacity = 0;
    }

    return {
      transform: `${transform} scale(${scale})`,
      opacity,
      zIndex,
      transition: 'transform 0.5s ease, opacity 0.5s ease',
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
      style={{ background: '#f5f5f0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16 text-center">
          <p
            className="mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: '#888',
              textTransform: 'uppercase',
            }}
          >
            Verified Credentials
          </p>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#1a1a1a',
            }}
          >
            Certifications
          </h2>
        </div>

        <div
          ref={carouselRef}
          className="relative h-[520px] md:h-[620px] flex items-center justify-center mb-12"
          style={{ perspective: '1500px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {CERTIFICATES.map((cert, index) => (
              <div
                key={cert.id}
                className="absolute w-[84vw] md:w-[460px] lg:w-[520px] h-[480px] cursor-pointer"
                style={{ ...getCardStyle(index), transformStyle: 'preserve-3d' }}
                onClick={() => {
                  if (index !== activeIndex) setActiveIndex(index);
                }}
              >
                <div
                  className="h-full rounded-[2rem] overflow-hidden border border-black/10 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
                  style={{ boxShadow: `0 25px 80px ${cert.color}15, 0 0 0 1px ${cert.color}10` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={cert.image} alt={cert.title} className="h-full w-full object-contain bg-white p-2" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="p-8 flex h-[calc(100%-12rem)] flex-col justify-between">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                        <Award size={18} style={{ color: cert.color }} />
                        {cert.issuer}
                      </div>
                      <h3 className="mb-4 text-3xl font-bold tracking-tight text-slate-950">{cert.title}</h3>
                      <p className="text-base leading-7 text-slate-600">{cert.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{cert.date}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={cert.color} color={cert.color} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevSlide}
            className="p-4 bg-white rounded-full hover:bg-black hover:text-white transition-all border border-black/10 hover:scale-110"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            {CERTIFICATES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="transition-all"
                style={{
                  width: activeIndex === index ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeIndex === index ? '#1a1a1a' : '#d0d0d0',
                }}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-4 bg-white rounded-full hover:bg-black hover:text-white transition-all border border-black/10 hover:scale-110"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div
          className="text-center mt-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: '#888',
          }}
        >
          {activeIndex + 1} / {CERTIFICATES.length}
        </div>
      </div>
    </section>
  );
}
