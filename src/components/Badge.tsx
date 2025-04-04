
import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
};

const Badge: React.FC<BadgeProps> = ({ children, className = "", variant = "default" }) => {
  let baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  
  // Add variant-specific classes
  if (variant === 'outline') {
    baseClasses += " border";
  }
  
  return (
    <span className={`${baseClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
