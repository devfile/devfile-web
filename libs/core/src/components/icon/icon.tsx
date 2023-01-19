/**
 * Copyright 2023 Red Hat, Inc.
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

import React, { useId } from 'react';
import clsx from 'clsx';
import {
  InstallationIcon,
  LightbulbIcon,
  PluginsIcon,
  PresetsIcon,
  ThemingIcon,
  WarningIcon,
} from '../../icons';

export type IconOptions =
  | 'installation'
  | 'presets'
  | 'plugins'
  | 'theming'
  | 'lightbulb'
  | 'warning';

export type ColorOptions = 'blue' | 'amber';

export interface IconComponentProps {
  id: string;
  color: ColorOptions;
}

const icons: Record<IconOptions, (props: IconComponentProps) => JSX.Element> = {
  installation: InstallationIcon,
  presets: PresetsIcon,
  plugins: PluginsIcon,
  theming: ThemingIcon,
  lightbulb: LightbulbIcon,
  warning: WarningIcon,
};

const iconStyles = {
  blue: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
  amber: '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]',
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconOptions;
  color?: ColorOptions;
  className?: string;
}

export function Icon(props: IconProps): JSX.Element {
  const { color = 'blue', icon, className, ...rest } = props;

  const id = useId();
  const IconComponent = icons[icon];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={clsx(className, iconStyles[color])}
      {...rest}
    >
      <IconComponent id={id} color={color} />
    </svg>
  );
}

const gradients: Record<ColorOptions, { stopColor: string; offset?: string }[]> = {
  blue: [
    { stopColor: '#0EA5E9' },
    { stopColor: '#22D3EE', offset: '.527' },
    { stopColor: '#818CF8', offset: '1' },
  ],
  amber: [
    { stopColor: '#FDE68A', offset: '.08' },
    { stopColor: '#F59E0B', offset: '.837' },
  ],
};

export interface GradientProps extends React.SVGProps<SVGRadialGradientElement> {
  color: ColorOptions;
}

export function Gradient(props: GradientProps): JSX.Element {
  const { color = 'blue', ...rest } = props;

  return (
    <radialGradient cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" {...rest}>
      {gradients[color].map((stop, stopIndex) => (
        // No valid index
        // eslint-disable-next-line react/no-array-index-key
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  );
}

export interface ModeProps extends React.SVGProps<SVGGElement> {
  className?: string;
}

export function LightMode(props: ModeProps): JSX.Element {
  const { className, ...rest } = props;

  return <g className={clsx('dark:hidden', className)} {...rest} />;
}

export function DarkMode(props: ModeProps): JSX.Element {
  const { className, ...rest } = props;

  return <g className={clsx('hidden dark:inline', className)} {...rest} />;
}

export default Icon;
