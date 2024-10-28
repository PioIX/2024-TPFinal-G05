"use client"
import Link from "next/link"
import styles from "./page.module.css"
import Icon from "@/Components/Icon"
export default function RootLayout({ children }) {
  return (
    <div>
      <div className={styles.divLogOut}>
        <Link href="/home"><Icon variant="Nav" srcImg="/images/GoBack.svg"></Icon></Link> {/* Dar estilos */}
      </div>
      {children}
    </div>
  )
}