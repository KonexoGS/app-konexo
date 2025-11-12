import './GradientButton.css';
import React, { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  href?: string;
  onClick?: () => void;
}

export default function GradientButton({
  children,
  className = '',
  colors = ['#9333ea', '#7e22ce', '#6b21a8', '#7e22ce', '#9333ea'],
  animationSpeed = 3,
  href,
  onClick
}: GradientButtonProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(120deg, ${colors.join(', ')})`,
    transitionDuration: `${animationSpeed}s`
  };

  const Component = href ? 'a' : 'button';
  const additionalProps = href ? { href, rel: "noopener noreferrer" } : { onClick };

  return (
    <Component
      className={`gradient-button ${className}`}
      {...additionalProps}
    >
      <div className="gradient-bg" style={gradientStyle}></div>
      <span className="button-content">
        {children}
      </span>
    </Component>
  );
}
