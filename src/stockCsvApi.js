// src/stockCsvApi.js

// 1) URL du CSV que vous avez mis dans public/
const CSV_URL = "/SPASSO_STOCKWEB_SP.csv";

let cache = null;

// Charge et parse le CSV une seule fois
async function loadCsv() {
  if (cache) return cache;
  const res  = await fetch(CSV_URL);
  const text = await res.text();

  // On splitte par ligne, on ignore l'en-tête, et on nettoie
  const rows = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter((l, i) => l && i > 0); // i>0 pour sauter la première ligne d'en-tête

  // On mappe chaque ligne en objet
  cache = rows.map(line => {
    // [REF, DESIGNATION, COLOR, SIZE, QUANTITY]
    const [ref_catalog, , color, size, qty] = line.split(";");
    return {
      ref_catalog,
      color,
      size,
      stock: parseInt(qty, 10) || 0
    };
  });

  return cache;
}

// 2) Export des fonctions utilisées par App.jsx

/** Retourne la liste de toutes les références uniques */
export async function getUniqueRefs() {
  const data = await loadCsv();
  return Array.from(new Set(data.map(item => item.ref_catalog)));
}

/** Pour une référence donnée, retourne toutes les couleurs */
export async function getColorsFor(ref) {
  const data = await loadCsv();
  return Array.from(
    new Set(
      data
        .filter(item => item.ref_catalog === ref)
        .map(item => item.color)
    )
  );
}

/** Pour ref + couleur, retourne toutes les tailles */
export async function getSizesFor(ref, color) {
  const data = await loadCsv();
  return Array.from(
    new Set(
      data
        .filter(item => item.ref_catalog === ref && item.color === color)
        .map(item => item.size)
    )
  );
}

/** Pour ref + couleur + taille, retourne le stock */
export async function getStock(ref, color, size) {
  const data  = await loadCsv();
  const found = data.find(
    item =>
      item.ref_catalog === ref &&
      item.color       === color &&
      item.size        === size
  );
  return found ? found.stock : 0;
}

