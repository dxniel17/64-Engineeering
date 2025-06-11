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
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Ersetze typische Verwechslungen (L/1 -> i)
function typoNormalize(str) {
  return normalizeModel(str).replace(/l/g, 'i').replace(/1/g, 'i');
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

// Levenshtein-Distanz für Fuzzy-Suche
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return matrix[a.length][b.length];
}

function getBestSuggestion(input) {
  let minDist = Infinity;
  let best = null;
  for (const model of tunableModels) {
    const dist = levenshtein(input, model);
    if (dist < minDist) {
      minDist = dist;
      best = model;
    }
  }
  // Vorschlag auch bei Distanz <= 4
  if (minDist > 0 && minDist <= 4) return best;
  return null;
}

app.post('/api/check-model', (req, res) => {
  const { model } = req.body;
  if (!model) {
    return res.status(400).json({ error: 'Bitte geben Sie ein Modell ein' });
  }
  const normalized = normalizeModel(model);
  const tokens = model.trim().split(/\s+/).map(normalizeModel).filter(Boolean);
  const combinations = getAllCombinations(tokens);

  let canBeTuned =
    tunableModels.includes(normalized) ||
    tokens.some(token => tunableModels.includes(token)) ||
    combinations.some(comb => tunableModels.includes(comb));

  return res.json({
    canBeTuned,
    showInstagram: canBeTuned,
    message: canBeTuned
      ? `✅ Dein Modell "${model}" kann getunt werden! Schreib uns auf Instagram 📲`
      : `❌ Leider können wir das Modell "${model}" derzeit nicht tunen.`
  });
});

app.listen(port, () => {
  console.log(`✅ Backend läuft unter http://localhost:${port}`);
}); 