"use client";

import React from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className="social-icon" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="social-icon" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="social-icon" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="social-icon" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
      </svg>
    ),
  },
];

export default function SocialMedia() {
  return (
    <>
      {/* Desktop Social Links */}
      <div className="social-list hidden md:flex">
        <div className="social-line"></div>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            aria-label={link.name}
          >
            {link.icon}
            <div className="desktop-hover-effect"></div>
            <span className="social-tooltip">{link.name}</span>
          </a>
        ))}
      </div>

      {/* Mobile Social Links */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-navy bg-opacity-90 backdrop-blur-sm border-t border-lightest-navy">
        <div className="flex justify-around items-center py-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-slate hover:text-green transition-colors duration-200"
              aria-label={link.name}
            >
              <div className="w-6 h-6">
                {link.icon}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        :root {
          --navy: #0a192f;
          --light-navy: #112240;
          --lightest-navy: #233554;
          --slate: #8892b0;
          --light-slate: #a8b2d1;
          --lightest-slate: #ccd6f6;
          --white: #e6f1ff;
          --green: #64ffda;
          --green-tint: #64ffda1a;
        }

        .social-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: center;
          margin-top: 0;
          position: fixed;
          top: 0;
          padding: 0;
          transition: all 0.3s ease;
          left: calc(2rem + (100vw - 1140px) * 0.1);
          color: var(--slate);
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-feature-settings: "ss01", "ss02", "cv01", "cv02";
          box-sizing: border-box;
          margin: 0;
        }

        .social-line {
          width: 1px;
          height: 130px;
          margin: 2rem auto;
          background: linear-gradient(180deg, rgba(168, 178, 209, 0.1) 0%, var(--light-slate) 100%);
          position: relative;
          overflow: visible;
          box-shadow: 0 0 8px rgba(168, 178, 209, 0.3);
        }

        

        .social-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 185px;
          background: linear-gradient(180deg, 
            rgba(100, 255, 218, 0) 0%,
            rgba(100, 255, 218, 0.6) 100%,
            rgba(100, 255, 218, 0) 100%
          );
          animation: linePulse 2s ease-in-out infinite;
        }

        @keyframes linePulse {
          0% {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
        }

        .social-item {
          position: relative;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          z-index: 1;
          color: var(--slate);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-item[href*="linkedin"],
        .social-item[href*="twitter"],
        .social-item[href*="mailto"] {
          margin-top: 1rem;
        }

        .social-icon {
          width: 18px;
          height: 18px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .social-item:hover {
          transform: translateY(-2px);
          color: var(--green);
        }

        .social-item:hover .social-icon {
          animation: iconPop 0.4s ease;
        }

        @keyframes iconPop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .desktop-hover-effect {
          display: block;
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

        .social-item:hover .desktop-hover-effect {
          opacity: 1;
          animation: radarPulse 1s ease-out infinite;
        }

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

        .social-item::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--green);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 50%;
        }

        .social-item:hover::before {
          opacity: 0.1;
        }

        .social-item::after {
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

        .social-item:hover::after {
          opacity: 0.3;
          animation: radarRing 1s ease-out infinite;
        }

        @keyframes radarRing {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        .social-tooltip {
          display: none;
        }

        @media (max-width: 768px) {
          .social-list {
            display: none;
          }
        }
      `}</style>
    </>
  );
} 