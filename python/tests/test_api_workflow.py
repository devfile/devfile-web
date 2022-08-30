import pytest
import typing
import unittest
import os
from api_workflow.api_workflow import Config, main


# Cannot test the typescript file effectively
class ExpectedMain:
    """expected values for test_main"""

    def __init__(
        self,
        stable_version: str,
        versions: typing.List[str],
        doc_pages_directories: typing.List[str],
        devfile_schema_files: typing.List[str],
        navigation_files: typing.List[str],
        error: None | TypeError | RuntimeError,
    ):
        self.stable_version = stable_version
        self.versions = versions
        self.doc_pages_directories = doc_pages_directories
        self.devfile_schema_files = devfile_schema_files
        self.navigation_files = navigation_files
        self.error = error


def get_stable_version(path: str) -> bool:
    """returns the actual stable version"""
    cwd = os.getcwd()
    stable_version = None

    with open(f"{cwd}/{path}", encoding="UTF-8") as file:
        stable_version = file.read().strip()

    return stable_version


def get_versions(path: str) -> bool:
    """returns the actual versions"""
    cwd = os.getcwd()
    versions: typing.List[str] = []

    with open(f"{cwd}/{path}", encoding="UTF-8") as file:
        for version in file.readlines():
            versions = version.strip()
            versions.append(version)

    return versions


def get_sub_directories(path: str) -> bool:
    """returns the subdirectories of a path"""
    cwd = os.getcwd()
    directories = [f.path for f in os.scandir(f"{cwd}/{path}") if f.is_dir()]

    return directories


def get_files(path: str) -> bool:
    """returns the files of a path"""
    cwd = os.getcwd()
    files = [f.path for f in os.scandir(f"{cwd}/{path}") if not f.is_dir()]

    return files


test_config = Config(
    "python/testing_directory/config/stable-version.txt",
    "python/testing_directory/config/versions.txt",
    "python/testing_directory/config/version.ts",
    "python/testing_directory/docs",
    "python/testing_directory/devfile-schemas",
    "python/testing_directory/navigation",
)


@pytest.mark.parametrize("config, expected, argv", [])
def test_main(config: Config, expected: ExpectedMain, argv: typing.List[str]) -> None:
    main(config, argv)
    unittest.assertEqual(
        get_stable_version(config.stable_version), expected.stable_version
    )
    # assertCountEqual -> a and b have the same elements in the same number, regardless of their order
    unittest.assertCountEqual(get_versions(config.versions), expected.versions)
    unittest.assertCountEqual(get_sub_directories(config.doc_pages), expected.doc_pages)
    unittest.assertCountEqual(get_files(config.devfile_schema), expected.devfile_schema)
    unittest.assertCountEqual(get_files(config.navigation), expected.navigation)
