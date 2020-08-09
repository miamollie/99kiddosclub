import { useState } from "react";

//usecallback, changes w F on each function (maybe?)
export function useFilters({ initialFilters = [] }) {
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  function toggle(f) {
    if (activeFilters.includes(f)) {
      console.log(f);
      setActiveFilters(activeFilters.filter((v) => v !== f));
    } else {
      setActiveFilters([...activeFilters, f]);
    }
  }

  function clearAll() {
    setActiveFilters([]);
  }

  function selectAll() {
    setActiveFilters(initialFilters);
  }

  function isActive(f) {
    return activeFilters.includes(f);
  }

  return { activeFilters, toggle, clearAll, selectAll, isActive };
}
