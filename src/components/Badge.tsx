
import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
