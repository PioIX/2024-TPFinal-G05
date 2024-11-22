"use client"
import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

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
    }, 10); // Animación más fluida con intervalo de 10ms
    return () => clearInterval(interval); // Limpiar intervalo en caso de que el componente se desmonte
  }, [value]);

  const radius = size / 2 - 10; // Radio del círculo, con margen para el grosor del borde
  const circumference = 2 * Math.PI * radius; // Circunferencia del círculo

  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 120 120" className={styles.circleWrapper}>
        {/* Círculo de fondo */}
        <circle
          className={styles.circleBackground}
          cx="60"
          cy="60"
          r={radius}
        />
        {/* Círculo de progreso */}
        <circle
          className={styles.circleProgress}
          cx="60"
          cy="60"
          r={radius}
          style={{
            strokeDasharray: strokeDasharray,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className={styles.percentageLabel}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
