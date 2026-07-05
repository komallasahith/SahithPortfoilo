import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let animationFrameId: number | null = null;

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.3;
      cursorY += dy * 0.3;

      gsap.set(cursor, { x: mouseX, y: mouseY });
      gsap.set(follower, { x: cursorX, y: cursorY });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Magnetic effect for interactive elements
    const handleHoverEnter = () => {
      // gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      // gsap.to(follower, { scale: 1.4, duration: 0.3 });
    };

    const handleHoverLeave = () => {
      // gsap.to(cursor, { scale: 1, duration: 0.3 });
      // gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add magnetic effect to interactive elements
    // const interactiveElements = document.querySelectorAll('a, button, .project-card, .contact-link');
    // interactiveElements.forEach(el => {
    //   el.addEventListener('mouseenter', handleHoverEnter);
    //   el.addEventListener('mouseleave', handleHoverLeave);
    // });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      // interactiveElements.forEach(el => {
      //   el.removeEventListener('mouseenter', handleHoverEnter);
      //   el.removeEventListener('mouseleave', handleHoverLeave);
      // });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-black/30 rounded-full pointer-events-none z-[9998]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
