"use client";

// Remove motion import
// import { motion } from 'framer-motion';
// import Link from 'next/link';

import React from 'react';

const blogPosts = [
  {
    image: '/images/projects/ecommerce.jpg',
    title: 'Building Performant Web Applications',
    category: 'Web Development',
    excerpt: 'Learn how to optimize your Next.js applications for maximum performance and user experience. This guide covers code splitting, image optimization, and server-side rendering techniques that can drastically improve your application loading times.',
    date: 'June 15, 2023',
    readTime: '8 min read',
    url: 'https://medium.com/@lokeshpatil/building-performant-web-applications-nextjs'
  },
  {
    image: '/images/portfolio-website.jpg',
    title: 'The Power of TypeScript',
    category: 'TypeScript',
    excerpt: 'Discover how TypeScript can help you write more maintainable and error-free code in your projects. We explore type inference, interfaces, generics, and other advanced features that will level up your development workflow.',
    date: 'May 22, 2023',
    readTime: '6 min read',
    url: 'https://medium.com/@lokeshpatil/power-of-typescript-modern-frontend'
  },
  {
    image: '/images/task-management.jpg',
    title: 'Creating Stunning Animations',
    category: 'Animation',
    excerpt: 'A comprehensive guide to implementing beautiful and performant animations in React applications. Learn how to create complex animations that enhance user experience without sacrificing performance.',
    date: 'April 10, 2023',
    readTime: '10 min read',
    url: 'https://medium.com/@lokeshpatil/creating-animations-framer-motion'
  },
];

// Remove animation containers
// const container = { ... };
// const item = { ... };

const BlogSection = () => {
  const handleCardClick = (url: string, element: HTMLElement) => {
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    document.body.appendChild(ripple);
    
    // Position ripple at click point
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.left + rect.width / 2 - size / 2;
    const y = rect.top + rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Add active class for animation
    ripple.classList.add('active');

    // Apply hover effect
    element.style.backgroundColor = "rgba(100, 146, 255, 0.05)";
    element.style.boxShadow = "0 0 0 1px rgba(100, 255, 218, 0.2), 0 4px 8px rgba(2, 12, 27, 0)";
    element.style.opacity = '1';
    element.style.filter = 'none';
    
    const titleEl = element.querySelector(".title-text") as HTMLElement;
    const categoryEl = element.querySelector(".category-text") as HTMLElement;
    const dateEl = element.querySelector(".date-text") as HTMLElement;
    const linkIcon = element.querySelector(".link-icon") as SVGElement;
    const arrowLine = element.querySelector(".arrow-line") as SVGPathElement;
    const arrowHead = element.querySelector(".arrow-head") as SVGPathElement;
    const postImg = element.querySelector(".post-image") as HTMLImageElement;
    
    if (titleEl) titleEl.style.color = "#64ffda";
    if (categoryEl) categoryEl.style.color = "rgba(100, 255, 218, 0.7)";
    if (dateEl) dateEl.style.color = "rgba(100, 255, 218, 0.7)";
    
    if (postImg) {
      postImg.style.transform = "scale(1.05)";
      postImg.style.filter = "brightness(1.1)";
    }
     
    if (linkIcon) {
      linkIcon.style.color = "#64ffda";
      linkIcon.style.opacity = "1";
      linkIcon.style.animation = "iconPulse 1.5s infinite ease-in-out";
      
      if (arrowLine) {
        arrowLine.style.strokeDasharray = "12";
        arrowLine.style.strokeDashoffset = "12";
        arrowLine.style.animation = "arrowLineDraw 0.5s forwards ease-in-out";
      }
      
      if (arrowHead) {
        arrowHead.style.strokeDasharray = "12";
        arrowHead.style.strokeDashoffset = "12";
        arrowHead.style.animation = "arrowHeadDraw 0.5s 0.2s forwards ease-in-out, arrowOut 1.5s 0.7s infinite ease-in-out";
      }
    }
    
    // Delay opening URL
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Reset styles after opening URL
      setTimeout(() => {
        element.style.backgroundColor = "transparent";
        element.style.boxShadow = "none";
        
        if (titleEl) titleEl.style.color = "#ccd6f6";
        if (categoryEl) categoryEl.style.color = "#a8b2d1";
        if (dateEl) dateEl.style.color = "#a8b2d1";
        
        if (postImg) {
          postImg.style.transform = "scale(1)";
          postImg.style.filter = "brightness(1)";
        }
         
        if (linkIcon) {
          linkIcon.style.color = "#a8b2d1";
          linkIcon.style.opacity = "0.6";
          linkIcon.style.animation = "none";
          
          if (arrowLine) {
            arrowLine.style.animation = "none";
            arrowLine.style.strokeDashoffset = "12";
          }
          
          if (arrowHead) {
            arrowHead.style.animation = "none";
            arrowHead.style.strokeDashoffset = "12";
          }
        }
        
        // Remove ripple after animation
        ripple.remove();
      }, 600);
    }, 300);
  };

  return (
    <section id="projects">
      <div className="mb-4 md:hidden" style={{ marginLeft: '0.95rem' }}>
        <h2 className="text-lg font-semibold text-lightest-slate" style={{ fontSize: '0.8rem' }}>PROJECTS</h2>
      </div>

      <div 
        className="space-y-3 projects-container"
        onMouseLeave={() => {
          // Reset all cards to full opacity when mouse leaves the container
          document.querySelectorAll('.project-card').forEach(card => {
            (card as HTMLElement).style.opacity = '1';
            (card as HTMLElement).style.filter = 'none';
          });
        }}
      >
        {blogPosts.map((post, index) => (
          <div 
            key={index}
            className="rounded-lg overflow-hidden cursor-pointer project-card"
            style={{ 
              padding: "10px",
              transition: "all 0.3s ease",
              borderRadius: "15px",
            }}
            onClick={(e) => handleCardClick(post.url, e.currentTarget)}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleCardClick(post.url, e.currentTarget);
            }}
            onMouseEnter={(e) => {
              // Make all other cards less visible
              document.querySelectorAll('.project-card').forEach(card => {
                if (card !== e.currentTarget) {
                  (card as HTMLElement).style.opacity = '0.4';
                  (card as HTMLElement).style.filter = 'grayscale(40%)';
                }
              });
              
              // Style current card
              e.currentTarget.style.backgroundColor = "rgba(100, 146, 255, 0.05)";
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(100, 255, 218, 0.2), 0 4px 8px rgba(2, 12, 27, 0)";
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.filter = 'none';
              
              const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
              const subtitleEls = e.currentTarget.querySelectorAll(".subtitle-text");
              const techEls = e.currentTarget.querySelectorAll(".tech-item");
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
              const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
              const projectImg = e.currentTarget.querySelector(".project-image") as HTMLImageElement;
              
              if (titleEl) titleEl.style.color = "#64ffda";
              if (projectImg) projectImg.style.transform = "scale(1.05)";
              
              if (linkIcon) {
                linkIcon.style.color = "#64ffda";
                linkIcon.style.opacity = "1";
                
                // Animation is already defined in the academic section
                linkIcon.style.animation = "iconPulse 1.5s infinite ease-in-out";
                
                if (arrowLine) {
                  arrowLine.style.strokeDasharray = "12";
                  arrowLine.style.strokeDashoffset = "12";
                  arrowLine.style.animation = "arrowLineDraw 0.5s forwards ease-in-out";
                }
                
                if (arrowHead) {
                  arrowHead.style.strokeDasharray = "12";
                  arrowHead.style.strokeDashoffset = "12";
                  arrowHead.style.animation = "arrowHeadDraw 0.5s 0.2s forwards ease-in-out, arrowOut 1.5s 0.7s infinite ease-in-out";
                }
              }
              
              subtitleEls.forEach(el => {
                (el as HTMLElement).style.color = "rgba(100, 255, 218, 0.7)";
              });
              
              techEls.forEach(el => {
                (el as HTMLElement).style.color = "#64ffda";
                (el as HTMLElement).style.backgroundColor = "rgba(100, 136, 255, 0.1)";
              });
            }}
            onMouseLeave={(e) => {
              // Reset this card styles (the container onMouseLeave will handle resetting all cards)
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
              
              const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
              const subtitleEls = e.currentTarget.querySelectorAll(".subtitle-text");
              const techEls = e.currentTarget.querySelectorAll(".tech-item");
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
              const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
              const projectImg = e.currentTarget.querySelector(".project-image") as HTMLImageElement;
              
              if (titleEl) titleEl.style.color = "#ccd6f6";
              if (projectImg) projectImg.style.transform = "scale(1)";
              
              if (linkIcon) {
                linkIcon.style.color = "#a8b2d1";
                linkIcon.style.opacity = "0.6";
                linkIcon.style.animation = "none";
                
                if (arrowLine) {
                  arrowLine.style.animation = "none";
                  arrowLine.style.strokeDashoffset = "12";
                }
                
                if (arrowHead) {
                  arrowHead.style.animation = "none";
                  arrowHead.style.strokeDashoffset = "12";
                }
              }
              
              subtitleEls.forEach(el => {
                (el as HTMLElement).style.color = "#a8b2d1";
              });
              
              techEls.forEach(el => {
                (el as HTMLElement).style.color = "#a8b2d1";
                (el as HTMLElement).style.backgroundColor = "#112240";
              });
            }}
          >
            {/* Flex container - creates two columns */}
            <div style={{ display: "flex", flexDirection: "row" }}>
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
                    src={post.image} 
                    alt={post.title} 
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
              <div style={{ flex: "1", padding: "8px" }}>
                <h3 className="font-semibold m-0 p-0 flex items-center">
                  <span className="title-text" style={{ 
                    fontSize: "0.8rem", 
                    color: "#ccd6f6",
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    {post.title}
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
                        cursor: "pointer",
                        position: "relative",
                        marginTop: "0px",
                      }}
                    >
                      {/* Arrow line */}
                      <path 
                        className="arrow-line" 
                        d="M7,17 L17,7" 
                        strokeLinecap="round"
                      />
                      
                      {/* 90 degree arrow head */}
                      <path 
                        className="arrow-head" 
                        d="M17,7 L17,13 M17,7 L11,7" 
                        strokeLinecap="round"
                      />
                      
                      {/* Small box outline */}
                      <rect 
                        x="7" 
                        y="7" 
                        width="10" 
                        height="10" 
                        strokeWidth="1.5" 
                        strokeOpacity="0.4"
                        rx="1"
                      />
                    </svg>
                  </span>
                </h3>
                
                <p className="mt-1 mb-1 opacity-90 text-light-slate" style={{ 
                  fontSize: '0.7rem', 
                  lineHeight: 1.3, 
                  padding: "10px 0" 
                }}>
                  {post.excerpt}
                </p>
                
                <ul className="flex flex-wrap gap-2 mt-1" style={{ padding: "2px 0 10px 0" }}>
                  <li 
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
                    {post.category}
                  </li>
                  <li 
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
                    {post.date}
                  </li>
                  <li 
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
                    {post.readTime}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-left pl-4" style={{ margin: "1rem" }}>
        <style jsx>{`
          @keyframes borderGlow {
            0%, 100% { box-shadow: 0 0 2px rgba(100, 255, 218, 0.5); }
            50% { box-shadow: 0 0 8px rgba(100, 255, 218, 0.8); }
          }
          
          @keyframes borderRotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes textShimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
          }
          
          .projects-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #64ffda;
            font-size: 14px;
            padding: 6px 16px;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
            z-index: 1;
            cursor: pointer;
          }
          
          .projects-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 8px;
            padding: 1px;
            background: linear-gradient(
              90deg, 
              rgba(100, 255, 218, 0.5), 
              rgba(100, 255, 218, 0.2), 
              rgba(100, 255, 218, 0.8),
              rgba(100, 255, 218, 0.2)
            );
            background-size: 300% 100%;
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: borderRotate 4s ease infinite;
          }
          
          .projects-btn:hover {
            background-color: rgba(100, 255, 218, 0.05);
            transform: translateY(-2px);
          }
          
          .projects-btn:hover::before {
            animation: borderRotate 2s ease infinite;
          }
          
          .projects-btn:hover .btn-text {
            background-position: 100% 0;
          }
          
          .btn-text {
            background: linear-gradient(
              to right, 
              #64ffda, 
              #9EEEDE, 
              #64ffda, 
              #64ffda
            );
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.3s ease;
          }
          
          .folder-icon {
            transition: all 0.3s ease;
            transform-origin: center;
          }
          
          .projects-btn:hover .folder-icon {
            transform: translateY(-2px) scale(1.1);
            filter: drop-shadow(0 2px 2px rgba(100, 255, 218, 0.3));
          }
          
          @keyframes folderOpen {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(1.2); }
            100% { transform: scaleY(1); }
          }
          
          .projects-btn:hover .folder-top {
            animation: folderOpen 1.5s infinite ease-in-out;
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
        <a 
          href="/projects"
          className="projects-btn"
        >
          <span className="btn-text">View All Projects</span>
          <svg 
            className="folder-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <path className="folder-top" d="M2 10h20" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default BlogSection; 