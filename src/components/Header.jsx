import React from "react";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header id="header-container" className={styles.header}>
      <h1 className={styles.title}>
        Ja<span>mmm</span>ing
      </h1>
    </header>
  );
}
