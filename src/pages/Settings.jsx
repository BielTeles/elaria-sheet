// src/pages/Settings.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { loadSheets, deleteSheet } from '../utils/storage';  // para contar quantas fichas existem

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [sheetCount, setSheetCount] = useState(loadSheets().length);
  const [message, setMessage] = useState('');

  const handleClear = () => {
  if (!window.confirm('Tem certeza de que quer apagar todas as fichas?')) return;

  // carrega todas as fichas salvas
  const sheets = loadSheets();
  // apaga cada uma pelo ID
  sheets.forEach(s => deleteSheet(s.id));

  // atualiza o contador e mensagem de feedback
  setSheetCount(0);
  setMessage('Todas as fichas foram apagadas.');
};

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      {/* Botão de tema */}
      <div className="mb-6">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === 'light' ? 'Ativar Dark Mode' : 'Ativar Light Mode'}
        </button>
      </div>

      {/* Contagem de fichas salvas */}
      <p className="mb-4">Você tem <strong>{sheetCount}</strong> ficha(s) salva(s).</p>

      {/* Botão para limpar todas */}
      <div className="mb-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Limpar todas as fichas
        </button>
      </div>

      {/* Feedback ao usuário */}
      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}
    </div>
  );
}