// -------------------------------
// src/components/ui/input.jsx
// -------------------------------
import React from 'react';

export const Input = React.forwardRef(({ className, noFullWidth, ...props }, ref) => (
  <input
    ref={ref}
    className={`${noFullWidth ? '' : 'w-full'} px-3 py-2 border rounded ${className}`}
    {...props}
  />
));
Input.displayName = 'Input';