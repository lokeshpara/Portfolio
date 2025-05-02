"use client";

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [counter, setCounter] = useState(0);
  const [commandLines, setCommandLines] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 600);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }
    
    // Set a small timeout before starting animations to ensure smooth appearance
    const initialTimer = setTimeout(() => {
      setFadeIn(true);
    }, 10);

    // Simulate loading progress with easing
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Use smoother easing function
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };
      
      const progressPercent = Math.min(progress / 2500, 1); // 2.5 seconds total
      const easedProgress = easeOutExpo(progressPercent);
      const newCounter = Math.min(Math.floor(easedProgress * 100), 100); // Ensure we don't exceed 100
      
      setCounter(newCounter);
      
      if (progress < 2500) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Ensure we reach 100% at the end
        setCounter(100);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(initialTimer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  useEffect(() => {
    // Add command lines at specific percentages
    if (counter === 5) {
      setCommandLines(prev => [...prev, "$ Initializing portfolio application..."]);
    } else if (counter === 20) {
      setCommandLines(prev => [...prev, "$ Loading project data..."]);
    } else if (counter === 40) {
      setCommandLines(prev => [...prev, "$ Preparing assets and resources..."]);
    } else if (counter === 60) {
      setCommandLines(prev => [...prev, "$ Building user interface components..."]);
    } else if (counter === 80) {
      setCommandLines(prev => [...prev, "$ Optimizing performance..."]);
    } else if (counter === 95) {
      setCommandLines(prev => [...prev, "$ Final preparations..."]);
    } else if (counter === 100) {
      setCommandLines(prev => [...prev, "$ Portfolio ready. Launching..."]);
    }
  }, [counter]);

  // Simplify command lines on mobile
  const getCommandLines = () => {
    if (isMobile) {
      // On mobile, show fewer command lines to save space
      const filteredLines = commandLines.slice(Math.max(0, commandLines.length - 2));
      return (
        <>
          <div className="loading-initial-line">$ Loading portfolio...</div>
          {filteredLines.map((line, index) => (
            <div key={index} className="loading-command-line">{line}</div>
          ))}
        </>
      );
    }
    
    // On desktop, show the most recent 3-4 lines to keep it compact
    const filteredLines = commandLines.slice(Math.max(0, commandLines.length - 3));
    return (
      <>
        <div className="loading-initial-line">$ Portfolio loading sequence initiated</div>
        {filteredLines.map((line, index) => (
          <div key={index} className="loading-command-line">{line}</div>
        ))}
      </>
    );
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a192f',
        zIndex: 9999,
      }}
    >
      <div style={{
        width: '90%',
        maxWidth: '550px',
        height: 'auto',
        minHeight: isMobile ? '200px' : '230px',
        maxHeight: '60vh',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        fontFamily: 'monospace',
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'scale(1)' : 'scale(0.98)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <div style={{
          height: isMobile ? '26px' : '30px',
          backgroundColor: '#1e293b',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          position: 'relative',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57', marginRight: '6px' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e', marginRight: '6px' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840', marginRight: '6px' }}></div>
          </div>
          <div style={{ color: '#adbac7', fontSize: '12px' }}>Portfolio.exe</div>
        </div>
        <div style={{
          padding: isMobile ? '8px' : '12px',
          height: isMobile ? 'calc(100% - 26px)' : 'calc(100% - 30px)',
          minHeight: isMobile ? '160px' : '180px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#adbac7',
        }}>
          <div style={{ 
            flexGrow: 1, 
            overflowY: 'auto',
            marginBottom: '0',
            fontSize: isMobile ? '12px' : '13px',
            lineHeight: isMobile ? '1.4' : '1.5',
          }}>
            {getCommandLines()}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              marginTop: '12px',
              flexWrap: 'wrap',
              gap: '5px',
              rowGap: isMobile ? '6px' : '5px',
              marginBottom: '0',
              width: '100%', // Ensure full width on mobile
            }}>
              <span style={{ color: '#64ffda', marginRight: '5px' }}>$</span>
              <span className="terminal-cursor">Progress: </span>
              <div style={{ 
                width: isMobile ? '100%' : '60%', // Full width on mobile
                maxWidth: isMobile ? 'none' : '200px', // Remove max-width on mobile
                height: isMobile ? '8px' : '10px',
                backgroundColor: '#1e293b',
                borderRadius: '5px',
                overflow: 'hidden',
                border: '1px solid #2d3748',
                flexGrow: 1,
                position: 'relative',
                marginBottom: '0',
              }}>
                <div 
                  className="loading-bar" 
                  style={{
                    width: `${counter}%`,
                    height: '100%',
                    backgroundColor: '#64ffda',
                    boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '0',
                    transition: 'width 0.1s linear', // Faster, linear transition for accuracy
                  }}
                >
                  <div className="loading-bar-shine"></div>
                </div>
              </div>
              <span style={{ 
                color: '#64ffda', 
                fontWeight: 'bold',
                fontSize: isMobile ? '12px' : 'inherit',
                marginLeft: isMobile ? 'auto' : undefined,
                minWidth: isMobile ? '40px' : undefined, // Ensure consistent width for percentage
                textAlign: isMobile ? 'right' : undefined, // Right align on mobile
              }}>
                {counter}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-initial-line, .loading-command-line {
          margin-bottom: 4px;
          opacity: 0.9;
          word-wrap: break-word;
          word-break: break-word;
          animation: typingEffect 0.5s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        @keyframes typingEffect {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 0.9; transform: translateY(0); }
        }
        
        .terminal-cursor::after {
          content: '';
          display: inline-block;
          width: 7px;
          height: 13px;
          background-color: #64ffda;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
          vertical-align: middle;
        }
        
        .loading-bar {
          will-change: width;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .loading-bar-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        @keyframes shine {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% { 
            transform: translateX(200%);
            opacity: 0;
          }
        }
        
        @media (max-width: 600px) {
          .terminal-cursor::after {
            height: 11px;
            width: 6px;
          }
          
          .loading-bar {
            transition: width 0.05s linear; /* Even faster transition on mobile */
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
} 