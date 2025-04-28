"use client";

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialLinksProps {
  variant: 'mobile' | 'desktop';
}

export default function SocialLinks({ variant }: SocialLinksProps) {
  const email = "lokesh@example.com";

  return (
    <>
      <style jsx>{`
        /* Main container for social media links */
        .social-list {
          display: flex;
          flex-direction: ${variant === 'desktop' ? 'column' : 'row'};
          gap: 1.5rem;
          align-items: center;
          margin-top: ${variant === 'desktop' ? '2rem' : '0'};
          position: ${variant === 'desktop' ? 'fixed' : 'relative'};
          top: ${variant === 'desktop' ? '0' : 'auto'};
          left: ${variant === 'desktop' ? 'calc(2rem + (100vw - 1140px) * 0.1)' : 'auto'};
          padding: ${variant === 'desktop' ? '3rem 0 0' : '0'};
          transition: left 0.3s ease;
        }

        /* Responsive positioning for different screen sizes */
        @media (max-width: 1140px) {
          .social-list {
            left: ${variant === 'desktop' ? '2rem' : 'auto'};
          }
        }

        @media (min-width: 1141px) and (max-width: 1280px) {
          .social-list {
            left: ${variant === 'desktop' ? 'calc(2rem + (100vw - 1140px) * 0.05)' : 'auto'};
          }
        }

        @media (min-width: 1281px) {
          .social-list {
            left: ${variant === 'desktop' ? 'calc(2rem + (100vw - 1140px) * 0.1)' : 'auto'};
          }
        }

        /* Vertical line with gradient background */
        .social-list::before {
          content: '';
          display: ${variant === 'desktop' ? 'block' : 'none'};
          width: 1px;
          height: 100px;
          margin: 0 auto;
          background: linear-gradient(180deg, rgba(168, 178, 209, 0.1) 0%, var(--light-slate) 100%);
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          overflow: hidden;
        }

        /* Animated light beam effect */
        .social-list::after {
          content: '';
          display: ${variant === 'desktop' ? 'block' : 'none'};
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 180px;
          background: linear-gradient(180deg, 
            rgba(100, 255, 218, 0) 0%,
            rgba(100, 255, 218, 0.8) 50%,
            rgba(100, 255, 218, 0) 100%
          );
          animation: lightPass 2.8s ease-in-out infinite;
        }

        /* Light beam animation keyframes */
        @keyframes lightPass {
          0% {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
        }

        /* Individual social media link styling */
        .social-item {
          position: relative;
          transition: all 0.3s ease;
          color: var(--light-slate);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          margin-top: ${variant === 'desktop' ? '1rem' : '0'};
        }

        /* Extra margin for first social item */
        .social-item:first-child {
          margin-top: ${variant === 'desktop' ? '3rem' : '0'};
        }

        /* Hover effect for social items */
        .social-item:hover {
          transform: translateY(-3px);
          color: var(--green);
          background: rgba(100, 255, 218, 0.1);
        }

        /* Social media icon styling */
        .social-icon {
          width: 22px;
          height: 22px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        /* Icon spin animation on hover */
        .social-item:hover .social-icon {
          animation: iconSpin 0.6s ease;
          filter: drop-shadow(0 0 8px var(--green));
        }

        /* Icon spin animation keyframes */
        @keyframes iconSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        /* Mobile tooltip styles */
        .social-tooltip {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background: var(--light-navy);
          color: var(--green);
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          border: 1px solid var(--green);
          display: ${variant === 'desktop' ? 'none' : 'block'};
        }

        /* Show tooltip on hover */
        .social-item:hover .social-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Desktop hover effect with glow */
        .desktop-hover-effect {
          display: ${variant === 'desktop' ? 'block' : 'none'};
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, var(--green) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        /* Pulse ring animation on hover */
        .social-item:hover .desktop-hover-effect {
          opacity: 0.2;
          animation: pulseRing 1.5s ease-out infinite;
        }

        /* Pulse ring animation keyframes */
        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 0.2;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Border animation for desktop */
        .social-item::before {
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

        /* Border pulse animation on hover */
        .social-item:hover::before {
          opacity: 0.3;
          transform: scale(1.2);
          animation: borderPulse 1.5s ease-out infinite;
        }

        /* Border pulse animation keyframes */
        @keyframes borderPulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Mobile view adjustments */
        @media (max-width: 768px) {
          .social-list {
            display: ${variant === 'desktop' ? 'none' : 'flex'};
            justify-content: center;
            padding: 1rem;
          }
          .social-tooltip {
            display: block;
          }
        }
      `}</style>

      {/* Social media links container */}
      <div className="social-list">
        {/* GitHub link */}
        <a 
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-item"
          aria-label="GitHub Profile"
        >
          <FaGithub className="social-icon" />
          <div className="desktop-hover-effect"></div>
          <span className="social-tooltip">GitHub</span>
        </a>
        
        {/* LinkedIn link */}
        <a 
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-item"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedinIn className="social-icon" />
          <div className="desktop-hover-effect"></div>
          <span className="social-tooltip">LinkedIn</span>
        </a>
        
        {/* Twitter link */}
        <a 
          href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-item"
          aria-label="Twitter Profile"
        >
          <FaXTwitter className="social-icon" />
          <div className="desktop-hover-effect"></div>
          <span className="social-tooltip">Twitter</span>
        </a>
        
        {/* Email link */}
        <a 
          href={`mailto:${email}`}
          className="social-item"
          aria-label="Email Me"
        >
          <MdEmail className="social-icon" />
          <div className="desktop-hover-effect"></div>
          <span className="social-tooltip">Email Me</span>
        </a>
      </div>
    </>
  );
} 