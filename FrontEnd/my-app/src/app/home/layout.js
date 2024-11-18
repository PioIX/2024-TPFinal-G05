"use clients"
import NavTop from "@/Estructuras/NavTop"
import styles from "./page.module.css"
import MusicPlayer from "@/Components/MusicPlayer"

export default function RootLayout({ children }) {
  return (
    <div>
      <MusicPlayer/>
      {children}
    </div>
    
  )
}
