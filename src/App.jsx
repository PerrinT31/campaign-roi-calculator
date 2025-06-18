// src/App.jsx

import React, { useState } from "react";

export default function App() {
  // ➊ États pour chaque champ du formulaire
  const [budget, setBudget]               = useState(1000);
  const [cpl, setCpl]                     = useState(10);
  const [tauxConversion, setTauxConversion] = useState(5);
  const [panierMoyen, setPanierMoyen]     = useState(50);
  const [resultats, setResultats]         = useState(null);

  // ➋ Fonction de calcul du ROI
  const calculerROI = () => {
    const leads           = budget / cpl;
    const ventes          = leads * (tauxConversion / 100);
    const chiffreAffaires = ventes * panierMoyen;
    const pourcentROI     = ((chiffreAffaires - budget) / budget) * 100;

    setResultats({
      leads,
      ventes,
      chiffreAffaires,
      pourcentROI
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      {/* ➌ Titre */}
      <h2>📈 Simulateur de ROI Campagne</h2>

      {/* ➍ Formulaire 2×2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem"
        }}
      >
        <div>
          <label>Budget (€)</label>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(+e.target.value)}
          />
        </div>

        <div>
          <label>Coût par lead (€)</label>
          <input
            type="number"
            value={cpl}
            onChange={e => setCpl(+e.target.value)}
          />
        </div>

        <div>
          <label>Taux de conversion (%)</label>
          <input
            type="number"
            value={tauxConversion}
            onChange={e => setTauxConversion(+e.target.value)}
          />
        </div>

        <div>
          <label>Panier moyen (€)</label>
          <input
            type="number"
            value={panierMoyen}
            onChange={e => setPanierMoyen(+e.target.value)}
          />
        </div>
      </div>

      {/* ➎ Bouton */}
      <button onClick={calculerROI}>Calculer</button>

      {/* ➏ Résultats + explication */}
      {resultats && (
        <div className="result">
          <p><strong>Leads estimés :</strong> {Math.round(resultats.leads)}</p>
          <p><strong>Ventes estimées :</strong> {Math.round(resultats.ventes)}</p>
          <p><strong>CA projeté :</strong> €{resultats.chiffreAffaires.toFixed(2)}</p>
          <p><strong>ROI projeté :</strong> {resultats.pourcentROI.toFixed(1)} %</p>

          <p style={{
            marginTop: "1rem",
            fontStyle: "italic",
            color: "#555"
          }}>
            Ces chiffres sont des estimations basées sur un coût par lead 
            et un taux de conversion fixes. Ajustez les valeurs pour simuler 
            différents scénarios.
          </p>
        </div>
      )}
    </div>
  );
}
