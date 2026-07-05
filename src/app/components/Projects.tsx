import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  details: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Smart Security Private Room (IoT)',
    category: 'IoT & Embedded Systems',
    tags: ['NodeMCU ESP8266', 'Sensors', 'IoT', 'Intrusion Detection'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    description:
      'An IoT-based security system integrating NodeMCU ESP8266 and multi-sensor tracking for real-time intrusion monitoring.',
    details:
      'Built an IoT-based smart security system using NodeMCU ESP8266 integrated with PIR, IR, and MC-38 magnetic sensors. Implemented real-time intrusion detection with buzzer alerts and remote monitoring through a web interface, improving room security through automated, sensor-driven threat detection and alerting.',
  },
  {
    title: 'AI-Powered Financial Digital Twin for Systemic Risk & Shock Propagation',
    category: 'Artificial Intelligence & Finance',
    tags: ['Python', 'React', 'AI/ML', 'Risk Modeling'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    description:
      'An AI-based financial analysis platform to model systemic risk across assets and simulate shock propagation in real time.',
    details:
      'Developed an AI-based financial analysis platform using Python and React to model systemic risk across financial assets. Built interactive dashboards to analyze stock market data and visualize market trends in real time. Designed a shock-detection module to model asset relationships and simulate risk propagation using historical financial data.',
  },
  {
    title: 'Portfolio Website',
    category: 'Web Development',
    tags: ['React', 'Vite', 'GSAP', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    description:
      'A responsive, premium personal portfolio showcasing projects, technical skills, coursework, and credentials with smooth animations.',
    details:
      'Developed a responsive personal portfolio website using React and modern web technologies. Designed a clean, user-friendly interface to showcase projects, skills, and certifications. Deployed the site for public access, ensuring cross-device compatibility.',
  },
  {
    title: 'Upcoming: AI-Powered Health Monitoring',
    category: 'Healthcare AI & IoT',
    tags: ['Coming Soon', 'AI/ML', 'Wearables', 'Health Tech'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    description:
      'An upcoming project focused on AI-driven health monitoring systems combining wearable technology and predictive analytics.',
    details:
      'Currently developing an AI-powered health monitoring platform that integrates wearable sensors with machine learning models for real-time health tracking, anomaly detection, and personalized health insights. Expected completion: Q2 2026.',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
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

      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handlePopState = () => setSelectedProject(null);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    window.history.pushState({ project: project.title }, '', `#project-${project.title.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.history.pushState({}, '', '#projects');
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      style={{ background: '#000000' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16">
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
            case studies
          </p>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            PROJECTS
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <button
              key={project.title}
              type="button"
              className="project-card group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
              }}
              onClick={() => openProject(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-3 text-3xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4">
                  {project.category}
                </p>
                <p className="text-sm leading-6 text-slate-300">{project.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[9999] overflow-auto bg-black/80 px-6 py-12 md:px-12">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#111111] p-8 shadow-2xl ring-1 ring-white/10 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-3">Project details</div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white">
                  {selectedProject.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-300">
                  {selectedProject.details}
                </p>
              </div>
              <button
                type="button"
                onClick={closeProject}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Category</h3>
                  <p className="mt-3 text-lg font-semibold text-white">{selectedProject.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Tech stack</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Summary</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{selectedProject.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
