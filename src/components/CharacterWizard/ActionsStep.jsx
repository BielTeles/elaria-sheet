// src/components/CharacterWizard/ActionsStep.jsx
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import RollModal from '../ui/RollModal';
import { rollDice } from '../../utils/diceRoller';

export default function ActionsStep({ data, onChange }) {
  const { actions = [], reactions = [] } = data;

  const [newAction, setNewAction] = useState({ name: '', dice: '', mod: '' });
  const [newReaction, setNewReaction] = useState('');
  const [shakeIdx, setShakeIdx] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, title: '', rolls: [], modifier: 0, total: 0 });

  // Ações
  const addAction = () => {
    if (!newAction.name.trim() || !newAction.dice.trim()) return;
    const actionObj = { name: newAction.name.trim(), dice: newAction.dice.trim(), mod: Number(newAction.mod) || 0 };
    onChange({ ...data, actions: [...actions, actionObj] });
    setNewAction({ name: '', dice: '', mod: '' });
  };

  const updateAction = (idx, field, value) => {
    const updated = actions.map((act, i) => (i === idx ? { ...act, [field]: value } : act));
    onChange({ ...data, actions: updated });
  };

  const removeAction = (idx) => {
    onChange({ ...data, actions: actions.filter((_, i) => i !== idx) });
  };

  // Roll damage with shake
  const triggerRoll = (idx) => {
    const act = actions[idx];
    const expr = `${act.dice}${act.mod >= 0 ? '+' : ''}${act.mod}`;
    setShakeIdx(idx);
    setTimeout(() => {
      setShakeIdx(null);
      const { rolls, modifier, total } = rollDice(expr);
      setModalData({ isOpen: true, title: act.name, rolls, modifier, total });
    }, 300);
  };

  const closeModal = () => setModalData(prev => ({ ...prev, isOpen: false }));

  // Reações
  const addReaction = () => {
    if (!newReaction.trim()) return;
    onChange({ ...data, reactions: [...reactions, { label: newReaction.trim() }] });
    setNewReaction('');
  };

  const updateReaction = (idx, value) => {
    const updated = reactions.map((rc, i) => (i === idx ? { label: value } : rc));
    onChange({ ...data, reactions: updated });
  };

  const removeReaction = (idx) => {
    onChange({ ...data, reactions: reactions.filter((_, i) => i !== idx) });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Ações Existentes */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Ações</h2>
          {actions.length > 0 ? (
            <div className="space-y-2 max-h-[30vh] overflow-auto">
              {actions.map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0"
                >
                  <Input value={actions[i].name} readOnly className="w-full sm:flex-1" />
                  <Input value={actions[i].dice} readOnly className="w-full sm:w-24" />
                  <Input
                    value={actions[i].mod}
                    readOnly
                    className="w-full sm:w-20"
                  />
                  <motion.button
                    onClick={() => triggerRoll(i)}
                    animate={shakeIdx === i ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-2 py-1 border rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Rolar Dano
                  </motion.button>
                  <Button variant="outline" onClick={() => removeAction(i)}>
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">Nenhuma ação adicionada.</p>
          )}

          {/* Formulário de Nova Ação */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
            <Input
              placeholder="Ex: Espada Curta"
              value={newAction.name}
              onChange={e => setNewAction(a => ({ ...a, name: e.target.value }))}
              className="w-full sm:flex-1"
            />
            <Input
              placeholder="1d6"
              value={newAction.dice}
              onChange={e => setNewAction(a => ({ ...a, dice: e.target.value }))}
              className="w-full sm:w-24"
            />
            <Input
              type="number"
              placeholder="Mod"
              value={newAction.mod}
              onChange={e => setNewAction(a => ({ ...a, mod: e.target.value }))}
              className="w-full sm:w-20"
            />
            <Button variant="default" onClick={addAction}>
              Adicionar Ação
            </Button>
          </div>
        </div>

        {/* Reações Existentes */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Reações</h2>
          {reactions.length > 0 ? (
            <div className="space-y-2 max-h-[25vh] overflow-auto">
              {reactions.map((rc, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Input
                    value={rc.label}
                    onChange={e => updateReaction(i, e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => removeReaction(i)}>
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">Nenhuma reação adicionada.</p>
          )}

          {/* Formulário de Nova Reação */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ex: Bloqueio 1"
              value={newReaction}
              onChange={e => setNewReaction(e.target.value)}
              className="flex-1"
            />
            <Button variant="default" onClick={addReaction}>
              Adicionar Reação
            </Button>
          </div>
        </div>
      </div>

      {/* Roll Modal */}
      <RollModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={`${modalData.title} Dano`}
        rolls={modalData.rolls}
        modifier={modalData.modifier}
        total={modalData.total}
      />
    </>
  );
}
