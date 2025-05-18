// src/pages/SheetDetail.jsx
import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadSheet } from '../utils/storage';
import CharacterSheet from '../components/CharacterSheet';
import EditableCharacterSheet from '../components/EditableCharacterSheet';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function SheetDetail() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [sheet, setSheet] = useState(() => loadSheet(id));
  const sheetRef = useRef();

  if (!sheet) {
    return (
      <div className="max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-red-500">Ficha não encontrada.</p>
        <Link to="/sheets" className="text-blue-500 hover:underline">
          Voltar
        </Link>
      </div>
    );
  }

  const handleClose = () => {
    setSheet(loadSheet(id));
    setIsEditing(false);
  };

  // Gera PDF a partir do elemento referenciado
  const exportToPDF = async () => {
  if (!sheetRef.current) return;
  try {
    const canvasElement = await html2canvas(sheetRef.current, { scale: 2 });
    const imgData = canvasElement.toDataURL('image/png');
    const pdf = new jsPDF({
      unit: 'px',
      format: [canvasElement.width, canvasElement.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvasElement.width, canvasElement.height);
    pdf.save(`${sheet.name || 'ficha'}.pdf`);
  } catch (err) {
    console.error('Erro ao exportar PDF:', err);
  }
};




  return (
    <div className="max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <Card className="mb-4">
        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <Link to="/sheets" className="text-blue-500 hover:underline">
            ◀ Voltar às Fichas
          </Link>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}


          <Button variant="default" onClick={exportToPDF}>
            Exportar PDF
          </Button>

        </CardContent>
      </Card>

      {/* Content */}
      {isEditing ? (
        <EditableCharacterSheet initialSheet={sheet} onClose={handleClose} />
      ) : (
        // Referência ao card para captura de PDF
        <div ref={sheetRef}>
          <Card>
            <CardContent>
              <CharacterSheet sheet={sheet} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
