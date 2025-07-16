"use client";

import React from 'react';
// Remove motion import
// import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" style={{ paddingTop: '0.5rem' }}>
      <div style={{ marginLeft: '0.85rem' }}>
        {/* Replace motion.div with regular div and remove animation properties */}
        <div className="flex items-center group mb-8 md:hidden">
          <h2 className="font-semibold text-lightest-slate">
            ABOUT
          </h2>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("about");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="ml-2 transition-opacity duration-200"
            aria-label="Link to About section"
          >
            {/* No hover link icon */}
          </a>
        </div>
        
        <style jsx>{`
          .highlight {
            color: #64ffda;
          }
        `}</style>
        
        <div className="space-y-0">
          <p className="pb-2 text-light-slate" style={{ fontSize: '0.80rem' }}>
             I’m a <span className="highlight">Full Stack Developer</span> with over <span className="highlight">3 years of experience</span> working with <span className="highlight">Python</span>, <span className="highlight">GoLang</span>, <span className="highlight">Django</span>, <span className="highlight">FastAPI</span>, and <span className="highlight">Flask</span>. At Groww Company, I built real-time stock trading features, portfolio dashboards, and migrated legacy services to microservices on <span className="highlight">Kubernetes</span>. I also contributed to frontend development using <span className="highlight">React.js</span>, <span className="highlight">Next.js</span>, <span className="highlight">TypeScript</span>, and <span className="highlight">Redux</span>, integrating them with live <span className="highlight">WebSocket</span> feeds and backend APIs. At Moneyview, I worked on loan automation systems, secured integrations, and <span className="highlight">CI/CD pipelines</span> using <span className="highlight">Docker</span> and <span className="highlight">Jenkins</span>.
          </p>
          
          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.80rem' }}>
          I work with databases like <span className="highlight">PostgreSQL</span>, <span className="highlight">MySQL</span>, and <span className="highlight">Redis</span>, and have experience optimizing queries and reducing latency in high-load environments. I’ve deployed and managed services using <span className="highlight">AWS (EC2, S3, Lambda, RDS)</span>, <span className="highlight">GCP(GKE)</span> , <span className="highlight">Docker</span>, and <span className="highlight">Kubernetes</span>. My workflow includes building <span className="highlight">GraphQL</span> and <span className="highlight">REST APIs</span>, adding <span className="highlight">caching layers</span>, monitoring systems with <span className="highlight">Prometheus</span>, <span className="highlight">Grafana</span>, and <span className="highlight">CloudWatch</span>, and writing unit and load tests with <span className="highlight">Pytest</span> and <span className="highlight">Locust</span>.
          </p>
          
          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.8rem' }}>
          Beyond backend systems, I’ve built <span className='highlight'>AI</span> and <span className='highlight'>ML</span> projects using <span className='highlight'>PyTorch</span> and <span className='highlight'>Keras</span>, including a CIFAR-10 ResNet model with <span className='highlight'>92.22% accuracy</span> and a YOLOv3-based real-time object detection app. I also created an <span className='highlight'>OpenAI-powered resume optimizer</span> that evaluates ATS score, keyword match, and formatting improvements.
            </p>
          
          <p className="text-light-slate" style={{ fontSize: '0.8rem' }}>
          I regularly write technical <span className='highlight'>blogs</span> on topics like <span className='highlight'>LLM fine-tuning</span>, <span className='highlight'>Chinchilla scaling laws</span>, and <span className='highlight'>computer vision</span>. I’m currently pursuing my Master’s in Computer Science (GPA 3.9/4.0) and looking for opportunities where I can apply my backend and AI skills while continuing to work with modern web technologies like React and Next.js.  
            </p>
        </div>
      </div>
    </section>
  );
} 