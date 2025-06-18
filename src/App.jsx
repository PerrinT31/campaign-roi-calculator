// src/App.jsx

import React, { useState } from "react";

export default function App() {
  const [budget, setBudget]       = useState(1000);
  const [cpl, setCpl]             = useState(10);
  const [convRate, setConvRate]   = useState(5);
  const [avgOrder, setAvgOrder]   = useState(50);
  const [results, setResults]     = useState(null);

  const calculate = () => {
    const leads      = budget / cpl;
    const sales      = leads * (convRate / 100);
    const revenue    = sales * avgOrder;
    const roiPercent = ((revenue - budget) / budget) * 100;
    setResults({ leads, sales, revenue, roiPercent });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <h2
        style={{
          fontFamily: "Montserrat Alternates, sans-serif",
          fontWeight: 700,
          fontSize: "36pt",
          textAlign: "center",
          margin: "2rem 0 1rem"
        }}
      >
        📈 Campaign ROI Calculator
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label>Budget (€)</label>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(+e.target.value)}
            style={{ width: "100%", fontSize: "18pt", fontWeight: 700, padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Cost per Lead (€)</label>
          <input
            type="number"
            value={cpl}
            onChange={e => setCpl(+e.target.value)}
            style={{ width: "100%", fontSize: "18pt", fontWeight: 700, padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Conversion Rate (%)</label>
          <input
            type="number"
            value={convRate}
            onChange={e => setConvRate(+e.target.value)}
            style={{ width: "100%", fontSize: "18pt", fontWeight: 700, padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Average Order (€)</label>
          <input
            type="number"
            value={avgOrder}
            onChange={e => setAvgOrder(+e.target.value)}
            style={{ width: "100%", fontSize: "18pt", fontWeight: 700, padding: "0.5rem" }}
          />
        </div>
      </div>

      <button
        onClick={calculate}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          fontSize: "18pt",
          fontWeight: 700,
          backgroundColor: "#005A9C",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Calculate
      </button>

      {results && (
        <div style={{ marginTop: "2rem", fontSize: "18pt", lineHeight: 1.4 }}>
          <div><strong>Estimated Leads:</strong> {Math.round(results.leads)}</div>
          <div><strong>Estimated Sales:</strong> {Math.round(results.sales)}</div>
          <div><strong>Projected Revenue:</strong> €{results.revenue.toFixed(2)}</div>
          <div><strong>ROI:</strong> {results.roiPercent.toFixed(1)} %</div>
        </div>
      )}
    </div>
  );
}
