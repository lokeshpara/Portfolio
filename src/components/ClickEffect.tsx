"use client";

import { useCallback } from 'react';

interface ClickEffectProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export default function ClickEffect({ children, onClick, className = '' }: ClickEffectProps) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Calculate click position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create spotlight element
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-effect';
    spotlight.style.left = `${x}px`;
    spotlight.style.top = `${y}px`;
    
    // Add spotlight element to the target
    target.appendChild(spotlight);
    
    // Remove spotlight element after animation
    setTimeout(() => {
      spotlight.remove();
      onClick(e);
    }, 1000);
  }, [onClick]);

  return (
    <>
      <style jsx>{`
        .click-effect {
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          overflow: hidden;
        }

        .spotlight-effect {
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(
            circle at center,
            rgba(100, 255, 218, 0.3) 0%,
            rgba(100, 255, 218, 0.2) 20%,
            rgba(100, 255, 218, 0.1) 40%,
            rgba(100, 255, 218, 0.05) 60%,
            rgba(100, 255, 218, 0) 80%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: spotlightExpand 1s ease-out forwards;
          z-index: 9999;
          filter: blur(8px);
        }

        @keyframes spotlightExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
            filter: blur(4px);
          }
          50% {
            opacity: 0.8;
            filter: blur(6px);
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            filter: blur(8px);
          }
        }

        /* Spotlight ring effect */
        .spotlight-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(100, 255, 218, 0.4) 0%,
            rgba(100, 255, 218, 0.2) 30%,
            rgba(100, 255, 218, 0) 70%
          );
          border-radius: 50%;
          opacity: 0;
          animation: spotlightRing 1s ease-out forwards;
          filter: blur(4px);
        }

        @keyframes spotlightRing {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 1;
            filter: blur(2px);
          }
          50% {
            opacity: 0.6;
            filter: blur(3px);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
            filter: blur(4px);
          }
        }

        /* Spotlight glow effect */
        .spotlight-effect::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(100, 255, 218, 0.5) 0%,
            rgba(100, 255, 218, 0.2) 40%,
            rgba(100, 255, 218, 0) 70%
          );
          border-radius: 50%;
          opacity: 0;
          animation: spotlightGlow 1s ease-out forwards;
          filter: blur(6px);
        }

        @keyframes spotlightGlow {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 1;
            filter: blur(3px);
          }
          50% {
            opacity: 0.7;
            filter: blur(4px);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
            filter: blur(6px);
          }
        }
      `}</style>

      <div 
        className={`click-effect ${className}`}
        onClick={handleClick}
      >
        {children}
      </div>
    </>
  );
} 