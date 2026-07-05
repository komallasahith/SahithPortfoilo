import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in from left
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
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

      // Content slide in from right
      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      style={{ background: '#e8e8dd' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <img
              src="/certificates/sahith-p.jpeg"
              alt="Sahith"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="space-y-6">
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#1a1a1a',
              whiteSpace: 'nowrap',
            }}
          >
            About Me
          </h2>

          <div
            className="space-y-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: 1.7,
              color: '#4a4a4a',
            }}
          >
            <p>
              I am an AI & ML undergraduate with hands-on experience building full-stack and IoT projects using Python, React, and embedded systems. I have a strong foundation in data structures, machine learning, and database systems, maintaining a 9.05/10 CGPA.
            </p>
            <p>
              I am passionate about technology, problem-solving, and building practical applications that solve real-world problems. I am continuously seeking opportunities to apply my AI/ML skills to real-world software development.
            </p>
          </div>

          {/* Fun fact or quote */}
          <div
            className="mt-8 pt-8 border-t border-black/10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: '#6b6b6b',
            }}
          >
            “Technology becomes meaningful when it creates impact and solves real-world problems.”
          </div>
        </div>
      </div>
    </section>
  );
}
