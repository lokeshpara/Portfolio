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
            I'm a <span className="highlight">Software Engineer specializing in AI & Full Stack Development</span> with hands-on experience building applications that involve backend systems, AI tools, and user-facing interfaces. I like working on projects that solve real problems, whether it's recognizing handwritten digits, helping people improve their resumes, or building a clean and interactive personal website. I care about writing code that works, is easy to understand, and serves a clear purpose.
          </p>
          
          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.80rem' }}>
            In terms of skills, I've used <span className="highlight">Python</span>, <span className="highlight">JavaScript</span>, and <span className="highlight">Java</span> to build different types of applications. I've worked with <span className="highlight">Flask</span>, <span className="highlight">React</span>, and <span className="highlight">Next.js</span>, and I'm comfortable building and connecting APIs, creating user interfaces, and handling data. My projects often include a mix of frontend and backend logic, along with tools like <span className="highlight">PyTorch</span> for deep learning and <span className="highlight">Docker</span> for deployment.
          </p>
          
          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.8rem' }}>
            One of my recent interests is working with <span className="highlight">large language models</span> and automation. I've explored AI fine-tuning techniques like <span className="highlight">SFT</span>, <span className="highlight">IFT</span>, <span className="highlight">RLHF</span>, and <span className="highlight">PEFT</span>, and I've built a Chrome extension that uses OpenAI's API to analyze and generate documents like resumes and cover letters. I've also developed a CNN-based web app for MNIST digit recognition, experimenting with different regularization methods and visualizing model performance.
          </p>
          
          <p className="text-light-slate" style={{ fontSize: '0.8rem' }}>
            I'm currently looking for a role where I can apply these skills to real problems—especially in <span className="highlight">backend development</span>, <span className="highlight">applied AI</span>, or <span className="highlight">data-driven applications</span>. I enjoy building tools that are useful, well-structured, and easy to maintain, and I'm interested in joining a team where I can keep learning while contributing in a meaningful way.
          </p>
        </div>
      </div>
    </section>
  );
} 