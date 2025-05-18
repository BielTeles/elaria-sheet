// src/components/CharacterWizard/AttributeStep.jsx
import React from 'react';

const attributes = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'];
const costMap = { 0:0,1:1,2:3,3:6,4:10,5:15,6:21,7:28,8:36,9:45,10:55 };

export default function AttributeStep({ values, onChange }) {
  const pool = 6; // configuração de pontos iniciais
  const spent = attributes.reduce((sum, att) => sum + costMap[values[att]], 0);
  const remaining = pool - spent;

  const adjust = (att, delta) => {
    const current = values[att];
    const next = Math.max(0, Math.min(10, current + delta));
    const newSpent = spent - costMap[current] + costMap[next];
    if (newSpent > pool) return;
    onChange({ ...values, [att]: next });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Distribuição de Atributos</h2>
        <span>Pontos restantes: <strong>{remaining}</strong></span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {attributes.map(att => (
          <div key={att} className="flex items-center justify-between">
            <span className="font-mono text-lg">{att}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => adjust(att, -1)}
                disabled={values[att] <= 0}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >–</button>
              <span className="w-6 text-center">{values[att]}</span>
              <button
                onClick={() => adjust(att, +1)}
                disabled={spent - costMap[values[att]] + costMap[values[att]+1] > pool}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
