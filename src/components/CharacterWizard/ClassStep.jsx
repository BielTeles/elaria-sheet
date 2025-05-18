// src/components/CharacterWizard/ClassStep.jsx
import React from 'react';

const classList = ['Evocador', 'Titã', 'Sentinela', 'Elo']; // Exemplo, substitua pelos seus valores reais

export default function ClassStep({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Escolha sua Classe</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {classList.map((cls) => (
          <li key={cls}>
            <button
              onClick={() => onSelect(cls)}
              className={`
                w-full text-left px-4 py-2 rounded transition-colors
                ${selected === cls
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-600'}
              `}
            >
              {cls}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
