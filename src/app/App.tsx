import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Bbot from './components/Bbot';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: '#f5f5f0' }}
    >
      <Loader />
      <Navbar />
      <Bbot />

      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="expertise">
        <Expertise />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="certificates">
        <Certificates />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
