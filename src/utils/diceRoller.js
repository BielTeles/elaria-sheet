// src/utils/diceRoller.js

/**
 * Rola uma expressão de dado no formato XdY+Z (Z opcional).
 * Exemplo: "3d8+2", "1d20", "4d6-1"
 * @param {string} expr - expressão de dado
 * @returns {{ rolls: number[], modifier: number, total: number }}
 */
export function rollDice(expr, override) {
  const sanitized = expr.replace(/\s+/g, '');
  const regex = /^(\d+)d(\d+)([+-]\d+)?$/i;
  const match = sanitized.match(regex);
  if (!match) {
    throw new Error(`Expressão inválida: "${expr}". Use XdY±Z.`);
  }

  const [, qtyStr, facesStr, modStr] = match;
  const qty = parseInt(qtyStr, 10);
  const faces = parseInt(facesStr, 10);
  const modifier = modStr ? parseInt(modStr, 10) : 0;

  const rolls = [];
  for (let i = 0; i < qty; i++) {
    rolls.push(Math.floor(Math.random() * faces) + 1);
  }

  const sum = rolls.reduce((a, b) => a + b, 0);
  const total = sum + modifier;

  return { rolls, modifier, total };
}
