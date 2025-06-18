export default function App() {
  // …
}
// src/App.jsx

import React, { useState, useEffect } from "react";
import {
  getUniqueRefs,
  getColorsFor,
  getSizesFor,
  getStock
} from "./stockCsvApi";
import "./index.css";

export default function App() {
  const [refs, setRefs]             = useState([]);
  const [colors, setColors]         = useState([]);
  const [sizes, setSizes]           = useState([]);
  const [selectedRef, setRef]       = useState("");
  const [selectedColor, setColor]   = useState("");
  const [stockBySize, setStockBySize] = useState({});

  // 1. load references
  useEffect(() => {
    getUniqueRefs().then(setRefs);
  }, []);

  // 2. when reference changes, load colors
  useEffect(() => {
    if (!selectedRef) {
      setColors([]); setColor("");
      setSizes([]); setStockBySize({});
      return;
    }
    getColorsFor(selectedRef).then(cols => {
      setColors(cols);
      setColor("");
      setSizes([]); setStockBySize({});
    });
  }, [selectedRef]);

  // 3. when color changes, load sizes + stocks
  useEffect(() => {
    if (!selectedColor) {
      setSizes([]); setStockBySize({});
      return;
    }
    getSizesFor(selectedRef, selectedColor).then(szs => {
      setSizes(szs);
      Promise.all(
        szs.map(size =>
          getStock(selectedRef, selectedColor, size)
            .then(stock => ({ size, stock }))
        )
      ).then(results => {
        const map = {};
        results.forEach(({ size, stock }) => {
          map[size] = stock;
        });
        setStockBySize(map);
      });
    });
  }, [selectedColor, selectedRef]);

  return (
    <div className="app-container">
      <img
        src="/SPASSO_LOGO_PRINCIPAL.png"
        alt="Spasso logo"
        className="app-logo"
      />

      <h1 className="app-title">📦 Stock Checker</h1>

      <div className="selectors">
        <select
          value={selectedRef}
          onChange={e => setRef(e.target.value)}
        >
          <option value="">Select reference</option>
          {refs.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={selectedColor}
          onChange={e => setColor(e.target.value)}
          disabled={!colors.length}
        >
          <option value="">Select color</option>
          {colors.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="hero-image">
        <img src="/collection-lin.jpg" alt="Collection LIN" />
      </div>

      {sizes.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Size</th>
              <th style={{ textAlign: "right" }}>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map(size => (
              <tr key={size}>
                <td>{size}</td>
                <td style={{ textAlign: "right" }}>
                  {stockBySize[size] > 0 ? stockBySize[size] : "Out of stock"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
