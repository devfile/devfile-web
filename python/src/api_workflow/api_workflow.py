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
        output_directory: str,
        stable_version: str,
        versions: str,
        typescript: str,
        doc_pages: str,
        devfile_schema: str,
        navigation: str,
    ):
        cwd = os.getcwd()
        output_directory = os.path.join(cwd, output_directory)

        self.output_directory = output_directory
        self.stable_version = os.path.join(output_directory, stable_version)
        self.versions = os.path.join(output_directory, versions)
        self.typescript = os.path.join(output_directory, typescript)
        self.doc_pages = os.path.join(output_directory, doc_pages)
        self.devfile_schema = os.path.join(output_directory, devfile_schema)
        self.navigation = os.path.join(output_directory, navigation)


base_config = Config(
    os.path.join("libs", "docs", "src"),
    os.path.join("config", "stable-version.txt"),
    os.path.join("config", "versions.txt"),
    os.path.join("config", "version.ts"),
    "docs",
    "devfile-schemas",
    "navigation",
)


def split_semver(version: typing.Tuple[str, str]) -> typing.Tuple[int, int, int, str]:
    """Splits the semver formatted version into major, minor, bug fix and label"""
    v, v_type = version
    result = re.search(r"^(\d+)\.(\d+)\.(\d+)(-(.*))?$", v)
    if result is None:
        raise AttributeError(f"{v_type} could not be read: {v}")

    major, minor, bug_fix, _, label = result.groups()

    return int(major), int(minor), int(bug_fix), str(label or "")


def compare_versions(
    version_x: typing.Tuple[str, str],
    version_y: typing.Tuple[str, str],
) -> int:
    """
    Compares two versions
    Return -2 if version x is older than version y
    Return -1 if version x has a label and version y does not
    Return 0 if version x is the same as version y
    Return 1 if versions x does not have a label and version y does
    Return 2 if version x is newer than version y
    """
    major_x, minor_x, bug_fix_x, label_x = split_semver(version_x)
    major_y, minor_y, bug_fix_y, label_y = split_semver(version_y)

    if major_x > major_y:
        return 2

    if major_x == major_y and minor_x > minor_y:
        return 2

    if major_x == major_y and minor_x == minor_y:
        if bug_fix_x > bug_fix_y:
            return 2

        if bug_fix_x == bug_fix_y:
            if label_x == "" and label_y != "":
                return 1

            if label_x != "" and label_y == "":
                return -1

            return 0

    return -2


def get_stable_version(inputted_version: str, release: bool, path: str) -> str:
    """Gets the stable version"""
    stable_version = None

    with open(path, encoding="UTF-8") as file:
        version = file.read().strip()

        stable_version = version
        # Update the stable version if the inputted version is newer and it is a release
        if release and compare_versions((inputted_version, "Inputted version"), (version, "Stable version")) > 0:
            stable_version = inputted_version

    assert stable_version is not None, "Stable version could not be found"

    # Cannot update a stable version unless it a release
    if not release:
        assert compare_versions((inputted_version, "Inputted version"), (stable_version, "Stable version")) > 0, (
            f"Version {inputted_version} is a stable version and cannot be updated unless the"
            + 'argument "--release" is passed'
        )

    return stable_version


def update_stable_version(stable_version: str, path: str) -> None:
    """Update the stable version"""
    with open(path, "w", encoding="UTF-8") as file:
        file.write(stable_version)


def get_versions(
    inputted_version: str, path: str
) -> typing.Tuple[typing.List[str], typing.Union[typing.Tuple[str, str], None]]:
    """Gets the versions list"""
    versions: typing.List[str] = []
    renamed_version = None

    with open(path, encoding="UTF-8") as file:
        for unstriped_version in file.readlines():
            version = unstriped_version.strip()

            # Update if the version removes its label or is the same version as inputted version
            if 0 <= compare_versions((inputted_version, "Inputted version"), (version, "Version")) <= 1:
                renamed_version = (version, inputted_version)
                versions.append(inputted_version)
            else:
                versions.append(version)

        if renamed_version is None:
            versions.append(inputted_version)

    assert len(versions) > 0, RuntimeError("Versions could not be found")

    return versions, renamed_version


def update_versions(versions: typing.List[str], path: str) -> None:
    """Updates the versions list"""
    with open(path, "w", encoding="UTF-8") as file:
        file.write("\n".join(versions))


def update_typescript(versions: typing.List[str], stable: str, path: str) -> None:
    """Update the typescript file"""
    with open(path, "w", encoding="UTF-8") as file:
        file.write(
            f"""/**
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

import {{ DocVersions }} from '../types';

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
    previous_version_path = os.path.join(path, previous_version)
    new_version_path = os.path.join(path, new_version)

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
    previous_version_path = os.path.join(path, f"{previous_version}.json")
    new_version_path = os.path.join(path, f"{new_version}.json")

    if is_renamed:
        os.remove(previous_version_path)

    shutil.copy2(devfile_schema, new_version_path)


def update_navigation(
    version_change: typing.Tuple[str, str],
    path: str,
    is_renamed: bool = False,
) -> None:
    """Updates the navigation config"""
    previous_version, new_version = version_change
    previous_version_path = os.path.join(path, f"{previous_version}.yaml")
    new_version_path = os.path.join(path, f"{new_version}.yaml")

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
    parser.add_argument("--version", help="devfile version in semver format", type=str, required=True)
    parser.add_argument("--devfile-schema", help="devfile json schema", type=str, required=True)
    parser.add_argument(
        "--release",
        help="release a new stable version",
        action=argparse.BooleanOptionalAction,
    )

    # Parse the args
    args = parser.parse_args(argv)
    inputted_version: str = args.version
    devfile_schema: str = args.devfile_schema
    release = bool(args.release)

    # Get the stable version
    stable_version = get_stable_version(inputted_version, release, path=config.stable_version)

    # Get the versions list
    versions, renamed_version = get_versions(inputted_version, path=config.versions)

    # If it is a release, update libs/docs/src/config/stable-version.txt
    if release:
        update_stable_version(stable_version, path=config.stable_version)

    # Update libs/docs/src/config/versions.txt
    update_versions(versions, path=config.versions)

    # Update the typescript in libs/docs/src/config/version.ts
    update_typescript(versions, stable_version, path=config.typescript)

    # Change the version; otherwise, create a new version
    if renamed_version:
        update_doc_pages(renamed_version, path=config.doc_pages, is_renamed=True)
        update_devfile_schema(renamed_version, devfile_schema, path=config.devfile_schema, is_renamed=True)
        update_navigation(renamed_version, path=config.navigation, is_renamed=True)
    else:
        renamed_version = (versions[-2], versions[-1])
        update_doc_pages(renamed_version, path=config.doc_pages)
        update_devfile_schema(renamed_version, devfile_schema, path=config.devfile_schema)
        update_navigation(renamed_version, path=config.navigation)


if __name__ == "__main__":
    main()
