"use client";

import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';

export default function MobileSocialLinks() {
  const email = "lokesh@example.com";

  return (
    <div className="mobile-social-wrapper">
      <a 
        href="https://github.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-social-item"
        aria-label="GitHub Profile"
      >
        <FaGithub className="mobile-social-icon" />
        <span className="mobile-tooltip">GitHub</span>
      </a>
      
      <a 
        href="https://linkedin.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-social-item"
        aria-label="LinkedIn Profile"
      >
        <FaLinkedinIn className="mobile-social-icon" />
        <span className="mobile-tooltip">LinkedIn</span>
      </a>
      
      <a 
        href="https://twitter.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-social-item"
        aria-label="Twitter Profile"
      >
        <FaXTwitter className="mobile-social-icon" />
        <span className="mobile-tooltip">Twitter</span>
      </a>
      
      <a 
        href={`mailto:${email}`}
        className="mobile-social-item"
        aria-label="Email Me"
      >
        <MdEmail className="mobile-social-icon" />
        <span className="mobile-tooltip">Email Me</span>
      </a>
    </div>
  );
} 