import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE_AREAS = [
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'AI & Machine Learning',
  'UI/UX Design',
  'Database Management'
];

const TECH_STACK = [
  'Python',
  'C',
  'Java',
  'JavaScript',
  'SQL',
  'HTML',
  'CSS',
  'Django',
  'React',
  'VS Code',
  'Figma',
  'Git & GitHub'
];

const COURSEWORK = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Object-Oriented Programming',
  'Operating Systems',
  'Artificial Intelligence',
  'Machine Learning'
];

export default function Expertise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const courseworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger in expertise cards
      const expertiseItems = leftRef.current?.querySelectorAll('.expertise-item');
      if (expertiseItems) {
        gsap.fromTo(
          expertiseItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stagger in tech stack items
      const techItems = rightRef.current?.querySelectorAll('.tech-item');
      if (techItems) {
        gsap.fromTo(
          techItems,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stagger in coursework items
      const courseworkItems = courseworkRef.current?.querySelectorAll('.coursework-item');
      if (courseworkItems) {
        gsap.fromTo(
          courseworkItems,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: courseworkRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      style={{ background: '#f5f5f0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12">
          {/* Left: My Expertises */}
          <div ref={leftRef}>
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#1a1a1a',
              }}
            >
              my expertises.
            </h2>

            <p
              className="mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#4a4a4a',
                maxWidth: '500px',
              }}
            >
              I focus on all things AI/ML related. With each of my services, my goal is to deliver an impactful and intelligent solution for everyone.
            </p>

            <div className="space-y-3">
              {EXPERTISE_AREAS.map((area, i) => (
                <div
                  key={i}
                  className="expertise-item cursor-pointer transition-all duration-300"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#b8b8a8',
                    lineHeight: 1.2,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = '#1a1a1a';
                    (e.currentTarget as HTMLDivElement).style.fontWeight = '800';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = '#b8b8a8';
                    (e.currentTarget as HTMLDivElement).style.fontWeight = '700';
                  }}
                >
                  {area}
                </div>
              ))}
            </div>
          </div>

          {/* Center: My Digital Toolbox */}
          <div ref={rightRef}>
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#1a1a1a',
              }}
            >
              my digital tool box.
            </h2>

            <p
              className="mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#4a4a4a',
                maxWidth: '500px',
              }}
            >
              These are my go to tech stack to make any projects happen. I am always eager of learning more about my current stack and new technologies that could expand my horizons.
            </p>

            <div className="space-y-2">
              {TECH_STACK.map((tech, i) => (
                <div
                  key={i}
                  className="tech-item cursor-pointer transition-all duration-300"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    fontWeight: 600,
                    color: '#b8b8a8',
                    lineHeight: 1.3,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = '#1a1a1a';
                    (e.currentTarget as HTMLDivElement).style.fontWeight = '700';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = '#b8b8a8';
                    (e.currentTarget as HTMLDivElement).style.fontWeight = '600';
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Relevant Coursework */}
          <div ref={courseworkRef}>
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#1a1a1a',
              }}
            >
              relevant coursework.
            </h2>

            <p
              className="mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#4a4a4a',
                maxWidth: '500px',
              }}
            >
              Academic coursework that provides the foundation for my engineering decisions, software design principles, and machine learning models.
            </p>

            <div className="space-y-2">
              {COURSEWORK.map((course, i) => (
                <div
                  key={i}
                  className="coursework-item cursor-pointer transition-all duration-300"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    fontWeight: 600,
                    color: '#b8b8a8',
                    lineHeight: 1.3,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = '#1a1a1a';
                    (e.currentTarget as HTMLDivElement).style.fontWeight = '700';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = '#b8b8a8';
                    (e.currentTarget as HTMLDivElement).style.fontWeight = '600';
                  }}
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
