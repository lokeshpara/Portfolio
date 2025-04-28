"use client";

import { useEffect, useRef, useState } from 'react';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import EducationSection from '@/components/sections/EducationSection';
import LoadingScreen from '@/components/LoadingScreen';
import SocialLinks from '@/components/SocialLinks';
import SocialMediaMobile from '@/components/SocialMediaMobile';

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
    
    // Simple, direct scrolling
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
    }, 500); // Increased timeout for smoother transitions
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
        if (link.getAttribute('href') === `#${sectionId}`) {
          // Add animation trigger class
          link.classList.add('animate-on-scroll');
          
          // Remove it after animation completes
          setTimeout(() => {
            link.classList.remove('animate-on-scroll');
          }, 1000); // slightly longer than animation duration
        }
      });
    }
  };

  // Replace the IntersectionObserver with a more deterministic scroll handler
  useEffect(() => {
    if (isLoading || !rightColumnRef.current) return;
    
    let lastScrollTime = Date.now();
    let lastActiveSection = activeSection;
    let scrollTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const currentTime = Date.now();
      if (currentTime - lastScrollTime < 100) return; // Throttle to 100ms
      
      const container = rightColumnRef.current;
      if (!container) return;
      
      const viewportHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const viewportCenter = scrollTop + (viewportHeight / 2);
      
      // Get all section positions and heights
      const sections = Object.entries(sectionRefs).map(([id, ref]) => {
        const element = ref.current;
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        return {
          id,
          top: rect.top - containerRect.top + scrollTop,
          bottom: rect.bottom - containerRect.top + scrollTop,
          height: rect.height,
          center: rect.top - containerRect.top + scrollTop + (rect.height / 2)
        };
      }).filter(Boolean);
      
      // Find the section whose center is closest to the viewport center
      let closestSection = lastActiveSection;
      let minDistance = Infinity;
      
      sections.forEach(section => {
        if (!section) return;
        
        const distance = Math.abs(section.center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section.id;
        }
      });
      
      // Only update if we have a clear winner and enough time has passed
      if (closestSection !== lastActiveSection && 
          closestSection !== activeSection && 
          currentTime - lastScrollTime > 300) {
        
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
          setActiveSection(closestSection);
          lastActiveSection = closestSection;
          lastScrollTime = currentTime;
          
          // Add animation to the newly active section
          const navLinks = document.querySelectorAll('.navlink');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${closestSection}`) {
              // Remove active animation from all links first
              navLinks.forEach(l => l.classList.remove('animate-on-scroll'));
              
              // Add animation trigger class
              link.classList.add('animate-on-scroll');
              
              // Remove it after animation completes
              setTimeout(() => {
                link.classList.remove('animate-on-scroll');
              }, 1000);
            }
          });
        }, 100);
      }
    };
    
    // Add scroll event listener
    rightColumnRef.current.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      if (rightColumnRef.current) {
        rightColumnRef.current.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isLoading, activeSection]);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 1140;
      setIsMobile(newIsMobile);
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

  // Handle initial hash scrolling and hash changes
  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;
    
    // First render: check for hash in URL
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash && Object.keys(sectionRefs).includes(hash)) {
        // Delay to ensure the DOM is fully ready
        setTimeout(() => {
          scrollToSection(hash);
        }, 700); // Increased delay for more reliable scrolling
      }
    }
  }, [isLoading]);

  // Initialize click handlers for navigation
  useEffect(() => {
    if (!isLoading && rightColumnRef.current) {
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
  }, [isLoading]);

  // Handle initial loading
  useEffect(() => {
    // Simulate a minimum loading time to ensure the animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  // Function to update active section based on scroll position (fallback method)
  const updateActiveSection = () => {
    if (!rightColumnRef.current || isScrollingRef.current) return;
    
    const scrollPos = rightColumnRef.current.scrollTop;
    const viewportHeight = rightColumnRef.current.clientHeight;
    const scrollBottom = scrollPos + viewportHeight;
    
    // Get all section positions
    const sections = [
      { id: 'about', top: aboutRef.current?.offsetTop || 0 },
      { id: 'experience', top: experienceRef.current?.offsetTop || 0 },
      { id: 'projects', top: projectsRef.current?.offsetTop || 0 },
      { id: 'blog', top: blogRef.current?.offsetTop || 0 },
      { id: 'education', top: educationRef.current?.offsetTop || 0 }
    ];
    
    // Sort sections by position to ensure correct order
    sections.sort((a, b) => a.top - b.top);
    
    // Find the section that's currently in view
    let current = sections[0].id; // Default to first section
    
    // Check which section is most visible
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const nextSection = sections[i + 1];
      
      // If this is the last section or we're before the next section's top
      if (!nextSection || scrollPos < nextSection.top - viewportHeight * 0.2) { // Improved threshold
        if (scrollPos >= section.top - viewportHeight * 0.2) { // Improved threshold
          current = section.id;
          break;
        }
      }
    }
    
    // Update active section if different
    if (current !== activeSection) {
      setActiveSection(current);
    }
  };

  // Add a fallback scroll handler for browsers without Intersection Observer
  useEffect(() => {
    if (isLoading) return;
    
    // Add scroll event listener as fallback
    const handleScroll = () => {
      // Use requestAnimationFrame to throttle scroll events
      requestAnimationFrame(updateActiveSection);
    };
    
    if (rightColumnRef.current) {
      rightColumnRef.current.addEventListener('scroll', handleScroll);
      
      // Initial check
      setTimeout(updateActiveSection, 500);
    }
    
    return () => {
      if (rightColumnRef.current) {
        rightColumnRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, activeSection]);

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
      
      if (newActiveSection !== activeSection) {
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
    className: "right-column-section section-container",
    style: { 
      minHeight: '40vh', 
      scrollMarginTop: '40px',
      border: '1px solid transparent'
    }
  };

  const experienceProps = {
    ref: experienceRef,
    id: "experience",
    "data-section": "experience",
    className: "right-column-section section-container",
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
    className: "right-column-section section-container",
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
    className: "right-column-section section-container",
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
        // Mobile View (below 1140px)
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
                className="font-bold text-lightest-slate mb-2 tracking-tight"
                style={{ fontSize: 'medium' }}
              >
                Full Stack Developer
              </p>
            </div>
            
            <p 
              className="text-light-slate opacity-70 font-light tracking-wide mb-8"
              style={{ fontSize: 'small' }}
            >
              Building digital experiences that matter
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
        // Desktop View (1140px and above)
        <>
          {/* Fixed Left Column */}
          <div className="fixed top-0 left-0 h-screen w-[calc(min(90vw,1000px)*0.4)] max-w-[400px] z-10" style={{ 
            marginLeft: 'calc((105vw - min(90vw, 1000px))/2)',
            top: '2rem'
          }}>
            <div className="flex flex-col h-full px-3 md:px-4 lg:px-5 xl:px-6">
              {/* Profile section - reduce margin */}
              <div className="relative mb-4" style={{ marginTop: '2rem' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-slate-800/80 to-slate-900 rounded-lg -z-10"/>
                <div className="p-3">
                  <div className="flex items-start">
                    <div>
                      <h1 className="font-bold text-lightest-slate mb-2 tracking-tight" style={{ fontSize: 'xxx-large' }}>
                        Lokesh Para
                      </h1>
                      <div className="flex items-center gap-1 mb-4">
                        <p className="text-green font-bold font-mono tracking-tight" style={{ fontSize: 'large' }}>
                          Full Stack Developer
                        </p>
                      </div>
                      <p className="text-light-slate opacity-70 font-light tracking-wide mb-8" style={{ fontSize: 'small' }}>
                        Building digital experiences that matter
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
              <SocialLinks variant="desktop" />
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
              @media (min-width: 800px) {
                .lg\\:block {
                  display: block;
                }
                .lg\\:hidden {
                  display: none;
                }
              }
              @media (max-width: 799px) {
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
              
              /* Navlink styles */
              .navlink-container {
                opacity: 1;
                margin-bottom: 2px;
                width: fit-content;
              }

              .navlink {
                position: relative;
                display: flex;
                align-items: center;
                padding: 3px 0;
                opacity: 1;
                color: #8892b0;
                font-size: 13px;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                text-decoration: none;
                overflow: hidden;
                white-space: nowrap;
                width: fit-content;
              }

              .navlink:hover {
                color: #64ffda;
                transform: translateX(4px);
              }

              .navlink-text {
                position: relative;
                font-weight: 400;
                letter-spacing: 0.3px;
                font-size: 13px;
                color: #8892b0;
                display: inline-block;
                margin-left: 10px;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                width: fit-content;
              }

              .navlink-text span {
                display: inline-block;
                position: relative;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                transform-style: preserve-3d;
                perspective: 1000px;
                transform-origin: bottom center;
                backface-visibility: hidden;
              }

              .navlink-indicator {
                position: relative;
                height: 1px;
                min-width: 25px;
                background: transparent;
                margin-right: 0;
                flex-shrink: 0;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              }

              .navlink-indicator::before {
                content: '';
                position: absolute;
                height: 1px;
                width: 100%;
                background: #8892b0;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                opacity: 0.7;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              }

              .navlink:hover .navlink-indicator,
              .navlink-active .navlink-indicator {
                min-width: 45px;
                background: transparent;
              }

              .navlink:hover .navlink-indicator::before,
              .navlink-active .navlink-indicator::before {
                background: #64ffda;
                opacity: 1;
              }

              /* Modern rollback animation on hover */
              .navlink:hover .navlink-text span {
                color: #64ffda;
                animation: letterRollback 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }

              /* Staggered timing for individual letters */
              .navlink:hover .navlink-text span:nth-child(1) { animation-delay: 0.00s; }
              .navlink:hover .navlink-text span:nth-child(2) { animation-delay: 0.02s; }
              .navlink:hover .navlink-text span:nth-child(3) { animation-delay: 0.04s; }
              .navlink:hover .navlink-text span:nth-child(4) { animation-delay: 0.06s; }
              .navlink:hover .navlink-text span:nth-child(5) { animation-delay: 0.08s; }
              .navlink:hover .navlink-text span:nth-child(6) { animation-delay: 0.10s; }
              .navlink:hover .navlink-text span:nth-child(7) { animation-delay: 0.12s; }
              .navlink:hover .navlink-text span:nth-child(8) { animation-delay: 0.14s; }
              .navlink:hover .navlink-text span:nth-child(9) { animation-delay: 0.16s; }
              .navlink:hover .navlink-text span:nth-child(10) { animation-delay: 0.18s; }

              /* More subtle active state animation */
              .navlink-active .navlink-text span {
                color: #64ffda;
                font-weight: 500;
                animation: letterRollback 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }

              /* Staggered timing for active state */
              .navlink-active .navlink-text span:nth-child(1) { animation-delay: 0.00s; }
              .navlink-active .navlink-text span:nth-child(2) { animation-delay: 0.01s; }
              .navlink-active .navlink-text span:nth-child(3) { animation-delay: 0.02s; }
              .navlink-active .navlink-text span:nth-child(4) { animation-delay: 0.03s; }
              .navlink-active .navlink-text span:nth-child(5) { animation-delay: 0.04s; }
              .navlink-active .navlink-text span:nth-child(6) { animation-delay: 0.05s; }
              .navlink-active .navlink-text span:nth-child(7) { animation-delay: 0.06s; }
              .navlink-active .navlink-text span:nth-child(8) { animation-delay: 0.07s; }
              .navlink-active .navlink-text span:nth-child(9) { animation-delay: 0.08s; }
              .navlink-active .navlink-text span:nth-child(10) { animation-delay: 0.09s; }

              /* Hover text color change */
              .navlink:hover .navlink-text,
              .navlink-active .navlink-text {
                color: #64ffda;
              }

              /* Define keyframes for letter rollback effect */
              @keyframes letterRollback {
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

              /* Social media styles */
              .social-container {
                display: flex;
                gap: 18px;
                margin-bottom: 16px;
                margin-top: 6rem;
                opacity: 1 !important;
              }

              .social-link {
                position: relative;
                width: 40px;
                height: 40px;
                border-radius: 12px;
                background: rgba(17, 34, 64, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                transform-style: preserve-3d;
                perspective: 800px;
              }

              .social-icon {
                color: #8892b0;
                transition: all 0.3s ease;
                transform: translateZ(10px);
                filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
                font-size: 1.2rem;
              }

              .social-link:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
              }

              .social-link:hover .social-icon {
                color: #64ffda;
                transform: translateZ(20px) scale(1.1);
              }

              .tooltip {
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%) scale(0.8);
                background: rgba(10, 25, 47, 0.95);
                color: #64ffda;
                font-weight: 600;
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid rgba(100, 255, 218, 0.4);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                font-size: 14px;
                letter-spacing: 0.5px;
                white-space: nowrap;
              }

              .tooltip-arrow {
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid rgba(100, 255, 218, 0.4);
              }

              .social-link:hover .tooltip {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) scale(1);
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
                className="bg-slate-900/50 rounded-lg shadow-lg backdrop-blur-sm"
              >
                <div className="px-6 py-12">
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


