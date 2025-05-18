import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import SheetDetail from './pages/SheetDetail';
import Home from './pages/Home';
import Create from './pages/Create';
import Sheets from './pages/Sheets';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Create />} />
            <Route path="sheets" element={<Sheets />} />
            <Route path="sheets/:id" element={<SheetDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
