import clsx from 'clsx';
import { DevfileFilter } from './devfile-filter';
import { useSearchDevfiles } from '../../hooks';

export interface DevfileFiltersProps {
  className?: string;
}

export function DevfileFilters(props: DevfileFiltersProps): JSX.Element {
  const { className } = props;

  const { query, dispatch } = useSearchDevfiles();

  return (
    <div className={clsx(className, 'my-6 hidden lg:block')}>
      <h1 className="ml-2 text-xl font-semibold text-slate-700 dark:text-sky-100">Filter by</h1>
      <DevfileFilter
        name="Registries"
        filterElements={query.registries}
        onFilter={(filterElement): void =>
          dispatch({
            type: 'FILTER_ON',
            property: 'registries',
            payload: filterElement,
            resetPage: true,
          })
        }
      />
      <DevfileFilter
        name="Tags"
        filterElements={query.tags}
        onFilter={(filterElement): void =>
          dispatch({ type: 'FILTER_ON', property: 'tags', payload: filterElement, resetPage: true })
        }
      />
      <DevfileFilter
        name="Types"
        capitalize
        filterElements={query.types}
        onFilter={(filterElement): void =>
          dispatch({
            type: 'FILTER_ON',
            property: 'types',
            payload: filterElement,
            resetPage: true,
          })
        }
      />
      <DevfileFilter
        name="Providers"
        filterElements={query.providers}
        onFilter={(filterElement): void =>
          dispatch({
            type: 'FILTER_ON',
            property: 'providers',
            payload: filterElement,
            resetPage: true,
          })
        }
      />
      <DevfileFilter
        name="Languages"
        filterElements={query.languages}
        onFilter={(filterElement): void =>
          dispatch({
            type: 'FILTER_ON',
            property: 'languages',
            payload: filterElement,
            resetPage: true,
          })
        }
      />
    </div>
  );
}

export default DevfileFilters;
