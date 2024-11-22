"use client";
import React, { useState, useEffect } from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ value, size = 150 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < value) {
        counter++;
        setProgress(counter);
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [value]);

  const strokeWidth = 10; // Ancho de la barra
  const radius = size / 2 - strokeWidth; // Radio dinámico
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={styles.container}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.circleWrapper}
      >
        {/* Fondo */}
        <circle
          className={styles.circleBackground}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{ strokeWidth }}
        />
        {/* Progreso */}
        <circle
          className={styles.circleProgress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{
            strokeWidth,
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      <div className={styles.percentageLabel}>{progress}%</div>
    </div>
  );
};

export default ProgressBar;
