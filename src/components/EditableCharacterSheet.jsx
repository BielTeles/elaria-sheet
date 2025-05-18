// src/components/EditableCharacterSheet.jsx
import React, { useState, useEffect } from 'react';
import { saveSheet } from '../utils/storage';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import SkillEditor from './ui/SkillEditor';
import { Plus, Minus } from 'lucide-react';

const SKILL_ORDER = [
  'Acrobacia', 'Adestramento', 'Atletismo', 'Atuação', 'Bloqueio', 'Cavalgar', 'Conhecimento', 'CorpoaCorpo', 'Cura', 'Diplomacia', 'Elemental', 'Enganação', 'Esquiva', 'Fortitude', 'Furtividade', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição','Investigação', 'Jogatina', 'Ladinagem', 'Misticismo', 'Nobreza', 'Percepção', 'Pontaria', 'Reflexos', 'Sobrevivência', 'Vontade'];


export default function EditableCharacterSheet({ initialSheet, onClose = () => { } }) {
  const totalPoints = 10;
  const [sheet, setSheet] = useState(initialSheet);
  const [newAction, setNewAction] = useState({ name: '', dice: '', mod: '' });
  const [newReaction, setNewReaction] = useState('');

  useEffect(() => {
    saveSheet(sheet);
  }, [sheet]);

  const updateField = (path, value) => {
    setSheet(prev => {
      const updated = { ...prev };
      const keys = path.split('.');
      let obj = updated;
      keys.forEach((key, idx) => {
        if (idx === keys.length - 1) obj[key] = value;
        else obj = obj[key];
      });
      return updated;
    });
  };

  const addAction = () => {
    if (!newAction.name.trim() || !newAction.dice.trim()) return;
    const actionObj = { name: newAction.name.trim(), dice: newAction.dice.trim(), mod: Number(newAction.mod) || 0 };
    updateField('actions', [...(sheet.actions || []), actionObj]);
    setNewAction({ name: '', dice: '', mod: '' });
  };
  const removeAction = index => {
    const updated = (sheet.actions || []).filter((_, i) => i !== index);
    updateField('actions', updated);
  };
  const updateAction = (index, field, value) => {
    const updated = (sheet.actions || []).map((act, i) =>
      i === index ? { ...act, [field]: value } : act
    );
    updateField('actions', updated);
  };

  const addReaction = () => {
    if (!newReaction.trim()) return;
    updateField('reactions', [...(sheet.reactions || []), { label: newReaction.trim() }]);
    setNewReaction('');
  };
  const removeReaction = index => {
    const updated = (sheet.reactions || []).filter((_, i) => i !== index);
    updateField('reactions', updated);
  };
  const updateReaction = (index, value) => {
    const updated = (sheet.reactions || []).map((rc, i) =>
      i === index ? { ...rc, label: value } : rc
    );
    updateField('reactions', updated);
  };

  return (
    <div className="p-4 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 rounded-lg shadow-card transition-colors">
      <div className="grid grid-cols-1 gap-6">
        {/* Nome da ficha */}
        <Input
          placeholder="Nome da Ficha"
          value={sheet.name || ''}
          onChange={e => updateField('name', e.target.value)}
          className="text-2xl font-bold"
        />

        {/* Raça e Classe/Subclasse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Raça"
            value={sheet.race || ''}
            onChange={e => updateField('race', e.target.value)}
          />
          <div className="flex space-x-2">
            <Input
              placeholder="Classe"
              value={sheet.class || ''}
              onChange={e => updateField('class', e.target.value)}
            />
            <Input
              placeholder="Subclasse"
              value={sheet.subclass || ''}
              onChange={e => updateField('subclass', e.target.value)}
            />
          </div>
        </div>

        {/* Atributos */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {Object.entries(sheet.attributes).map(([attr, val]) => (
            <div key={attr} className="text-center">
              <div className="font-mono mb-1">{attr}</div>
              <Input
                type="number"
                value={val}
                min={0}
                max={20}
                onChange={e => updateField(`attributes.${attr}`, Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        {/* Perícias */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Perícias</h2>

          <div className="max-h-[50vh] overflow-y-auto grid grid-cols-2 gap-4 p-2">
           {SKILL_ORDER.map((skill) => {
             const lvl = sheet.skills[skill] || 0;
             const nextCost = lvl + 1;
             const spent = SKILL_ORDER.reduce(
               (sum, s) => sum + ((sheet.skills[s] || 0) * ((sheet.skills[s] || 0) + 1) / 2),
               0
             );
             const remaining = totalPoints - spent;
             return (
               <div
                 key={skill}
                 className="flex items-center justify-between p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg"
               >
                 <span className="flex-shrink-0 w-28 font-medium">{skill}</span>

                 <div className="flex items-center space-x-2">
                   <Button
                     variant="outline"
                     onClick={() => {
                       if (lvl > 0)
                         setSheet(prev => ({
                           ...prev,
                           skills: { ...prev.skills, [skill]: lvl - 1 }
                         }));
                     }}
                     disabled={lvl === 0}
                     className="h-8 w-8 p-0 flex items-center justify-center"
                   >
                     <Minus size={16} />
                   </Button>

                   <div className="h-8 w-8 flex items-center justify-center border rounded">
                     {lvl}
                   </div>

                   <Button
                     variant="outline"
                     onClick={() => {
                       if (remaining >= nextCost)
                         setSheet(prev => ({
                           ...prev,
                           skills: { ...prev.skills, [skill]: lvl + 1 }
                         }));
                     }}
                     disabled={remaining < nextCost}
                     className="h-8 w-8 p-0 flex items-center justify-center"
                   >
                     <Plus size={16} />
                   </Button>
                 </div>
               </div>
             );
           })}
       </div>
        {/* Equipamentos */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Equipamentos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sheet.equipment.map((item, i) => (
              <div key={i} className="flex space-x-2">
                <Input
                  value={item.name}
                  onChange={e => {
                    const newEq = [...sheet.equipment];
                    newEq[i].name = e.target.value;
                    updateField('equipment', newEq);
                  }}
                />
                <Input
                  type="number"
                  className="w-16"
                  value={item.qty}
                  onChange={e => {
                    const newEq = [...sheet.equipment];
                    newEq[i].qty = Number(e.target.value);
                    updateField('equipment', newEq);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lore */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Lore</h2>
          <textarea
            value={sheet.lore.origin}
            onChange={e => updateField('lore.origin', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:ring-2 focus:ring-secondary focus:border-secondary mb-2"
            placeholder="Origem"
          />
          <textarea
            value={sheet.lore.background}
            onChange={e => updateField('lore.background', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-transparent focus:ring-2 focus:ring-secondary focus:border-secondary"
            placeholder="Background"
          />
        </div>

        {/* Ações */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Ações</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[40vh] overflow-auto">
            {sheet.actions.map((act, i) => (
              <div key={i} className="flex space-x-2">
                <Input
                  value={act.name}
                  onChange={e => updateAction(i, 'name', e.target.value)}
                  placeholder="Nome"
                />
                <Input
                  value={act.dice}
                  onChange={e => updateAction(i, 'dice', e.target.value)}
                  placeholder="1d6"
                  className="w-20"
                />
                <Input
                  type="number"
                  value={act.mod}
                  onChange={e => updateAction(i, 'mod', Number(e.target.value))}
                  className="w-16"
                />
                <Button variant="outline" onClick={() => removeAction(i)}>
                  ✕
                </Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <Input
                placeholder="Nova Ação"
                value={newAction.name}
                onChange={e => setNewAction(a => ({ ...a, name: e.target.value }))}
              />
              <Input
                placeholder="1d6"
                value={newAction.dice}
                onChange={e => setNewAction(a => ({ ...a, dice: e.target.value }))}
                className="w-20"
              />
              <Input
                type="number"
                placeholder="Mod"
                value={newAction.mod}
                onChange={e => setNewAction(a => ({ ...a, mod: e.target.value }))}
                className="w-16"
              />
              <Button variant="default" onClick={addAction}>
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        {/* Reações */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Reações</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[40vh] overflow-auto">
            {sheet.reactions.map((rc, i) => (
              <div key={i} className="flex space-x-2">
                <Input
                  value={rc.label}
                  onChange={e => updateReaction(i, e.target.value)}
                />
                <Button variant="outline" onClick={() => removeReaction(i)}>
                  ✕
                </Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <Input
                placeholder="Nova Reação"
                value={newReaction}
                onChange={e => setNewReaction(e.target.value)}
                className="flex-1"
              />
              <Button variant="default" onClick={addReaction}>
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        {/* Salvar */}
        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={onClose}>
            Salvar Edição
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}
