import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Color, Vec2 } from 'ogl';

export interface LightRaysProps {
  raysOrigin?: 'top-center' | 'center' | 'bottom-center';
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  pulsating?: boolean;
  className?: string;
}

export const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  raysColor = '#F5B800',
  raysSpeed = 0.6,
  lightSpread = 1.4,
  rayLength = 1.6,
  followMouse = true,
  mouseInfluence = 0.06,
  noiseAmount = 0.02,
  distortion = 0.03,
  pulsating = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef<Vec2>(new Vec2(0, 0));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple 2D implementation using Canvas API
    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!ctx || !canvas.width || !canvas.height) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient for rays
      const gradient = ctx.createLinearGradient(
        canvas.width / 2, 
        raysOrigin === 'top-center' ? 0 : raysOrigin === 'bottom-center' ? canvas.height : canvas.height / 2,
        canvas.width / 2,
        raysOrigin === 'top-center' ? canvas.height : raysOrigin === 'bottom-center' ? 0 : canvas.height / 2
      );

      const color = new Color(raysColor);
      gradient.addColorStop(0, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.3)`);
      gradient.addColorStop(0.5, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.1)`);
      gradient.addColorStop(1, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0)`);

      ctx.fillStyle = gradient;

      // Draw rays
      const numRays = 12;
      const spread = lightSpread * 100;
      
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const baseX = canvas.width / 2;
        const baseY = raysOrigin === 'top-center' ? 0 : raysOrigin === 'bottom-center' ? canvas.height : canvas.height / 2;
        
        // Add mouse influence if enabled
        let offsetX = 0;
        let offsetY = 0;
        
        if (followMouse) {
          const mouseDistance = Math.sqrt(
            Math.pow(mouseRef.current.x - baseX, 2) + 
            Math.pow(mouseRef.current.y - baseY, 2)
          );
          const influence = Math.max(0, 1 - mouseDistance / 500) * mouseInfluence;
          offsetX = (mouseRef.current.x - baseX) * influence;
          offsetY = (mouseRef.current.y - baseY) * influence;
        }

        // Add pulsating effect
        const pulseScale = pulsating ? 1 + Math.sin(time * raysSpeed) * 0.1 : 1;
        
        // Calculate ray dimensions
        const rayWidth = spread / numRays * pulseScale;
        const rayHeight = canvas.height * rayLength;
        
        // Apply distortion
        const distortedAngle = angle + Math.sin(time * 0.5 + i) * distortion;
        
        ctx.save();
        ctx.translate(baseX + offsetX, baseY + offsetY);
        ctx.rotate(distortedAngle);
        
        // Draw ray as triangle
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-rayWidth / 2, rayHeight);
        ctx.lineTo(rayWidth / 2, rayHeight);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }

      time += 0.01;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    if (followMouse) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if (followMouse) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isClient, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, distortion, pulsating]);

  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default LightRays;
