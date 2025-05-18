// src/components/CharacterWizard/RaceStep.jsx
import React from 'react';

const raceList = ['Aurien', 'Roknar', 'Kain', 'Faelan', 'Vesperi'];

export default function RaceStep({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Escolha sua Raça</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {raceList.map((race) => (
          <li key={race}>
            <button
              onClick={() => onSelect(race)}
              className={`
                w-full text-left px-4 py-2 rounded transition-colors
                ${selected === race
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-600'}
              `}
            >
              {race}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
