"use client";

import React from 'react';
import Link from 'next/link';

import deepLearning from '../../../images/deep-learning.png';
import udemy from '../../../images/udemy.png';
import eva from '../../../images/eva.png';
import jovian from '../../../images/jovian.png';

// Education data
const education = [
  {
    period: "2017 - 2019",
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    description:
      "Specialized in Artificial Intelligence and Machine Learning with a focus on Natural Language Processing. Conducted research on transformer-based language models and deep learning applications.",
    achievements: [
      "Graduated with distinction (GPA: 3.8/4.0)",
      "Research assistant in the NLP lab",
      "Published 2 papers on transformer-based language models"
    ],
    url: "https://www.stanford.edu"
  },
  {
    period: "2013 - 2017",
    degree: "Bachelor of Science in Computer Engineering",
    institution: "MIT",
    description:
      "Comprehensive program covering software engineering, computer architecture, and systems design. Focused on building scalable applications and distributed systems architecture.",
    achievements: [
      "Dean's List all semesters",
      "Senior thesis on distributed systems",
      "President of the Computer Science Club"
    ],
    url: "https://www.mit.edu"
  },
  {
    period: "2009 - 2013",
    degree: "High School Diploma",
    institution: "Tech Preparatory Academy",
    description: "Advanced STEM curriculum with honors in mathematics and computer science. Participated in numerous hackathons and coding competitions.",
    achievements: [
      "Valedictorian",
      "National Merit Scholar",
      "Winner of State Programming Competition"
    ],
    url: "https://example.com/school"
  }
];

// Certifications
const certifications = [
  {
    period: "May 30, 2023",
    name: "Deep Learning Fundamentals",
    issuer: "Cognitive Class",
    description: "Comprehensive course covering the fundamentals of deep learning and neural networks. Mastered core concepts including backpropagation, activation functions, and optimization algorithms. Implemented various neural network architectures and learned best practices for model training and evaluation. Developed practical skills in building and deploying deep learning models for real-world applications.",
    technologies: [
      "Neural Networks",
      "Backpropagation",
      "Activation Functions",
      "Optimization Algorithms",
      "Model Training",
      "Deep Learning Frameworks"
    ],
    topics: [
      "Introduction to Deep Learning",
      "Neural Network Architecture",
      "Backpropagation and Gradient Descent",
      "Activation Functions and Their Properties",
      "Loss Functions and Optimization",
      "Regularization Techniques",
      "Model Evaluation and Validation",
      "Hyperparameter Tuning",
      "Practical Implementation"
    ],
    image: deepLearning.src,
    url: "https://courses.cognitiveclass.ai/certificates/25820c11dbc04b3ab827ad74eb552109"
  },
  {
    period: "May 2023",
    name: "JavaScript: The Advanced Concepts",
    issuer: "Andrei Neagoie, Udemy",
    description: "Comprehensive course covering advanced JavaScript concepts and modern development practices. Mastered core JavaScript engine internals, memory management, and performance optimization. Implemented advanced programming paradigms including OOP, Functional Programming, and modern ES6+ features. Developed expertise in asynchronous programming, error handling, and module systems.",
    technologies: [
      "JavaScript Engine & Runtime",
      "Memory Management",
      "ES6+ Features",
      "OOP & FP",
      "Async Programming",
      "Error Handling",
      "Module Systems"
    ],
    topics: [
      "Javascript Engine, Runtime, Interpreter, Compiler, JIT Compiler",
      "Call Stack + Memory Heap, Stack Overflow + Memory Leaks, Garbage Collection",
      "Node.js, ES6-ES2022 features, Single Threaded Model",
      "Execution Context, Lexical Environment, Scope Chain, Hoisting",
      "Function Invocation, Scope, Dynamic vs Lexical Scope",
      "this: call(), apply(), bind(), IIFEs, Context vs Scope",
      "Types: Static vs Dynamic, Primitive Types, Pass by Reference/Value",
      "Arrays, Functions, Objects, Closures, Prototypal Inheritance",
      "OOP: Class Inheritance, Private vs Public Properties",
      "Functional Programming: Immutability, Pure Functions, Composition",
      "Advanced Concepts: Currying, Partial Application, Compose, Pipe",
      "Asynchronous JavaScript: Callbacks, Promises, Async/Await",
      "Event Loop, Callback Queue, Task Queue, Microtask Queue",
      "Concurrency + Parallelism, Modules in Javascript"
    ],
    image: udemy.src,
    url: "https://drive.google.com/file/d/1p0DYlxkk8neaUi_rEUllihbwJxjCVGBU/view?usp=sharing"
  },
  {
    period: "May 2020",
    name: "EXTENSIVE VISION AI PROGRAM 4.0",
    issuer: "TSAI",
    description: "Comprehensive program covering advanced computer vision concepts. Mastered neural architecture design principles, implemented state-of-the-art CNN architectures, and learned advanced techniques in receptive field calculations. Developed expertise in data augmentation strategies and computer vision applications. Successfully completed multiple projects including image classification, object detection, and semantic segmentation.",
    technologies: ["Neural Architecture", "CNNs", "Receptive Fields", "Data Augmentation", "Computer Vision", "Image Processing", "Deep Learning"],
    image: eva.src,
    url: "https://drive.google.com/file/d/1srx66gKbi7e0YBRT9MQSi0lgWWlfAOZY/view"
  },
  {
    period: "July 2020",
    name: "DEEP LEARNING WITH PYTORCH: ZERO TO GANS",
    issuer: "Jovian.ml",
    description: "Intensive 6-week program covering the complete spectrum of deep learning. Started with fundamental concepts and progressed to advanced implementations. Built and trained various neural network architectures including feed-forward networks, CNNs, and GANs. Implemented transfer learning techniques and model optimization strategies. Completed hands-on projects in image classification, style transfer, and generative models.",
    technologies: ["PyTorch", "Neural Networks", "CNNs", "Transfer Learning", "Deep Learning", "GANs", "Model Optimization"],
    image: jovian.src,
    url: "https://drive.google.com/file/d/1p_MB18YYn_qGQ5_XqtBB_vaPFiNYd91z/view"
  }
];

const EducationSection = () => {
  const handleCardInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only apply hover effects for desktop
    if ('touches' in e) {
      return; // Don't apply any effects on touch devices
    }
    
    // Get the target element
    const target = e.target as HTMLElement;
    const card = target.closest('.education-card, .certification-card') as HTMLElement;
    if (!card) return;

    // Make all other cards less visible
    document.querySelectorAll('.education-card, .certification-card').forEach(c => {
      if (c !== card) {
        (c as HTMLElement).style.opacity = '0.4';
      }
    });

    // Style current card
    card.style.backgroundColor = "rgba(100, 146, 255, 0.05)";
    card.style.boxShadow = "0 0 0 1px rgba(100, 255, 218, 0.2), 0 4px 8px rgba(2, 12, 27, 0)";
    card.style.opacity = '1';

    // Change text colors
    const titleEl = card.querySelector(".title-text") as HTMLElement;
    const listEls = card.querySelectorAll(".achieve-item, .tech-item");
    const periodEl = card.querySelector(".period-text") as HTMLElement;

    if (titleEl) titleEl.style.color = "#64ffda";
    if (periodEl) periodEl.style.color = "#64ffda";
    listEls.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.color = "#64ffda";
      element.style.backgroundColor = "rgba(100, 255, 218, 0.1)";
    });
  };

  const handleCardLeave = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only apply hover effects for desktop
    if ('touches' in e) {
      return; // Don't apply any effects on touch devices
    }
    
    // Get the target element
    const target = e.target as HTMLElement;
    const card = target.closest('.education-card, .certification-card') as HTMLElement;
    if (!card) return;

    // Reset all cards to full opacity
    document.querySelectorAll('.education-card, .certification-card').forEach(c => {
      (c as HTMLElement).style.opacity = '1';
    });

    // Reset current card styles
    card.style.backgroundColor = "transparent";
    card.style.boxShadow = "none";

    // Reset text colors
    const titleEl = card.querySelector(".title-text") as HTMLElement;
    const listEls = card.querySelectorAll(".achieve-item, .tech-item");
    const periodEl = card.querySelector(".period-text") as HTMLElement;

    if (titleEl) titleEl.style.color = "#ccd6f6";
    if (periodEl) periodEl.style.color = "#a8b2d1";
    listEls.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.color = "#a8b2d1";
      element.style.backgroundColor = "#112240";
    });
  };

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
    const card = target.closest('.education-card, .certification-card') as HTMLElement;
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
    const titleEl = card.querySelector(".title-text") as HTMLElement;
    const listEls = card.querySelectorAll(".achieve-item, .tech-item");
    const periodEl = card.querySelector(".period-text") as HTMLElement;

    // Change colors
    if (titleEl) titleEl.style.color = "#64ffda";
    if (periodEl) periodEl.style.color = "#64ffda";
    listEls.forEach((el: Element) => {
      const element = el as HTMLElement;
      element.style.color = "#64ffda";
      element.style.backgroundColor = "rgba(100, 255, 218, 0.1)";
    });
    
    // Delay opening URL
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
        // Reset colors
        if (titleEl) titleEl.style.color = "#ccd6f6";
        if (periodEl) periodEl.style.color = "#a8b2d1";
        listEls.forEach((el: Element) => {
          const element = el as HTMLElement;
          element.style.color = "#a8b2d1";
          element.style.backgroundColor = "#112240";
        });
      }, 600);
    }, 300);
  };

  return (
    <section id="education">
      <div className="text-light-slate">
        {/* Certifications */}
        <div>
          <div className="mb-4 md:hidden" style={{ marginLeft: '0.85rem' }}>
            <h2 className="text-lg font-semibold text-lightest-slate" style={{ fontSize: '0.8rem' }}>CERTIFICATIONS</h2>
          </div>
          <div 
            className="space-y-3 certification-container"
            style={{
              position: 'relative',
              zIndex: 1,
            }}
            onMouseLeave={() => {
              // Reset all cards to full opacity when mouse leaves the container
              document.querySelectorAll('.certification-card').forEach(card => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.filter = 'none';
              });
            }}
          >
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden cursor-pointer certification-card"
                style={{ 
                  padding: "10px",
                  transition: "all 0.3s ease",
                  borderRadius: "15px",
                  position: "relative",
                  touchAction: "pan-y",
                  WebkitTapHighlightColor: "transparent",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                  willChange: "transform",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseEnter={handleCardInteraction}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  const card = e.currentTarget as HTMLElement;
                  card.dataset.touchStartY = e.touches[0].clientY.toString();
                }}
                onTouchMove={(e) => {
                  e.stopPropagation();
                  const card = e.currentTarget as HTMLElement;
                  const startY = parseFloat(card.dataset.touchStartY || '0');
                  const currentY = e.touches[0].clientY;
                  
                  if (Math.abs(currentY - startY) > 5) {
                    card.dataset.isScrolling = 'true';
                    // Reset all styles immediately
                    card.style.backgroundColor = "transparent";
                    card.style.boxShadow = "none";
                    card.style.opacity = '1';
                    
                    // Reset text colors
                    const titleEl = card.querySelector(".title-text") as HTMLElement;
                    const listEls = card.querySelectorAll(".achieve-item, .tech-item");
                    const periodEl = card.querySelector(".period-text") as HTMLElement;
                    
                    if (titleEl) titleEl.style.color = "#ccd6f6";
                    if (periodEl) periodEl.style.color = "#a8b2d1";
                    listEls.forEach((el: Element) => {
                      const element = el as HTMLElement;
                      element.style.color = "#a8b2d1";
                      element.style.backgroundColor = "#112240";
                    });
                  }
                }}
                onMouseLeave={handleCardLeave}
                onTouchEnd={(e: React.TouchEvent) => {
                  e.stopPropagation();
                  const card = e.currentTarget as HTMLElement;
                  
                  if (card.dataset.isScrolling !== 'true') {
                    handleCardClick(cert.url, e);
                  }
                  
                  // Clean up
                  delete card.dataset.touchStartY;
                  delete card.dataset.isScrolling;
                }}
                onClick={(e) => handleCardClick(cert.url, e)}
              >
                {/* Flex container - creates two columns */}
                <div style={{ 
                  display: "flex", 
                  flexDirection: "row",
                  flexShrink: 0,
                  flexGrow: 0,
                  flexBasis: "auto",
                }}>
                  {/* Left column - Certificate Image */}
                  <div style={{ 
                    width: "165px", 
                    padding: "10px", 
                    flexShrink: 0
                  }}>
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
                      src={cert.image} 
                      alt={cert.name}
                      className="cert-image"
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
                  }}>
                    <h3 
                      className="font-semibold m-0 p-0 flex items-center cursor-pointer"
                      onClick={(e) => handleCardClick(cert.url, e)}
                    >
                      <span className="title-text" style={{ 
                        fontSize: "0.8rem", 
                        color: "#ccd6f6",
                        transition: "color 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        {cert.name} - {cert.issuer}
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
                          }}
                        >
                          <path className="arrow-line" d="M7 7l10 10" />
                          <path className="arrow-head" d="M7 17V7h10" />
                        </svg>
                      </span>
                    </h3>
                    
                    <div className="mt-1 mb-2">
                      <span className="subtitle-text" style={{ 
                        fontSize: "0.75rem", 
                        color: "#a8b2d1",
                        transition: "color 0.3s ease"
                      }}>
                        {cert.issuer}
                      </span>
                    </div>
                    
                    <p style={{ 
                      fontSize: "0.75rem",
                      color: "#8892b0",
                      margin: "0 0 10px 0",
                      lineHeight: "1.4"
                    }}>
                      {cert.description}
                    </p>
                    
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {cert.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="tech-item"
                          style={{ 
                            fontSize: "0.65rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            backgroundColor: "#112240",
                            color: "#a8b2d1",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Academic Education */}
        <div style={{ marginTop: '3rem' }}>
          <div className="mb-4 md:hidden" style={{ marginLeft: '0.85rem' }}>
            <h2 className="text-lg font-semibold text-lightest-slate" style={{ fontSize: '0.8rem' }}>EDUCATION</h2>
          </div>
          <div 
            className="space-y-3 education-container"
            style={{
              position: 'relative',
              zIndex: 1,
            }}
            onMouseLeave={() => {
              // Reset all cards to full opacity when mouse leaves the container
              document.querySelectorAll('.education-card').forEach(card => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.filter = 'none';
              });
            }}
          >
            {education.map((edu, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden cursor-pointer education-card"
                style={{ 
                  padding: "10px",
                  transition: "all 0.3s ease",
                  borderRadius: "15px",
                  position: "relative",
                  touchAction: "pan-y",
                  WebkitTapHighlightColor: "transparent",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                  willChange: "transform",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                }}
                onMouseEnter={handleCardInteraction}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  const card = e.currentTarget as HTMLElement;
                  card.dataset.touchStartY = e.touches[0].clientY.toString();
                }}
                onTouchMove={(e) => {
                  e.stopPropagation();
                  const card = e.currentTarget as HTMLElement;
                  const startY = parseFloat(card.dataset.touchStartY || '0');
                  const currentY = e.touches[0].clientY;
                  
                  if (Math.abs(currentY - startY) > 5) {
                    card.dataset.isScrolling = 'true';
                    // Reset all styles immediately
                    card.style.backgroundColor = "transparent";
                    card.style.boxShadow = "none";
                    card.style.opacity = '1';
                    
                    // Reset text colors
                    const titleEl = card.querySelector(".title-text") as HTMLElement;
                    const listEls = card.querySelectorAll(".achieve-item, .tech-item");
                    const periodEl = card.querySelector(".period-text") as HTMLElement;
                    
                    if (titleEl) titleEl.style.color = "#ccd6f6";
                    if (periodEl) periodEl.style.color = "#a8b2d1";
                    listEls.forEach((el: Element) => {
                      const element = el as HTMLElement;
                      element.style.color = "#a8b2d1";
                      element.style.backgroundColor = "#112240";
                    });
                  }
                }}
                onMouseLeave={handleCardLeave}
                onTouchEnd={(e: React.TouchEvent) => {
                  e.stopPropagation();
                  const card = e.currentTarget as HTMLElement;
                  
                  if (card.dataset.isScrolling !== 'true') {
                    handleCardClick(edu.url, e);
                  }
                  
                  // Clean up
                  delete card.dataset.touchStartY;
                  delete card.dataset.isScrolling;
                }}
                onClick={(e) => handleCardClick(edu.url, e)}
              >
                {/* Flex container - creates two columns */}
                <div style={{ 
                  display: "flex", 
                  flexDirection: "row",
                  flexShrink: 0,
                  flexGrow: 0,
                  flexBasis: "auto",
                }}>
                  {/* Left column - Time period */}
                  <div style={{ 
                    width: "165px", 
                    padding: "10px",
                    flexShrink: 0,
                  }}>
                    <div className="font-mono period-text" style={{ 
                      fontSize: "0.75rem", 
                      color: "#a8b2d1",
                      transition: "color 0.3s ease"
                    }}>
                      {edu.period}
                    </div>
                  </div>
                  
                  {/* Right column - Content */}
                  <div style={{ 
                    flex: "1", 
                    padding: "8px",
                    flexShrink: 1,
                    minWidth: 0,
                  }}>
                    <h3 
                      className="font-semibold m-0 p-0 flex items-center cursor-pointer"
                      onClick={(e) => handleCardClick(edu.url, e)}
                    >
                      <span className="title-text" style={{ 
                        fontSize: "0.8rem", 
                        color: "#ccd6f6",
                        transition: "color 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        {edu.degree}
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
                          }}
                        >
                          <path className="arrow-line" d="M7 7l10 10" />
                          <path className="arrow-head" d="M7 17V7h10" />
                        </svg>
                      </span>
                    </h3>
                    
                    <div className="mt-1 mb-2">
                      <span className="subtitle-text" style={{ 
                        fontSize: "0.75rem", 
                        color: "#a8b2d1",
                        transition: "color 0.3s ease"
                      }}>
                        {edu.institution}
                      </span>
                    </div>
                    
                    <p style={{ 
                      fontSize: "0.75rem",
                      color: "#8892b0",
                      margin: "0 0 10px 0",
                      lineHeight: "1.4"
                    }}>
                      {edu.description}
                    </p>
                    
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {edu.achievements.map((achievement, i) => (
                        <span 
                          key={i}
                          className="achieve-item"
                          style={{ 
                            fontSize: "0.65rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            backgroundColor: "#112240",
                            color: "#a8b2d1",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .education-card,
        .certification-card {
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-y;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
          background-color: transparent;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .education-card,
          .certification-card {
            touch-action: pan-y;
            -webkit-tap-highlight-color: transparent;
            background-color: transparent !important;
            box-shadow: none !important;
          }
        }

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

        @media (max-width: 1200px) {
          .education-card,
          .certification-card {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
            will-change: transform;
          }
        }
      `}</style>
    </section>
  );
};

export default EducationSection; 