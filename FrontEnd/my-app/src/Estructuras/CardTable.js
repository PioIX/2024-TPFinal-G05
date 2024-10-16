"use client"

import Card from "./Card"
import styles from "./CardTable.module.css"

export default function CardTable({Cadena}) {
    return (
        <div className = {styles.Desk}>
            {Cadena.map((jugador) => (
              <Card
                
              />
            ))}
        </div>
    )
}