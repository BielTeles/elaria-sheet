// src/utils/attributeRoller.js

/**
 * Mapeia valor de atributo para thresholds de sucesso
 */
function getThresholds(attrValue) {
  const table = {
    1: { normal: 20, good: Infinity, extreme: Infinity },
    2: { normal: 19, good: 20, extreme: Infinity },
    3: { normal: 18, good: 20, extreme: Infinity },
    4: { normal: 17, good: 19, extreme: Infinity },
    5: { normal: 16, good: 19, extreme: 20 },
    6: { normal: 15, good: 18, extreme: 20 },
    7: { normal: 14, good: 18, extreme: 20 },
    8: { normal: 13, good: 17, extreme: 20 },
    9: { normal: 12, good: 17, extreme: 20 },
    10:{ normal: 11, good: 16, extreme: 19 },
    11:{ normal: 10, good: 16, extreme: 19 },
    12:{ normal: 9,  good: 15, extreme: 19 },
    13:{ normal: 8,  good: 15, extreme: 19 },
    14:{ normal: 7,  good: 14, extreme: 18 },
    15:{ normal: 6,  good: 14, extreme: 18 },
    16:{ normal: 5,  good: 13, extreme: 18 },
    17:{ normal: 4,  good: 13, extreme: 18 },
    18:{ normal: 3,  good: 12, extreme: 17 },
    19:{ normal: 2,  good: 12, extreme: 17 },
    20:{ normal: 2,  good: 11, extreme: 16 },
  };
  const v = Math.max(1, Math.min(20, attrValue));
  return table[v];
}

/**
 * Calcula quantos d20 rolar e se pega maior ou menor, sem override
 */
function baseDiceConfig(attrValue) {
  if (attrValue <= -1) return { numDice: 2, pickHighest: false };
  if (attrValue <= 1)  return { numDice: 1, pickHighest: true };
  if (attrValue <= 3)  return { numDice: 2, pickHighest: true };
  if (attrValue <= 5)  return { numDice: 3, pickHighest: true };
  if (attrValue <= 7)  return { numDice: 4, pickHighest: true };
  if (attrValue <= 9)  return { numDice: 5, pickHighest: true };
  if (attrValue <= 11) return { numDice: 6, pickHighest: true };
  return { numDice: 7, pickHighest: true };
}

/**
 * Rola um teste de atributo (d20) com possível override de vantagem/desvantagem
 * - override 'adv': +1 d20, pega o maior
 * - override 'disadv': se base.numDice == 1, +1 d20, pega o menor; caso contrário, usa base.numDice e pega o menor
 * - override 'normal': usa baseDiceConfig
 * @param {number} attrValue
 * @param {'normal'|'adv'|'disadv'} override
 * @returns {{ rolls: number[], d20: number, degree: string }}
 */
export function rollAttribute(attrValue, override = 'normal') {
  // Configuração base
  const base = baseDiceConfig(attrValue);
  let numDice = base.numDice;
  let pickHighest = base.pickHighest;

  // Aplica override
  if (override === 'adv') {
    numDice = base.numDice + 1;
    pickHighest = true;
  } else if (override === 'disadv') {
    // Add extra d20 only if base.numDice == 1
    if (base.numDice === 1) {
      numDice = 2;
    } // senão mantém numDice = base.numDice
    pickHighest = false;
  }

  // Rola os d20
  const rolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * 20) + 1);
  const d20 = pickHighest ? Math.max(...rolls) : Math.min(...rolls);

  // Determina grau de sucesso
  const { normal, good, extreme } = getThresholds(attrValue);
  let degree;
  if (d20 === 1) degree = 'Fracasso Extremo';
  else if (d20 >= extreme) degree = 'Sucesso Extremo';
  else if (d20 >= good)     degree = 'Sucesso Bom';
  else if (d20 >= normal)   degree = 'Sucesso Normal';
  else                        degree = 'Fracasso Normal';

  return { rolls, d20, degree };
}
