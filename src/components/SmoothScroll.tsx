"use client";

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Function to remove hash from URL
    const removeHash = () => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    // Handle click events
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.slice(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            removeHash();
          }
        }
      }
    };

    // Handle scroll events
    const handleScroll = () => {
      removeHash();
    };

    // Handle hash changes
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      removeHash();
    };

    // Handle popstate events (browser back/forward)
    const handlePopState = () => {
      removeHash();
    };

    // Initial cleanup of any existing hash
    removeHash();

    // Add event listeners with capture phase
    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('hashchange', handleHashChange, true);
    window.addEventListener('popstate', handlePopState, true);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('hashchange', handleHashChange, true);
      window.removeEventListener('popstate', handlePopState, true);
    };
  }, []);

  return null;
} 