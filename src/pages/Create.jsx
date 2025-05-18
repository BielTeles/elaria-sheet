// src/pages/Create.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { loadSheet, saveSheet } from '../utils/storage';

import Stepper from '../components/CharacterWizard/Stepper';
import RaceStep from '../components/CharacterWizard/RaceStep';
import ClassStep from '../components/CharacterWizard/ClassStep';
import SubclassStep from '../components/CharacterWizard/SubclassStep';
import AttributeStep from '../components/CharacterWizard/AttributeStep';
import SkillStep from '../components/CharacterWizard/SkillStep';
import EquipmentStep from '../components/CharacterWizard/EquipmentStep';
import LoreStep from '../components/CharacterWizard/LoreStep';
import ActionsStep from '../components/CharacterWizard/ActionsStep';
import DescriptionPanel from '../components/DescriptionPanel';

import { races, classes, subclasses } from '../data/descriptions';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const stepLabels = [
  'Raça',
  'Classe',
  'Subclasse',
  'Atributos',
  'Perícias',
  'Equipamentos',
  'Lore',
  'Ações/Reações',
];

export default function Create({ onClose }) {
  const navigate = useNavigate();
  const { id: sheetId } = useParams();
  const isEdit = Boolean(sheetId);

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    race: null,
    class: null,
    subclass: null,
    attributes: { FOR: 0, DES: 0, CON: 0, INT: 0, SAB: 0, CAR: 0 },
    skills: {},
    equipment: [],
    lore: { origin: '', background: '' },
    actions: [],
    reactions: [],
  });
  const [descTitle, setDescTitle] = useState('');
  const [descText, setDescText] = useState('');

  useEffect(() => {
    if (isEdit) {
      const sheet = loadSheet(sheetId);
      if (sheet) setData(sheet);
    }
  }, [isEdit, sheetId]);

  const next = () => setCurrentStep((s) => Math.min(s + 1, stepLabels.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const updateField = (field, value) => setData((d) => ({ ...d, [field]: value }));
  const handleFinish = () => {
    const id = isEdit ? sheetId : uuidv4();
    saveSheet({ ...data, id });
    if (onClose) onClose();
    else navigate(`/sheets/${id}`);
  };

  const renderWithDescription = (component) => (
    <Card className="mb-6">
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <div>{component}</div>
          <div>
            <DescriptionPanel title={descTitle} text={descText} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSimple = (component) => (
    <Card className="mb-6">
      <CardContent>{component}</CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderWithDescription(
          <RaceStep
            selected={data.race}
            onSelect={(v) => {
              updateField('race', v);
              setDescTitle(v);
              setDescText(races[v]);
            }}
          />
        );
      case 1:
        return renderWithDescription(
          <ClassStep
            selected={data.class}
            onSelect={(v) => {
              updateField('class', v);
              updateField('subclass', null);
              setDescTitle(v);
              setDescText(classes[v]);
            }}
          />
        );
      case 2:
        return renderWithDescription(
          <SubclassStep
            parentClass={data.class}
            selected={data.subclass}
            onSelect={(v) => {
              updateField('subclass', v);
              const key = `${data.class} — ${v}`;
              setDescTitle(v);
              setDescText(subclasses[key]);
            }}
          />
        );
      case 3:
        return renderSimple(
          <AttributeStep values={data.attributes} onChange={(v) => updateField('attributes', v)} />
        );
      case 4:
        return renderSimple(
          <SkillStep skills={data.skills} onChange={(v) => updateField('skills', v)} />
        );
      case 5:
        return renderSimple(
          <EquipmentStep items={data.equipment} onChange={(v) => updateField('equipment', v)} />
        );
      case 6:
        return renderSimple(<LoreStep lore={data.lore} onChange={(v) => updateField('lore', v)} />);
      case 7:
        return renderSimple(<ActionsStep data={data} onChange={setData} />);
      default:
        return null;
    }
  };

  return (
    <div className="max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Ficha' : 'Nova Ficha'}</h1>

      <Card className="mb-4">
        <CardContent>
          <Stepper steps={stepLabels} current={currentStep} />
        </CardContent>
      </Card>

      {renderStep()}

      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
        <Button variant="outline" onClick={back} disabled={currentStep === 0}>
          ◀ Voltar
        </Button>
        {currentStep < stepLabels.length - 1 ? (
          <Button variant="default" onClick={next}>
            Avançar ▶
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleFinish}>
            {isEdit ? 'Salvar Alterações' : 'Concluir'}
          </Button>
        )}
      </div>
    </div>
  );
}
