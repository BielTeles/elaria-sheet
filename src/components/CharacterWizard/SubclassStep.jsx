// src/components/CharacterWizard/SubclassStep.jsx
import React from 'react';
import { subclasses as allSubclasses } from '../../data/descriptions';

export default function SubclassStep({ parentClass, selected, onSelect }) {
  // Filtra apenas as subclasses válidas para a classe atual
  const list = Object.keys(allSubclasses)
    .filter(key => key.startsWith(parentClass + ' — '))
    .map(key => key.split(' — ')[1]);

  if (!parentClass) {
    return <p className="text-neutral-500">Selecione uma classe primeiro.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Escolha sua Subclasse</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map((sub) => (
          <li key={sub}>
            <button
              onClick={() => onSelect(sub)}
              className={`
                w-full text-left px-4 py-2 rounded transition-colors
                ${selected === sub
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-600'}
              `}
            >
              {sub}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
