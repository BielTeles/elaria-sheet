import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Layout() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="p-4 flex justify-between items-center shadow-md bg-gray-100 dark:bg-gray-800">
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/create" className="hover:underline">Nova Ficha</Link>
          <Link to="/sheets" className="hover:underline">Minhas Fichas</Link>
          <Link to="/settings" className="hover:underline">Configurações</Link>
        </nav>
        <button
          onClick={toggleTheme}
          className="px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="p-6">
        {/* Outlet renderiza a página atual */}
        <Outlet />
      </main>
    </div>
  );
}
