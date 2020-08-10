import React from "react";

const Filters = ({ filters, selectAll, clearAll, toggle, isActive }) => {
  if (!filters) return;
  return (
    <div className="buttons">
      <button className="button is-rounded" onClick={selectAll}>
        Select all
      </button>
      {/* TODO should have FA tick icon when selected */}
      {filters.map(({ fieldValue: t }) => (
        <button
          className={`button is-rounded is-light ${
            isActive(t) ? "is-primary" : ""
          }`}
          onClick={() => toggle(t)}
          key={t}
        >
          {t}
        </button>
      ))}
      <button className="button is-rounded is-light" onClick={clearAll}>
        Clear
      </button>
    </div>
  );
};

export default Filters;
