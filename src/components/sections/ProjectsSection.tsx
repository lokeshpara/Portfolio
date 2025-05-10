"use client";

import React from 'react';
import cifar10 from '../../../images/cifar10.png';
import imageProcessing from '../../../images/image-processing.png';
import yolov3 from '../../../images/yolov3.png';
import mnist from '../../../images/mnist.png';
import newsAnalysis from '../../../images/news-analysis.png';
import ats from '../../../images/ats.png';
import wordExplainer from '../../../images/word-explainer.png';
import cloudit from '../../../images/cloudit.png';
import vehicleRental from '../../../images/vehicle-rental.png';


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
    title: "CIFAR-10 Image Classification",
    description: "Implemented a custom ResNet architecture achieving 92.22% test accuracy on CIFAR-10 dataset. Features include One Cycle Policy, dynamic learning rate scheduling, and advanced data augmentation using Albumentations library.",
    technologies: ["PyTorch", "ResNet", "Computer Vision", "Deep Learning", "Data Augmentation"],
    url: "https://github.com/lokeshpara/Deep-Learning/tree/main/S11",
    period: "2024",
    image: cifar10.src  
  },
  {
    title: "Deep Learning Image Processing",
    description: "Built a deep learning-based image processing system for dog image classification using custom CNNs and optimized 3×3 kernels. Implemented efficient feature extraction, edge detection, and pattern recognition with batch processing capabilities.",
    technologies: ["PyTorch", "CNN", "OpenCV", "NumPy", "Computer Vision"],
    url: "https://github.com/lokeshpara/Deep-Learning/tree/main/S12",
    period: "2024",
    image: imageProcessing.src
  },
  {
    title: "YOLOv3 Object Detection",
    description: "Implemented YOLOv3 for real-time object detection with both pre-trained and custom training capabilities. Features include video processing, GPU acceleration, and custom dataset training with >90% detection accuracy.",
    technologies: ["PyTorch", "YOLOv3", "OpenCV", "CUDA", "Computer Vision"],
    url: "https://github.com/lokeshpara/Deep-Learning/tree/main/S13",
    period: "2024",
    image: yolov3.src
  },
  {
    title: "MNIST Digit Recognition Web App",
    description: "Built an interactive web application for handwritten digit recognition using CNNs with various regularization techniques. Achieved 98.7% accuracy using L1+L2 regularization and features real-time recognition through drawing or image upload.",
    technologies: ["PyTorch", "Flask", "Python", "CNN", "Web Development"],
    url: "https://github.com/lokeshpara/Deep-Learning/tree/main/s6",
    period: "2024",
    image: mnist.src
  },
  {
    title: "News Analysis Chrome Extension",
    description: "Developed a Chrome extension using Google's Gemini AI for analyzing news articles. Features include smart summarization, headline extraction, and sentiment analysis. Built with a Flask backend and modern UI for real-time article processing.",
    technologies: ["Python", "Flask", "Chrome Extension", "Gemini AI", "JavaScript"],
    url: "https://github.com/lokeshpara/News_Analysis_chromo_extension",
    period: "2024",
    image: newsAnalysis.src
  },
  {
    title: "ATS Optimize Chrome Extension",
    description: "Created a Chrome extension for optimizing resumes and cover letters for ATS systems. Features include ATS compatibility scoring, keyword analysis, and AI-powered document generation. Built with Flask backend and OpenAI integration.",
    technologies: ["Python", "Flask", "Chrome Extension", "OpenAI API", "JavaScript"],
    url: "https://github.com/lokeshpara/ATS_friendly_extension",
    period: "2024",
    image: ats.src
  },
  {
    title: "Word Explainer Chrome Extension",
    description: "Built a Chrome extension powered by Google's Gemini AI for comprehensive learning assistance. Features include concept explanation, web page summarization, study notes generation, concept mapping, and interactive quiz creation.",
    technologies: ["JavaScript", "Chrome Extension", "Gemini AI", "Mermaid.js", "HTML/CSS"],
    url: "https://github.com/lokeshpara/Smart-Study-Assistant-using-gemini-API",
    period: "2024",
    image: wordExplainer.src
  },
  {
    title: "Cloud IT Resources Website",
    description: "Developed a modern, responsive website for Cloud IT Resources using Next.js. Features include interactive animations, glassmorphism UI, parallax effects, and comprehensive service showcases. Built with TypeScript and SCSS modules.",
    technologies: ["Next.js", "TypeScript", "SCSS", "Framer Motion", "React"],
    url: "https://github.com/lokeshpara/cloud-it-resources",
    period: "2024",
    image: cloudit.src
  },
  {
    title: "Vehicle Rental Management System",
    description: "Built a full-stack vehicle rental application using Java EE. Features include secure user authentication, role-based access control, real-time vehicle management, and comprehensive booking analytics. Implemented with MVC architecture.",
    technologies: ["Java EE", "JSP", "MVC", "Log4j", "Enterprise Architecture"],
    url: "https://drive.google.com/file/d/1EjT7ZhY67FmJGbBAwBcOaifEZ4dZUiBs/view",
    period: "2024",
    image: vehicleRental.src
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