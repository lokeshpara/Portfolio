"use client";

import React from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  url: string;
  period: string;
  image: string;
}

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, and a clean design.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    url: "https://github.com/yourusername/portfolio",
    period: "2024",
    image: "/images/portfolio.png"
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with features like user authentication, product management, shopping cart, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    url: "https://github.com/yourusername/ecommerce",
    period: "2023",
    image: "/images/ecommerce.png"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "Firebase", "Material-UI", "Redux"],
    url: "https://github.com/yourusername/task-manager",
    period: "2023",
    image: "/images/task-manager.png"
  }
];

const ProjectSection = () => {
  const [activeCard, setActiveCard] = React.useState<number | null>(null);

  const handleCardClick = (url: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the target element, handling both mouse and touch events
    let target: HTMLElement;
    if ('touches' in e) {
      // Touch event
      const touchEvent = e as React.TouchEvent;
      if (touchEvent.touches && touchEvent.touches.length > 0) {
        target = touchEvent.touches[0].target as HTMLElement;
      } else {
        target = e.target as HTMLElement;
      }
    } else {
      // Mouse event
      target = e.target as HTMLElement;
    }
    
    // Get the card element
    const card = target.closest('.project-card') as HTMLElement;
    if (!card) return;

    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    document.body.appendChild(ripple);
    
    // Position ripple at click/touch point
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.left + rect.width / 2 - size / 2;
    const y = rect.top + rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Add active class for animation
    ripple.classList.add('active');

    // Get elements to change color
    const titleElClick = card.querySelector(".title-text") as HTMLElement;
    const listEls = card.querySelectorAll("li");
    const periodEl = card.querySelector(".period-text") as HTMLElement;

    // Change colors
    if (titleElClick) titleElClick.style.color = "#64ffda";
    if (periodEl) periodEl.style.color = "#64ffda";
    listEls.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.color = "#64ffda";
    });
    
    // Delay opening URL
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
        // Reset colors
        if (titleElClick) titleElClick.style.color = "#ccd6f6";
        if (periodEl) periodEl.style.color = "#a8b2d1";
        listEls.forEach((el: Element) => {
          const element = el as HTMLElement;
          element.style.color = "#a8b2d1";
        });
      }, 600);
    }, 300);
  };

  const handleCardInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only apply hover effects for desktop
    if ('touches' in e) return;
    
    // Get the target element
    const target = e.target as HTMLElement;
    const card = target.closest('.project-card') as HTMLElement;
    if (!card) return;

    // Make all other cards less visible
    document.querySelectorAll('.project-card').forEach(c => {
      if (c !== card) {
        (c as HTMLElement).style.opacity = '0.4';
      }
    });

    // Style current card
    card.style.backgroundColor = "rgba(100, 146, 255, 0.05)";
    card.style.boxShadow = "0 0 0 1px rgba(100, 255, 218, 0.2), 0 4px 8px rgba(2, 12, 27, 0)";
    card.style.opacity = '1';

    // Change text colors
    const titleElHover = card.querySelector(".title-text") as HTMLElement;
    const listElsHover = card.querySelectorAll("li");
    const periodElHover = card.querySelector(".period-text") as HTMLElement;

    if (titleElHover) titleElHover.style.color = "#64ffda";
    if (periodElHover) periodElHover.style.color = "#64ffda";
    listElsHover.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.color = "#64ffda";
    });
  };

  const handleCardLeave = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only apply hover effects for desktop
    if ('touches' in e) return;
    
    // Get the target element
    const target = e.target as HTMLElement;
    const card = target.closest('.project-card') as HTMLElement;
    if (!card) return;

    // Reset all cards to full opacity
    document.querySelectorAll('.project-card').forEach(c => {
      (c as HTMLElement).style.opacity = '1';
    });

    // Reset current card styles
    card.style.backgroundColor = "transparent";
    card.style.boxShadow = "none";

    // Reset text colors
    const titleElLeave = card.querySelector(".title-text") as HTMLElement;
    const listElsLeave = card.querySelectorAll("li");
    const periodElLeave = card.querySelector(".period-text") as HTMLElement;

    if (titleElLeave) titleElLeave.style.color = "#ccd6f6";
    if (periodElLeave) periodElLeave.style.color = "#a8b2d1";
    listElsLeave.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.color = "#a8b2d1";
    });
  };

  return (
    <section id="projects">
      <div className="mb-4 md:hidden" style={{ marginLeft: '0.95rem' }}>
        <h2 className="text-lg font-semibold text-lightest-slate" style={{ fontSize: '0.8rem' }}>PROJECTS</h2>
      </div>

      <div 
        className="space-y-3 project-container"
        onMouseLeave={() => {
          setActiveCard(null);
        }}
      >
        {projects.map((project, index) => (
          <a 
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg overflow-hidden cursor-pointer project-card"
            style={{ 
              padding: "10px",
              transition: "all 0.3s ease",
              borderRadius: "15px",
              position: "relative",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              perspective: "1000px",
              willChange: "transform",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "none",
              color: "inherit",
              ...(activeCard === index && {
                backgroundColor: "rgba(100, 146, 255, 0.05)",
                boxShadow: "0 0 0 1px rgba(100, 255, 218, 0.2), 0 4px 8px rgba(2, 12, 27, 0)",
                opacity: '1',
                filter: 'none'
              })
            }}
            onClick={(e) => handleCardClick(project.url, e)}
            onMouseEnter={(e) => handleCardInteraction(e)}
            onTouchStart={(e) => handleCardInteraction(e)}
            onMouseLeave={handleCardLeave}
            onTouchEnd={(e: React.TouchEvent) => {
              e.preventDefault();
              handleCardLeave(e);
              handleCardClick(project.url, e);
            }}
          >
            {/* Flex container - creates two columns */}
            <div style={{ 
              display: "flex", 
              flexDirection: "row",
              width: "100%",
              height: "100%"
            }}>
              {/* Left column - Time period */}
              {/* Left column - Project Image */}
              <div style={{ width: "165px", padding: "10px" }}>
                  <div className="image-container" style={{ 
                    overflow: "hidden", 
                    borderRadius: "8px", 
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#112240"
                  }}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-image"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "all 0.3s ease"
                      }} 
                    />
                  </div>
                </div>
              
              {/* Right column - Content */}
              <div style={{ 
                flex: "1", 
                padding: "8px",
                flexShrink: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <h3 
                  className="font-semibold m-0 p-0 flex items-center cursor-pointer"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                >
                  <span className="title-text" style={{ 
                    fontSize: "0.8rem", 
                    color: "#ccd6f6",
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%"
                  }}>
                    {project.title}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="link-icon" 
                      style={{ 
                        opacity: 0.6,
                        color: "#a8b2d1",
                        transition: "all 0.3s ease",
                        flexShrink: 0
                      }}
                    >
                      <path className="arrow-line" d="M7 7l10 10" />
                      <path className="arrow-head" d="M7 17V7h10" />
                    </svg>
                  </span>
                </h3>
                
                <p className="mt-1 mb-1 opacity-90 text-light-slate" style={{ 
                  fontSize: '0.7rem', 
                  lineHeight: 1.3, 
                  padding: "10px 0",
                  flex: 1
                }}>
                  {project.description}
                </p>
                
                <ul className="flex flex-wrap gap-2 mt-1" style={{ 
                  padding: "2px 0 10px 0",
                  width: "100%"
                }}>
                  {project.technologies.map((tech, techIndex) => (
                    <li 
                      key={techIndex}
                      className="rounded tech-item"
                      style={{ 
                        fontSize: '0.65rem',
                        padding: '2px 6px',
                        margin: '2px',
                        display: 'inline-block',
                        backgroundColor: '#112240',
                        color: '#a8b2d1',
                        transition: "all 0.3s ease",
                        borderRadius: "4px"
                      }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </a>
        ))}
      </div>

      <style jsx>{`
        @keyframes iconPulse {
          0% { transform: translateX(0); }
          50% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        
        .ripple {
          position: fixed;
          border-radius: 50%;
          background-color: rgba(100, 255, 218, 0.2);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          z-index: 9999;
        }

        .ripple.active {
          animation: ripple 0.6s linear;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectSection; 