/**
 * Copyright 2022 Red Hat, Inc.
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

import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  href?: string;
  children?: ReactNode;
}

const styles = {
  primary:
    'rounded-lg bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'rounded-lg bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
};

export function Button(props: ButtonProps): JSX.Element {
  const { variant = 'primary', className, href, ...rest } = props;

  const buttonClassName = clsx(styles[variant], className);

  return href ? (
    <Link href={href} className={buttonClassName} {...rest} />
  ) : (
    <button type="button" className={buttonClassName} {...rest} />
  );
}

export default Button;
