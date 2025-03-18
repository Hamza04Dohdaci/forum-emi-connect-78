
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  const variantClasses = {
    default: 'text-emi-blue',
    light: 'text-white',
  };

  return (
    <div className={cn('font-display font-bold flex items-center', sizeClasses[size], variantClasses[variant], className)}>
      <div className="relative">
        <span className="text-emi-blue dark:text-white">
          <span className="text-emi-cyan">F</span>orum 
        </span>
        <span className={cn(
          variant === 'default' ? 'text-emi-gold' : 'text-emi-gold', 
          'font-extrabold'
        )}>
          EMI
        </span>
        <span className="text-emi-blue dark:text-white"> Entreprises</span>
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-emi-cyan via-emi-gold to-transparent"></div>
      </div>
    </div>
  );
};

export default Logo;
