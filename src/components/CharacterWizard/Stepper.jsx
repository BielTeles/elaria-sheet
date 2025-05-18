// src/components/CharacterWizard/Stepper.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Book, Star, Hash, ClipboardList, Gift, Scroll, Zap } from 'lucide-react';

const icons = [
  <User size={16} />,          // Raça
  <Book size={16} />,          // Classe
  <Star size={16} />,          // Subclasse
  <Hash size={16} />,          // Atributos
  <ClipboardList size={16} />, // Perícias
  <Gift size={16} />,          // Equipamentos
  <Scroll size={16} />,        // Lore
  <Zap size={16} />,           // Ações/Reações
];

export default function Stepper({ steps, current }) {
  return (
    <nav
      aria-label="Etapas"
      className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-secondary"
    >
      {steps.map((label, index) => (
        <div key={index} className="flex items-center space-x-2 flex-shrink-0">
          {/* Animated Circle with Icon */}
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={
              index === current
                ? { scale: 1.2, opacity: 1 }
                : { scale: 0.8, opacity: 0.6 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={
              `flex items-center justify-center w-8 h-8 rounded-full transition-colors ` +
              (index === current
                ? 'bg-primary text-white'
                : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300')
            }
          >
            {icons[index]}
          </motion.div>

          {/* Animated Label */}
          <AnimatePresence initial={false}>
            <motion.span
              layout
              initial={{ opacity: index === current ? 1 : 0.5 }}
              animate={{ opacity: index === current ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
              className={
                `whitespace-nowrap flex-shrink-0 transition-colors ` +
                (index === current
                  ? 'text-primary dark:text-secondary font-medium'
                  : 'text-neutral-700 dark:text-neutral-400')
              }
            >
              {label}
            </motion.span>
          </AnimatePresence>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-600" />
          )}
        </div>
      ))}
    </nav>
  );
}
