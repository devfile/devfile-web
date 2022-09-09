import { useSearchDevfiles } from '../../hooks';

export function DevfileGrid(): JSX.Element {
  const { limitedSearchedDevfiles } = useSearchDevfiles();

  return (
    <div className="my-6">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {limitedSearchedDevfiles.map((devfile) => (
          <li
            key={`${devfile.name}-${devfile.devfileRegistry.name}`}
            className="col-span-1 divide-y divide-gray-200 rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800 lg:h-56"
          >
            <div className="flex h-full p-6">
              <div className="mr-4 flex-shrink-0 ">
                {devfile.icon && (
                  <img
                    src={devfile.icon}
                    alt={`${devfile.displayName} icon`}
                    className="h-auto max-h-28 w-28 p-2 dark:rounded-md dark:bg-slate-200"
                  />
                )}
              </div>
              <div className="flex w-full flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h4 className="line-clamp-2 text-lg font-medium tracking-tight text-slate-700 dark:text-sky-100">
                      {devfile.displayName}
                    </h4>
                    {devfile.type !== 'stack' && (
                      <h6 className="text-sm text-slate-500 dark:text-slate-400">
                        {capitalize(devfile.type)}
                      </h6>
                    )}
                  </div>
                  {devfile.provider && (
                    <h6 className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      by {devfile.provider}
                    </h6>
                  )}
                  <p className="line-clamp-3 mt-1 text-base leading-6 text-slate-500 dark:text-slate-400">
                    {devfile.description}
                  </p>
                </div>

                {devfile.tags && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {devfile.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-devfile/10 dark:bg-devfile/20 text-devfile inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default DevfileGrid;
