import React, { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  variant?: 'filled' | 'outline' | 'light';
  size?: 'sm' | 'md' | 'lg';
};

const variantClasses = {
  filled: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-cyan-800 text-cyan-800 hover:cursor-pointer',
  light: 'bg-blue-50 text-green-600 hover:bg-blue-100',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { leftSection, rightSection, variant = 'filled', size = 'md', className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {leftSection && <span className="flex items-center">{leftSection}</span>}
        <span>{children}</span>
        {rightSection && <span className="flex items-center">{rightSection}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
