"use client";

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';
import { useCallback } from 'react';

export default function SocialMediaMobile() {
  const email = "lokesh@example.com";

  // Handle click event with animation delay
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const target = e.currentTarget;
    
    // Add clicked class to trigger animations
    target.classList.add('clicked');
    
    // Remove clicked class and navigate after animation completes
    setTimeout(() => {
      target.classList.remove('clicked');
      window.location.href = url;
    }, 1000); // 1 second delay to match animation duration
  }, []);

  return (
    <>
      <style jsx>{`
        /* Container for social media icons */
        .social-mobile-container {
          display: flex;
          gap: 18px;
          justify-content: center;
          margin: 2.5rem auto;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Horizontal line background */
        .social-mobile-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          overflow: hidden;
        }

        /* Animated light beam effect */
        .social-mobile-container::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(100, 255, 218, 0) 0%,
            rgba(100, 255, 218, 0.8) 50%,
            rgba(100, 255, 218, 0) 100%
          );
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          animation: lightPass 2.8s ease-in-out infinite;
        }

        /* Light beam animation keyframes */
        @keyframes lightPass {
          0% {
            transform: translateY(-50%) translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) translateX(100%);
            opacity: 0;
          }
        }

        /* Social media icon container */
        .social-mobile-item {
          position: relative;
          width: 70px;
          height: 50px;
          border-radius: 50%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          z-index: 1;
          color: inherit;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          cursor: pointer;
        }

        /* Social media icon */
        .social-mobile-icon {
          color: #8892b0;
          font-size: 2.5rem;
          width: 35px;
          height: 35px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        /* Icon lift effect on click */
        .social-mobile-item.clicked {
          transform: translateY(-2px);
        }

        /* Icon color and scale effect on click */
        .social-mobile-item.clicked .social-mobile-icon {
          color: #64ffda;
          transform: translateZ(20px) scale(1.1);
        }

        /* Radar background effect */
        .social-mobile-item::before {
          content: '';
          position: absolute;
          width: 50%;
          height: 50%;
          background: var(--green);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 50%;
        }

        /* Radar background opacity on click */
        .social-mobile-item.clicked::before {
          opacity: 0.05;
        }

        /* Radar ring effect */
        .social-mobile-item::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid var(--green);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
          z-index: 1;
        }

        /* Radar ring animation on click */
        .social-mobile-item.clicked::after {
          opacity: 0.1;
          animation: radarRing 1s ease-out infinite;
        }

        /* Radar ring animation keyframes */
        @keyframes radarRing {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* Radar pulse element */
        .social-mobile-item .radar-pulse {
          display: none;
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 50%;
          pointer-events: none;
        }

        /* Radar pulse animation on click */
        .social-mobile-item.clicked .radar-pulse {
          display: block;
          opacity: 1;
          animation: radarPulse 1s ease-out infinite;
        }

        /* Radar pulse animation keyframes */
        @keyframes radarPulse {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
            box-shadow: 0 0 0 0 var(--green);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(0.1);
            opacity: 0;
            box-shadow: 0 0 0 25px var(--green);
          }
        }

        /* Hide tooltip on mobile */
        .social-mobile-tooltip {
          display: none;
        }

        /* Hide desktop hover effect */
        .desktop-hover-effect {
          display: none;
        }
      `}</style>

      <div className="social-mobile-container">
        <a 
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-mobile-item"
          aria-label="GitHub Profile"
          onClick={(e) => handleClick(e, "https://github.com")}
        >
          <FaGithub className="social-mobile-icon" size={25} />
          <div className="radar-pulse"></div>
        </a>
        
        <a 
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-mobile-item"
          aria-label="LinkedIn Profile"
          onClick={(e) => handleClick(e, "https://linkedin.com")}
        >
          <FaLinkedinIn className="social-mobile-icon" size={25} />
          <div className="radar-pulse"></div>
        </a>
        
        <a 
          href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-mobile-item"
          aria-label="Twitter Profile"
          onClick={(e) => handleClick(e, "https://twitter.com")}
        >
          <FaXTwitter className="social-mobile-icon" size={25} />
          <div className="radar-pulse"></div>
        </a>
        
        <a 
          href={`mailto:${email}`}
          className="social-mobile-item"
          aria-label="Email Me"
          onClick={(e) => handleClick(e, `mailto:${email}`)}
        >
          <MdEmail className="social-mobile-icon" size={25} />
          <div className="radar-pulse"></div>
        </a>
      </div>
    </>
  );
} 