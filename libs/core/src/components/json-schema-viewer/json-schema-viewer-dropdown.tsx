import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import type { Dispatch, SetStateAction } from 'react';
import type { PropertyRestrictions } from './json-schema-viewer-element';

export interface JsonSchemaViewerDropdownProps {
  propertyRestrictions: PropertyRestrictions[];
  selectedPropertyRestriction?: PropertyRestrictions;
  setSelectedPropertyRestriction: Dispatch<SetStateAction<PropertyRestrictions | undefined>>;
  dropdownText: string;
  className?: string;
}

export function JsonSchemaViewerDropdown(props: JsonSchemaViewerDropdownProps): JSX.Element | null {
  const {
    className,
    dropdownText,
    propertyRestrictions,
    selectedPropertyRestriction,
    setSelectedPropertyRestriction,
  } = props;

  if (propertyRestrictions.length === 0) {
    return null;
  }

  return (
    <Listbox
      as="div"
      className={className}
      value={selectedPropertyRestriction}
      onChange={setSelectedPropertyRestriction}
    >
      <div className="relative">
        <Listbox.Label className="sr-only">{dropdownText}</Listbox.Label>
        <div className="flex items-center">
          <Listbox.Button className="flex h-6 w-auto items-center justify-between rounded-lg text-left text-sm font-medium text-slate-700 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-400 dark:ring-inset dark:ring-white/5">
            <span className="block truncate pl-2 pr-7 text-slate-700 dark:text-sky-100">
              {dropdownText}: <span>{selectedPropertyRestriction?.name ?? ''}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-700 dark:text-sky-100"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>

        <Listbox.Options className="absolute left-1/2 z-10 mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
          {propertyRestrictions.map((value) => (
            <Listbox.Option
              key={value.name}
              value={value}
              className={({ active }): string =>
                clsx('flex cursor-pointer select-none items-center rounded-[0.625rem] p-1', {
                  'text-devfile': value.name === selectedPropertyRestriction?.name,
                  'text-slate-900 dark:text-white':
                    active && value.name !== selectedPropertyRestriction?.name,
                  'text-slate-700 dark:text-slate-400':
                    !active && value.name !== selectedPropertyRestriction?.name,
                  'bg-slate-100 dark:bg-slate-900/40': active,
                })
              }
            >
              <div className="ml-1">{value.name}</div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default JsonSchemaViewerDropdown;
