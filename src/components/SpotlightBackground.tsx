"use client";

import { useEffect, useState } from 'react';

export default function SpotlightBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .spotlight-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .spotlight-main {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(17, 34, 64, 0.3) 0%,
            rgba(17, 34, 64, 0.2) 25%,
            rgba(17, 34, 64, 0.1) 50%,
            rgba(17, 34, 64, 0) 75%
          );
          transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spotlight-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(17, 34, 64, 0.2) 0%,
            rgba(17, 34, 64, 0.1) 35%,
            rgba(17, 34, 64, 0) 70%
          );
          filter: blur(40px);
          transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      <div className="spotlight-container">
        <div className="spotlight-main" />
        <div className="spotlight-glow" />
      </div>
    </>
  );
} 