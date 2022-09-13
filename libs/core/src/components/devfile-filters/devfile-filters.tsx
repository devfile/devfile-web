import { DevfileFilter } from './devfile-filter';
import { useSearchDevfiles } from '../../hooks';

export interface DevfileFiltersProps {
  className?: string;
}

export function DevfileFilters(props: DevfileFiltersProps): JSX.Element {
  const { className } = props;
  const { query, dispatch } = useSearchDevfiles();

  return (
    <div className={className}>
      <DevfileFilter
        name="Registries"
        filterElements={query.registries}
        onFilter={(filterElement): void =>
          dispatch({ type: 'FILTER_ON_REGISTRIES', payload: filterElement })
        }
      />
      <DevfileFilter
        name="Tags"
        filterElements={query.tags}
        onFilter={(filterElement): void =>
          dispatch({ type: 'FILTER_ON_TAGS', payload: filterElement })
        }
      />
      <DevfileFilter
        name="Types"
        capitalize
        filterElements={query.types}
        onFilter={(filterElement): void =>
          dispatch({ type: 'FILTER_ON_TYPES', payload: filterElement })
        }
      />
      <DevfileFilter
        name="Providers"
        filterElements={query.providers}
        onFilter={(filterElement): void =>
          dispatch({ type: 'FILTER_ON_PROVIDERS', payload: filterElement })
        }
      />
      <DevfileFilter
        name="Languages"
        filterElements={query.languages}
        onFilter={(filterElement): void =>
          dispatch({ type: 'FILTER_ON_LANGUAGES', payload: filterElement })
        }
      />
    </div>
  );
}

export default DevfileFilters;
