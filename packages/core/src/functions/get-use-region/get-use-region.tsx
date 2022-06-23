/**
 * Returns a region
 *
 *
 * @returns the 2 letter region name
 */
export function getUserRegion(): string {
  // Match everything after the first occurrence of "-"
  const regex = /-([\S\s]*)$/;

  // If the locales property is not set try to use the language property
  let region = navigator.language.match(regex)?.[0];

  if (typeof region === 'string') {
    // Slice the "-" off the front
    region = region.slice(1);
  }

  return region ?? '';
}

export default getUserRegion;
