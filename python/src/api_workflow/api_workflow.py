# Copyright 2022 Red Hat, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


"""
The script api_workflow publishes or releases the documentation version for the landing-page
after devfile/api updates a devfile spec version.

Publish - A devfile spec version that is typically in alpha or beta and is newer than the specified stable version.
Release - A devfile spec version that is stable and is the same version or older than the specified stable version.
"""
import argparse
import re
import os
import typing
import shutil


class Config:
    """Config class for file locations"""

    def __init__(
        self,
        stable_version: str,
        versions: str,
        typescript: str,
        doc_pages: str,
        devfile_schema: str,
        navigation: str,
    ):
        self.stable_version = stable_version
        self.versions = versions
        self.typescript = typescript
        self.doc_pages = doc_pages
        self.devfile_schema = devfile_schema
        self.navigation = navigation


base_config = Config(
    "libs/docs/src/config/stable-version.txt",
    "libs/docs/src/config/versions.txt",
    "libs/docs/src/config/version.ts",
    "libs/docs/src/docs",
    "libs/docs/src/devfile-schemas",
    "libs/docs/src/navigation",
)


def get_version_breakdown(new_version: str, version_type: str) -> typing.Tuple[int, int, int]:
    """Splits the semver formatted version into major, minor, and bug fix"""
    result = re.search(r"^(\d+)\.(\d+)\.(\d+)", new_version)
    if result is None:
        raise AttributeError(f"{version_type} could not be read: {new_version}")

    major, minor, bug_fix = result.groups()

    return int(major), int(minor), int(bug_fix)


def is_newer_version(
    major_version: int,
    minor_version: int,
    bug_fix_version: int,
    new_major_version: int,
    new_minor_version: int,
    new_bug_fix_version: int,
) -> bool:
    """Returns whether a version is newer than the current version"""
    return (
        (major_version > new_major_version)
        or (major_version == new_major_version and minor_version > new_minor_version)
        or (
            major_version == new_major_version
            and minor_version == new_minor_version
            and bug_fix_version >= new_bug_fix_version
        )
    )


def update_stable_version(release: bool, new_version: str, path: str) -> str:
    """Updates the stable version"""
    # Parse the version
    new_major_version, new_minor_version, new_bug_fix_version = get_version_breakdown(
        new_version, "Inputted version"
    )

    cwd = os.getcwd()
    stable_version = None
    stable_version_path = f"{cwd}/{path}"

    with open(stable_version_path, encoding="UTF-8") as file:
        version = file.read().strip()
        (
            major_stable_version,
            minor_stable_version,
            bug_fix_stable_version,
        ) = get_version_breakdown(version, "Stable version")

        # Only change the stable version if its a release
        if not release or (
            release
            and not is_newer_version(
                new_major_version,
                new_minor_version,
                new_bug_fix_version,
                major_stable_version,
                minor_stable_version,
                bug_fix_stable_version,
            )
        ):
            stable_version = version
        else:
            stable_version = new_version

    assert stable_version is not None, RuntimeError("Stable version could not be found")

    if release:
        with open(stable_version_path, "w", encoding="UTF-8") as file:
            file.write(stable_version)

    return stable_version


def update_versions(
    release: bool, stable_version: str, new_version: str, path: str
) -> typing.Tuple[typing.List[str], typing.Union[typing.Tuple[str, str], None]]:
    """Update the versions"""
    # Parse the version
    new_major_version, new_minor_version, new_bug_fix_version = get_version_breakdown(
        new_version, "Inputted version"
    )

    cwd = os.getcwd()
    versions: typing.List[str] = []
    renamed_version = None
    versions_path = f"{cwd}/{path}"

    with open(versions_path, encoding="UTF-8") as file:
        for version in file.readlines():
            version = version.strip()
            major_version, minor_version, bug_fix_version = get_version_breakdown(
                version, "Version"
            )

            # If the new major and minor versions are the same, then we need to update the bug fix version
            if (major_version != new_major_version) or (minor_version != new_minor_version):
                versions.append(version)
            else:
                # Cannot change a bug fix version unless its a newer version
                if bug_fix_version > new_bug_fix_version:
                    raise RuntimeError(
                        f"Version {new_version} needs to be a newer version than {version}"
                    )

                (
                    major_stable_version,
                    minor_stable_version,
                    bug_fix_stable_version,
                ) = get_version_breakdown(stable_version, "Stable version")

                # Cannot change a stable version unless its a newer release
                if not release and is_newer_version(
                    major_stable_version,
                    minor_stable_version,
                    bug_fix_stable_version,
                    new_major_version,
                    new_minor_version,
                    new_bug_fix_version,
                ):
                    raise RuntimeError(
                        f'Version {new_version} is a stable version and cannot be changed unless the argument "--release" is passed'
                    )

                renamed_version = (version, new_version)
                versions.append(new_version)

    assert len(versions) > 0, RuntimeError("Versions could not be found")

    # New version
    if not renamed_version:
        versions.append(new_version)

    with open(versions_path, "w", encoding="UTF-8") as file:
        file.write("\n".join(versions))

    return versions, renamed_version


def update_typescript(versions: typing.List[str], stable: str, path: str) -> None:
    """Update the typescript file"""
    cwd = os.getcwd()

    with open(f"{cwd}/{path}", "w", encoding="UTF-8") as file:
        file.write(
            f"""import {{ DocVersions }} from '../types';

export const docVersions = {versions} as const;

export const defaultVersion: DocVersions = '{stable}';
"""
        )


def update_doc_pages(
    version_change: typing.Tuple[str, str],
    path: str,
    is_renamed: bool = False,
) -> None:
    """Updates the doc pages"""
    previous_version, new_version = version_change
    cwd = os.getcwd()
    previous_version_path = f"{cwd}/{path}/{previous_version}"
    new_version_path = f"{cwd}/{path}/{new_version}"

    if is_renamed:
        if previous_version == new_version:
            return

        os.rename(
            previous_version_path,
            new_version_path,
        )
    else:
        shutil.copytree(
            previous_version_path,
            new_version_path,
        )


def update_devfile_schema(
    version_change: typing.Tuple[str, str],
    devfile_schema: str,
    path: str,
    is_renamed: bool = False,
) -> None:
    """Updates the devfile schema"""
    previous_version, new_version = version_change
    cwd = os.getcwd()

    if is_renamed:
        os.remove(f"{cwd}/{path}/{previous_version}.json")

    shutil.copy2(devfile_schema, f"{cwd}/{path}/{new_version}.json")


def update_navigation(
    version_change: typing.Tuple[str, str],
    path: str,
    is_renamed: bool = False,
) -> None:
    """Updates the navigation config"""
    previous_version, new_version = version_change
    cwd = os.getcwd()
    previous_version_path = f"{cwd}/{path}/{previous_version}.yaml"
    new_version_path = f"{cwd}/{path}/{new_version}.yaml"

    if is_renamed:
        if previous_version == new_version:
            return None

        os.rename(previous_version_path, new_version_path)
    else:
        shutil.copy2(previous_version_path, new_version_path)


def main(
    config: typing.Union[Config, None] = None,
    argv: typing.Union[typing.List[str], None] = None,
) -> None:
    """Main method"""
    if config is None:
        config = base_config

    # Create the parser
    parser = argparse.ArgumentParser()

    # Add arguments
    parser.add_argument(
        "--version", help="devfile version in semver format", type=str, required=True
    )
    parser.add_argument("--devfile-schema", help="devfile json schema", type=str, required=True)
    parser.add_argument(
        "--release",
        help="release a new stable version",
        action=argparse.BooleanOptionalAction,
    )

    # Parse the args
    args = parser.parse_args(argv)
    version: str = args.version
    devfile_schema: str = args.devfile_schema
    release = bool(args.release)

    # Update libs/docs/src/config/stable-version.txt
    stable_version = update_stable_version(release, version, path=config.stable_version)

    # Update libs/docs/src/config/versions.txt
    versions, renamed_version = update_versions(
        release, stable_version, version, path=config.versions
    )

    # Update the typescript in libs/docs/src/config/version.ts
    update_typescript(versions, stable_version, path=config.typescript)

    # Change the version; otherwise, create a new version
    if renamed_version:
        update_doc_pages(renamed_version, path=config.doc_pages, is_renamed=True)
        update_devfile_schema(
            renamed_version, devfile_schema, path=config.devfile_schema, is_renamed=True
        )
        update_navigation(renamed_version, path=config.navigation, is_renamed=True)
    else:
        renamed_version = (versions[-2], versions[-1])
        update_doc_pages(renamed_version, path=config.doc_pages)
        update_devfile_schema(renamed_version, devfile_schema, path=config.devfile_schema)
        update_navigation(renamed_version, path=config.navigation)


if __name__ == "__main__":
    main()
