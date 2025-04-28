"use client";

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';

export default function SocialMediaMobile() {
  const email = "lokesh@example.com";

  return (
    <>
      <style jsx>{`
        .social-mobile-container {
          display: flex;
          gap: 18px;
          justify-content: center;
          margin: 2.5rem auto;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Horizontal line with gradient background */
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

        .social-mobile-item {
          position: relative;
          width: 70px;
          height: 50px;
          border-radius: 50%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
          color: inherit;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-mobile-icon {
          color: #8892b0;
          font-size: 2.5rem;
          width: 35px;
          height: 35px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        .social-mobile-item:active {
          transform: scale(0.92);
        }

        .social-mobile-item:active .social-mobile-icon {
          color: #64ffda;
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.4));
        }

        /* Ripple effect */
        .social-mobile-item::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(100, 255, 218, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
          z-index: 1;
        }

        .social-mobile-item:active::before {
          transform: scale(2);
          opacity: 1;
          animation: rippleEffect 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes rippleEffect {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        /* Glow effect */
        .social-mobile-item::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .social-mobile-item:active::after {
          opacity: 1;
          animation: glowPulse 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes glowPulse {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        /* Link effect */
        .social-mobile-item::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(100, 255, 218, 0.1);
          border-radius: 50%;
          transform: scale(0);
          transition: transform 0.3s ease;
        }

        .social-mobile-item:active::before {
          transform: scale(1);
        }

        .social-mobile-tooltip {
          display: none;
        }

        .social-mobile-item::after {
          display: none;
        }

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
        >
          <FaGithub className="social-mobile-icon" size={25} />
        </a>
        
        <a 
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-mobile-item"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedinIn className="social-mobile-icon" size={25} />
        </a>
        
        <a 
          href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-mobile-item"
          aria-label="Twitter Profile"
        >
          <FaXTwitter className="social-mobile-icon" size={25} />
        </a>
        
        <a 
          href={`mailto:${email}`}
          className="social-mobile-item"
          aria-label="Email Me"
        >
          <MdEmail className="social-mobile-icon" size={25} />
        </a>
      </div>
    </>
  );
} 