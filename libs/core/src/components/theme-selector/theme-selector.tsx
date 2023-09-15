/**
 * Copyright Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import {
  SunIcon as LightIcon,
  MoonIcon as DarkIcon,
  ComputerDesktopIcon as SystemIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';

export interface Theme {
  name: string;
  value: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface ThemeSelectorProps {
  className?: string;
  isRightAligned?: boolean;
}

const themes = [
  { name: 'Light', value: 'light', icon: LightIcon },
  { name: 'Dark', value: 'dark', icon: DarkIcon },
  { name: 'System', value: 'system', icon: SystemIcon },
];

export function ThemeSelector(props: ThemeSelectorProps): JSX.Element {
  const { className, isRightAligned } = props;

  const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>();

  useEffect(() => {
    if (selectedTheme) {
      // @ts-ignore dot notation is better
      document.documentElement.dataset.theme = selectedTheme.value;
    } else {
      setSelectedTheme(
        // @ts-ignore dot notation is better
        themes.find((theme) => theme.value === document.documentElement.dataset.theme),
      );
    }
  }, [selectedTheme]);

  return (
    <Listbox as="div" value={selectedTheme} onChange={setSelectedTheme} className={className}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button
        className="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
        aria-label={selectedTheme?.name}
      >
        <LightIcon className="hidden h-4 w-4 fill-sky-400 [[data-theme=light]_&]:block" />
        <DarkIcon className="hidden h-4 w-4 fill-sky-400 [[data-theme=dark]_&]:block" />
        <LightIcon className="hidden h-4 w-4 fill-slate-400 [:not(.dark)[data-theme=system]_&]:block" />
        <DarkIcon className="hidden h-4 w-4 fill-slate-400 [.dark[data-theme=system]_&]:block" />
      </Listbox.Button>
      <Listbox.Options
        className={clsx(
          isRightAligned ? 'right-0' : 'left-1/2 -translate-x-1/2',
          'absolute top-full mt-3 w-36  space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5',
        )}
      >
        {themes.map((theme) => (
          <Listbox.Option
            key={theme.value}
            value={theme}
            className="ui-selected:text-devfile ui-active:ui-not-selected:text-slate-900 ui-active:ui-not-selected:dark:text-white ui-not-active:ui-not-selected:text-slate-700 ui-not-active:ui-not-selected:dark:text-slate-400 ui-active:bg-slate-100 ui-active:dark:bg-slate-900/40 flex cursor-pointer select-none items-center rounded-[0.625rem] p-1"
          >
            <div className="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
              <theme.icon className="ui-selected:fill-sky-400 ui-selected:dark:fill-sky-400 ui-not-selected:fill-slate-400 h-4 w-4" />
            </div>
            <div className="ml-3">{theme.name}</div>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default ThemeSelector;
