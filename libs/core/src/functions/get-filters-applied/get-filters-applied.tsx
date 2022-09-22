import { FilterElement } from '../../hooks';

export function getFiltersApplied(filters: FilterElement[][]): number {
  return filters.reduce(
    (acc, filter) => acc + filter.filter((filterElement) => filterElement.checked).length,
    0,
  );
}

export default getFiltersApplied;
