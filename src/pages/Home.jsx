// src/pages/Home.jsx
import React from 'react';
import { Card, CardContent } from '../components/ui/card';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo a Elaria</h1>

      <Card noOverflowHidden className="mb-6">
        <CardContent className="p-0 h-[80vh]"> {/* removemos padding extra */}
          <h2 className="text-2xl font-semibold px-4 py-2 border-b">Livro de Referência</h2>
          <div className="h-[80vh]"> 
            <iframe
              src="/ElariaRPG.pdf"
              className="w-full h-full"
              title="Livro de Referência"
            >
              Seu navegador não suporta exibição de PDF. 
              <a href="/ElariaRPG.pdf" target="_blank" rel="noopener">Baixe o PDF</a>
            </iframe>
          </div>
        </CardContent>
      </Card>

      {/* ... demais seções da Home ... */}
    </div>
  );
}
