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

import { SVGProps } from 'react';

export function RedHatIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="1.67 3.69 16.67 12.62" {...props}>
      <path d="M12.7834 10.9667C13.8834 10.9667 15.4667 10.7417 15.4667 9.43332C15.475 9.33332 15.4667 9.23332 15.4417 9.13332L14.7917 6.29998C14.6417 5.67498 14.5084 5.39165 13.4084 4.84165C12.5584 4.40832 10.7084 3.69165 10.1584 3.69165C9.65002 3.69165 9.50002 4.34998 8.89169 4.34998C8.30835 4.34998 7.87502 3.85832 7.32502 3.85832C6.80002 3.85832 6.45835 4.21665 6.19169 4.94998C6.19169 4.94998 5.45835 7.03332 5.35835 7.33332C5.35002 7.39165 5.34169 7.44165 5.34169 7.49998C5.34169 8.30832 8.52502 10.9583 12.7834 10.9583V10.9667ZM15.6417 9.96665C15.7917 10.6833 15.7917 10.7583 15.7917 10.8333C15.7917 12.0833 14.4084 12.7583 12.6 12.7583C8.50002 12.7583 4.90835 10.3583 4.90835 8.77498C4.90835 8.54998 4.95835 8.33332 5.04169 8.13332C3.56669 8.19998 1.66669 8.46665 1.66669 10.15C1.66669 12.9167 8.20002 16.3083 13.375 16.3083C17.3417 16.3083 18.3334 14.5167 18.3334 13.1C18.3334 11.9833 17.375 10.7167 15.6417 9.96665Z" />
    </svg>
  );
}

export default RedHatIcon;
