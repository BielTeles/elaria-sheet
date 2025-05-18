// src/components/CharacterSheet.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RollModal from '../components/ui/RollModal';
import { rollAttribute } from '../utils/attributeRoller';
import { rollDice } from '../utils/diceRoller';

const SKILL_ORDER = [
  'Acrobacia', 'Adestrar', 'Arcana', 'Atletismo', 'Enganação', 'Engenhosidade',
  'Furtividade', 'Investigação', 'Intimidação', 'Medicina', 'Natureza',
  'Percepção', 'Performance', 'Persuasão', 'Religião', 'Sobrevivência'
];

// Mapeamento perícia → atributo base
const skillToAttribute = {
  Acrobacia: 'DES',
  Adestramento: 'CAR',
  Atletismo: 'FOR',
  Atuação: 'CAR',
  Bloqueio: 'CON',
  Cavalgar: 'DES',
  Conhecimento: 'INT',
  Cura: 'SAB',
  Diplomacia: 'CAR',
  Elemental: 'INT',
  Enganação: 'CAR',
  Esquiva: 'DES',
  Fortitude: 'CON',
  Furtividade: 'DES',
  Guerra: 'INT',
  Iniciativa: 'DES',
  Intimidação: 'CAR',
  Intuição: 'SAB',
  Investigação: 'INT',
  Jogatina: 'CAR',
  Ladinagem: 'DES',
  Misticismo: 'INT',
  Nobreza: 'INT',
  Percepção: 'SAB',
  Pontaria: 'DES',
  Reflexos: 'DES',
  Sobrevivência: 'SAB',
  Vontade: 'SAB'
};

export default function CharacterSheet({ sheet }) {
  if (!sheet) return null;

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    rolls: [],
    d20: null,
    degree: '',
    modifier: undefined,
    total: undefined,
  });

  // para saber qual botão está “shaking”
  const [shakeInfo, setShakeInfo] = useState({ type: '', idx: null });

  // modos de override
  const [attributeModes, setAttributeModes] = useState({});
  const [skillModes, setSkillModes] = useState({});

  const closeModal = () =>
    setModalData(md => ({ ...md, isOpen: false }));

  // ------ Handlers simplificados ------

  const handleAttributeRoll = (attr, val) => {
    const mode = attributeModes[attr] || 'normal';
    setShakeInfo({ type: 'attr', idx: attr });
    setTimeout(() => setShakeInfo({ type: '', idx: null }), 300);

    // 1) rola
    const { rolls, d20, degree } = rollAttribute(val, mode);
    console.log('Attribute roll', { attr, val, mode, rolls, d20, degree });
    // 2) abre modal
    setModalData({
      isOpen: true,
      title: `${attr} Teste`,
      rolls,
      d20,
      degree,
      modifier: undefined,
      total: undefined,
    });
  };

  // Skill roll (corrigido: não adiciona dados, apenas bônus)
const handleSkillRoll = (skill, lvl) => {
  const attr = skillToAttribute[skill];
  const attrVal = sheet.attributes[attr] ?? 0;
  const mode = skillModes[skill] || 'normal';

  // animação shake
  setShakeInfo({ type: 'skill', idx: skill });
  setTimeout(() => setShakeInfo({ type: '', idx: null }), 300);

  // Rola com base apenas no valor de atributo
  const { rolls, d20, degree } = rollAttribute(attrVal, mode);

  // Abre modal mantendo degree para sucesso/fracasso de perícia
  setModalData({
    isOpen: true,
    title: `${skill} Teste`,
    rolls,
    d20,
    degree,
    modifier: undefined,
    total: undefined,
  });
};


  const handleActionRoll = (act, i) => {
    const expr = `${act.dice}${act.mod >= 0 ? '+' : ''}${act.mod}`;
    setShakeInfo({ type: 'action', idx: i });
    setTimeout(() => setShakeInfo({ type: '', idx: null }), 300);

    const { rolls, modifier, total } = rollDice(expr);
    console.log('Action roll', { act, rolls, modifier, total });
    setModalData({
      isOpen: true,
      title: `${act.name} Dano`,
      rolls,
      d20: total,
      degree: '',
      modifier,
      total,
    });
  };

  // Controles de override
  const OverrideControls = ({ mode, onChange }) => (
    <div className="flex space-x-1 text-xs">
      <button
        onClick={() => onChange('normal')}
        className={mode === 'normal' ? 'font-semibold' : 'opacity-50'}
      >
        ●
      </button>
      <button
        onClick={() => onChange('adv')}
        className={mode === 'adv' ? 'text-green-600 font-semibold' : 'opacity-50'}
      >
        ▲
      </button>
      <button
        onClick={() => onChange('disadv')}
        className={mode === 'disadv' ? 'text-red-600 font-semibold' : 'opacity-50'}
      >
        ▼
      </button>
    </div>
  );

  return (
    <>
      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 rounded-lg shadow-card">
        <h1 className="text-2xl font-bold mb-2">{sheet.name}</h1>
        {/*  ——— Exibe Raça, Classe e Subclasse ——— */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm"></div>
          <div>
            <span className="font-semibold">Raça:</span>{' '}
            <span>{sheet.race || '—'}</span>
          </div>

          <div>
            <span className="font-semibold">Classe:</span>{' '}
            <span>{sheet.class || '—'}</span>
          </div>
          <div>
            <span className="font-semibold">Subclasse:</span>{' '}
            <span>{sheet.subclass || '—'}</span>
          </div>



        {/* Atributos */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          {Object.entries(sheet.attributes).map(([attr, val]) => (
            <div key={attr} className="text-center">
              <div className="font-mono text-lg">{attr}</div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-xl font-semibold">{val}</span>
                <OverrideControls
                  mode={attributeModes[attr] || 'normal'}
                  onChange={m =>
                    setAttributeModes(prev => ({ ...prev, [attr]: m }))
                  }
                />
                <motion.button
                  onClick={() => handleAttributeRoll(attr, val)}
                  animate={
                    shakeInfo.type === 'attr' && shakeInfo.idx === attr
                      ? { x: [0, -5, 5, -5, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="px-2 py-1 text-sm border rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  Rolar
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        {/* Perícias */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Perícias</h2>
          {sheet.skills &&
          Object.entries(sheet.skills).filter(([, lvl]) => lvl > 0).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(sheet.skills)
                .filter(([, lvl]) => lvl > 0)
                .map(([skill, lvl]) => (
                  <li
                    key={skill}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <span className="font-semibold">{skill}</span>{' '}
                      (Nível {lvl}, {skillToAttribute[skill]})
                    </div>
                    <div className="flex items-center space-x-2">
                      <OverrideControls
                        mode={skillModes[skill] || 'normal'}
                        onChange={m =>
                          setSkillModes(prev => ({ ...prev, [skill]: m }))
                        }
                      />
                      <motion.button
                        onClick={() => handleSkillRoll(skill, lvl)}
                        animate={
                          shakeInfo.type === 'skill' &&
                          shakeInfo.idx === skill
                            ? { x: [0, -5, 5, -5, 0] }
                            : { x: 0 }
                        }
                        transition={{ duration: 0.3 }}
                        className="px-2 py-1 text-sm border rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      >
                        🎲
                      </motion.button>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-neutral-500">Nenhuma perícia selecionada.</p>
          )}
        </section>

        {/* Ações (dano) */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ações</h2>
          {sheet.actions && sheet.actions.length > 0 ? (
            <ul className="space-y-2">
              {sheet.actions.map((act, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center"
                >
                  <span>
                    {act.name} ({act.dice}{act.mod >= 0 ? '+' : ''}
                    {act.mod})
                  </span>
                  <motion.button
                    onClick={() => handleActionRoll(act, idx)}
                    animate={
                      shakeInfo.type === 'action' &&
                      shakeInfo.idx === idx
                        ? { x: [0, -5, 5, -5, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="px-2 py-1 text-sm border rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Rolar Dano
                  </motion.button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">Nenhuma ação adicionada.</p>
          )}
        </section>

        {/* (Demais seções omitidas) */}
      </div>

      <RollModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        rolls={modalData.rolls}
        d20={modalData.d20}
        degree={modalData.degree}
        modifier={modalData.modifier}
        total={modalData.total}
      />
    </>
  );
}
