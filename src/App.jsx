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
  const [refs, setRefs]         = useState([]);
  const [colors, setColors]     = useState([]);
  const [sizes, setSizes]       = useState([]);
  const [selectedRef, setRef]   = useState("");
  const [selectedColor, setColor] = useState("");
  const [stockBySize, setStockBySize] = useState({});

  useEffect(() => {
    getUniqueRefs().then(setRefs);
  }, []);

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
    <div style={{
      maxWidth: 480,
      margin: "2rem auto",
      padding: "1rem",
      textAlign: "center"
    }}>
      {/* … votre JSX (logo, titre, select, tableau) … */}
    </div>
  );
}
