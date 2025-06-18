// src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [budget, setBudget]         = useState(1000);
  const [cpl, setCpl]               = useState(10);
  const [convRate, setConvRate]     = useState(5);
  const [avgOrder, setAvgOrder]     = useState(50);
  const [results, setResults]       = useState(null);

  const calculate = () => {
    const leads      = budget / cpl;
    const sales      = leads * (convRate / 100);
    const revenue    = sales * avgOrder;
    const roiPercent = ((revenue - budget) / budget) * 100;
    setResults({ leads, sales, revenue, roiPercent });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <h2>📈 Campaign ROI Calculator</h2>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <label>Budget (€)</label>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(+e.target.value)}
          />
        </div>
        <div>
          <label>Cost per Lead (€)</label>
          <input
            type="number"
            value={cpl}
            onChange={e => setCpl(+e.target.value)}
          />
        </div>
        <div>
          <label>Conversion Rate (%)</label>
          <input
            type="number"
            value={convRate}
            onChange={e => setConvRate(+e.target.value)}
          />
        </div>
        <div>
          <label>Average Order (€)</label>
          <input
            type="number"
            value={avgOrder}
            onChange={e => setAvgOrder(+e.target.value)}
          />
        </div>
      </div>
      <button onClick={calculate}>Calculate</button>

      {results && (
        <div className="result">
          <div><strong>Estimated Leads:</strong> {Math.round(results.leads)}</div>
          <div><strong>Estimated Sales:</strong> {Math.round(results.sales)}</div>
          <div><strong>Projected Revenue:</strong> €{results.revenue.toFixed(2)}</div>
          <div><strong>ROI:</strong> {results.roiPercent.toFixed(1)} %</div>
        </div>
      )}
    </div>
  );
}
