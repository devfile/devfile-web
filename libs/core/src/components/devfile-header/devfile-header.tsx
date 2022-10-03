import type { Devfile } from '../../functions';

export interface DevfileHeaderProps {
  devfile: Devfile;
}

export function DevfileHeader(props: DevfileHeaderProps): JSX.Element {
  const { devfile } = props;

  return (
    <div className="flex">
      <div className="mr-4 flex max-h-36 space-x-5 lg:min-w-[66%] lg:max-w-[66%]">
        <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center p-2 dark:rounded-md dark:bg-slate-200">
          {devfile.icon && (
            <img
              src={devfile.icon}
              alt={`${devfile.displayName} icon`}
              className="h-auto max-h-32 w-32"
            />
          )}
        </div>
        <div className="h-full overflow-y-auto">
          <div className="flex items-baseline">
            <h1 className="mr-2 text-2xl font-bold leading-8 text-slate-700 dark:text-sky-100">
              {devfile.displayName}
            </h1>
            <span className="hidden font-medium leading-6 text-slate-500 dark:text-slate-400 sm:block sm:text-sm">
              {devfile.provider && <span>by {devfile.provider}</span>} •{' '}
              {devfile.type && <span className="capitalize">{devfile.type}</span>}
            </span>
          </div>
          {devfile.provider && (
            <div className="mt-1 whitespace-nowrap text-sm font-medium leading-6 text-slate-500 dark:text-slate-400 sm:hidden">
              by {devfile.provider}
            </div>
          )}
          {devfile.type && (
            <div className="mt-1 text-sm font-medium capitalize leading-6 text-slate-500 dark:text-slate-400 sm:hidden">
              {devfile.type}
            </div>
          )}
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
            {devfile.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DevfileHeader;
