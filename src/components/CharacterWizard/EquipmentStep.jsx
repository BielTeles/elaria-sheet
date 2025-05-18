// src/components/CharacterWizard/EquipmentStep.jsx
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function EquipmentStep({ items, onChange }) {
  const addItem = () => {
    onChange([...items, { id: Date.now(), name: '', qty: 1 }]);
  };
  const updateItem = (index, key, value) => {
    const updated = [...items];
    updated[index][key] = value;
    onChange(updated);
  };
  const removeItem = index => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Equipamentos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Input
              placeholder="Nome do item"
              value={item.name}
              onChange={e => updateItem(i, 'name', e.target.value)}
            />
            <Input
              type="number"
              className="w-16"
              value={item.qty}
              min={1}
              onChange={e => updateItem(i, 'qty', Number(e.target.value))}
            />
            <Button variant="outline" onClick={() => removeItem(i)}>
              ✕
            </Button>
          </div>
        ))}
      </div>
      <div>
        <Button variant="default" onClick={addItem}>
          Adicionar Item
        </Button>
      </div>
    </div>
  );
}
