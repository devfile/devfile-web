'''script to run during the devfile/api workflows'''
import argparse
import re
import os
import typing
import shutil

config = {
  'stable-version': 'libs/docs/src/config/stable-version.txt',
  'versions': 'libs/docs/src/config/versions.txt',
}


def get_version_breakdown(new_version: str, version_type: str) -> typing.Tuple[int, int, int]:
  '''get the version breakdown'''
  major, minor, bug_fix = re.search(r'^(\d+)\.(\d+)\.(\d+)', new_version).groups()

  if not (isinstance(major, str) and isinstance(minor, str) and isinstance(bug_fix, str)):
    raise TypeError(f'{version_type} could not be read: {new_version}')

  return int(major), int(minor), int(bug_fix)

def update_stable_versions(release: bool, new_version: str) -> str:
  '''update stable-version.txt'''
  # Parse the version
  new_major_version, new_minor_version, new_bug_fix_version = get_version_breakdown(new_version, 'Inputted version')

  cwd = os.getcwd()
  stable_version: typing.List[str] = []

  with open(f'{cwd}/libs/docs/src/config/stable-version.txt', encoding='UTF-8') as f:
    for version in f.readlines():
      version = version.strip()
      major_stable_version, minor_stable_version, line_bug_fix_stable_version = get_version_breakdown(version, 'Stable version')

      # Only change the stable version if its a release
      if not release:
        stable_version = version
      else:
        # Cannot change a stable version unless its a newer release
        if (major_stable_version > new_major_version) and (minor_stable_version > new_minor_version) and (line_bug_fix_stable_version >= new_bug_fix_version):
          raise RuntimeError(f'Version {new_version} needs to be a newer version than {version}')

        stable_version = new_version

  if release:
    with open(f'{cwd}/libs/docs/src/config/stable-version.txt', 'w', encoding='UTF-8') as f:
      f.write(f'{stable_version}\n\n')

  return stable_version

def update_versions(stable_version: str, new_version: str) -> typing.Tuple[typing.List[str], typing.Tuple[str, str] | None]:
  '''update versions.txt'''
  # Parse the version
  new_major_version, new_minor_version, new_bug_fix_version = get_version_breakdown(new_version, 'Inputted version')

  cwd = os.getcwd()
  versions: typing.List[str] = []
  renamed_version = None

  with open(f'{cwd}/libs/docs/src/config/versions.txt', encoding='UTF-8') as f:
    for version in f.readlines():
      version = version.strip()
      major_version, minor_version, bug_fix_version = get_version_breakdown(version, 'Version')

      # If the new major and minor versions are the same, then we need to update the bug fix version
      if (major_version is not new_major_version) and (minor_version is not new_minor_version):
        versions.append(version)
      else:
        # Cannot change a bug fix version unless its a newer version
        if bug_fix_version > new_bug_fix_version:
          raise RuntimeError(f'Version {new_version} needs to be a newer version than {version}')

        major_stable_version, minor_stable_version, bug_fix_stable_version = get_version_breakdown(stable_version, 'Stable version')

        # Cannot change a stable version unless its a newer release
        if (major_stable_version > new_major_version) and (minor_stable_version > new_minor_version) and (bug_fix_stable_version >= new_bug_fix_version):
          raise RuntimeError(f'Version {new_version} is a stable version and cannot be changed unless the argument "--release" is passed')

        renamed_version = (version, new_version)
        versions.append(new_version)

  # New version
  if not renamed_version:
    versions.append(new_version)

  with open(f'{cwd}/libs/docs/src/config/versions.txt', 'w', encoding='UTF-8') as f:
    f.write('\n'.join(versions))

  return versions, renamed_version

def update_typescript(versions: typing.List[str], stable: str) -> None:
  '''update version.ts'''
  cwd = os.getcwd()

  with open(f'{cwd}/libs/docs/src/config/version.ts', 'w', encoding='UTF-8') as f:
    f.write(f'''import {{ DocVersions }} from '../types';

export const docVersions = {versions} as const;

export const defaultVersion: DocVersions = '{stable}';
''')

def create_directory(version_change: typing.Tuple[str, str], is_renamed: bool = False) -> None:
  '''create the directory after a version change'''
  previous_version, new_version = version_change
  cwd = os.getcwd()

  if is_renamed:
    if previous_version is new_version:
      return

    os.rename(f'{cwd}/libs/docs/src/docs/{previous_version}', f'{cwd}/libs/docs/src/docs/{new_version}')
  else:
    shutil.copytree(f'{cwd}/libs/docs/src/docs/{previous_version}', f'{cwd}/libs/docs/src/docs/{new_version}')
  
def create_devfile_schema(version_change: typing.Tuple[str, str], devfile_schema: str, is_renamed: bool = False) -> None:
  '''create the devfile schema after a version change'''
  previous_version, new_version = version_change
  cwd = os.getcwd()

  if is_renamed:
    os.remove(f'{cwd}/libs/docs/src/devfile-schemas/{previous_version}.json')

  with open(f'{cwd}/libs/docs/src/devfile-schemas/{new_version}.json', 'w', encoding='UTF-8') as f:
    f.write(devfile_schema)

def create_navigation(version_change: typing.Tuple[str, str], is_renamed: bool = False) -> None:
  '''rename the navigation after a version change'''
  previous_version, new_version = version_change
  cwd = os.getcwd()

  if is_renamed:
    if previous_version is new_version:
      return None

    os.rename(f'{cwd}/libs/docs/src/navigation/{previous_version}.yaml', f'{cwd}/libs/docs/src/navigation/{new_version}.yaml')
  else:
    shutil.copy2(f'{cwd}/libs/docs/src/navigation/{previous_version}.yaml', f'{cwd}/libs/docs/src/navigation/{new_version}.yaml')

def main():
  '''main method'''
  ## Create the parser
  parser = argparse.ArgumentParser()

  # Add arguments
  parser.add_argument('--version', help='devfile version in semver format', type=str, required=True)
  parser.add_argument('--devfile-schema', help='devfile json schema', type=str, required=True)
  parser.add_argument('--release', help='release a new stable version', action=argparse.BooleanOptionalAction)

  # Parse the args
  args = parser.parse_args()
  version: str = args.version
  devfile_schema: str = args.devfile_schema
  release: str = args.release

  # Update libs/docs/src/config/stable-version.txt
  stable_version = update_stable_versions(release, version)

  # Update libs/docs/src/config/versions.txt
  versions, renamed_version = update_versions(stable_version, version)

  # Update the typescript in libs/docs/src/config/version.ts
  update_typescript(versions, stable_version)

  # Rename the directories; otherwise, create the new directories
  if renamed_version:
    create_directory(renamed_version, is_renamed=True)
    create_devfile_schema(renamed_version, devfile_schema, is_renamed=True)
    create_navigation(renamed_version, is_renamed=True)
  # Create the directory if there is a new version
  else:
    create_directory(tuple(versions[-2:]))
    create_devfile_schema(tuple(versions[-2:]), devfile_schema)
    create_navigation(tuple(versions[-2:]))

  print(config)

if __name__ == '__main__':
  main()
