import React from "react";

const Filters = ({ filters, selectAll, clearAll, toggle, isActive }) => {
  if (!filters) return;
  return (
    <div className="buttons">
      <button className="button is-info is-rounded" onClick={selectAll}>
        Select all
      </button>

      {filters.map(({ fieldValue: t }) => (
        <button
          className={`button is-rounded ${isActive(t) && "is-selected"}`}
          onClick={() => toggle(t)}
          key={t}
        >
          {t}
        </button>
      ))}
      <button className="button is-rounded is-light" onClick={clearAll}>
        Clear
        <span className="icon is-small">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default Filters;
