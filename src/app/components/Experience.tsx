import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: '2024 – 2028',
    type: 'education',
    title: 'B.Tech, Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
    organization: 'Vidya Jyothi Institute of Technology',
    description:
      'Pursuing B.Tech with specialization in AI & ML. Focusing on data structures, machine learning, and database systems with a strong foundation in software engineering. Current CGPA: 9.05 / 10.',
    skills: ['AI/ML', 'Python', 'React', 'Data Structures', 'DBMS'],
  },

  {
    year: '2025',
    type: 'project',
    title: 'IoT Based Smart System',
    organization: 'Academic Project',
    description:
      'Developed an IoT-based project integrating sensors and automation concepts for real-time monitoring and control.',
    skills: ['IoT', 'Sensors', 'Embedded Systems'],
  },

  {
    year: '2025',
    type: 'project',
    title: 'Hostel Allocation Management System',
    organization: 'DBMS Project',
    description:
      'Designed and developed a hostel allocation system with database integration, room allocation logic, and student management features.',
    skills: ['DBMS', 'SQL', 'MySQL', 'System Design'],
  },

  {
    year: '2025',
    type: 'achievement',
    title: 'Smart India Hackathon Participant',
    organization: 'SIH',
    description:
      'Collaborated with a team to build innovative solutions and present ideas during the Smart India Hackathon.',
    skills: ['Teamwork', 'Problem Solving', 'Innovation'],
  },

  {
    year: '2025',
    type: 'achievement',
    title: '24-Hour Hackathon',
    organization: 'Hackathon Event',
    description:
      'Worked in a fast-paced development environment to design and build a project within 24 hours.',
    skills: ['Rapid Development', 'Collaboration', 'Creativity'],
  },

  {
    year: '2025',
    type: 'project',
    title: 'RTP Financial Analysis System',
    organization: 'Personal Project',
    description:
      'Created a financial analysis project focused on analyzing and visualizing financial trends and reports.',
    skills: ['Python', 'Data Analysis', 'Visualization'],
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'education':
      return GraduationCap;
    case 'certification':
      return Award;
    default:
      return Briefcase;
  }
};

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger timeline items
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      style={{ background: '#f5f5f0' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 text-center">
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
            Journey
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
            Experience & Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #1a1a1a 0%, #d0d0c0 100%)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {TIMELINE.map((item, index) => {
              const Icon = getIcon(item.type);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={el => {
                    itemsRef.current[index] = el;
                  }}
                  className="relative"
                >
                  <div
                    className={`md:w-[calc(50%-3rem)] ${
                      isEven ? 'md:ml-0 md:mr-auto md:text-right' : 'md:ml-auto md:mr-0'
                    }`}
                  >
                    {/* Card */}
                    <div
                      className="bg-white p-6 rounded-xl"
                      style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                    >
                      {/* Year Badge */}
                      <div
                        className={`inline-block px-4 py-1.5 rounded-full mb-4 ${
                          isEven ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'
                        }`}
                        style={{
                          background: '#1a1a1a',
                          color: '#ffffff',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.year}
                      </div>

                      <h3
                        className="mb-2"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                          fontWeight: 700,
                          color: '#1a1a1a',
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mb-3"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: '#6b6b6b',
                        }}
                      >
                        {item.organization}
                      </p>

                      <p
                        className="mb-4"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          color: '#4a4a4a',
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '0.75rem',
                              color: '#1a1a1a',
                              background: '#f5f5f0',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '4px',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Icon on timeline */}
                  <div
                    className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 bg-white rounded-full hidden md:flex items-center justify-center"
                    style={{ border: '2px solid #1a1a1a' }}
                  >
                    <Icon size={20} color="#1a1a1a" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
