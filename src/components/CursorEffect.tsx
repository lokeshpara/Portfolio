'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import minionCursor from '../../images/minion-cursor.png';

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [minionPosition, setMinionPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const lastMoveTime = useRef(Date.now());
  const animationRef = useRef<number>();
  const bounceRef = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const wanderRef = useRef({ 
    x: 0, 
    y: 0, 
    targetX: 0, 
    targetY: 0, 
    isWandering: false,
    speed: 0,
    direction: 0,
    energy: 100,
    lastDirectionChange: 0
  });

  // Random animations when cursor stops
  const playRandomAnimation = () => {
    const animations = [
      { transform: 'translate(0, 0) rotate(5deg) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(0, 0) rotate(-5deg) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(0, 0) scale(1.1)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(0, 0) rotate(180deg) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(0, -8px) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(0, 8px) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(-8px, 0) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'translate(8px, 0) scale(1.05)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
    ];
    
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    const element = document.querySelector('.minion-cursor') as HTMLElement;
    if (element) {
      element.style.transition = randomAnim.transition;
      element.style.transform = randomAnim.transform;
      setTimeout(() => {
        element.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        element.style.transform = 'translate(0, 0)';
      }, 400);
    }
  };

  // Update wander behavior
  const updateWanderBehavior = () => {
    // Randomly change direction and speed
    if (Math.random() < 0.1) {
      wanderRef.current.direction = Math.random() * Math.PI * 2;
      wanderRef.current.speed = 1 + Math.random() * 2; // Speed between 1 and 3
    }
    
    // Update energy
    wanderRef.current.energy = Math.max(0, Math.min(100, 
      wanderRef.current.energy + (Math.random() < 0.1 ? 20 : -0.1)
    ));

    // Calculate new position based on direction and speed
    const speed = wanderRef.current.energy > 20 ? wanderRef.current.speed : 0.5;
    wanderRef.current.x += Math.cos(wanderRef.current.direction) * speed;
    wanderRef.current.y += Math.sin(wanderRef.current.direction) * speed;

    // Keep within reasonable bounds
    const maxDistance = 300;
    const distance = Math.sqrt(wanderRef.current.x * wanderRef.current.x + wanderRef.current.y * wanderRef.current.y);
    if (distance > maxDistance) {
      wanderRef.current.x *= maxDistance / distance;
      wanderRef.current.y *= maxDistance / distance;
      wanderRef.current.direction = Math.atan2(-wanderRef.current.y, -wanderRef.current.x);
    }
  };

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      
      // Calculate velocity
      if (deltaTime > 0) {
        velocityRef.current = {
          x: (e.clientX - lastX) / deltaTime,
          y: (e.clientY - lastY) / deltaTime
        };
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;

      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setIsMoving(true);
      lastMoveTime.current = Date.now();
      
      // Reset wander position when cursor moves
      wanderRef.current = { 
        x: 0, 
        y: 0, 
        targetX: 0, 
        targetY: 0, 
        isWandering: false,
        speed: 0,
        direction: 0,
        energy: 100,
        lastDirectionChange: 0
      };
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Animation frame for smooth following with bouncing effect
    const updateMinionPosition = () => {
      // Update bounce value with smoother motion
      bounceRef.current += 0.08;
      const bounceOffset = Math.sin(bounceRef.current) * 4;

      // Check if cursor has stopped
      if (Date.now() - lastMoveTime.current > 500) {
        setIsMoving(false);
        if (Math.random() < 0.03) {
          playRandomAnimation();
        }
        // Start wandering if not already
        if (!wanderRef.current.isWandering) {
          wanderRef.current.isWandering = true;
          wanderRef.current.direction = Math.random() * Math.PI * 2;
          wanderRef.current.speed = 1 + Math.random() * 2;
        }
      }

      // Update wander position
      if (!isMoving && wanderRef.current.isWandering) {
        updateWanderBehavior();
      } else if (isMoving) {
        // Extremely slowly return to cursor
        const returnSpeed = 0.03;
        wanderRef.current.x *= (1 - returnSpeed);
        wanderRef.current.y *= (1 - returnSpeed);
        if (Math.abs(wanderRef.current.x) < 0.1 && Math.abs(wanderRef.current.y) < 0.1) {
          wanderRef.current.isWandering = false;
        }
      }

      // Calculate target position with easing and velocity
      const targetX = position.x + 15 + wanderRef.current.x;
      const targetY = position.y - 15 + bounceOffset + wanderRef.current.y;
      
      // Adjust following speed based on cursor velocity
      const speed = Math.min(0.15, Math.max(0.04, 
        Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y) * 0.1
      ));
      
      // Extremely smooth following with dynamic easing
      setMinionPosition(prev => ({
        x: prev.x + (targetX - prev.x) * speed,
        y: prev.y + (targetY - prev.y) * speed
      }));

      animationRef.current = requestAnimationFrame(updateMinionPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animationRef.current = requestAnimationFrame(updateMinionPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position, isMoving]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 minion-cursor"
      style={{
        left: minionPosition.x,
        top: minionPosition.y,
        transform: 'translate(0, 0)',
        transition: isMoving ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform, left, top',
      }}
    >
      <div className="w-8 h-8 relative">
        <Image
          src={minionCursor}
          alt="Minion cursor"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 