"use client";

import React from 'react';

const experiences = [
  {
    period: "June 2025 — Present",
    positions: [
      "Java Full Stack Developer"
    ],
    company: "LPL Financial",
    description: "Architected 15+ Spring Boot microservices with Spring Cloud components supporting $1.8T+ in assets for 29,000+ advisors, achieving 99.9% uptime and improving API response time by 78%. Engineered enterprise RESTful APIs and GraphQL services integrating 15+ financial data providers with OAuth2/JWT security, achieving SOC 2 compliance. Built event-driven architecture with Apache Kafka processing 2M+ portfolio and market events daily with sub-200ms latency. Optimized database performance with Redis caching (85% hit rate), HikariCP pooling across PostgreSQL Aurora and Oracle 12c, reducing query time by 60%. Developed React 18 dashboards with TypeScript, Redux Toolkit, and Chart.js, boosting advisor productivity by 30%. Deployed cloud-native microservices on AWS EKS with Horizontal Pod Autoscaling, reducing infrastructure costs by 25%.",
    technologies: ["Java", "Spring Boot", "Spring Cloud", "Spring Security", "REST APIs", "GraphQL", "Apache Kafka", "PostgreSQL", "Oracle", "Redis", "React 18", "TypeScript", "Redux Toolkit", "AWS EKS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus", "Grafana"],
    url: "https://www.lpl.com/"
  },

  {
    period: "August 2024 — May 2025",
    positions: [
      "Java Full Stack Developer"
    ],
    company: "Athenahealth",
    description: "Spearheaded HIPAA-compliant healthcare platform with Spring Boot microservices and React/Angular on Azure AKS, serving 50,000+ providers processing 100M+ patient records daily with 99.95% uptime. Architected HL7 FHIR R4 compliant APIs using HAPI FHIR and GraphQL, integrating 8 major hospital systems transforming data synchronization from 24 hours to real-time under 5 seconds. Designed auto-scaling Azure infrastructure handling 200% patient surge during COVID-19 while maintaining sub-3s page loads. Optimized PostgreSQL and Cosmos DB with Hibernate second-level caching, improving query performance by 55%. Fortified security with Spring Security 5, OAuth2, JWT, Azure AD SSO achieving SOC 2 and HITRUST certification. Developed patient portal using React 17 and Angular 14 with WebSocket real-time updates, reducing page load time by 45%.",
    technologies: ["Java", "Spring Boot", "HL7 FHIR", "HAPI FHIR", "GraphQL", "Azure AKS", "React 17", "Angular 14", "PostgreSQL", "Cosmos DB", "Spring Security", "OAuth2", "Docker", "Kubernetes", "GitLab CI/CD", "Terraform"],
    url: "https://www.athenahealth.com/"
  },

  {
    period: "November 2021 — July 2023",
    positions: [
      "Java Full Stack Developer"
    ],
    company: "YES Bank",
    description: "Engineered core banking microservices with Spring Boot and Hibernate processing $500M+ daily transactions across 2.5M accounts with 99.92% uptime using ACID guarantees. Developed payment APIs integrating Visa Direct, Mastercard Send, ACH, and SWIFT, reducing processing time by 35% while processing 2M monthly ACH transactions with 99.98% success rate. Built real-time fraud detection with Kafka Streams using windowed aggregations and ML integration, detecting fraud 96% faster with 99.9% accuracy, preventing $5M+ losses annually. Optimized Oracle 12c with range/hash partitioning, Redis caching (85% hit rate) supporting 1000+ concurrent connections, reducing response time by 55%. Created React banking platform with Redux Toolkit, WebSocket real-time updates reducing page load by 50%. Achieved PCI-DSS Level 1 compliance with Spring Security OAuth2, JWT, HashiCorp Vault passing audit with zero critical findings.",
    technologies: ["Java", "Spring Boot", "Hibernate", "Oracle 12c", "Redis", "Apache Kafka", "React", "Redux Toolkit", "Spring Security", "OAuth2", "JWT", "Docker", "Kubernetes", "Jenkins", "AWS", "HashiCorp Vault"],
    url: "https://www.yesbank.in/"
  },

  {
    period: "May 2020 — October 2021",
    positions: [
      "Java Developer"
    ],
    company: "Comcast Corporation",
    description: "Developed customer service platform with Spring Boot, Hibernate, and PostgreSQL/MongoDB managing 5M+ subscribers with 99.7% uptime, supporting 100K concurrent users during peak events. Architected JAX-RS RESTful and Apache CXF SOAP services connecting customer portal with billing, Salesforce CRM, and SAP ERP, reducing service activation by 92% from 48hrs to 4hrs. Optimized database operations using Spring Data JPA, Hibernate with second-level caching, and HikariCP pooling across MySQL, Oracle, PostgreSQL, and MongoDB, improving query performance by 40%. Built responsive Angular 11 self-service portal with TypeScript, NgRx, RxJS achieving 95% cross-browser compatibility and WCAG 2.1 compliance, reducing support tickets by 30%. Established CI/CD automation with Jenkins, Docker, Kubernetes, Maven, and Selenium reducing build time by 60%.",
    technologies: ["Java", "Spring Boot", "Hibernate", "JAX-RS", "Apache CXF", "PostgreSQL", "MongoDB", "Angular 11", "TypeScript", "NgRx", "Spring Security", "Docker", "Kubernetes", "Jenkins", "Maven", "Selenium"],
    url: "https://corporate.comcast.com/"
  }

];

const ExperienceSection = () => {
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
    const card = target.closest('.experience-card') as HTMLElement;
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
    const card = target.closest('.experience-card') as HTMLElement;
    if (!card) return;

    // Make all other cards less visible
    document.querySelectorAll('.experience-card').forEach(c => {
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
    const card = target.closest('.experience-card') as HTMLElement;
    if (!card) return;

    // Reset all cards to full opacity
    document.querySelectorAll('.experience-card').forEach(c => {
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
    <section id="experience">
      <div className="mb-4 md:hidden" style={{ marginLeft: '0.95rem' }}>
        <h2 className="text-lg font-semibold text-lightest-slate" style={{ fontSize: '0.8rem' }}>EXPERIENCE</h2>
      </div>

      <div
        className="space-y-3 experience-container"
        onMouseLeave={() => {
          // Reset all cards to full opacity when mouse leaves the container
          document.querySelectorAll('.experience-card').forEach((card: Element) => {
            const cardElement = card as HTMLElement;
            cardElement.style.opacity = '1';
            cardElement.style.filter = 'none';
          });
        }}
      >
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden cursor-pointer experience-card"
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
              userSelect: "none"
            }}
            onMouseEnter={handleCardInteraction}
            onTouchStart={handleCardInteraction}
            onMouseLeave={handleCardLeave}
            onTouchEnd={(e: React.TouchEvent) => {
              e.preventDefault();
              handleCardLeave(e);
              handleCardClick(exp.url, e);
            }}
            onClick={(e: React.MouseEvent) => handleCardClick(exp.url, e)}
          >
            {/* Flex container - creates two columns */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%"
            }}>
              {/* Left column - Time period */}
              <div style={{
                width: "165px",
                padding: "10px",
                flexShrink: 0
              }}>
                <div className="font-mono period-text" style={{
                  fontSize: "0.75rem",
                  color: "#a8b2d1",
                  transition: "color 0.3s ease"
                }}>
                  {exp.period}
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
                    {exp.positions[0]} - {exp.company}
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

                {exp.positions.length > 1 && (
                  <div className="mt-0.5 mb-0.5">
                    {exp.positions.slice(1).map((position, posIndex) => (
                      <div
                        key={posIndex}
                        className="text-xs opacity-80 subtitle-text"
                        style={{
                          fontSize: '0.7rem',
                          padding: "0.5px 0",
                          color: "#a8b2d1",
                          transition: "color 0.3s ease"
                        }}
                      >
                        {position}
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-1 mb-1 opacity-90 text-light-slate" style={{
                  fontSize: '0.7rem',
                  lineHeight: 1.3,
                  padding: "10px 0",
                  flex: 1
                }}>
                  {exp.description}
                </p>

                <ul className="flex flex-wrap gap-2 mt-1" style={{
                  padding: "2px 0 10px 0",
                  width: "100%"
                }}>
                  {exp.technologies.map((tech, techIndex) => (
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
          </div>
        ))}
      </div>

      {/* <div className="mt-16 text-left pl-4" style={{ margin: "1rem 1rem" }}>
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
          
          .review-btn {
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
          
          .review-btn::before {
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
          
          .review-btn:hover {
            background-color: rgba(100, 255, 218, 0.05);
            transform: translateY(-2px);
          }
          
          .review-btn:hover::before {
            animation: borderRotate 2s ease infinite;
          }
          
          .review-btn:hover .btn-text {
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
          
          .resume-icon {
            transition: all 0.3s ease;
            transform-origin: center;
          }
          
          .review-btn:hover .resume-icon {
            transform: translateY(-2px) scale(1.1);
            filter: drop-shadow(0 2px 2px rgba(100, 255, 218, 0.3));
          }
          
          @keyframes pageFlip {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.92); }
          }
          
          .review-btn:hover .page-element {
            animation: pageFlip 1.5s infinite ease-in-out;
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
          href="https://drive.google.com/file/d/1_pGgsi957FGUDVCiwm_9CvGokBa5fxp3/view" 
          target="_blank"
          rel="noopener noreferrer"
          className="review-btn"
        >
          <span className="btn-text">View Resume</span>
          <svg 
            className="resume-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline className="page-element" points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </a>
      </div> */}
    </section>
  );
};

export default ExperienceSection;