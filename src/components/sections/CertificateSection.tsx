"use client";

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Meta",
    date: "December 2023",
    image: "/images/certificates/meta-fullstack.jpg",
    link: "https://www.coursera.org/account/accomplishments/certificate/XXXXX",
  },
  {
    title: "Advanced React & Redux",
    issuer: "Udemy",
    date: "November 2023",
    image: "/images/certificates/react-advanced.jpg",
    link: "https://www.udemy.com/certificate/XXXXX",
  },
  {
    title: "TypeScript Masterclass",
    issuer: "Frontend Masters",
    date: "October 2023",
    image: "/images/certificates/typescript-masterclass.jpg",
    link: "https://frontendmasters.com/certificates/XXXXX",
  },
];

export default function CertificateSection() {
  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="certificates">
      <div className="mb-4 md:hidden" style={{ marginLeft: '1rem' }}>
        <h2 className="text-lg font-semibold text-lightest-slate">Certificates</h2>
      </div>

      <div 
        className="space-y-3 certificate-container"
        onMouseLeave={() => {
          // Reset all cards to full opacity when mouse leaves the container
          document.querySelectorAll('.certificate-card').forEach(card => {
            (card as HTMLElement).style.opacity = '1';
            (card as HTMLElement).style.filter = 'none';
          });
        }}
      >
        {certificates.map((cert, index) => (
          <div 
            key={index} 
            className="rounded-lg overflow-hidden cursor-pointer certificate-card"
            style={{ 
              padding: "10px",
              transition: "all 0.3s ease",
              borderRadius: "15px",
            }}
            onClick={() => handleCardClick(cert.link)}
            onMouseEnter={(e) => {
              // Make all other cards less visible
              document.querySelectorAll('.certificate-card').forEach(card => {
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
              const issuerEl = e.currentTarget.querySelector(".issuer-text") as HTMLElement;
              const dateEl = e.currentTarget.querySelector(".date-text") as HTMLElement;
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const certImg = e.currentTarget.querySelector(".cert-image") as HTMLImageElement;
              
              if (titleEl) titleEl.style.color = "#64ffda";
              if (issuerEl) issuerEl.style.color = "rgba(100, 255, 218, 0.7)";
              if (dateEl) dateEl.style.color = "rgba(100, 255, 218, 0.7)";
              
              if (certImg) {
                certImg.style.transform = "scale(1.05)";
                certImg.style.filter = "brightness(1.1)";
              }
               
              if (linkIcon) {
                linkIcon.style.color = "#64ffda";
                linkIcon.style.opacity = "1";
              }
            }}
            onMouseLeave={(e) => {
              // Reset this card styles
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "0 0 0 0px rgba(100, 255, 219, 0), 0 2px 4px rgba(2, 12, 27, 0)";
              e.currentTarget.style.background = "linear-gradient(to right, transparent, rgba(100, 255, 219, 0), transparent)";
              
              const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
              const issuerEl = e.currentTarget.querySelector(".issuer-text") as HTMLElement;
              const dateEl = e.currentTarget.querySelector(".date-text") as HTMLElement;
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const certImg = e.currentTarget.querySelector(".cert-image") as HTMLImageElement;
              
              if (titleEl) titleEl.style.color = "#ccd6f6";
              if (issuerEl) issuerEl.style.color = "#a8b2d1";
              if (dateEl) dateEl.style.color = "#a8b2d1";
              
              if (certImg) {
                certImg.style.transform = "scale(1)";
                certImg.style.filter = "brightness(1)";
              }
               
              if (linkIcon) {
                linkIcon.style.color = "#a8b2d1";
                linkIcon.style.opacity = "0.6";
              }
            }}
          >
            {/* Flex container - creates two columns */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* Left column - Image */}
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
                    src={cert.image} 
                    alt={cert.title}
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
              <div style={{ flex: "1", padding: "8px" }}>
                {/* Header with issuer and date */}
                <div className="flex items-center justify-between mb-1">
                  <span className="issuer-text" style={{ fontSize: "0.65rem", color: "rgb(168, 178, 209)", transition: "0.3s" }}>
                    {cert.issuer}
                  </span>
                  <span className="date-text" style={{ fontSize: "0.65rem", color: "rgb(168, 178, 209)", transition: "0.3s" }}>
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  className="title-text"
                  style={{ 
                    fontSize: "0.9rem", 
                    fontWeight: "600", 
                    color: "#ccd6f6",
                    marginBottom: "5px",
                    transition: "color 0.3s ease"
                  }}
                >
                  {cert.title}
                </h3>

                {/* Link icon */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <svg 
                    className="link-icon"
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ 
                      color: "#a8b2d1",
                      opacity: "0.6",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      marginTop: "0px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(cert.link);
                    }}
                  >
                    {/* Arrow line */}
                    <path 
                      d="M7,17 L17,7" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                    />
                    
                    {/* 90 degree arrow head */}
                    <path 
                      d="M17,7 L17,13 M17,7 L11,7" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 