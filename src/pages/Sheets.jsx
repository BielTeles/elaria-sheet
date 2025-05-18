import React, { useEffect, useState } from 'react';
import { loadSheets, deleteSheet } from '../utils/storage';
import { Link } from 'react-router-dom';

export default function Sheets() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    setSheets(loadSheets());
  }, []);

  const handleDelete = (id) => {
    deleteSheet(id);
    setSheets(loadSheets());
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Minhas Fichas</h1>
      {sheets.length === 0 && <p>Nenhuma ficha salva.</p>}
      <ul className="space-y-2">
        {sheets.map(s => (
          <li key={s.id} className="flex justify-between items-center border rounded p-2">
            <Link to={`/sheets/${s.id}`} className="font-medium hover:underline">
              {s.name || `${s.race} ${s.class}`}
            </Link>
            <button
              onClick={() => handleDelete(s.id)}
              className="px-2 py-1 text-red-600 border border-red-600 rounded"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
