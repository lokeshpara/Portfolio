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
            I'm a <span className="highlight">Full Stack AI Developer</span> who builds applications that combine web development with machine learning. My work includes browser extensions for learning and computer vision systems for image processing. I focus on writing clean code and making complex technologies accessible to users.
          </p>
          
          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.80rem' }}>
            As a <span className="highlight">Full Stack Developer</span>, I build applications using <span className="highlight">Next.js</span> and <span className="highlight">React</span>, creating responsive user interfaces. For machine learning, I've built several systems, including a custom ResNet model that achieved <span className="highlight">92.22% test accuracy</span> on CIFAR-10, surpassing the target by 2.22%. I've also built a YOLOv3-based system for object detection in video streams. My backend work uses <span className="highlight">Python</span> and <span className="highlight">Flask</span> to create APIs that serve machine learning models.
          </p>
          
          <p className="pb-2 mb-4 text-light-slate" style={{ fontSize: '0.8rem' }}>
            I've built three Chrome extensions: a <span className="highlight">News Analysis tool</span> that uses Google's Gemini AI to summarize articles and extract key points, a <span className="highlight">Word Explainer</span> that helps students understand concepts with visual aids, and an <span className="highlight">ATS Optimize</span> that helps job seekers improve their resumes by analyzing job descriptions. I've also built a handwritten digit recognition system that achieves <span className="highlight">99.2% accuracy</span> on MNIST while using only <span className="highlight">13,000 parameters</span>.
          </p>
          
          <p className="text-light-slate" style={{ fontSize: '0.8rem' }}>
            I build applications that solve real problems by combining web technologies and machine learning. I work well in teams where I can use my experience in both full-stack development and AI to build solutions. I focus on making models perform well, keeping response times fast, and creating clear user interfaces to deliver reliable applications.
          </p>
        </div>
      </div>
    </section>
  );
} 