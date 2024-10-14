"use client"

import Card from "./Card"

export default function CardTable(Cadena) {
    return (
        <div>
            {Cadena.map((jugador) => (
              <Card
                
              />
            ))}
        </div>
    )
}