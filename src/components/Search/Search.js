import React from "react";

import "./search.css";

const Search = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="form-control"
        placeholder="Search .. "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
