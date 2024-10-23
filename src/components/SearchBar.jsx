import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";

import { mockSearchData } from "../mockSearchData";

export default function SearchBarContainer(props) {
  // States
  const [searchInput, setSearchInput] = useState("");

  // Event Handlers
  function handleChange({ target }) {
    setSearchInput(target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    props.setSearchResults(mockSearchData);
  }

  return (
    <section id="search-container">
      <form className={styles.search} onSubmit={handleSearch}>
        <input
          className={styles.searchBar}
          value={searchInput}
          onChange={handleChange}
        />
        <input className={styles.searchBtn} type="submit" value="Search" />
      </form>
    </section>
  );
}
