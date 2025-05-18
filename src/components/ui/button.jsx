// -------------------------------
// src/components/ui/button.jsx
// -------------------------------
import React from 'react';

export function Button({ variant = 'default', className = '', children, ...props }) {
  const base = 'px-4 py-2 rounded font-medium focus:outline-none transition';
  const variants = {
    default: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800',
  };
  const classes = `${base} ${variants[variant] || variants.default} ${className}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}