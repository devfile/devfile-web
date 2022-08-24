'''script to run during the devfile/api workflows'''
import argparse
import re
import os
import typing
import shutil

def get_version_breakdown(version: str, version_type: str) -> typing.Tuple[str, str, str]:
  '''get the version breakdown'''
  major, minor, bug_fix = re.search(r'^(\d+)\.(\d+)\.(\d+)', version).groups()

  if not (isinstance(major, str) and isinstance(minor, str) and isinstance(bug_fix, str)):
    raise TypeError(f'{version_type} could not be read: {version}')

  return major, minor, bug_fix

def update_stable_versions(release: bool, version: str) -> typing.List[str]:
  '''update stable-versions.txt'''
  # Parse the schema version
  major, minor, bug_fix = get_version_breakdown(version, 'Inputted version')

  cwd = os.getcwd()
  stable_versions: typing.List[str] = []

  with open(f'{cwd}/libs/docs/src/config/stable-versions.txt', encoding='UTF-8') as f:
    for line in f.readlines():
      line = line.strip()
      line_major, line_minor, line_bug_fix = get_version_breakdown(line, 'stable-version')

      # Cannot change a stable version unless its a new release
      if release and (line_major is major) and (line_minor is minor):
        # Cannot change a bug fix version unless its the same bug fix version or newer
        if line_bug_fix <= bug_fix:
          is_bug_fix = True
          stable_versions.append(version)
        else:
          raise RuntimeError(f'Version {version} needs to be the same version or newer than {line}')

      else:
        stable_versions.append(line)

  if release:
    # New stable version
    if not is_bug_fix:
      stable_versions.append(version)

    with open(f'{cwd}/libs/docs/src/config/stable-versions.txt', 'w', encoding='UTF-8') as f:
      f.write('\n'.join(stable_versions))

  return stable_versions

def update_versions(stable_versions: typing.List[str], version: str) -> typing.Tuple[typing.List[str], typing.Tuple[str, str] | None, typing.Tuple[str, str | None]]:
  '''update versions.txt'''
  # Parse the schema version
  major, minor, bug_fix = get_version_breakdown(version, 'Inputted version')

  cwd = os.getcwd()
  versions: typing.List[str] = []
  version_change = None
  version_release = None

  with open(f'{cwd}/libs/docs/src/config/versions.txt', encoding='UTF-8') as f:
    for line in f.readlines():
      line = line.strip()
      version_release = (version, None)
      line_major, line_minor, line_bug_fix = get_version_breakdown(line, 'Version')

      if (line_major is major) and (line_minor is minor):
        # Cannot change a stable version unless its a new release
        # Cannot change a bug fix version unless its the same bug fix version or newer
        if line_bug_fix <= bug_fix:
          if line in stable_versions:
            raise RuntimeError(f'Version {version} is a stable version and cannot be changed unless the argument "--release" is passed')

          version_change = (line, version)
          versions.append(version)
        else:
          raise RuntimeError(f'Version {version} needs to be the same version or newer than {line}')

      else:
        versions.append(line)

  # New version
  if not version_change:
    version_release = (versions[-1], version)
    versions.append(version)

  with open(f'{cwd}/libs/docs/src/config/versions.txt', 'w', encoding='UTF-8') as f:
    f.write('\n'.join(versions))

  return versions, version_change, version_release

def update_typescript(versions: typing.List[str], stable: str) -> None:
  '''update version.ts'''
  cwd = os.getcwd()

  with open(f'{cwd}/libs/docs/src/config/version.ts', 'w', encoding='UTF-8') as f:
    f.write(f'''import {{ DocVersions }} from '../types';

export const docVersions = {versions} as const;

export const defaultVersion: DocVersions = '{stable}';
''')

def rename_directory(version_change: typing.Tuple[str, str]) -> None:
  '''rename the directory after a version change'''
  previous_version, new_version = version_change
  if previous_version is new_version:
    return None

  cwd = os.getcwd()

  os.rename(f'{cwd}/libs/docs/src/docs/{previous_version}', f'{cwd}/libs/docs/src/docs/{new_version}')

def create_directory(version_release: typing.Tuple[str, str]) -> None:
  '''create the directory for the new version'''
  previous_version, new_version = version_release
  cwd = os.getcwd()

  shutil.copytree(f'{cwd}/libs/docs/src/docs/{previous_version}', f'{cwd}/libs/docs/src/docs/{new_version}')

def create_devfile_schema(versions: typing.Tuple[str, str], devfile_schema: str, delete_old_devfile_schema: bool = False) -> None:
  '''create the devfile schema'''
  previous_version, new_version = versions
  cwd = os.getcwd()

  if delete_old_devfile_schema:
    os.remove(f'{cwd}/libs/docs/src/devfile-schemas/{previous_version}.json')

  with open(f'{cwd}/libs/docs/src/devfile-schemas/{new_version}.json', 'w', encoding='UTF-8') as f:
    f.write(devfile_schema)

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

  # Update libs/docs/src/config/stable-versions.txt
  stable_versions = update_stable_versions(release, version)

  # Update libs/docs/src/config/versions.txt
  versions, version_change, version_release = update_versions(stable_versions, version)

  # Update the typescript in libs/docs/src/config/version.ts with the latest stable version
  update_typescript(versions, stable_versions[-1])

  # Rename the directory if a version change was made
  if version_change:
    rename_directory(version_change)
    create_devfile_schema(version_change, devfile_schema, delete_old_devfile_schema=True)

  # Create the directory if there is a new version
  if version_release[-1]:
    create_directory(version_release)
    create_devfile_schema(version_release, devfile_schema)

if __name__ == '__main__':
  main()
