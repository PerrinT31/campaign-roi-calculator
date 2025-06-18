// src/App.jsx
import React, { useState } from "react";

export default function App() {
  // ➊ États pour chaque champ
  const [budget, setBudget]         = useState(1000);
  const [cpl, setCpl]               = useState(10);
  const [tauxConversion, setTauxConversion] = useState(5);
  const [panierMoyen, setPanierMoyen]       = useState(50);
  const [resultats, setResultats]   = useState(null);

  // ➋ Fonction de calcul du ROI
  const calculerROI = () => {
    const leads            = budget / cpl;
    const ventes           = leads * (tauxConversion / 100);
    const chiffreAffaires  = ventes * panierMoyen;
    const pourcentageROI   = ((chiffreAffaires - budget) / budget) * 100;
    setResultats({
      leads,
      ventes,
      chiffreAffaires,
      pourcentageROI
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      {/* Titre */}
      <h2>📈 Simulateur de ROI Campagne</h2>

      {/* ➌ Formulaire en grille 2×2 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem"
      }}>
        {/* Budget */}
        <div>
          <label>Budget (€)</label>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(+e.target.value)}
          />
        </div>

        {/* Coût par lead */}
        <div>
          <label>Coût par lead (€)</label>
          <input
            type="number"
            value={cpl}
            onChange={e => setCpl(+e.target.value)}
          />
        </div>

        {/* Taux de conversion */}
        <div>
          <label>Taux de conversion (%)</label>
          <input
            type="number"
            value={tauxConversion}
            onChange={e => setTauxConversion(+e.target.value)}
          />
        </div>

        {/* Panier moyen */}
        <div>
          <label>Panier moyen (€)</label>
          <input
            type="number"
            value={panierMoyen}
            onChange={e => setPanierMoyen(+e.target.value)}
          />
        </div>
      </div>

      {/* Bouton de lancement */}
      <button onClick={calculerROI}>
        Calculer
      </button>

      {/* ➍ Affichage des résultats */}
      {resultats && (
        <div className="result">
          <div><strong>Leads estimés :</strong> {Math.round(resultats.leads)}</div>
          <div><strong>Ventes estimées :</strong> {Math.round(resultats.ventes)}</div>
          <div><strong>CA projeté :</strong> €{resultats.chiffreAffaires.toFixed(2)}</div>
          <div>
            <strong>ROI :</strong> {resultats.pourcentageROI.toFixed(1)} %
          </div>
        </div>
      )}
    </div>
  );
}
