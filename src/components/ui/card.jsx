// src/components/ui/card.jsx
import React from 'react';

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`
        bg-neutral-50 dark:bg-neutral-800
        border border-neutral-200 dark:border-neutral-700
        rounded-lg
        shadow-card
        overflow-hidden
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

// Conteúdo interno com padding
export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// Cabeçalho do Card com borda inferior
export function CardHeader({ className = '', children, ...props }) {
  return (
    <div
      className={`p-4 border-b border-neutral-200 dark:border-neutral-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Rodapé do Card com borda superior
export function CardFooter({ className = '', children, ...props }) {
  return (
    <div
      className={`p-4 border-t border-neutral-200 dark:border-neutral-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

