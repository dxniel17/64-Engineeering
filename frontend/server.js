const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Liste aller tunbaren Modelle inkl. Kurzformen und Synonyme
const tunableModels = [
  // Xiaomi
  'xiaomim365', 'm365',
  'xiaomipro', 'pro',
  'xiaomipro2', 'pro2',
  'xiaomi1s', '1s',
  'xiaomiessential', 'essential',
  'xiaomimi3', 'mi3',
  'xiaomi4pro2generation', '4pro2', '4pro',
  // Segway Ninebot
  'segwayninebotg30max', 'g30max', 'g30',
  'segwayninebotes1', 'es1',
  'segwayninebotes2', 'es2',
  'segwayninebotes3', 'es3',
  'segwayninebotes4', 'es4',
  'segwayninebote20', 'e20',
  'segwayninebote25', 'e25',
  'segwayninebote45', 'e45',
  'segwayninebotd18', 'd18',
  'segwayninebotd28', 'd28',
  'segwayninebotd38', 'd38',
  'segwayninebotp100', 'p100',
  'segwayninebotp65', 'p65',
  'segwayninebotgt1', 'gt1',
  'segwayninebotgt2', 'gt2',
  'segwayninebotg65', 'g65',
  'segwayninebotg2', 'g2',
  'segwayninebotf65', 'f65',
  'segwayninebotf2', 'f2',
  'segwayninebotf2plus', 'f2plus',
  'segwayninebotf2pro', 'f2pro',
  'segwayninebote2', 'e2',
  'segwayninebote2plus', 'e2plus',
  'segwayninebotf25', 'f25',
  'segwayninebotf40', 'f40',
  'segwayninebotzt3pro', 'zt3pro',
  'segwayninebotg3', 'g3',
  'segwayninebotf3', 'f3',
  'segwayninebotf3pro', 'f3pro'
];

// Hilfsfunktion: Vereinheitlicht Modellnamen (klein, keine Leerzeichen/Sonderzeichen)
function normalizeModel(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

// Hilfsfunktion: Alle Kombinationen der Tokens erzeugen
function getAllCombinations(tokens) {
  const results = [];
  const n = tokens.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      results.push(tokens.slice(i, j).join(''));
    }
  }
  return results;
}

app.post('/api/check-model', (req, res) => {
  const { model } = req.body;
  if (!model) {
    return res.status(400).json({ error: 'Bitte geben Sie ein Modell ein' });
  }
  const normalized = normalizeModel(model);
  const tokens = model.split(/\s+/).map(normalizeModel).filter(Boolean);
  const combinations = getAllCombinations(tokens);
  // Prüfe: 1. Gesamte Eingabe, 2. Einzelne Tokens, 3. Alle Kombinationen
  const canBeTuned =
    tunableModels.includes(normalized) ||
    tokens.some(token => tunableModels.includes(token)) ||
    combinations.some(comb => tunableModels.includes(comb));
  res.json({
    canBeTuned,
    showInstagram: canBeTuned,
    message: canBeTuned
      ? `Das Modell "${model}" kann getunt werden! Kontaktiere uns direkt über Instagram für dein individuelles Angebot.`
      : `Leider können wir das Modell "${model}" aktuell nicht tunen.`
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
}); 