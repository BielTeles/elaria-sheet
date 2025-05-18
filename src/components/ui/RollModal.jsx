// src/components/ui/RollModal.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Howl} from 'howler';
import Confetti from 'react-confetti';

/**
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - title: string
 *  - rolls: number[]
 *  - d20?: number
 *  - degree?: string
 *  - modifier?: number
 *  - total?: number
 */
export default function RollModal({ isOpen, onClose, title, rolls, d20, degree, modifier, total }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-xs text-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Confetes para sucesso bom ou extremo */}
            {degree && degree.includes('Sucesso') && (
              <Confetti
              width={300}
              height={300}
              recycle={false}
              numberOfPieces={degree === 'Sucesso Extremo' ? 100 : 50}
              />
            )}



            <h3 className="text-lg font-semibold">{title}</h3>

            {/* Mostrar todos os valores rolados */}
            <div className="flex justify-center space-x-2">
              {rolls.map((r, i) => (
                <span key={i} className="font-mono text-xl">{r}</span>
              ))}
            </div>

            {/* Detalhes conforme tipo de roll */}
            {total !== undefined ? (
              <>  
                {modifier !== 0 && (
                  <div className="text-sm">Modifier: {modifier > 0 ? '+' : ''}{modifier}</div>
                )}
                <div className="text-2xl font-bold">Total: {total}</div>
              </>
            ) : (
              <>
                <div className="text-md">Usado: <strong>{d20}</strong></div>
                {degree && (
                  <div className="text-md"><em>{degree}</em></div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
