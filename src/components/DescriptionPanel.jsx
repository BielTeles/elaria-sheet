// src/components/DescriptionPanel.jsx
import React from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';

export default function DescriptionPanel({ title, text }) {
  return (
    <Card>
      <CardHeader className="text-lg font-semibold">
        {title}
      </CardHeader>
      <CardContent className="text-sm whitespace-pre-line">
        {text}
      </CardContent>
    </Card>
  );
}
