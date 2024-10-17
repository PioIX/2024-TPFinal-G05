"use client"
import styles from "./futbolitosDraft.module.css"
export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"/>
        </head>
        <body className={styles.body}>
          <section className={styles.seccionSide}>
            <p>boca</p>
          </section>
          <section>
            {children}
          </section>
        </body>
      </html>
    )
  }