// src/components/CharacterWizard/SkillStep.jsx
import React from 'react';
import { Button } from '../ui/button';
import { Plus, Minus } from 'lucide-react';

// Ordem oficial das perícias conforme livro
const SKILL_ORDER = [
  'Acrobacia', 'Adestramento', 'Atletismo', 'Atuação', 'Bloqueio', 'Cavalgar', 'Conhecimento', 'CorpoaCorpo', 'Cura', 'Diplomacia', 'Elemental', 'Enganação', 'Esquiva', 'Fortitude', 'Furtividade', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição','Investigação', 'Jogatina', 'Ladinagem', 'Misticismo', 'Nobreza', 'Percepção', 'Pontaria', 'Reflexos', 'Sobrevivência', 'Vontade'];

// Função auxiliar: soma triangular de 1 a n = n*(n+1)/2
const costForLevel = (n) => (n * (n + 1)) / 2;

export default function SkillStep({ skills = {}, onChange }) {
  const totalPoints = 10;
  const spent = SKILL_ORDER.reduce((sum, skill) => sum + costForLevel(skills[skill] || 0), 0);
  const remaining = totalPoints - spent;

  const increment = (skill) => {
    const current = skills[skill] || 0;
    const nextCost = current + 1;
    if (remaining < nextCost) return;
    onChange({ ...skills, [skill]: current + 1 });
  };

  const decrement = (skill) => {
    const current = skills[skill] || 0;
    if (current <= 0) return;
    onChange({ ...skills, [skill]: current - 1 });
  };

  // Arrange skills into two columns
  const leftColumn = SKILL_ORDER.filter((_, i) => i % 2 === 0);
  const rightColumn = SKILL_ORDER.filter((_, i) => i % 2 === 1);

  return (
    <div className="space-y-4">
      <div>
        <span>Pontos restantes: </span>
        <span className="font-bold">{remaining}</span>
      </div>

      <div className="flex gap-4 p-2">
        {[leftColumn, rightColumn].map((col, colIndex) => (
          <div key={colIndex} className="flex-1 space-y-2">
            {col.map((skill) => {
              const lvl = skills[skill] || 0;
              const nextCost = lvl + 1;
              return (
                <div
                  key={skill}
                  className="flex items-center justify-between h-12 p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg"
                >
                  <span className="flex-shrink-0 w-32 font-medium">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => decrement(skill)}
                      disabled={lvl === 0}
                      className="h-8 w-8 p-0 flex items-center justify-center"
                    >
                     -
                    </Button>
                    <div className="h-8 w-8 flex items-center justify-center border rounded">
                      {lvl}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => increment(skill)}
                      disabled={remaining < nextCost}
                      className="h-8 w-8 p-0 flex items-center justify-center"
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
