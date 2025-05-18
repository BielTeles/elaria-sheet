// src/components/ui/SkillEditor.jsx
import React from 'react';
import { Button } from './button';
import { Plus, Minus } from 'lucide-react';

// triangular cost helper
const costForLevel = n => (n * (n + 1)) / 2;

export default function SkillEditor({ skills, onChange, totalPoints = 10 }) {
  // calcula gasto e restante
  const spent = Object.values(skills).reduce((sum, lvl) => sum + costForLevel(lvl), 0);
  const remaining = totalPoints - spent;

  const inc = skill => {
    const lvl = skills[skill] || 0;
    const nextCost = lvl + 1;
    if (remaining < nextCost) return;
    onChange({ ...skills, [skill]: lvl + 1 });
  };
  const dec = skill => {
    const lvl = skills[skill] || 0;
    if (lvl <= 0) return;
    onChange({ ...skills, [skill]: lvl - 1 });
  };

  return (
    <div className="space-y-2">
      <div>Pontos restantes: <strong>{remaining}</strong></div>
      <div className="grid grid-cols-2 gap-4 max-h-[40vh] overflow-auto">
        {Object.entries(skills).map(([skill, lvl]) => {
          const nextCost = lvl + 1;
          return (
            <div key={skill} className="flex items-center justify-between p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
              <span className="w-28 font-medium">{skill}</span>
              <div className="flex items-center space-x-2">
                <Button onClick={() => dec(skill)} disabled={lvl <= 0} variant="outline" className="h-8 w-8 p-0">
                  <Minus size={16}/>
                </Button>
                <div className="h-8 w-8 flex items-center justify-center border rounded">
                  {lvl}
                </div>
                <Button onClick={() => inc(skill)} disabled={remaining < nextCost} variant="outline" className="h-8 w-8 p-0">
                  <Plus size={16}/>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
