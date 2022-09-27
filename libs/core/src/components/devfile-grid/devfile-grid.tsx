import clsx from 'clsx';
import { useSearchDevfiles } from '../../hooks';

export function DevfileGrid(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
): JSX.Element {
  const { className, ...rest } = props;

  const { devfiles } = useSearchDevfiles();

  return (
    <div className={clsx(className, 'my-4 sm:my-6 lg:mr-2')} {...rest}>
      <ul className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {devfiles.searchedLimited.map((devfile) => (
          <li
            key={`${devfile.name}-${devfile.devfileRegistry.name}`}
            className="col-span-1 rounded-lg border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex h-full flex-col justify-between p-6">
              <div className="flex">
                <div className="mr-4 flex-shrink-0 ">
                  {devfile.icon && (
                    <img
                      src={devfile.icon}
                      alt={`${devfile.displayName} icon`}
                      className="h-auto max-h-28 w-28 p-2 dark:rounded-md dark:bg-slate-200"
                    />
                  )}
                </div>
                <div className="grow">
                  <div className="flex justify-between">
                    <h4 className="line-clamp-2 text-lg font-medium tracking-tight text-slate-700 dark:text-sky-100">
                      {devfile.displayName}
                    </h4>
                    {devfile.type !== 'stack' && (
                      <h6 className="text-sm capitalize text-slate-500 dark:text-slate-400">
                        {devfile.type}
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
              </div>
              {devfile.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {devfile.tags.slice(0, 4).map((tag) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DevfileGrid;
