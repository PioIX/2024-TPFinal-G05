"use client"
import Link from "next/link"
import styles from "./page.module.css"
import Icon from "@/Components/Icon"
export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}