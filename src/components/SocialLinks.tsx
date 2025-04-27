"use client";

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialLinksProps {
  variant: 'mobile' | 'desktop';
}

export default function SocialLinks({ variant }: SocialLinksProps) {
  const email = "lokesh@example.com";

  if (variant === 'mobile') {
    return (
      <div className="mobile-social-container">
        <a 
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-social-link github"
          aria-label="GitHub Profile"
          data-tooltip="GitHub"
        >
          <FaGithub className="mobile-social-icon" />
          <div className="mobile-tooltip">GitHub</div>
        </a>
        
        <a 
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-social-link linkedin"
          aria-label="LinkedIn Profile"
          data-tooltip="LinkedIn"
        >
          <FaLinkedinIn className="mobile-social-icon" />
          <div className="mobile-tooltip">LinkedIn</div>
        </a>
        
        <a 
          href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-social-link twitter"
          aria-label="Twitter Profile"
          data-tooltip="Twitter"
        >
          <FaXTwitter className="mobile-social-icon" />
          <div className="mobile-tooltip">Twitter</div>
        </a>
        
        <a 
          href={`mailto:${email}`}
          className="mobile-social-link email"
          data-tooltip="Contact Me"
          aria-label="Email Me"
        >
          <MdEmail className="mobile-social-icon" />
          <div className="mobile-tooltip">Email Me</div>
        </a>
      </div>
    );
  }
  
  return (
    <div className="mt-4 mb-6" style={{ opacity: 1 }}>
      <div className="social-container" style={{ opacity: 1 }}>
        <a 
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="GitHub Profile"
          data-tooltip="GitHub"
        >
          <FaGithub className="social-icon" />
          <div className="tooltip">GitHub<div className="tooltip-arrow"></div></div>
        </a>
        
        <a 
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="LinkedIn Profile"
          data-tooltip="LinkedIn"
        >
          <FaLinkedinIn className="social-icon" />
          <div className="tooltip">LinkedIn<div className="tooltip-arrow"></div></div>
        </a>
        
        <a 
          href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Twitter Profile"
          data-tooltip="Twitter"
        >
          <FaXTwitter className="social-icon" />
          <div className="tooltip">Twitter<div className="tooltip-arrow"></div></div>
        </a>
        
        <a 
          href={`mailto:${email}`}
          className="email-link"
          data-tooltip="Email"
          aria-label="Email Me"
        >
          <MdEmail className="email-icon" />
          <div className="tooltip">Email Me<div className="tooltip-arrow"></div></div>
        </a>
      </div>
    </div>
  );
} 