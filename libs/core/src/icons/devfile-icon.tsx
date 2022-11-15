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

import { SVGProps } from 'react';

export function DevfileIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="devfile-logo_svg__Layer_1"
      data-name="Layer 1"
      viewBox="799.31 362.88 321.38 354.24"
      {...props}
    >
      <path d="M1042.15 521.42a79.05 79.05 0 0 0-29.78-61.78 23.07 23.07 0 0 1-6.32 11.81l-6.17 6.17a57.34 57.34 0 1 1-38-13.56l-18.42 18.42a10.93 10.93 0 0 0 15.46 15.46l28.42-28.43 8.38-8.38a8.63 8.63 0 0 0 .55-11.54c-.25-.11-1.64-1.69-2.23-2.28l-35.15-35.15a10.93 10.93 0 0 0-15.46 15.46l14.69 14.69a79.25 79.25 0 1 0 84 79.09Z" />
      <path d="M1120.69 523.57c0-88.61-72.09-160.69-160.69-160.69S799.31 435 799.31 523.57c0 87.84 70.84 159.4 158.39 160.64l-14.25 14.25a10.93 10.93 0 0 0 15.46 15.46l32.8-32.81h.06l4-4a8.64 8.64 0 0 0 0-12.2l-5.8-5.8h-.06l-31-31a10.93 10.93 0 0 0-15.46 15.46l18.73 18.73c-.73 0-1.45.06-2.18.06-76.56 0-138.83-62.29-138.83-138.84S883.44 384.74 960 384.74s138.83 62.26 138.83 138.83c0 60.44-38.84 111.95-92.87 131l.09.08a23.26 23.26 0 0 1 6.36 20.86c62.95-21.82 108.28-81.68 108.28-151.94Z" />
    </svg>
  );
}

export default DevfileIcon;
