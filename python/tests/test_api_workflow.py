import pytest
import typing
import os
import shutil
from api_workflow.api_workflow import Config, main


# Current does not test the typescript file; however, other tests should catch any related errors
class Expected:
    """Expected values for test_main"""

    def __init__(
        self,
        stable_version: typing.Union[None, str] = None,
        versions: typing.Union[None, typing.List[str]] = None,
        doc_pages_directories: typing.Union[None, typing.List[str]] = None,
        devfile_schema_files: typing.Union[None, typing.List[str]] = None,
        navigation_files: typing.Union[None, typing.List[str]] = None,
        error: typing.Union[None, SystemExit, AttributeError, RuntimeError] = None,
    ):
        if error is None:
            assert stable_version is not None
            assert versions is not None
            assert doc_pages_directories is not None
            assert devfile_schema_files is not None
            assert navigation_files is not None

        self.stable_version = stable_version
        self.versions = versions
        self.doc_pages_directories = doc_pages_directories
        self.devfile_schema_files = devfile_schema_files
        self.navigation_files = navigation_files
        self.error = error


def get_stable_version(path: str) -> bool:
    """Returns the actual stable version"""
    cwd = os.getcwd()
    stable_version = None

    with open(f"{cwd}/{path}", encoding="UTF-8") as file:
        stable_version = file.read().strip()

    return stable_version


def get_versions(path: str) -> bool:
    """Returns the actual versions"""
    cwd = os.getcwd()
    versions: typing.List[str] = []

    with open(f"{cwd}/{path}", encoding="UTF-8") as file:
        for version in file.readlines():
            version = version.strip()
            versions.append(version)

    return versions


def get_sub_directories(path: str) -> bool:
    """Returns the actual subdirectories of a path"""
    cwd = os.getcwd()
    directories = [f.name for f in os.scandir(f"{cwd}/{path}") if f.is_dir()]

    return directories


def get_files(path: str) -> bool:
    """Returns the actual files of a path"""
    cwd = os.getcwd()
    files = [f.name for f in os.scandir(f"{cwd}/{path}") if not f.is_dir()]

    return files


def assert_list_equality(actual: typing.List[str], expected: typing.List[str]) -> None:
    """Asserts that two lists are equal"""
    difference = set(actual) ^ set(expected)
    assert not difference, f"Lists are not equal: {difference}"


test_config = Config(
    "python/testing_directory/test/config/stable-version.txt",
    "python/testing_directory/test/config/versions.txt",
    "python/testing_directory/test/config/version.ts",
    "python/testing_directory/test/docs",
    "python/testing_directory/test/devfile_schemas",
    "python/testing_directory/test/navigation",
)

test_devfile_schema = (
    f"{os.getcwd()}/python/testing_directory/backup/devfile_schemas/2.0.0.json"
)


@pytest.mark.parametrize(
    "config, expected, argv",
    [
        # No arguments provided
        (test_config, Expected(error=SystemExit), []),
        # --devfile-schema not provided
        (test_config, Expected(error=SystemExit), ["--version", "2.0.0"]),
        # --version not provided
        (
            test_config,
            Expected(error=SystemExit),
            ["--devfile-schema", test_devfile_schema],
        ),
        # --version did not specify a semver version
        (
            test_config,
            Expected(error=AttributeError),
            ["--version", "2.0", "--devfile-schema", test_devfile_schema],
        ),
        # Cannot change an older released version without --release
        (
            test_config,
            Expected(error=RuntimeError),
            ["--version", "2.0.0", "--devfile-schema", test_devfile_schema],
        ),
        # Cannot change the stable version without --release
        (
            test_config,
            Expected(error=RuntimeError),
            ["--version", "2.1.0", "--devfile-schema", test_devfile_schema],
        ),
        # Renames an alpha version and publishes it
        (
            test_config,
            Expected(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
                doc_pages_directories=["2.0.0", "2.1.0", "2.2.0-alpha"],
                devfile_schema_files=["2.0.0.json", "2.1.0.json", "2.2.0-alpha.json"],
                navigation_files=["2.0.0.yaml", "2.1.0.yaml", "2.2.0-alpha.yaml"],
            ),
            ["--version", "2.2.0-alpha", "--devfile-schema", test_devfile_schema],
        ),
        # Publishes an alpha version
        (
            test_config,
            Expected(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha", "2.3.0-alpha"],
                doc_pages_directories=["2.0.0", "2.1.0", "2.2.0-alpha", "2.3.0-alpha"],
                devfile_schema_files=[
                    "2.0.0.json",
                    "2.1.0.json",
                    "2.2.0-alpha.json",
                    "2.3.0-alpha.json",
                ],
                navigation_files=[
                    "2.0.0.yaml",
                    "2.1.0.yaml",
                    "2.2.0-alpha.yaml",
                    "2.3.0-alpha.yaml",
                ],
            ),
            ["--version", "2.3.0-alpha", "--devfile-schema", test_devfile_schema],
        ),
        # Re-releases an older released version
        (
            test_config,
            Expected(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
                doc_pages_directories=["2.0.0", "2.1.0", "2.2.0-alpha"],
                devfile_schema_files=["2.0.0.json", "2.1.0.json", "2.2.0-alpha.json"],
                navigation_files=["2.0.0.yaml", "2.1.0.yaml", "2.2.0-alpha.yaml"],
            ),
            [
                "--version",
                "2.0.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # Re-releases the stable version
        (
            test_config,
            Expected(
                stable_version="2.1.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha"],
                doc_pages_directories=["2.0.0", "2.1.0", "2.2.0-alpha"],
                devfile_schema_files=["2.0.0.json", "2.1.0.json", "2.2.0-alpha.json"],
                navigation_files=["2.0.0.yaml", "2.1.0.yaml", "2.2.0-alpha.yaml"],
            ),
            [
                "--version",
                "2.1.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # Releases a newer already created version
        (
            test_config,
            Expected(
                stable_version="2.2.0",
                versions=["2.0.0", "2.1.0", "2.2.0"],
                doc_pages_directories=["2.0.0", "2.1.0", "2.2.0"],
                devfile_schema_files=["2.0.0.json", "2.1.0.json", "2.2.0.json"],
                navigation_files=["2.0.0.yaml", "2.1.0.yaml", "2.2.0.yaml"],
            ),
            [
                "--version",
                "2.2.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
        # Releases a newer version
        (
            test_config,
            Expected(
                stable_version="2.3.0",
                versions=["2.0.0", "2.1.0", "2.2.0-alpha", "2.3.0"],
                doc_pages_directories=["2.0.0", "2.1.0", "2.2.0-alpha", "2.3.0"],
                devfile_schema_files=[
                    "2.0.0.json",
                    "2.1.0.json",
                    "2.2.0-alpha.json",
                    "2.3.0.json",
                ],
                navigation_files=[
                    "2.0.0.yaml",
                    "2.1.0.yaml",
                    "2.2.0-alpha.yaml",
                    "2.3.0.yaml",
                ],
            ),
            [
                "--version",
                "2.3.0",
                "--devfile-schema",
                test_devfile_schema,
                "--release",
            ],
        ),
    ],
)
def test_main(config: Config, expected: Expected, argv: typing.List[str]) -> None:
    # Setup before each test
    cwd = os.getcwd()
    backup_directory = f"{cwd}/python/testing_directory/backup"
    test_directory = f"{cwd}/python/testing_directory/test"
    if os.path.exists(test_directory) and os.path.isdir(test_directory):
        shutil.rmtree(test_directory)
    shutil.copytree(backup_directory, test_directory)

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
        assert_list_equality(
            get_sub_directories(config.doc_pages), expected.doc_pages_directories
        )
        assert_list_equality(
            get_files(config.devfile_schema), expected.devfile_schema_files
        )
        assert_list_equality(get_files(config.navigation), expected.navigation_files)
