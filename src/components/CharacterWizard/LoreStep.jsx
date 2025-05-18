// src/components/CharacterWizard/LoreStep.jsx
import React from 'react';
import { Input } from '../ui/input';

export default function LoreStep({ lore, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lore</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 font-medium">Origem</label>
          <textarea
            value={lore.origin}
            onChange={e => onChange({ ...lore, origin: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:ring-2 focus:ring-secondary focus:border-secondary"
            placeholder="Escreva a origem do personagem"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Background</label>
          <textarea
            value={lore.background}
            onChange={e => onChange({ ...lore, background: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:ring-2 focus:ring-secondary focus:border-secondary"
            placeholder="Escreva o background do personagem"
          />
        </div>
      </div>
    </div>
  );
}
