"use client";

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/lokeshpara',
    icon: <FaGithub className="social-mobile-icon" size={25} />
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/lokeshpara',
    icon: <FaLinkedinIn className="social-mobile-icon" size={25} />
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/lokeshpara',
    icon: <FaXTwitter className="social-mobile-icon" size={25} />
  },
  {
    name: 'Email',
    url: 'mailto:lokeshpara@gmail.com',
    icon: <MdEmail className="social-mobile-icon" size={25} />
  }
];

export default function SocialMediaMobile() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (url: string, index: number) => {
    setActiveIndex(index);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setActiveIndex(null);
    }, 500);
  };

  return (
    <>
      <div className="social-mobile-container">
        {socialLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => handleClick(link.url, index)}
            className={`social-mobile-item ${activeIndex === index ? 'active' : ''}`}
            aria-label={`${link.name} Profile`}
          >
            {link.icon}
            <div className="radar-pulse"></div>
            <div className="ripple-effect"></div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .social-mobile-container {
          display: flex;
          gap: 18px;
          justify-content: center;
          
          position: relative;
          overflow: hidden;
        }

        .social-mobile-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: rgba(168, 178, 209, 0.1);
        }

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
          overflow: visible;
          z-index: 1;
          color: #8892b0;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          cursor: pointer;
          border: none;
          padding: 0;
          margin: 0;
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

        .social-mobile-item.active {
          transform: translateY(-2px) scale(1.05);
        }

        .social-mobile-item.active .social-mobile-icon {
          color: #64ffda;
          transform: scale(1.2) rotate(360deg);
          filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.5));
        }

        .ripple-effect {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100, 255, 218, 0.2) 0%, transparent 70%);
          opacity: 0;
          transform: scale(0);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .social-mobile-item.active .ripple-effect {
          opacity: 1;
          transform: scale(2);
          animation: ripple 0.5s ease-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .social-mobile-item::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 50%;
          transform: scale(0.8);
        }

        .social-mobile-item.active::before {
          opacity: 1;
          transform: scale(1.2);
          animation: glowPulse 1s ease-out infinite;
        }

        @keyframes glowPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }

        .social-mobile-item::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #64ffda;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .social-mobile-item.active::after {
          opacity: 0.3;
          animation: borderPulse 1s ease-out infinite;
        }

        @keyframes borderPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }

        .radar-pulse {
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

        .social-mobile-item.active .radar-pulse {
          display: block;
          opacity: 1;
          animation: radarPulse 1s ease-out infinite;
        }

        @keyframes radarPulse {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
            box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.5);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(0.1);
            opacity: 0;
            box-shadow: 0 0 0 25px rgba(100, 255, 218, 0);
          }
        }
      `}</style>
    </>
  );
} 