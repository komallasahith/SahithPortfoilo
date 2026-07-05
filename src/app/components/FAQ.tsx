import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: 'What technologies do you work with?',
    answer:
      'I mainly work with Python, Java, JavaScript, React, TypeScript, Arduino, PyTorch, TensorFlow, Pandas, Scikit-learn, SQL, and various AI/ML frameworks. I also have experience with cloud platforms and deployment tools.',
  },

  {
    question: 'What projects have you built?',
    answer:
      'I have built several projects including an IoT Smart Private Room system, Financial Stock Analysis & Prediction using ML algorithms, this Personal Portfolio Website, and I\'m currently working on an AI-powered Health Monitoring system. Each project demonstrates different aspects of my skills in AI/ML, IoT, data science, and full-stack development.',
  },

  {
    question: 'Can you tell me about your IoT project?',
    answer:
      'My IoT Smart Private Room project uses Arduino sensors and MQTT messaging to create an intelligent automation system. It controls lighting, temperature, occupancy detection, and air quality monitoring with real-time data and a secure remote dashboard for live updates and alerts.',
  },

  {
    question: 'What is your financial analysis project about?',
    answer:
      'The Financial Stock Analysis & Prediction project uses Python and machine learning algorithms including LSTM neural networks to analyze stock market data. It implements technical indicators analysis, price prediction models, and risk assessment tools for data-driven investment insights.',
  },

  {
    question: 'Are you interested in AI/ML development?',
    answer:
      'Yes, I am highly interested in Artificial Intelligence and Machine Learning development. I have worked on computer vision, NLP, predictive modeling, and currently exploring health tech AI applications.',
  },

  {
    question: 'Do you participate in hackathons?',
    answer:
      'Yes, I participated in Smart India Hackathon and 24-hour hackathon events where I worked on innovative team projects, combining my skills in AI/ML, IoT, and software development.',
  },

  {
    question: 'What areas are you currently learning?',
    answer:
      'Currently, I am improving my skills in advanced AI/ML techniques, edge computing, health technology, financial modeling, and modern full-stack web development frameworks.',
  },

  {
    question: 'Can you work on team projects?',
    answer:
      'Yes, I enjoy collaborating with teams, sharing ideas, and building projects together in fast-paced environments. I have experience working in cross-functional teams during hackathons and internships.',
  },

  {
    question: 'What is your upcoming project?',
    answer:
      'My upcoming project is an AI-powered Health Monitoring system that combines wearable technology with machine learning models for real-time health tracking, anomaly detection, and personalized health insights. Expected completion in Q2 2026.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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

      // Stagger FAQ items
      gsap.fromTo(
        itemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-6 md:px-12"
      style={{ background: '#e8e8dd' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
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
            Got questions?
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
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              ref={el => {
                itemsRef.current[index] = el;
              }}
              className="bg-white rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* Question */}
              <button
                onClick={() => handleToggle(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-black/[0.02] transition-colors"
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    fontWeight: 600,
                    color: '#1a1a1a',
                  }}
                >
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {openIndex === index ? (
                    <Minus size={20} color="#1a1a1a" />
                  ) : (
                    <Plus size={20} color="#1a1a1a" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                }}
              >
                <div
                  className="px-6 pb-5 pt-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#4a4a4a',
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p
            className="mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#6b6b6b',
            }}
          >
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-black/80 transition-all hover:scale-105"
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
    </section>
  );
}
