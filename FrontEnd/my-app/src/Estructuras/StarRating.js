"use client"

import React from 'react';
import Rating from '@mui/material/Rating'; // Importar desde @mui/material
import Box from '@mui/material/Box'; // Importar desde @mui/material

export default function StarRating({ rating }) {
  // Lógica para determinar la cantidad de estrellas en función del rating
  let estrellas = 0;

  if (rating >= 1 && rating <= 35) {
    estrellas = 1;
  } else if (rating > 35 && rating <= 55) {
    estrellas = 2;
  } else if (rating > 55 && rating <= 65) {
    estrellas = 3;
  } else if (rating > 65 && rating <= 85) {
    estrellas = 4;
  } else if (rating > 85 && rating <= 100) {
    estrellas = 5;
  }

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={estrellas} readOnly />
      </Box>
    </div>
  );
}
