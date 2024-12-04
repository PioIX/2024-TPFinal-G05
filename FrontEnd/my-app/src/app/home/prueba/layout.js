"use client"
import Link from "next/link"

import Icon from "@/Components/Icon"
export default function RootLayout({ children }) {
  return (
    <div>
      <div>
        <Link href="/home"><Icon variant="Nav" srcImg="/images/GoBack.svg"></Icon></Link> {/* Dar estilos */}
      </div>
      {children}
    </div>
  )
}