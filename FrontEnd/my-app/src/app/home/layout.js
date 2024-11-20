"use clients"
import NavTop from "@/Estructuras/NavTop"
import styles from "./page.module.css"
import MusicPlayer from "@/Components/MusicPlayer"
import Link from "next/link"
import Icon from "@/Components/Icon"

export default function RootLayout({ children }) {
  return (
    <div>
      
      <MusicPlayer/>
      {children}
    </div>
    
  )
}
