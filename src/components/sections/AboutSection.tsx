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
            I'm a <span className="highlight">Java Full Stack Developer</span> with <span className="highlight">5 years of experience</span> delivering high-volume financial systems supporting <span className="highlight">29,000+ advisors</span> and <span className="highlight">7M+ client accounts</span> in enterprises managing <span className="highlight">$1.8T+ in assets</span> across financial services, healthcare, banking, and telecommunications. Currently at <span className="highlight">LPL Financial</span>, I architect <span className="highlight">Spring Boot microservices</span> with Spring Cloud components, achieving <span className="highlight">99.9% uptime</span> and <span className="highlight">78% performance improvements</span>. I've built <span className="highlight">RESTful and GraphQL APIs</span> processing millions of daily transactions while maintaining SOC 2, HIPAA, and PCI-DSS compliance.
          </p>

          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.80rem' }}>
            I develop enterprise-scale <span className="highlight">React</span> and <span className="highlight">Angular</span> frontends with <span className="highlight">TypeScript</span>, <span className="highlight">Redux</span>, and <span className="highlight">WebSocket</span> real-time communications, improving user engagement by <span className="highlight">40%</span> and reducing page load times by <span className="highlight">50%</span>. My cloud-native expertise spans <span className="highlight">AWS</span> and <span className="highlight">Azure</span> with <span className="highlight">Docker/Kubernetes</span> containerization, <span className="highlight">Apache Kafka</span> event-driven architecture, and database optimization across <span className="highlight">PostgreSQL</span>, <span className="highlight">Oracle</span>, <span className="highlight">MySQL</span>, and <span className="highlight">MongoDB</span>. I implement <span className="highlight">Redis caching</span> achieving <span className="highlight">85%+ hit rates</span> and leverage monitoring with <span className="highlight">Prometheus</span>, <span className="highlight">Grafana</span>, and <span className="highlight">ELK Stack</span>.
          </p>

          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.8rem' }}>
            I integrate <span className='highlight'>AI/ML</span> capabilities using <span className='highlight'>Python</span>, <span className='highlight'>TensorFlow</span>, and <span className='highlight'>AWS SageMaker</span> for fraud detection, preventing <span className='highlight'>$5M+ losses annually</span>. My CI/CD automation with <span className='highlight'>Jenkins</span>, <span className='highlight'>Docker</span>, and <span className='highlight'>Terraform</span> reduces deployment time by <span className='highlight'>87%</span>. I've built projects including a <span className='highlight'>CIFAR-10 ResNet model</span> with <span className='highlight'>92.22% accuracy</span>, <span className='highlight'>YOLOv3 object detection</span> system, and an <span className='highlight'>ATS-optimized resume Chrome extension</span> using OpenAI API.
          </p>

          <p className="text-light-slate" style={{ fontSize: '0.8rem' }}>
            I write technical <span className='highlight'>blogs</span> on <span className='highlight'>LLM fine-tuning</span>, <span className='highlight'>Chinchilla scaling laws</span>, and <span className='highlight'>computer vision</span>. I hold an <span className='highlight'>MS in Computer Science</span> from Southern Arkansas University with a <span className='highlight'>3.9/4.0 GPA</span> and am actively seeking full-time opportunities where I can leverage my enterprise Java development expertise, cloud-native architecture skills, and AI/ML integration experience to build scalable, high-performance systems.
          </p>
        </div>
      </div>
    </section>
  );
}