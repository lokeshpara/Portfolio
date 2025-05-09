"use client";

import { useEffect, useRef, useState } from 'react';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import EducationSection from '@/components/sections/EducationSection';
import LoadingScreen from '@/components/LoadingScreen';
import SocialMediaMobile from '@/components/SocialMediaMobile';
import SocialMedia from '@/components/SocialMedia';

// Add a debounce utility at the top of the file, after imports
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

// Section reference component for direct navigation
const SectionReference = ({ id, title, onSectionClick }: { id: string; title: string; onSectionClick: (id: string) => void }) => {
  // Direct scroll function within the component
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSectionClick(id);
  };

  return (
    <a 
      href={`#${id}`}
      onClick={handleClick}
      className="text-green hover:text-lightest-slate transition-colors duration-200 ml-2"
      title={`Direct link to ${title} section`}
    >
      {/* Removed hover link icon */}
    </a>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  
  // Track whether we need to process scroll events
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Map of section IDs to their corresponding refs
  const sectionRefs = {
    'about': aboutRef,
    'experience': experienceRef,
    'projects': projectsRef,
    'education': educationRef,
    'blog': blogRef
  };

  // Simplified, lightweight smooth scroll function
  const smoothScrollTo = (element: HTMLElement) => {
    if (!element || !rightColumnRef.current) return;
    
    // Temporarily disable scroll handling during programmatic scrolling
    isScrollingRef.current = true;
    
    // Use minimal calculation for better performance
    const offset = 40;
    const top = element.offsetTop - offset;
    
    // Smoother scrolling with better timing
    rightColumnRef.current.scrollTo({
      top,
      behavior: 'smooth'
    });
    
    // Re-enable scroll handling after animation completes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800); // Increased timeout for smoother transitions
  };

  // Function to scroll to a specific section - minimal processing
  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    
    if (ref?.current && rightColumnRef.current) {
      // Update active section immediately for responsive UI
      setActiveSection(sectionId);
      
      // Call the scroll function
      smoothScrollTo(ref.current);
      
      // Add a class to trigger animation and remove it after animation completes
      const navLinks = document.querySelectorAll('.navlink');
      navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
          // Add animation trigger class
          link.classList.add('animate-on-scroll');
          
          // Remove it after animation completes
          setTimeout(() => {
            link.classList.remove('animate-on-scroll');
          }, 1200); // Increased timeout for smoother animation
        }
      });
    }
  };

  // Modify the IntersectionObserver setup to reduce toggling
  useEffect(() => {
    if (isLoading || typeof IntersectionObserver === 'undefined') return;
    
    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create options for the observer with optimized thresholds and margins
    const options = {
      root: rightColumnRef.current,
      rootMargin: '-20% 0px -20% 0px', // More restrictive margin to reduce false positives
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] // More granular thresholds
    };
    
    // Track which sections are in view with their visibility ratios
    const visibleSections = new Map();
    let lastActiveSection = activeSection;
    let debounceTimer: NodeJS.Timeout | null = null;
    let lastScrollTime = Date.now();
    
    // Create new observer with improved section detection
    observerRef.current = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return; // Skip during programmatic scrolling
      
      const currentTime = Date.now();
      const timeSinceLastScroll = currentTime - lastScrollTime;
      
      // Update which sections are visible with their intersection ratios
      entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('data-section');
        if (!sectionId) return;
        
        if (entry.isIntersecting) {
          // Store intersection ratio for visible sections
          visibleSections.set(sectionId, entry.intersectionRatio);
        } else {
          visibleSections.delete(sectionId);
        }
      });
      
      // If we have visible sections, find the one with highest visibility ratio
      if (visibleSections.size > 0) {
        // Apply a minimum threshold to prevent flickering
        const VISIBILITY_THRESHOLD = 0.2; // Higher threshold for more stable detection
        let highestRatio = 0;
        let mostVisibleSection = lastActiveSection;
        
        visibleSections.forEach((ratio, sectionId) => {
          // Only consider sections with significant visibility
          if (ratio > highestRatio && ratio >= VISIBILITY_THRESHOLD) {
            highestRatio = ratio;
            mostVisibleSection = sectionId;
          }
        });
        
        // Debounce the section change to prevent rapid toggling
        if (mostVisibleSection !== lastActiveSection && mostVisibleSection !== activeSection) {
          // Clear any existing debounce timer
          if (debounceTimer) {
            clearTimeout(debounceTimer);
          }
          
          // Set a new debounce timer with dynamic delay based on scroll speed
          const debounceDelay = Math.min(Math.max(timeSinceLastScroll, 100), 300);
          debounceTimer = setTimeout(() => {
            setActiveSection(mostVisibleSection);
            lastActiveSection = mostVisibleSection;
            lastScrollTime = currentTime;
          }, debounceDelay);
        }
      }
    }, options);
    
    // Observe all sections
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observerRef.current?.observe(ref.current);
      }
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [isLoading, activeSection]);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 1200;
      setIsMobile(newIsMobile);
      console.log("Screen width:", window.innerWidth, "isMobile:", newIsMobile);
    };
    
    // Check on initial render
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Handle initial loading
  useEffect(() => {
    // Wait for fonts to load and ensure minimum loading time
    const loadContent = async () => {
      // Wait for fonts to load
      await document.fonts.ready;
      
      // Additional delay to ensure smooth transition
      await new Promise(resolve => setTimeout(resolve, 2500)); // Reduced from 4000ms to 2500ms
      
      setIsLoading(false);
    };

    loadContent();
  }, []);

  // Debug useEffect to check if refs are properly initialized
  useEffect(() => {
    // Wait a bit to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      if (rightColumnRef.current) {
        // Add a clean event listener for smooth scroll on all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const target = e.currentTarget as HTMLAnchorElement;
            const targetId = target.getAttribute('href')?.substring(1);
            if (targetId && Object.keys(sectionRefs).includes(targetId)) {
              scrollToSection(targetId);
            }
          });
        });
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Simple scroll-based section detection using IntersectionObserver
  useEffect(() => {
    if (isLoading || !rightColumnRef.current) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;

    // Create options for the observer
    const options = {
      root: rightColumnRef.current,
      rootMargin: '-45% 0px -45% 0px', // Only trigger when section is significantly in view
      threshold: [0.5] // Only trigger when section is 50% visible
    };

    // Create new observer
    const observer = new IntersectionObserver((entries) => {
      if (!isScrolling) return; // Only change sections while scrolling

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    }, options);

    // Observe all sections
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Handle scroll events
    const handleScroll = () => {
      if (!rightColumnRef.current || isScrollingRef.current) return;

      // Set scrolling state
      isScrolling = true;

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a timeout to detect when scrolling has stopped
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Add scroll event listener
    rightColumnRef.current.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      if (rightColumnRef.current) {
        rightColumnRef.current.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isLoading]);

  // Get the currently active section based on scroll position - enhanced version
  const getActiveSection = () => {
    if (!rightColumnRef.current) return 'about'; // Default to first section
    
    const scrollTop = rightColumnRef.current.scrollTop;
    const containerHeight = rightColumnRef.current.clientHeight;
    const scrollCenter = scrollTop + (containerHeight / 2);
    
    // Calculate the position of each section relative to the scroll container
    const sectionPositions = Object.entries(sectionRefs).map(([id, ref]) => {
      const offsetTop = ref.current?.offsetTop || 0;
      const height = ref.current?.clientHeight || 0;
      const center = offsetTop + (height / 2);
      const distance = Math.abs(scrollCenter - center);
      return { id, offsetTop, center, distance };
    });
    
    // Sort by vertical distance from the center of the viewport
    sectionPositions.sort((a, b) => a.distance - b.distance);
    
    // The closest section to the center is our active section
    return sectionPositions[0]?.id || 'about';
  };

  // Add a more reliable scroll handler
  useEffect(() => {
    if (isLoading || !rightColumnRef.current) return;
    
    const handleEnhancedScroll = debounce(() => {
      if (isScrollingRef.current) return;
      
      const newActiveSection = getActiveSection();
      console.log("Enhanced scroll detection: detected section", newActiveSection);
      
      if (newActiveSection !== activeSection) {
        console.log("Updating active section to:", newActiveSection);
        setActiveSection(newActiveSection);
        
        // Highlight the active navlink
        document.querySelectorAll('.navlink').forEach(link => {
          if (link.getAttribute('href') === `#${newActiveSection}`) {
            link.classList.add('navlink-active');
          } else {
            link.classList.remove('navlink-active');
          }
        });
      }
    }, 100); // Fast debounce for responsive UI
    
    // Poll for section changes even when not scrolling
    const checkInterval = setInterval(() => {
      handleEnhancedScroll();
    }, 1000);
    
    const scrollElement = rightColumnRef.current;
    scrollElement.addEventListener('scroll', handleEnhancedScroll);
    
    // Also check when components might have been updated
    window.addEventListener('resize', handleEnhancedScroll);
    
    // Clean up
    return () => {
      clearInterval(checkInterval);
      scrollElement.removeEventListener('scroll', handleEnhancedScroll);
      window.removeEventListener('resize', handleEnhancedScroll);
    };
  }, [isLoading, activeSection]);

  // Set explicit data-attributes to help with section detection
  const aboutProps = {
    ref: aboutRef,
    id: "about",
    "data-section": "about",
    className: "right-column-section mb-24 section-container",
    style: { 
      minHeight: '40vh', 
      scrollMarginTop: '40px',
      border: '1px solid transparent' // Add invisible border to help with calculations
    }
  };

  const experienceProps = {
    ref: experienceRef,
    id: "experience",
    "data-section": "experience",
    className: "right-column-section mb-24 section-container",
    style: { 
      minHeight: '40vh',
      scrollMarginTop: '40px',
      border: '1px solid transparent'
    }
  };

  const projectsProps = {
    ref: projectsRef,
    id: "projects",
    "data-section": "projects",
    className: "right-column-section mb-24 section-container",
    style: { 
      minHeight: '40vh',
      scrollMarginTop: '40px',
      border: '1px solid transparent'
    }
  };

  const blogProps = {
    ref: blogRef,
    id: "blog",
    "data-section": "blog",
    className: "right-column-section mb-24 section-container",
    style: { 
      minHeight: '40vh',
      scrollMarginTop: '40px',
      border: '1px solid transparent'
    }
  };

  const educationProps = {
    ref: educationRef,
    id: "education",
    "data-section": "education",
    className: "right-column-section section-container",
    style: { 
      minHeight: '40vh',
      scrollMarginTop: '40px',
      paddingBottom: '5rem',
      border: '1px solid transparent'
    }
  };

  // Return loading screen while content is preparing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Return main content once loading is complete
  return (
    <div className="bg-slate-900 min-h-screen py-12 md:py-20 lg:py-24 relative overflow-hidden" 
      style={{ 
        paddingTop: "1rem", 
        paddingBottom: "1.5rem", 
        fontFeatureSettings: "'ss01', 'ss02', 'cv01', 'cv02'" 
      }}
    >
      {/* Background Spotlight Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-indigo-950/30 opacity-80" />
        
        {/* Static gradient elements instead of motion effects */}
        <div 
          className="absolute w-[150vw] h-[100vh] bg-gradient-to-b from-transparent via-green/30 to-transparent skew-y-12 rotate-12"
          style={{ top: '-50%', left: '-50%', opacity: 0.1 }}
        />
        
        <div 
          className="absolute w-[60vw] h-[60vh] bg-gradient-to-r from-green/30 to-emerald-400/20 rounded-full blur-[100px] opacity-70"
          style={{ top: '5%', left: '10%' }}
        />
        
        <div 
          className="absolute w-[70vw] h-[70vh] bg-gradient-to-br from-indigo-500/30 via-violet-500/25 to-purple-800/20 rounded-full blur-[120px] opacity-60"
          style={{ bottom: '-10%', right: '0%' }}
        />
        
        <div 
          className="absolute w-[40vw] h-[40vh] bg-gradient-to-tl from-blue-500/25 to-cyan-300/20 rounded-full blur-[80px] opacity-50"
          style={{ top: '60%', left: '40%' }}
        />
        
        <div 
          className="absolute w-[35vw] h-[35vh] bg-gradient-to-tr from-rose-500/20 to-pink-400/15 rounded-full blur-[90px] opacity-40"
          style={{ top: '30%', right: '10%' }}
        />
      </div>
      
      {isMobile ? (
        // Mobile View
        <div className="block p-4 sm:p-6 md:p-8" style={{ fontSize: 'small' }}>
          <header className="text-left mb-6 pt-6 sm:pt-8 relative p-3 rounded-lg" style={{ marginLeft: '1rem' }}>
            <div 
              className="absolute inset-0 bg-gradient-to-br from-green/5 via-slate-800/80 to-slate-900 rounded-lg -z-10"
            />
            <h1 
              className="font-bold text-lightest-slate mb-2 tracking-tight"
              style={{ fontSize: 'xxx-large' }}
            >
              Lokesh Para
            </h1>
            
            <div
              className="flex items-center gap-1 mb-4"
            >
              <p 
                className="font-semibold text-lightest-slate mb-2 tracking-tight"
                style={{ fontSize: 'medium' }}
              >
                Full Stack Developer | AI Specialist
              </p>
            </div>
            
            <p 
              className="text-light-slate opacity-70 font-light tracking-wide mb-8"
              style={{ fontSize: 'small' }}
            >
              Transforming ideas into intelligent applications
            </p>
            
            <SocialMediaMobile />
          </header>
          
          <main style={{ fontSize: 'small' }}>
            <div id="about" style={{ scrollMarginTop: '1rem', minHeight: '30vh' }}>
              <AboutSection />
            </div>
            <div id="experience" style={{ scrollMarginTop: '1rem', minHeight: '30vh' }}>
              <ExperienceSection />
            </div>
            <div id="projects" style={{ scrollMarginTop: '1rem', minHeight: '30vh' }}>
              <ProjectsSection />
            </div>
            <div id="blog" style={{ scrollMarginTop: '1rem', minHeight: '30vh' }}>
              <BlogSection />
            </div>
            <div id="education" style={{ scrollMarginTop: '1rem', minHeight: '30vh', paddingBottom: '2rem' }}>
              <EducationSection />
            </div>
          </main>
        </div>
      ) : (
        // Desktop View
        <>
          {/* Fixed Left Column */}
          <div className="fixed top-0 left-0 h-screen w-[calc(min(90vw,1000px)*0.4)] max-w-[400px] z-10" style={{ 
            marginLeft: 'calc((100vw - min(90vw, 1000px))/2)',
            top: '2rem'
          }}>
            <div className="flex flex-col h-full px-3 md:px-4 lg:px-5 xl:px-6">
              {/* Profile section - reduce margin */}
              <div className="relative mb-4" style={{ marginTop: '2rem' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-slate-800/80 to-slate-900 rounded-lg -z-10"/>
                <div>
                  <div className="flex items-start">
                    <div>
                      <h1 className="font-bold text-lightest-slate tracking-tight" style={{ fontSize: 'xxx-large' }}>
                        Lokesh Para
                      </h1>
                      <div className="flex items-cente mb-4">
                        <p className="text-green opacity-70 font-semibold tracking-tight" style={{ fontSize: 'medium' }}>
                          Full Stack Engineer | AI Specialist
                        </p>
                      </div>
                      <p className="text-light-slate opacity-70 font-light tracking-wide mb-8" style={{ fontSize: 'small' }}>
                        Transforming ideas into intelligent applications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="mb-6 pl-1" style={{ opacity: 1 }}>
                <ul className="flex flex-col" style={{ opacity: 1 }}>
                  <li className="navlink-container" style={{ opacity: 1 }}>
                    <a 
                      href="#about"
                      className={`navlink ${activeSection === 'about' ? 'navlink-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('about');
                      }}
                      style={{ opacity: 1 }}
                    >
                      <div className="navlink-indicator"></div>
                      <span className="navlink-text">
                        <span data-letter="A">A</span>
                        <span data-letter="b">b</span>
                        <span data-letter="o">o</span>
                        <span data-letter="u">u</span>
                        <span data-letter="t">t</span>
                      </span>
                    </a>
                  </li>
                  <li className="navlink-container" style={{ opacity: 1 }}>
                    <a 
                      href="#experience"
                      className={`navlink ${activeSection === 'experience' ? 'navlink-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('experience');
                      }}
                      style={{ opacity: 1 }}
                    >
                      <div className="navlink-indicator"></div>
                      <span className="navlink-text">
                        <span data-letter="E">E</span>
                        <span data-letter="x">x</span>
                        <span data-letter="p">p</span>
                        <span data-letter="e">e</span>
                        <span data-letter="r">r</span>
                        <span data-letter="i">i</span>
                        <span data-letter="e">e</span>
                        <span data-letter="n">n</span>
                        <span data-letter="c">c</span>
                        <span data-letter="e">e</span>
                      </span>
                    </a>
                  </li>
                  <li className="navlink-container" style={{ opacity: 1 }}>
                    <a 
                      href="#projects"
                      className={`navlink ${activeSection === 'projects' ? 'navlink-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('projects');
                      }}
                      style={{ opacity: 1 }}
                    >
                      <div className="navlink-indicator"></div>
                      <span className="navlink-text">
                        <span data-letter="P">P</span>
                        <span data-letter="r">r</span>
                        <span data-letter="o">o</span>
                        <span data-letter="j">j</span>
                        <span data-letter="e">e</span>
                        <span data-letter="c">c</span>
                        <span data-letter="t">t</span>
                        <span data-letter="s">s</span>
                      </span>
                    </a>
                  </li>
                  <li className="navlink-container" style={{ opacity: 1 }}>
                    <a 
                      href="#blog"
                      className={`navlink ${activeSection === 'blog' ? 'navlink-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('blog');
                      }}
                      style={{ opacity: 1 }}
                    >
                      <div className="navlink-indicator"></div>
                      <span className="navlink-text">
                        <span data-letter="B">B</span>
                        <span data-letter="l">l</span>
                        <span data-letter="o">o</span>
                        <span data-letter="g">g</span>
                      </span>
                    </a>
                  </li>
                  <li className="navlink-container" style={{ opacity: 1 }}>
                    <a 
                      href="#education"
                      className={`navlink ${activeSection === 'education' ? 'navlink-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('education');
                      }}
                      style={{ opacity: 1 }}
                    >
                      <div className="navlink-indicator"></div>
                      <span className="navlink-text">
                        <span data-letter="E">E</span>
                        <span data-letter="d">d</span>
                        <span data-letter="u">u</span>
                        <span data-letter="c">c</span>
                        <span data-letter="a">a</span>
                        <span data-letter="t">t</span>
                        <span data-letter="i">i</span>
                        <span data-letter="o">o</span>
                        <span data-letter="n">n</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
              
              {/* Social links with icons instead of text */}
              <SocialMedia />
        </div>
      </div>
      
          {/* Scrollable Right Column */}
          <div 
            ref={rightColumnRef} 
            className="h-screen overflow-y-auto pt-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              willChange: 'scroll-position',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              marginLeft: 'calc(min(90vw,1000px)*0.48)',
              width: 'calc(100% - calc(min(90vw,1000px)*0.48))'
            }}
          >
            <style jsx global>{`
              @media (min-width: 1200px) {
                .lg\\:block {
                  display: block;
                }
                .lg\\:hidden {
                  display: none;
                }
              }
              @media (max-width: 1199px) {
                .hidden.lg\\:block {
                  display: none;
                }
                .block.lg\\:hidden {
                  display: block;
                }
              }
              
              /* Hide scrollbars */
              ::-webkit-scrollbar {
                display: none;
              }
              
              /* List style reset for navigation */
              nav ul {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              
              /* Mobile list style reset */
              .mobile-social {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              
              /* Better section positioning with lightweight approach */
              .section-container {
                position: relative;
                padding-top: 20px;
                scroll-margin-top: 20px;
              }
              
              /* Optimize rendering during scrolling */
              @media (prefers-reduced-motion: no-preference) {
                .scroll-container {
                  scroll-behavior: smooth;
                }
              }
              
              /* Remove all animations that affect initial render */
              .navlink-container {
                opacity: 1 !important;
                animation: none !important;
                transform: none !important;
              }
              
              .social-container {
                display: flex;
                gap: 18px;
                margin-bottom: 16px;
                margin-top: 6rem;
                opacity: 1 !important;
              }
              
              .social-link,
              .email-link,
              .navlink,
              .navlink-icon,
              .navlink-text,
              .resume-btn,
              .mobile-social {
                opacity: 1 !important;
                animation: none !important;
              }
              
              /* Remove all animation delays */
              .navlink-container:nth-child(1),
              .navlink-container:nth-child(2),
              .navlink-container:nth-child(3),
              .navlink-container:nth-child(4),
              .navlink-container:nth-child(5),
              .social-link:nth-child(1),
              .social-link:nth-child(2),
              .social-link:nth-child(3) {
                animation-delay: 0s !important;
              }
              
              /* Mobile styles */
              .mobile-social {
                margin-top: 1rem;
                margin-bottom: 0;
                opacity: 1 !important;
              }
              
              /* Navlink container with minimal gap */
              .navlink-container {
                opacity: 1;
                margin-bottom: 2px; /* Very tight spacing between nav items */
              }
              
              /* Clean modern navlink style */
              .navlink {
                position: relative;
                display: flex;
                align-items: center;
                padding: 3px 0; /* Minimal padding */
                opacity: 1;
                color: #8892b0;
                font-size: 13px;
                transition: all 0.2s ease;
                text-decoration: none;
                overflow: hidden; /* Ensure text doesn't wrap */
                white-space: nowrap; /* Keep text on single line */
              }
              
              .navlink:hover {
                color: #64ffda;
              }
              
              /* Text styling with modern rollback animation */
              .navlink-text {
                position: relative;
                font-weight: 400;
                letter-spacing: 0.3px;
                font-size: 13px;
                color: #8892b0;
                display: inline-block;
                margin-left: 10px; /* Add gap between line and text */
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Same transition as line */
              }
              
              /* Define keyframes for modern rollback effect */
              @keyframes modernRollback {
                0% { 
                  transform: rotateX(0deg);
                  opacity: 1;
                }
                50% {
                  transform: rotateX(180deg);
                  opacity: 0.5;
                }
                100% { 
                  transform: rotateX(360deg);
                  opacity: 1;
                }
              }
              
              /* Define keyframes for single rollback */
              @keyframes singleRollback {
                0% { 
                  transform: rotateX(0deg) translateY(0);
                  opacity: 1;
                }
                50% {
                  transform: rotateX(180deg) translateY(-2px);
                  opacity: 0.7;
                }
                100% { 
                  transform: rotateX(360deg) translateY(0);
                  opacity: 1;
                }
              }
              
              /* Enhanced 3D letter animation */
              .navlink-text span {
                display: inline-block;
                position: relative;
                transition: color 0.15s ease;
                transform-style: preserve-3d;
                perspective: 1000px;
                transform-origin: bottom center;
                backface-visibility: hidden;
              }
              
              /* Line indicator before text - container */
              .navlink-indicator {
                position: relative;
                height: 1px;
                min-width: 25px; /* Minimum width for the indicator */
                background: transparent;
                margin-right: 0; /* No gap on right side of line */
                flex-shrink: 0; /* Don't allow shrinking */
                transition: min-width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Add transition */
              }
              
              /* Line before text - actual line element */
              .navlink-indicator::before {
                content: '';
                position: absolute;
                height: 1px;
                width: 100%; /* Always fill the container */
                background: #8892b0;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                opacity: 0.7;
                transition: background-color 0.3s ease, opacity 0.3s ease;
              }
              
              /* Hover state: line indicator grows and text moves */
              .navlink:hover .navlink-indicator,
              .navlink-active .navlink-indicator {
                min-width: 45px; /* Grow to this width on hover */
                background: transparent;
              }
              
              /* Change line color on hover/active */
              .navlink:hover .navlink-indicator::before,
              .navlink-active .navlink-indicator::before {
                background: #64ffda;
                opacity: 1;
              }
              
              /* Modern rollback animation on hover */
              .navlink:hover .navlink-text span {
                color: #64ffda;
                animation-name: modernRollback;
                animation-duration: 0.6s;
                animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
              }
              
              /* Faster staggered timing for hover effect */
              .navlink:hover .navlink-text span:nth-child(1) { animation-delay: 0.00s; }
              .navlink:hover .navlink-text span:nth-child(2) { animation-delay: 0.03s; }
              .navlink:hover .navlink-text span:nth-child(3) { animation-delay: 0.06s; }
              .navlink:hover .navlink-text span:nth-child(4) { animation-delay: 0.09s; }
              .navlink:hover .navlink-text span:nth-child(5) { animation-delay: 0.12s; }
              .navlink:hover .navlink-text span:nth-child(6) { animation-delay: 0.15s; }
              .navlink:hover .navlink-text span:nth-child(7) { animation-delay: 0.18s; }
              .navlink:hover .navlink-text span:nth-child(8) { animation-delay: 0.21s; }
              .navlink:hover .navlink-text span:nth-child(9) { animation-delay: 0.24s; }
              .navlink:hover .navlink-text span:nth-child(10) { animation-delay: 0.27s; }
              
              /* More subtle active state animation */
              .navlink-active .navlink-text span {
                color: #64ffda;
                font-weight: 500;
                animation-name: singleRollback;
                animation-duration: 0.5s;
                animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
              }
              
              /* Faster staggered timing for active state */
              .navlink-active .navlink-text span:nth-child(1) { animation-delay: 0.00s; }
              .navlink-active .navlink-text span:nth-child(2) { animation-delay: 0.02s; }
              .navlink-active .navlink-text span:nth-child(3) { animation-delay: 0.04s; }
              .navlink-active .navlink-text span:nth-child(4) { animation-delay: 0.06s; }
              .navlink-active .navlink-text span:nth-child(5) { animation-delay: 0.08s; }
              .navlink-active .navlink-text span:nth-child(6) { animation-delay: 0.10s; }
              .navlink-active .navlink-text span:nth-child(7) { animation-delay: 0.12s; }
              .navlink-active .navlink-text span:nth-child(8) { animation-delay: 0.14s; }
              .navlink-active .navlink-text span:nth-child(9) { animation-delay: 0.16s; }
              .navlink-active .navlink-text span:nth-child(10) { animation-delay: 0.18s; }
              
              /* Hover text color change */
              .navlink:hover .navlink-text,
              .navlink-active .navlink-text {
                color: #64ffda;
              }

              /* Mobile social media enhancements */
              @media (max-width: 1199px) {
                .mobile-social-container {
                  display: flex;
                  justify-content: center;
                  gap: 22px;
                  margin: 2.5rem auto;
                  padding: 18px 20px;
                  background: rgba(10, 25, 47, 0.8);
                  backdrop-filter: blur(12px);
                  border-radius: 20px;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                  border: 1px solid rgba(100, 255, 218, 0.2);
                  width: fit-content;
                  position: relative;
                  z-index: 10;
                }
                
                /* Background glow effect */
                .mobile-social-container::before {
                  content: '';
                  position: absolute;
                  inset: 0;
                  background: radial-gradient(circle at center, rgba(100, 255, 218, 0.15), transparent 70%);
                  border-radius: inherit;
                  z-index: -1;
                  animation: pulseBackground 5s ease-in-out infinite alternate;
                }
                
                @keyframes pulseBackground {
                  0% { opacity: 0.5; transform: scale(0.97); }
                  100% { opacity: 0.8; transform: scale(1.03); }
                }
                
                /* Individual social links */
                .mobile-social-link {
                  position: relative;
                  width: 50px;
                  height: 50px;
                  border-radius: 15px;
                  background: rgba(17, 34, 64, 0.95);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                  transform-style: preserve-3d;
                  perspective: 800px;
                  animation: float 3s infinite ease-in-out;
                }
                
                /* Individual floating animations with different delays */
                .mobile-social-link.github {
                  animation-delay: 0s;
                }
                
                .mobile-social-link.linkedin {
                  animation-delay: 0.5s;
                }
                
                .mobile-social-link.twitter {
                  animation-delay: 1s;
                }
                
                .mobile-social-link.email {
                  animation-delay: 1.5s;
                }
                
                @keyframes float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                
                /* Inner glow effect */
                .mobile-social-link::after {
                  content: '';
                  position: absolute;
                  top: -5px;
                  left: -5px;
                  right: -5px;
                  bottom: -5px;
                  z-index: -1;
                  opacity: 0;
                  background: radial-gradient(
                    circle at center,
                    rgba(100, 255, 218, 0.8) 0%,
                    transparent 70%
                  );
                  border-radius: inherit;
                  transition: opacity 0.3s ease;
                  filter: blur(8px);
                }
                
                /* Icon style */
                .mobile-social-icon {
                  color: #8892b0;
                  transition: all 0.3s ease;
                  transform: translateZ(10px);
                  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
                }
                
                /* Active state styles */
                .mobile-social-link:active {
                  transform: translateY(4px) scale(0.92);
                  box-shadow: 0 0 20px rgba(100, 255, 218, 0.6);
                }
                
                .mobile-social-link:active::after {
                  opacity: 0.7;
                }
                
                /* Icon-specific active colors */
                .mobile-social-link.github:active .mobile-social-icon {
                  color: white;
                }
                
                .mobile-social-link.linkedin:active .mobile-social-icon {
                  color: #0077b5;
                }
                
                .mobile-social-link.twitter:active .mobile-social-icon {
                  color: white;
                }
                
                .mobile-social-link.email:active .mobile-social-icon {
                  color: #64ffda;
                }
                
                /* Tooltip style */
                .mobile-tooltip {
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) scale(0.8);
                  background: rgba(10, 25, 47, 0.95);
                  color: #64ffda;
                  font-weight: 600;
                  padding: 10px 20px;
                  border-radius: 12px;
                  border: 2px solid rgba(100, 255, 218, 0.4);
                  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                  opacity: 0;
                  visibility: hidden;
                  z-index: 100;
                  transition: all 0.3s ease;
                  font-size: 16px;
                  letter-spacing: 1px;
                }
                
                /* Show tooltip on active state with animation */
                .mobile-social-link:active .mobile-tooltip {
                  opacity: 1;
                  visibility: visible;
                  transform: translate(-50%, -50%) scale(1);
                  animation: pulseTooltip 1.5s infinite ease;
                }
                
                @keyframes pulseTooltip {
                  0% { box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.6); }
                  70% { box-shadow: 0 0 0 15px rgba(100, 255, 218, 0); }
                  100% { box-shadow: 0 0 0 0 rgba(100, 255, 218, 0); }
                }
              }
            `}</style>
            
            {/* Content container */}
            <div className="mx-auto" style={{ 
              width: '85%',
              maxWidth: '670px',
              paddingRight: '1rem',
              paddingLeft: '1rem',
              marginTop: '1.5rem', 
              marginBottom: '1rem',
              overflow: 'hidden'
            }}>
              <div 
                className="bg-slate-900/50 rounded-lg backdrop-blur-sm"
              >
                <div>
                  <section {...aboutProps}>
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-semibold text-lightest-slate hidden">About</h2>
                      <SectionReference id="about" title="About" onSectionClick={scrollToSection} />
                    </div>
                    <AboutSection />
                  </section>
                  
                  <section {...experienceProps}>
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-semibold text-lightest-slate hidden">Experience</h2>
                      <SectionReference id="experience" title="Experience" onSectionClick={scrollToSection} />
                    </div>
                    <ExperienceSection />
                  </section>
                  
                  <section {...projectsProps}>
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-semibold text-lightest-slate hidden">Projects</h2>
                      <SectionReference id="projects" title="Projects" onSectionClick={scrollToSection} />
                    </div>
                    <ProjectsSection />
                  </section>
                  
                  <section {...blogProps}>
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-semibold text-lightest-slate hidden">Blog</h2>
                      <SectionReference id="blog" title="Blog" onSectionClick={scrollToSection} />
                    </div>
                    <BlogSection />
                  </section>
                  
                  <section {...educationProps}>
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-semibold text-lightest-slate hidden">Education</h2>
                      <SectionReference id="education" title="Education" onSectionClick={scrollToSection} />
                    </div>
                    <EducationSection />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
  );
}


