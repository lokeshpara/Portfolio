"use client";

// Remove motion import
// import { motion } from 'framer-motion';
// import Link from 'next/link';

import React from 'react';
// import Image from 'next/image';
import blog1 from '../../../images/blog1.png';
import blog2 from '../../../images/blog2.png';
import blog3 from '../../../images/blog3.png';
import blog4 from '../../../images/blog4.png';
const blogPosts = [
  {
    image: blog1.src,
    title: 'Fine-tuning Language Models: SFT, IFT, RLHF, and PEFT Demystified',
    category: 'Machine Learning',
    excerpt: 'A comprehensive guide to understanding different fine-tuning techniques for language models, including Supervised Fine-Tuning (SFT), Instruction Fine-Tuning (IFT), Reinforcement Learning from Human Feedback (RLHF), and Parameter-Efficient Fine-Tuning (PEFT).',
    date: 'March 15, 2024',
    readTime: '10 min read',
    url: 'https://medium.com/@lokeshpara17/fine-tuning-language-models-sft-ift-rlhf-and-peft-demystified-efda0184567b'
  },
  {
    image: blog2.src,
    title: 'Understanding Chinchilla Scaling Laws: How We Predict the Power of AI Models',
    category: 'AI Research',
    excerpt: 'An in-depth exploration of Chinchilla scaling laws and their role in predicting the capabilities and performance of AI models. Learn how these laws help us understand model scaling and optimization.',
    date: 'March 10, 2024',
    readTime: '8 min read',
    url: 'https://medium.com/@lokeshpara17/understanding-chinchilla-scaling-laws-how-we-predict-the-power-of-ai-models-eba6d69d3de7'
  },
  {
    image: blog3.src,
    title: 'Tiny ImageNet Using PyTorch',
    category: 'Deep Learning',
    excerpt: 'A practical guide to implementing and training models on the Tiny ImageNet dataset using PyTorch. Learn about data preprocessing, model architecture, and training techniques for image classification.',
    date: 'March 5, 2024',
    readTime: '12 min read',
    url: 'https://medium.com/@lokeshpara17/tiny-imagenet-using-pytorch-42a3f2ee3c9d'
  },
  {
    image: blog4.src,
    title: 'Python Interpreter',
    category: 'Programming',
    excerpt: 'A detailed look at how Python interpreters work, including bytecode compilation, virtual machine execution, and memory management. Understand the inner workings of Python execution.',
    date: 'March 1, 2024',
    readTime: '9 min read',
    url: 'https://medium.com/@lokeshpara17/python-interpreter-a4d3b7e9170f'
  }
];

// Remove animation containers
// const container = { ... };
// const item = { ... };

const BlogSection = () => {
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
    const card = target.closest('.blog-card') as HTMLElement;
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
    const card = target.closest('.blog-card') as HTMLElement;
    if (!card) return;

    // Make all other cards less visible
    document.querySelectorAll('.blog-card').forEach(c => {
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
    const card = target.closest('.blog-card') as HTMLElement;
    if (!card) return;

    // Reset all cards to full opacity
    document.querySelectorAll('.blog-card').forEach(c => {
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
    <section id="blog">
      <div className="mb-4 md:hidden" style={{ marginLeft: '0.95rem' }}>
        <h2 className="text-lg font-semibold text-lightest-slate" style={{ fontSize: '0.8rem' }}>BLOG</h2>
      </div>

      <div 
        className="space-y-3 blog-container"
        onMouseLeave={() => {
          setActiveCard(null);
        }}
      >
        {blogPosts.map((post, index) => (
          <a 
            key={index}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg overflow-hidden cursor-pointer blog-card"
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
            onClick={(e) => handleCardClick(post.url, e)}
            onMouseEnter={handleCardInteraction}
            onTouchStart={handleCardInteraction}
            onMouseLeave={handleCardLeave}
            onTouchEnd={(e: React.TouchEvent) => {
              e.preventDefault();
              handleCardLeave(e);
              handleCardClick(post.url, e);
            }}
          >
            {/* Flex container - creates two columns */}
            <div style={{ 
              display: "flex", 
              flexDirection: "row",
              flexShrink: 0,
              flexGrow: 0,
              flexBasis: "auto",
              width: "100%",
              height: "100%"
            }}>
              {/* Left column - Blog Image */}
              <div style={{ 
                width: "165px", 
                padding: "10px",
                flexShrink: 0,
                height: "100%"
              }}>
                <div className="image-container" style={{ 
                  overflow: "hidden", 
                  borderRadius: "8px", 
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#112240",
                  width: "100%"
                }}>
                  <img 
                    src={post.image} 
                    alt={post.title}
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
                height: "100%",
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
                  {post.excerpt}
                </p>
                
                <ul className="flex flex-wrap gap-2 mt-1" style={{ 
                  padding: "2px 0 10px 0",
                  width: "100%"
                }}>
                  <li 
                    className="rounded tech-item category-text"
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
                    className="rounded tech-item date-text"
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
          </a>
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
          
          .blog-btn {
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
          
          .blog-btn::before {
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
          
          .blog-btn:hover {
            background-color: rgba(100, 255, 218, 0.05);
            transform: translateY(-2px);
          }
          
          .blog-btn:hover::before {
            animation: borderRotate 2s ease infinite;
          }
          
          .blog-btn:hover .btn-text {
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
          
          .blog-btn:hover .folder-icon {
            transform: translateY(-2px) scale(1.1);
            filter: drop-shadow(0 2px 2px rgba(100, 255, 218, 0.3));
          }
          
          @keyframes folderOpen {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(1.2); }
            100% { transform: scaleY(1); }
          }
          
          .blog-btn:hover .folder-top {
            animation: folderOpen 1.5s infinite ease-in-out;
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
        `}</style>
        <a 
          href="/blog"
          className="blog-btn"
        >
          <span className="btn-text">View All Posts</span>
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