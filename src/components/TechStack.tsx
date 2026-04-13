import { useEffect, useRef, useState } from "react";
import "./styles/TechStack.css";
import "./styles/TechStackBorderRemoval.css";

interface Tech {
  name: string;
  icon: string;
  color: string;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  tech: Tech;
  isDragging?: boolean;
}

// ALL technologies in one array
const allTechnologies: Tech[] = [
  // Data Engineering & Infrastructure
  { name: "BigQuery", icon: "googlebigquery", color: "#669DF6" },
  { name: "Spark", icon: "apachespark", color: "#E25A1C" },
  { name: "Airflow", icon: "apacheairflow", color: "#017CEE" },
  { name: "AWS", icon: "amazonaws", color: "#FF9900" },
  { name: "S3", icon: "amazons3", color: "#569A31" },
  { name: "Redshift", icon: "amazonredshift", color: "#8C4FFF" },
  { name: "GCP", icon: "googlecloud", color: "#4285F4" },
  { name: "Composer", icon: "googlecloud", color: "#34A853" },

  // AI & Machine Learning
  { name: "Python", icon: "python", color: "#3776AB" },
  { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00" },
  { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
  { name: "scikit-learn", icon: "scikitlearn", color: "#F7931E" },
  { name: "SQL", icon: "postgresql", color: "#4169E1" },
  { name: "R", icon: "r", color: "#276DC3" },

  // Semantic & BI Platforms
  { name: "Looker", icon: "looker", color: "#4285F4" },
  { name: "LookML", icon: "looker", color: "#6C63FF" },
  { name: "Tableau", icon: "tableau", color: "#E97627" },
  { name: "Power BI", icon: "powerbi", color: "#F2C811" },
  { name: "Adobe Analytics", icon: "adobe", color: "#FF0000" },
  { name: "Google Analytics", icon: "googleanalytics", color: "#E37400" },
  { name: "Search Console", icon: "googlesearchconsole", color: "#458CF5" },

  // AI Development & Integration
  { name: "Claude", icon: "anthropic", color: "#D4A574" },
  { name: "ChatGPT", icon: "openai", color: "#10A37F" },
  { name: "Copilot", icon: "githubcopilot", color: "#6e40c9" },
  { name: "LangChain", icon: "chainlink", color: "#375BD2" },

  // Tools & Collaboration
  { name: "Git", icon: "git", color: "#F05032" },
  { name: "VS Code", icon: "visualstudiocode", color: "#007ACC" },
  { name: "Cursor AI", icon: "cursor", color: "#000000" },
  { name: "N8N", icon: "n8n", color: "#EA4B71" },
  { name: "Docker", icon: "docker", color: "#2496ED" },
  { name: "JIRA", icon: "jira", color: "#0052CC" },
];

const TechStack = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, draggedBall: null as Ball | null });
  const [loadedImages, setLoadedImages] = useState<Map<string, HTMLImageElement>>(new Map());

  // Physics constants
  const GRAVITY = 0.35;
  const FRICTION = 0.995;
  const BOUNCE_DAMPING = 0.85;
  const COLLISION_DAMPING = 0.92;
  const MIN_RADIUS = 35;
  const MAX_RADIUS = 50;

  // Preload all images
  useEffect(() => {
    const imageMap = new Map<string, HTMLImageElement>();
    let loadedCount = 0;

    allTechnologies.forEach((tech) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imageMap.set(tech.name, img);
        loadedCount++;
        if (loadedCount === allTechnologies.length) {
          setLoadedImages(new Map(imageMap));
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === allTechnologies.length) {
          setLoadedImages(new Map(imageMap));
        }
      };
      img.src = `https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace('#', '')}`;
    });
  }, []);

  // Initialize balls with physics
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || loadedImages.size === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = 650; // Fixed height for the unified container

    // Initialize all balls with varied sizes and random positions
    ballsRef.current = allTechnologies.map((tech, index) => {
      // Vary ball radius for visual interest
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);

      // Spawn in grid-like pattern initially to avoid overlaps
      const cols = Math.ceil(Math.sqrt(allTechnologies.length));
      const row = Math.floor(index / cols);
      const col = index % cols;
      const spacing = canvas.width / (cols + 1);
      const verticalSpacing = canvas.height / (Math.ceil(allTechnologies.length / cols) + 1);

      return {
        x: spacing * (col + 1) + (Math.random() - 0.5) * 40,
        y: verticalSpacing * (row + 1) + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        radius: radius,
        tech: tech,
        isDragging: false,
      };
    });

    // Physics animation loop
    const animate = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each ball
      ballsRef.current.forEach((ball, index) => {
        // Skip physics if being dragged
        if (ball.isDragging) {
          ball.vx = 0;
          ball.vy = 0;
        } else {
          // Apply gravity
          ball.vy += GRAVITY;

          // Apply friction
          ball.vx *= FRICTION;
          ball.vy *= FRICTION;

          // Update position
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Wall collision detection with varied radius
          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= -BOUNCE_DAMPING;
          }
          if (ball.x + ball.radius > canvas.width) {
            ball.x = canvas.width - ball.radius;
            ball.vx *= -BOUNCE_DAMPING;
          }
          if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy *= -BOUNCE_DAMPING;
          }
          if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy *= -BOUNCE_DAMPING;
            // Add slight upward bounce when hitting ground
            if (Math.abs(ball.vy) < 2) {
              ball.vy = -Math.random() * 4 - 2;
            }
          }

          // Ball-to-ball collision detection (optimized for more balls)
          for (let i = index + 1; i < ballsRef.current.length; i++) {
            const otherBall = ballsRef.current[i];

            const dx = otherBall.x - ball.x;
            const dy = otherBall.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = ball.radius + otherBall.radius;

            if (distance < minDistance) {
              // Collision detected - calculate new velocities
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Rotate velocities
              const vx1 = ball.vx * cos + ball.vy * sin;
              const vy1 = ball.vy * cos - ball.vx * sin;
              const vx2 = otherBall.vx * cos + otherBall.vy * sin;
              const vy2 = otherBall.vy * cos - otherBall.vx * sin;

              // Mass-based collision (larger balls have more momentum)
              const m1 = ball.radius;
              const m2 = otherBall.radius;
              const newVx1 = ((m1 - m2) * vx1 + 2 * m2 * vx2) / (m1 + m2);
              const newVx2 = ((m2 - m1) * vx2 + 2 * m1 * vx1) / (m1 + m2);

              // Rotate velocities back
              ball.vx = (newVx1 * cos - vy1 * sin) * COLLISION_DAMPING;
              ball.vy = (vy1 * cos + newVx1 * sin) * COLLISION_DAMPING;
              otherBall.vx = (newVx2 * cos - vy2 * sin) * COLLISION_DAMPING;
              otherBall.vy = (vy2 * cos + newVx2 * sin) * COLLISION_DAMPING;

              // Separate overlapping balls
              const overlap = minDistance - distance;
              const separateX = (dx / distance) * overlap * 0.5;
              const separateY = (dy / distance) * overlap * 0.5;
              ball.x -= separateX;
              ball.y -= separateY;
              otherBall.x += separateX;
              otherBall.y += separateY;
            }
          }
        }

        // Draw ball shadow/glow
        ctx.save();
        ctx.shadowColor = ball.tech.color;
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;

        // Draw ball background with gradient
        const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
        gradient.addColorStop(0, `${ball.tech.color}40`);
        gradient.addColorStop(0.7, `${ball.tech.color}20`);
        gradient.addColorStop(1, `${ball.tech.color}10`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw ball border
        ctx.strokeStyle = ball.tech.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.stroke();

        ctx.restore();

        // Draw tech icon
        const img = loadedImages.get(ball.tech.name);
        if (img) {
          const iconSize = ball.radius * 1.3;
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 8;
          ctx.drawImage(
            img,
            ball.x - iconSize / 2,
            ball.y - iconSize / 2,
            iconSize,
            iconSize
          );
          ctx.restore();
        } else {
          // Fallback: draw first letter
          ctx.fillStyle = ball.tech.color;
          ctx.font = `bold ${ball.radius * 0.6}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ball.tech.name.charAt(0), ball.x, ball.y);
        }

        // Draw tech name below ball
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.min(12, ball.radius * 0.3)}px Arial`;
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 6;
        ctx.fillText(ball.tech.name, ball.x, ball.y + ball.radius + 16);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loadedImages]);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if clicked on a ball (check from top to bottom for proper z-index)
    for (let i = ballsRef.current.length - 1; i >= 0; i--) {
      const ball = ballsRef.current[i];
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius) {
        ball.isDragging = true;
        mouseRef.current.isDragging = true;
        mouseRef.current.draggedBall = ball;
        break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !mouseRef.current.isDragging || !mouseRef.current.draggedBall) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const ball = mouseRef.current.draggedBall;
    ball.x = mouseX;
    ball.y = mouseY;
  };

  const handleMouseUp = () => {
    if (mouseRef.current.draggedBall) {
      const ball = mouseRef.current.draggedBall;
      ball.isDragging = false;
      // Give it a random velocity when released
      ball.vx = (Math.random() - 0.5) * 12;
      ball.vy = (Math.random() - 0.5) * 12 - 6; // Slight upward bias
    }
    mouseRef.current.isDragging = false;
    mouseRef.current.draggedBall = null;
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width;

      // Adjust ball positions if they're outside new bounds
      ballsRef.current.forEach(ball => {
        if (ball.x > rect.width - ball.radius) ball.x = rect.width - ball.radius;
        if (ball.x < ball.radius) ball.x = ball.radius;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="techstack">
      <h2>
        MY <span>TECHSTACK</span>
      </h2>
      <p className="techstack-subtitle">
        {allTechnologies.length} technologies bouncing together - Click and drag to interact
      </p>

      <div className="unified-physics-container" ref={containerRef}>
        <canvas
          ref={canvasRef}
          className="physics-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default TechStack;
