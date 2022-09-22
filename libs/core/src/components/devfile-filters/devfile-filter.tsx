import clsx from 'clsx';
import { useState, useId } from 'react';
import type { FilterElement } from '../../hooks';

export interface DevfileFilterProps {
  name: string;
  capitalize?: boolean;
  filterElements: FilterElement[];
  onFilter: (filterElements: FilterElement[]) => void;
}

const checkboxesToDisplay = 5;

export function DevfileFilter(props: DevfileFilterProps): JSX.Element | null {
  const { name, capitalize, filterElements, onFilter } = props;

  const [seeMore, setSeeMore] = useState<boolean>(false);
  const id = useId();

  if (filterElements.length <= 1) {
    return null;
  }

  return (
    <fieldset className="my-5">
      <legend className="ml-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-sky-100">
        {name}
      </legend>
      <ul className={clsx(seeMore && 'h-80 overflow-x-auto')}>
        {filterElements
          .slice(0, seeMore ? filterElements.length : checkboxesToDisplay)
          .map((filterElement) => (
            <li
              key={filterElement.name}
              className="relative flex w-fit items-center whitespace-nowrap"
            >
              <div className="flex h-5 items-center">
                <input
                  id={filterElement.name + id}
                  name={filterElement.name}
                  type="checkbox"
                  checked={filterElement.checked}
                  onChange={(event): void => {
                    const newFilterElements = filterElements.map((_filterElement) => {
                      if (_filterElement.name === event.target.name) {
                        return { ...filterElement, checked: event.target.checked };
                      }
                      return _filterElement;
                    });
                    onFilter(newFilterElements);
                  }}
                  className="text-devfile focus:ring-devfile/80 ml-2 h-4 w-4 rounded border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={filterElement.name + id}
                  className={clsx(
                    capitalize && 'capitalize',
                    'text-base text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
                  )}
                >
                  {filterElement.name}
                </label>
              </div>
            </li>
          ))}
      </ul>
      {filterElements.length >= checkboxesToDisplay && (
        <div className="text-devfile mt-2 ml-2">
          {!seeMore && (
            <button type="button" onClick={(): void => setSeeMore(true)}>
              See more
            </button>
          )}
          {seeMore && (
            <button type="button" onClick={(): void => setSeeMore(false)}>
              See less
            </button>
          )}
        </div>
      )}
    </fieldset>
  );
}

export default DevfileFilter;
