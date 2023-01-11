# Copyright 2023 Red Hat, Inc.
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

import pytest
import typing
import os
import shutil
import re
from api_workflow.api_workflow import Config, main


# Current does not test the typescript file; however, other tests should catch any related errors
class TestState:
    """Directory state values (e.g. before and expected values) for test_main"""

    def __init__(
        self,
        stable_version: typing.Union[None, str] = None,
        versions: typing.Union[None, typing.List[str]] = None,
        error: typing.Union[None, SystemExit, AttributeError, RuntimeError] = None,
    ):
        if error is None:
            assert stable_version is not None
            assert versions is not None

        self.stable_version = stable_version
        self.versions = versions
        self.error = error

    # Do not test this class
    __test__ = False


def get_stable_version(path: str) -> bool:
    """Returns the actual stable version"""
    stable_version = None

    with open(path, encoding="UTF-8") as file:
        stable_version = file.read().strip()

    return stable_version


def get_versions(path: str) -> bool:
    """Returns the actual versions"""
    versions: typing.List[str] = []

    with open(path, encoding="UTF-8") as file:
        for version in file.readlines():
            version = version.strip()
            versions.append(version)

    return versions


def get_sub_directories(path: str) -> bool:
    """Returns the actual subdirectories of a path"""
    directories = [f.name for f in os.scandir(path) if f.is_dir()]

    return directories


def get_files(path: str) -> bool:
    """Returns the actual files of a path"""
    files = [f.name for f in os.scandir(path) if not f.is_dir()]

    return files


def assert_list_equality(actual: typing.List[str], expected: typing.List[str]) -> None:
    """Asserts that two lists are equal"""
    difference = set(actual) ^ set(expected)
    assert not difference, f"Lists are not equal | actual: {actual} | expected: {expected} | difference: {difference}"


def create_testing_directory(config: Config, expected: TestState) -> None:
    """Creates the test directory"""
    # Create the test directory
    os.makedirs(os.path.join(config.output_directory, "config"), exist_ok=True)

    # Create the versions file
    with open(config.versions, "w+") as file:
        file.write("\n".join(expected.versions))

    # Create the stable version file
    with open(config.stable_version, "w+") as file:
        file.write(f"{expected.stable_version}")

    # Create the doc pages directories
    for version in expected.versions:
        directory_path = os.path.join(config.doc_pages, version)
        os.makedirs(directory_path, exist_ok=True)
        with open(os.path.join(directory_path, "index.md"), "w+") as file:
            file.write("")

    # Create the devfile schema files
    for version in expected.versions:
        os.makedirs(config.devfile_schema, exist_ok=True)
        with open(os.path.join(config.devfile_schema, f"{version}.json"), "w+") as file:
            file.write("")

    # Create the navigation files
    for versions in expected.versions:
        os.makedirs(config.navigation, exist_ok=True)
        with open(os.path.join(config.navigation, f"{versions}.yaml"), "w+") as file:
            file.write("")

    # Create the --devfile-schema argument
    with open(os.path.join(config.output_directory, "devfile.json"), "w+") as file:
        file.write("")


base_path = "" if re.search("python", os.getcwd()) is not None else "python"

test_config = Config(
    os.path.join(base_path, "test_directory"),
    os.path.join("config", "stable-version.txt"),
    os.path.join("config", "versions.txt"),
    os.path.join("config", "version.ts"),
    "docs",
    "devfile-schemas",
    "navigation",
)

test_devfile_schema = os.path.join(test_config.output_directory, "devfile.json")


@pytest.mark.parametrize(
    "config, before, expected, argv",
    [
        # 1: No arguments provided
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(error=SystemExit),
            [],
        ),
        # --devfile-schema not provided
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(error=SystemExit),
            ["--version", "2.0.0"],
        ),
        # 2: --version not provided
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(error=SystemExit),
            ["--devfile-schema", test_devfile_schema],
        ),
        # 3: --version did not specify a semver version
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(error=AttributeError),
            ["--version", "2.0", "--devfile-schema", test_devfile_schema],
        ),
        # 4: Cannot change an older released version without --release
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(error=AssertionError),
            ["--version", "2.0.0", "--devfile-schema", test_devfile_schema],
        ),
        # 5: Cannot change the stable version without --release
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(error=AssertionError),
            ["--version", "2.1.0", "--devfile-schema", test_devfile_schema],
        ),
        # 6: Renames an alpha version and publishes it
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-beta"],
            ),
            ["--version", "2.2.0-beta", "--devfile-schema", test_devfile_schema],
        ),
        # 7: Publishes an alpha version
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha", "2.3.0-alpha"],
            ),
            ["--version", "2.3.0-alpha", "--devfile-schema", test_devfile_schema],
        ),
        # 8: Re-releases an older released version
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            [
                "--version",
                "2.0.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # 9: Re-releases the stable version
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            [
                "--version",
                "2.1.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # 10: Releases a newer already created version
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
            ),
            TestState(
                stable_version="2.2.0",
                versions=["2.0.0", "2.1.0", "2.2.0"],
            ),
            [
                "--version",
                "2.2.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # 11: Releases a newer version
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0"],
            ),
            TestState(
                stable_version="2.3.0",
                versions=["2.0.0", "2.1.0", "2.2.0", "2.3.0"],
            ),
            [
                "--version",
                "2.3.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # 12: Publishes a new bug fix alpha version
        (
            test_config,
            TestState(
                stable_version="2.3.0",
                versions=["2.0.0", "2.1.0", "2.2.0", "2.3.0"],
            ),
            TestState(
                stable_version="2.3.0",
                versions=["2.0.0", "2.1.0", "2.2.0", "2.3.0", "2.3.1-alpha"],
            ),
            [
                "--version",
                "2.3.1-alpha",
                "--devfile-schema",
                test_devfile_schema,
            ],
        ),
        # 13: Releases a new version when there are two alpha versions
        (
            test_config,
            TestState(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha", "2.3.0-alpha"],
            ),
            TestState(
                stable_version="2.2.0",
                versions=["2.0.0", "2.1.0", "2.2.0", "2.3.0-alpha"],
            ),
            [
                "--version",
                "2.2.0",
                "--release",
                "--devfile-schema",
                test_devfile_schema,
            ],
        ),
    ],
)
def test_main(config: Config, before: TestState, expected: TestState, argv: typing.List[str]) -> None:
    # Setup before each test
    if os.path.exists(config.output_directory) and os.path.isdir(config.output_directory):
        shutil.rmtree(config.output_directory)
    create_testing_directory(config, before)

    # Expect error if Expected.error is not None
    if expected.error is not None:
        with pytest.raises(expected.error):
            main(config, argv)
    else:
        # Run main
        main(config, argv)

        # Run tests
        assert get_stable_version(config.stable_version) == expected.stable_version
        assert_list_equality(get_versions(config.versions), expected.versions)
        assert_list_equality(get_sub_directories(config.doc_pages), expected.versions)
        assert_list_equality(get_files(config.devfile_schema), [f"{file}.json" for file in expected.versions])
        assert_list_equality(get_files(config.navigation), [f"{file}.yaml" for file in expected.versions])
