"use client"
import NavTop from "@/Estructuras/NavTop"
import styles from "./page.module.css"

export default function RootLayout({ children }) {
    return (
      <div>
        <NavTop></NavTop>
        {children}
      </div>
      
    )
}