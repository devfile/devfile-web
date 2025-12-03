// To parse this data:
//
//   import { Convert, DevfileSpec } from "./file";
//
//   const devfileSpec = Convert.toDevfileSpec(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Devfile describes the structure of a cloud-native devworkspace and development
 * environment.
 */
export interface DevfileSpec {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Predefined, ready-to-use, devworkspace-related commands
     */
    commands?: DevfileSpecCommand[];
    /**
     * List of the devworkspace components, such as editor and plugins, user-provided
     * containers, or other types of components
     */
    components?: DevfileSpecComponent[];
    /**
     * Additional projects related to the main project in the devfile, contianing names and
     * sources locations
     */
    dependentProjects?: DevfileSpecDependentProject[];
    /**
     * Bindings of commands to events. Each command is referred-to by its name.
     */
    events?: Events;
    /**
     * Optional metadata
     */
    metadata?: Metadata;
    /**
     * Parent devworkspace template
     */
    parent?: Parent;
    /**
     * Projects worked on in the devworkspace, containing names and sources locations
     */
    projects?: DevfileSpecProject[];
    /**
     * Devfile schema version
     */
    schemaVersion: string;
    /**
     * StarterProjects is a project that can be used as a starting point when bootstrapping new
     * projects
     */
    starterProjects?: DevfileSpecStarterProject[];
    /**
     * Map of key-value variables used for string replacement in the devfile. Values can be
     * referenced via {{variable-key}} to replace the corresponding value in string fields in
     * the devfile. Replacement cannot be used for
     *
     * - schemaVersion, metadata, parent source
     *
     * - element identifiers, e.g. command id, component name, endpoint name, project name
     *
     * - references to identifiers, e.g. in events, a command's component, container's volume
     * mount name
     *
     * - string enums, e.g. command group kind, endpoint exposure
     */
    variables?: { [key: string]: string };
}

export interface DevfileSpecCommand {
    /**
     * Command that consists in applying a given component definition, typically bound to a
     * devworkspace event.
     *
     * For example, when an `apply` command is bound to a `preStart` event, and references a
     * `container` component, it will start the container as a K8S initContainer in the
     * devworkspace POD, unless the component has its `dedicatedPod` field set to `true`.
     *
     * When no `apply` command exist for a given component, it is assumed the component will be
     * applied at devworkspace start by default, unless `deployByDefault` for that component is
     * set to false.
     */
    apply?: PurpleApply;
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Composite command that allows executing several sub-commands either sequentially or
     * concurrently
     */
    composite?: PurpleComposite;
    /**
     * CLI Command executed in an existing component container
     */
    exec?: PurpleExec;
    /**
     * Mandatory identifier that allows referencing this command in composite commands, from a
     * parent, or in events.
     */
    id: string;
}

/**
 * Command that consists in applying a given component definition, typically bound to a
 * devworkspace event.
 *
 * For example, when an `apply` command is bound to a `preStart` event, and references a
 * `container` component, it will start the container as a K8S initContainer in the
 * devworkspace POD, unless the component has its `dedicatedPod` field set to `true`.
 *
 * When no `apply` command exist for a given component, it is assumed the component will be
 * applied at devworkspace start by default, unless `deployByDefault` for that component is
 * set to false.
 */
export interface PurpleApply {
    /**
     * Describes component that will be applied
     */
    component: string;
    /**
     * Defines the group this command is part of
     */
    group?: PurpleGroup;
    /**
     * Optional label that provides a label for this command to be used in Editor UI menus for
     * example
     */
    label?: string;
}

/**
 * Defines the group this command is part of
 */
export interface PurpleGroup {
    /**
     * Identifies the default command for a given group kind
     */
    isDefault?: boolean;
    /**
     * Kind of group the command is part of
     */
    kind: Kind;
}

/**
 * Kind of group the command is part of
 */
export enum Kind {
    Build = "build",
    Debug = "debug",
    Deploy = "deploy",
    Run = "run",
    Test = "test",
}

/**
 * Composite command that allows executing several sub-commands either sequentially or
 * concurrently
 */
export interface PurpleComposite {
    /**
     * The commands that comprise this composite command
     */
    commands?: string[];
    /**
     * Defines the group this command is part of
     */
    group?: FluffyGroup;
    /**
     * Optional label that provides a label for this command to be used in Editor UI menus for
     * example
     */
    label?: string;
    /**
     * Indicates if the sub-commands should be executed concurrently
     */
    parallel?: boolean;
}

/**
 * Defines the group this command is part of
 */
export interface FluffyGroup {
    /**
     * Identifies the default command for a given group kind
     */
    isDefault?: boolean;
    /**
     * Kind of group the command is part of
     */
    kind: Kind;
}

/**
 * CLI Command executed in an existing component container
 */
export interface PurpleExec {
    /**
     * The actual command-line string
     *
     * Special variables that can be used:
     *
     * - `$PROJECTS_ROOT`: A path where projects sources are mounted as defined by container
     * component's sourceMapping.
     *
     * - `$PROJECT_SOURCE`: A path to a project source ($PROJECTS_ROOT/<project-name>). If there
     * are multiple projects, this will point to the directory of the first one.
     */
    commandLine: string;
    /**
     * Describes component to which given action relates
     */
    component: string;
    /**
     * Optional list of environment variables that have to be set before running the command
     */
    env?: PurpleEnv[];
    /**
     * Defines the group this command is part of
     */
    group?: TentacledGroup;
    /**
     * Specify whether the command is restarted or not when the source code changes. If set to
     * `true` the command won't be restarted. A *hotReloadCapable* `run` or `debug` command is
     * expected to handle file changes on its own and won't be restarted. A *hotReloadCapable*
     * `build` command is expected to be executed only once and won't be executed again. This
     * field is taken into account only for commands `build`, `run` and `debug` with `isDefault`
     * set to `true`.
     *
     * Default value is `false`
     */
    hotReloadCapable?: boolean;
    /**
     * Optional label that provides a label for this command to be used in Editor UI menus for
     * example
     */
    label?: string;
    /**
     * Working directory where the command should be executed
     *
     * Special variables that can be used:
     *
     * - `$PROJECTS_ROOT`: A path where projects sources are mounted as defined by container
     * component's sourceMapping.
     *
     * - `$PROJECT_SOURCE`: A path to a project source ($PROJECTS_ROOT/<project-name>). If there
     * are multiple projects, this will point to the directory of the first one.
     */
    workingDir?: string;
}

export interface PurpleEnv {
    name:  string;
    value: string;
}

/**
 * Defines the group this command is part of
 */
export interface TentacledGroup {
    /**
     * Identifies the default command for a given group kind
     */
    isDefault?: boolean;
    /**
     * Kind of group the command is part of
     */
    kind: Kind;
}

export interface DevfileSpecComponent {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Allows adding and configuring devworkspace-related containers
     */
    container?: PurpleContainer;
    /**
     * Allows specifying the definition of an image for outer loop builds
     */
    image?: PurpleImage;
    /**
     * Allows importing into the devworkspace the Kubernetes resources defined in a given
     * manifest. For example this allows reusing the Kubernetes definitions used to deploy some
     * runtime components in production.
     */
    kubernetes?: PurpleKubernetes;
    /**
     * Mandatory name that allows referencing the component from other elements (such as
     * commands) or from an external devfile that may reference this component through a parent
     * or a plugin.
     */
    name: string;
    /**
     * Allows importing into the devworkspace the OpenShift resources defined in a given
     * manifest. For example this allows reusing the OpenShift definitions used to deploy some
     * runtime components in production.
     */
    openshift?: PurpleOpenshift;
    /**
     * Allows specifying the definition of a volume shared by several other components
     */
    volume?: PurpleVolume;
}

/**
 * Allows adding and configuring devworkspace-related containers
 */
export interface PurpleContainer {
    /**
     * Annotations that should be added to specific resources for this container
     */
    annotation?: PurpleAnnotation;
    /**
     * The arguments to supply to the command running the dockerimage component. The arguments
     * are supplied either to the default command provided in the image or to the overridden
     * command.
     *
     * Defaults to an empty array, meaning use whatever is defined in the image.
     */
    args?: string[];
    /**
     * The command to run in the dockerimage component instead of the default one provided in
     * the image.
     *
     * Defaults to an empty array, meaning use whatever is defined in the image.
     */
    command?:    string[];
    cpuLimit?:   string;
    cpuRequest?: string;
    /**
     * Specify if a container should run in its own separated pod, instead of running as part of
     * the main development environment pod.
     *
     * Default value is `false`
     */
    dedicatedPod?: boolean;
    endpoints?:    PurpleEndpoint[];
    /**
     * Environment variables used in this container.
     *
     * The following variables are reserved and cannot be overridden via env:
     *
     * - `$PROJECTS_ROOT`
     *
     * - `$PROJECT_SOURCE`
     */
    env?:           FluffyEnv[];
    image:          string;
    memoryLimit?:   string;
    memoryRequest?: string;
    /**
     * Toggles whether or not the project source code should be mounted in the component.
     *
     * Defaults to true for all component types except plugins and components that set
     * `dedicatedPod` to true.
     */
    mountSources?: boolean;
    /**
     * Optional specification of the path in the container where project sources should be
     * transferred/mounted when `mountSources` is `true`. When omitted, the default value of
     * /projects is used.
     */
    sourceMapping?: string;
    /**
     * List of volumes mounts that should be mounted is this container.
     */
    volumeMounts?: PurpleVolumeMount[];
}

/**
 * Annotations that should be added to specific resources for this container
 */
export interface PurpleAnnotation {
    /**
     * Annotations to be added to deployment
     */
    deployment?: { [key: string]: string };
    /**
     * Annotations to be added to service
     */
    service?: { [key: string]: string };
}

export interface PurpleEndpoint {
    /**
     * Annotations to be added to Kubernetes Ingress or Openshift Route
     */
    annotation?: { [key: string]: string };
    /**
     * Map of implementation-dependant string-based free-form attributes.
     *
     * Examples of Che-specific attributes:
     * - cookiesAuthEnabled: "true" / "false",
     * - type: "terminal" / "ide" / "ide-dev",
     */
    attributes?: { [key: string]: any };
    /**
     * Describes how the endpoint should be exposed on the network.
     * - `public` means that the endpoint will be exposed on the public network, typically
     * through a K8S ingress or an OpenShift route.
     * - `internal` means that the endpoint will be exposed internally outside of the main
     * devworkspace POD, typically by K8S services, to be consumed by other elements running on
     * the same cloud internal network.
     * - `none` means that the endpoint will not be exposed and will only be accessible inside
     * the main devworkspace POD, on a local address.
     *
     * Default value is `public`
     */
    exposure?: Exposure;
    name:      string;
    /**
     * Path of the endpoint URL
     */
    path?: string;
    /**
     * Describes the application and transport protocols of the traffic that will go through
     * this endpoint.
     * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `https` when the `secure` field is set to `true`.
     * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
     * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `wss` when the `secure` field is set to `true`.
     * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
     * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
     * application protocol.
     * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
     * application protocol.
     *
     * Default value is `http`
     */
    protocol?: Protocol;
    /**
     * Describes whether the endpoint should be secured and protected by some authentication
     * process. This requires a protocol of `https` or `wss`.
     */
    secure?: boolean;
    /**
     * Port number to be used within the container component. The same port cannot be used by
     * two different container components.
     */
    targetPort: number;
}

/**
 * Describes how the endpoint should be exposed on the network.
 * - `public` means that the endpoint will be exposed on the public network, typically
 * through a K8S ingress or an OpenShift route.
 * - `internal` means that the endpoint will be exposed internally outside of the main
 * devworkspace POD, typically by K8S services, to be consumed by other elements running on
 * the same cloud internal network.
 * - `none` means that the endpoint will not be exposed and will only be accessible inside
 * the main devworkspace POD, on a local address.
 *
 * Default value is `public`
 */
export enum Exposure {
    Internal = "internal",
    None = "none",
    Public = "public",
}

/**
 * Describes the application and transport protocols of the traffic that will go through
 * this endpoint.
 * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
 * automaticaly promoted to `https` when the `secure` field is set to `true`.
 * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
 * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
 * automaticaly promoted to `wss` when the `secure` field is set to `true`.
 * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
 * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
 * application protocol.
 * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
 * application protocol.
 *
 * Default value is `http`
 */
export enum Protocol {
    HTTP = "http",
    HTTPS = "https",
    TCP = "tcp",
    UDP = "udp",
    Ws = "ws",
    Wss = "wss",
}

export interface FluffyEnv {
    name:  string;
    value: string;
}

/**
 * Volume that should be mounted to a component container
 */
export interface PurpleVolumeMount {
    /**
     * The volume mount name is the name of an existing `Volume` component. If several
     * containers mount the same volume name then they will reuse the same volume and will be
     * able to access to the same files.
     */
    name: string;
    /**
     * The path in the component container where the volume should be mounted. If not path is
     * mentioned, default path is the is `/<name>`.
     */
    path?: string;
}

/**
 * Allows specifying the definition of an image for outer loop builds
 */
export interface PurpleImage {
    /**
     * Defines if the image should be built during startup.
     *
     * Default value is `false`
     */
    autoBuild?: boolean;
    /**
     * Allows specifying dockerfile type build
     */
    dockerfile: PurpleDockerfile;
    /**
     * Name of the image for the resulting outerloop build
     */
    imageName: string;
}

/**
 * Allows specifying dockerfile type build
 */
export interface PurpleDockerfile {
    /**
     * The arguments to supply to the dockerfile build.
     */
    args?: string[];
    /**
     * Path of source directory to establish build context. Defaults to ${PROJECT_SOURCE} in the
     * container
     */
    buildContext?: string;
    /**
     * Dockerfile's Devfile Registry source
     */
    devfileRegistry?: PurpleDevfileRegistry;
    /**
     * Dockerfile's Git source
     */
    git?: PurpleGit;
    /**
     * Specify if a privileged builder pod is required.
     *
     * Default value is `false`
     */
    rootRequired?: boolean;
    /**
     * URI Reference of a Dockerfile. It can be a full URL or a relative URI from the current
     * devfile as the base URI.
     */
    uri?: string;
}

/**
 * Dockerfile's Devfile Registry source
 */
export interface PurpleDevfileRegistry {
    /**
     * Id in a devfile registry that contains a Dockerfile. The src in the OCI registry required
     * for the Dockerfile build will be downloaded for building the image.
     */
    id: string;
    /**
     * Devfile Registry URL to pull the Dockerfile from when using the Devfile Registry as
     * Dockerfile src. To ensure the Dockerfile gets resolved consistently in different
     * environments, it is recommended to always specify the `devfileRegistryUrl` when `Id` is
     * used.
     */
    registryUrl?: string;
}

/**
 * Dockerfile's Git source
 */
export interface PurpleGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: PurpleCheckoutFrom;
    /**
     * Location of the Dockerfile in the Git repository when using git as Dockerfile src.
     * Defaults to Dockerfile.
     */
    fileLocation?: string;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface PurpleCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Allows importing into the devworkspace the Kubernetes resources defined in a given
 * manifest. For example this allows reusing the Kubernetes definitions used to deploy some
 * runtime components in production.
 */
export interface PurpleKubernetes {
    /**
     * Defines if the component should be deployed during startup.
     *
     * Default value is `false`
     */
    deployByDefault?: boolean;
    endpoints?:       FluffyEndpoint[];
    /**
     * Inlined manifest
     */
    inlined?: string;
    /**
     * Location in a file fetched from a uri.
     */
    uri?: string;
}

export interface FluffyEndpoint {
    /**
     * Annotations to be added to Kubernetes Ingress or Openshift Route
     */
    annotation?: { [key: string]: string };
    /**
     * Map of implementation-dependant string-based free-form attributes.
     *
     * Examples of Che-specific attributes:
     * - cookiesAuthEnabled: "true" / "false",
     * - type: "terminal" / "ide" / "ide-dev",
     */
    attributes?: { [key: string]: any };
    /**
     * Describes how the endpoint should be exposed on the network.
     * - `public` means that the endpoint will be exposed on the public network, typically
     * through a K8S ingress or an OpenShift route.
     * - `internal` means that the endpoint will be exposed internally outside of the main
     * devworkspace POD, typically by K8S services, to be consumed by other elements running on
     * the same cloud internal network.
     * - `none` means that the endpoint will not be exposed and will only be accessible inside
     * the main devworkspace POD, on a local address.
     *
     * Default value is `public`
     */
    exposure?: Exposure;
    name:      string;
    /**
     * Path of the endpoint URL
     */
    path?: string;
    /**
     * Describes the application and transport protocols of the traffic that will go through
     * this endpoint.
     * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `https` when the `secure` field is set to `true`.
     * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
     * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `wss` when the `secure` field is set to `true`.
     * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
     * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
     * application protocol.
     * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
     * application protocol.
     *
     * Default value is `http`
     */
    protocol?: Protocol;
    /**
     * Describes whether the endpoint should be secured and protected by some authentication
     * process. This requires a protocol of `https` or `wss`.
     */
    secure?: boolean;
    /**
     * Port number to be used within the container component. The same port cannot be used by
     * two different container components.
     */
    targetPort: number;
}

/**
 * Allows importing into the devworkspace the OpenShift resources defined in a given
 * manifest. For example this allows reusing the OpenShift definitions used to deploy some
 * runtime components in production.
 */
export interface PurpleOpenshift {
    /**
     * Defines if the component should be deployed during startup.
     *
     * Default value is `false`
     */
    deployByDefault?: boolean;
    endpoints?:       TentacledEndpoint[];
    /**
     * Inlined manifest
     */
    inlined?: string;
    /**
     * Location in a file fetched from a uri.
     */
    uri?: string;
}

export interface TentacledEndpoint {
    /**
     * Annotations to be added to Kubernetes Ingress or Openshift Route
     */
    annotation?: { [key: string]: string };
    /**
     * Map of implementation-dependant string-based free-form attributes.
     *
     * Examples of Che-specific attributes:
     * - cookiesAuthEnabled: "true" / "false",
     * - type: "terminal" / "ide" / "ide-dev",
     */
    attributes?: { [key: string]: any };
    /**
     * Describes how the endpoint should be exposed on the network.
     * - `public` means that the endpoint will be exposed on the public network, typically
     * through a K8S ingress or an OpenShift route.
     * - `internal` means that the endpoint will be exposed internally outside of the main
     * devworkspace POD, typically by K8S services, to be consumed by other elements running on
     * the same cloud internal network.
     * - `none` means that the endpoint will not be exposed and will only be accessible inside
     * the main devworkspace POD, on a local address.
     *
     * Default value is `public`
     */
    exposure?: Exposure;
    name:      string;
    /**
     * Path of the endpoint URL
     */
    path?: string;
    /**
     * Describes the application and transport protocols of the traffic that will go through
     * this endpoint.
     * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `https` when the `secure` field is set to `true`.
     * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
     * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `wss` when the `secure` field is set to `true`.
     * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
     * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
     * application protocol.
     * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
     * application protocol.
     *
     * Default value is `http`
     */
    protocol?: Protocol;
    /**
     * Describes whether the endpoint should be secured and protected by some authentication
     * process. This requires a protocol of `https` or `wss`.
     */
    secure?: boolean;
    /**
     * Port number to be used within the container component. The same port cannot be used by
     * two different container components.
     */
    targetPort: number;
}

/**
 * Allows specifying the definition of a volume shared by several other components
 */
export interface PurpleVolume {
    /**
     * Ephemeral volumes are not stored persistently across restarts. Defaults to false
     */
    ephemeral?: boolean;
    /**
     * Size of the volume
     */
    size?: string;
}

export interface DevfileSpecDependentProject {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Path relative to the root of the projects to which this project should be cloned into.
     * This is a unix-style relative path (i.e. uses forward slashes). The path is invalid if it
     * is absolute or tries to escape the project root through the usage of '..'. If not
     * specified, defaults to the project name.
     */
    clonePath?: string;
    /**
     * Project's Git source
     */
    git?: FluffyGit;
    /**
     * Project name
     */
    name: string;
    /**
     * Project's Zip source
     */
    zip?: PurpleZip;
}

/**
 * Project's Git source
 */
export interface FluffyGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: FluffyCheckoutFrom;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface FluffyCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Project's Zip source
 */
export interface PurpleZip {
    /**
     * Zip project's source location address. Should be file path of the archive, e.g.
     * file://$FILE_PATH
     */
    location?: string;
}

/**
 * Bindings of commands to events. Each command is referred-to by its name.
 */
export interface Events {
    /**
     * IDs of commands that should be executed after the devworkspace is completely started. In
     * the case of Che-Theia, these commands should be executed after all plugins and extensions
     * have started, including project cloning. This means that those commands are not triggered
     * until the user opens the IDE in his browser.
     */
    postStart?: string[];
    /**
     * IDs of commands that should be executed after stopping the devworkspace.
     */
    postStop?: string[];
    /**
     * IDs of commands that should be executed before the devworkspace start. Kubernetes-wise,
     * these commands would typically be executed in init containers of the devworkspace POD.
     */
    preStart?: string[];
    /**
     * IDs of commands that should be executed before stopping the devworkspace.
     */
    preStop?: string[];
}

/**
 * Optional metadata
 */
export interface Metadata {
    /**
     * Optional list of processor architectures that the devfile supports, empty list suggests
     * that the devfile can be used on any architecture
     */
    architectures?: Architecture[];
    /**
     * Map of implementation-dependant free-form YAML attributes. Deprecated, use the top-level
     * attributes field instead.
     */
    attributes?: { [key: string]: any };
    /**
     * Optional devfile description
     */
    description?: string;
    /**
     * Optional devfile display name
     */
    displayName?: string;
    /**
     * Optional devfile global memory limit
     */
    globalMemoryLimit?: string;
    /**
     * Optional devfile icon, can be a URI or a relative path in the project
     */
    icon?: string;
    /**
     * Optional devfile language
     */
    language?: string;
    /**
     * Optional devfile name
     */
    name?: string;
    /**
     * Optional devfile project type
     */
    projectType?: string;
    /**
     * Optional devfile provider information
     */
    provider?: string;
    /**
     * Optional link to a page that provides support information
     */
    supportUrl?: string;
    /**
     * Optional devfile tags
     */
    tags?: string[];
    /**
     * Optional semver-compatible version
     */
    version?: string;
    /**
     * Optional devfile website
     */
    website?: string;
    [property: string]: any;
}

/**
 * Architecture describes the architecture type
 */
export enum Architecture {
    Amd64 = "amd64",
    Arm64 = "arm64",
    Ppc64LE = "ppc64le",
    S390X = "s390x",
}

/**
 * Parent devworkspace template
 */
export interface Parent {
    /**
     * Overrides of attributes encapsulated in a parent devfile. Overriding is done according to
     * K8S strategic merge patch standard rules.
     */
    attributes?: { [key: string]: any };
    /**
     * Overrides of commands encapsulated in a parent devfile or a plugin. Overriding is done
     * according to K8S strategic merge patch standard rules.
     */
    commands?: ParentCommand[];
    /**
     * Overrides of components encapsulated in a parent devfile or a plugin. Overriding is done
     * according to K8S strategic merge patch standard rules.
     */
    components?: ParentComponent[];
    /**
     * Overrides of dependentProjects encapsulated in a parent devfile. Overriding is done
     * according to K8S strategic merge patch standard rules.
     */
    dependentProjects?: ParentDependentProject[];
    /**
     * Id in a registry that contains a Devfile yaml file
     */
    id?: string;
    /**
     * Reference to a Kubernetes CRD of type DevWorkspaceTemplate
     */
    kubernetes?: ParentKubernetes;
    /**
     * Overrides of projects encapsulated in a parent devfile. Overriding is done according to
     * K8S strategic merge patch standard rules.
     */
    projects?: ParentProject[];
    /**
     * Registry URL to pull the parent devfile from when using id in the parent reference. To
     * ensure the parent devfile gets resolved consistently in different environments, it is
     * recommended to always specify the `registryUrl` when `id` is used.
     */
    registryUrl?: string;
    /**
     * Overrides of starterProjects encapsulated in a parent devfile. Overriding is done
     * according to K8S strategic merge patch standard rules.
     */
    starterProjects?: ParentStarterProject[];
    /**
     * URI Reference of a parent devfile YAML file. It can be a full URL or a relative URI with
     * the current devfile as the base URI.
     */
    uri?: string;
    /**
     * Overrides of variables encapsulated in a parent devfile. Overriding is done according to
     * K8S strategic merge patch standard rules.
     */
    variables?: { [key: string]: string };
    /**
     * Specific stack/sample version to pull the parent devfile from, when using id in the
     * parent reference. To specify `version`, `id` must be defined and used as the import
     * reference source. `version` can be either a specific stack version, or `latest`. If no
     * `version` specified, default version will be used.
     */
    version?: string;
}

export interface ParentCommand {
    /**
     * Command that consists in applying a given component definition, typically bound to a
     * devworkspace event.
     *
     * For example, when an `apply` command is bound to a `preStart` event, and references a
     * `container` component, it will start the container as a K8S initContainer in the
     * devworkspace POD, unless the component has its `dedicatedPod` field set to `true`.
     *
     * When no `apply` command exist for a given component, it is assumed the component will be
     * applied at devworkspace start by default, unless `deployByDefault` for that component is
     * set to false.
     */
    apply?: FluffyApply;
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Composite command that allows executing several sub-commands either sequentially or
     * concurrently
     */
    composite?: FluffyComposite;
    /**
     * CLI Command executed in an existing component container
     */
    exec?: FluffyExec;
    /**
     * Mandatory identifier that allows referencing this command in composite commands, from a
     * parent, or in events.
     */
    id: string;
}

/**
 * Command that consists in applying a given component definition, typically bound to a
 * devworkspace event.
 *
 * For example, when an `apply` command is bound to a `preStart` event, and references a
 * `container` component, it will start the container as a K8S initContainer in the
 * devworkspace POD, unless the component has its `dedicatedPod` field set to `true`.
 *
 * When no `apply` command exist for a given component, it is assumed the component will be
 * applied at devworkspace start by default, unless `deployByDefault` for that component is
 * set to false.
 */
export interface FluffyApply {
    /**
     * Describes component that will be applied
     */
    component?: string;
    /**
     * Defines the group this command is part of
     */
    group?: StickyGroup;
    /**
     * Optional label that provides a label for this command to be used in Editor UI menus for
     * example
     */
    label?: string;
}

/**
 * Defines the group this command is part of
 */
export interface StickyGroup {
    /**
     * Identifies the default command for a given group kind
     */
    isDefault?: boolean;
    /**
     * Kind of group the command is part of
     */
    kind?: Kind;
}

/**
 * Composite command that allows executing several sub-commands either sequentially or
 * concurrently
 */
export interface FluffyComposite {
    /**
     * The commands that comprise this composite command
     */
    commands?: string[];
    /**
     * Defines the group this command is part of
     */
    group?: IndigoGroup;
    /**
     * Optional label that provides a label for this command to be used in Editor UI menus for
     * example
     */
    label?: string;
    /**
     * Indicates if the sub-commands should be executed concurrently
     */
    parallel?: boolean;
}

/**
 * Defines the group this command is part of
 */
export interface IndigoGroup {
    /**
     * Identifies the default command for a given group kind
     */
    isDefault?: boolean;
    /**
     * Kind of group the command is part of
     */
    kind?: Kind;
}

/**
 * CLI Command executed in an existing component container
 */
export interface FluffyExec {
    /**
     * The actual command-line string
     *
     * Special variables that can be used:
     *
     * - `$PROJECTS_ROOT`: A path where projects sources are mounted as defined by container
     * component's sourceMapping.
     *
     * - `$PROJECT_SOURCE`: A path to a project source ($PROJECTS_ROOT/<project-name>). If there
     * are multiple projects, this will point to the directory of the first one.
     */
    commandLine?: string;
    /**
     * Describes component to which given action relates
     */
    component?: string;
    /**
     * Optional list of environment variables that have to be set before running the command
     */
    env?: TentacledEnv[];
    /**
     * Defines the group this command is part of
     */
    group?: IndecentGroup;
    /**
     * Specify whether the command is restarted or not when the source code changes. If set to
     * `true` the command won't be restarted. A *hotReloadCapable* `run` or `debug` command is
     * expected to handle file changes on its own and won't be restarted. A *hotReloadCapable*
     * `build` command is expected to be executed only once and won't be executed again. This
     * field is taken into account only for commands `build`, `run` and `debug` with `isDefault`
     * set to `true`.
     *
     * Default value is `false`
     */
    hotReloadCapable?: boolean;
    /**
     * Optional label that provides a label for this command to be used in Editor UI menus for
     * example
     */
    label?: string;
    /**
     * Working directory where the command should be executed
     *
     * Special variables that can be used:
     *
     * - `$PROJECTS_ROOT`: A path where projects sources are mounted as defined by container
     * component's sourceMapping.
     *
     * - `$PROJECT_SOURCE`: A path to a project source ($PROJECTS_ROOT/<project-name>). If there
     * are multiple projects, this will point to the directory of the first one.
     */
    workingDir?: string;
}

export interface TentacledEnv {
    name:   string;
    value?: string;
}

/**
 * Defines the group this command is part of
 */
export interface IndecentGroup {
    /**
     * Identifies the default command for a given group kind
     */
    isDefault?: boolean;
    /**
     * Kind of group the command is part of
     */
    kind?: Kind;
}

export interface ParentComponent {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Allows adding and configuring devworkspace-related containers
     */
    container?: FluffyContainer;
    /**
     * Allows specifying the definition of an image for outer loop builds
     */
    image?: FluffyImage;
    /**
     * Allows importing into the devworkspace the Kubernetes resources defined in a given
     * manifest. For example this allows reusing the Kubernetes definitions used to deploy some
     * runtime components in production.
     */
    kubernetes?: FluffyKubernetes;
    /**
     * Mandatory name that allows referencing the component from other elements (such as
     * commands) or from an external devfile that may reference this component through a parent
     * or a plugin.
     */
    name: string;
    /**
     * Allows importing into the devworkspace the OpenShift resources defined in a given
     * manifest. For example this allows reusing the OpenShift definitions used to deploy some
     * runtime components in production.
     */
    openshift?: FluffyOpenshift;
    /**
     * Allows specifying the definition of a volume shared by several other components
     */
    volume?: FluffyVolume;
}

/**
 * Allows adding and configuring devworkspace-related containers
 */
export interface FluffyContainer {
    /**
     * Annotations that should be added to specific resources for this container
     */
    annotation?: FluffyAnnotation;
    /**
     * The arguments to supply to the command running the dockerimage component. The arguments
     * are supplied either to the default command provided in the image or to the overridden
     * command.
     *
     * Defaults to an empty array, meaning use whatever is defined in the image.
     */
    args?: string[];
    /**
     * The command to run in the dockerimage component instead of the default one provided in
     * the image.
     *
     * Defaults to an empty array, meaning use whatever is defined in the image.
     */
    command?:    string[];
    cpuLimit?:   string;
    cpuRequest?: string;
    /**
     * Specify if a container should run in its own separated pod, instead of running as part of
     * the main development environment pod.
     *
     * Default value is `false`
     */
    dedicatedPod?: boolean;
    endpoints?:    StickyEndpoint[];
    /**
     * Environment variables used in this container.
     *
     * The following variables are reserved and cannot be overridden via env:
     *
     * - `$PROJECTS_ROOT`
     *
     * - `$PROJECT_SOURCE`
     */
    env?:           StickyEnv[];
    image?:         string;
    memoryLimit?:   string;
    memoryRequest?: string;
    /**
     * Toggles whether or not the project source code should be mounted in the component.
     *
     * Defaults to true for all component types except plugins and components that set
     * `dedicatedPod` to true.
     */
    mountSources?: boolean;
    /**
     * Optional specification of the path in the container where project sources should be
     * transferred/mounted when `mountSources` is `true`. When omitted, the default value of
     * /projects is used.
     */
    sourceMapping?: string;
    /**
     * List of volumes mounts that should be mounted is this container.
     */
    volumeMounts?: FluffyVolumeMount[];
}

/**
 * Annotations that should be added to specific resources for this container
 */
export interface FluffyAnnotation {
    /**
     * Annotations to be added to deployment
     */
    deployment?: { [key: string]: string };
    /**
     * Annotations to be added to service
     */
    service?: { [key: string]: string };
}

export interface StickyEndpoint {
    /**
     * Annotations to be added to Kubernetes Ingress or Openshift Route
     */
    annotation?: { [key: string]: string };
    /**
     * Map of implementation-dependant string-based free-form attributes.
     *
     * Examples of Che-specific attributes:
     * - cookiesAuthEnabled: "true" / "false",
     * - type: "terminal" / "ide" / "ide-dev",
     */
    attributes?: { [key: string]: any };
    /**
     * Describes how the endpoint should be exposed on the network.
     * - `public` means that the endpoint will be exposed on the public network, typically
     * through a K8S ingress or an OpenShift route.
     * - `internal` means that the endpoint will be exposed internally outside of the main
     * devworkspace POD, typically by K8S services, to be consumed by other elements running on
     * the same cloud internal network.
     * - `none` means that the endpoint will not be exposed and will only be accessible inside
     * the main devworkspace POD, on a local address.
     *
     * Default value is `public`
     */
    exposure?: Exposure;
    name:      string;
    /**
     * Path of the endpoint URL
     */
    path?: string;
    /**
     * Describes the application and transport protocols of the traffic that will go through
     * this endpoint.
     * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `https` when the `secure` field is set to `true`.
     * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
     * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `wss` when the `secure` field is set to `true`.
     * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
     * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
     * application protocol.
     * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
     * application protocol.
     *
     * Default value is `http`
     */
    protocol?: Protocol;
    /**
     * Describes whether the endpoint should be secured and protected by some authentication
     * process. This requires a protocol of `https` or `wss`.
     */
    secure?: boolean;
    /**
     * Port number to be used within the container component. The same port cannot be used by
     * two different container components.
     */
    targetPort?: number;
}

export interface StickyEnv {
    name:   string;
    value?: string;
}

/**
 * Volume that should be mounted to a component container
 */
export interface FluffyVolumeMount {
    /**
     * The volume mount name is the name of an existing `Volume` component. If several
     * containers mount the same volume name then they will reuse the same volume and will be
     * able to access to the same files.
     */
    name: string;
    /**
     * The path in the component container where the volume should be mounted. If not path is
     * mentioned, default path is the is `/<name>`.
     */
    path?: string;
}

/**
 * Allows specifying the definition of an image for outer loop builds
 */
export interface FluffyImage {
    /**
     * Defines if the image should be built during startup.
     *
     * Default value is `false`
     */
    autoBuild?: boolean;
    /**
     * Allows specifying dockerfile type build
     */
    dockerfile?: FluffyDockerfile;
    /**
     * Name of the image for the resulting outerloop build
     */
    imageName?: string;
}

/**
 * Allows specifying dockerfile type build
 */
export interface FluffyDockerfile {
    /**
     * The arguments to supply to the dockerfile build.
     */
    args?: string[];
    /**
     * Path of source directory to establish build context. Defaults to ${PROJECT_SOURCE} in the
     * container
     */
    buildContext?: string;
    /**
     * Dockerfile's Devfile Registry source
     */
    devfileRegistry?: FluffyDevfileRegistry;
    /**
     * Dockerfile's Git source
     */
    git?: TentacledGit;
    /**
     * Specify if a privileged builder pod is required.
     *
     * Default value is `false`
     */
    rootRequired?: boolean;
    /**
     * URI Reference of a Dockerfile. It can be a full URL or a relative URI from the current
     * devfile as the base URI.
     */
    uri?: string;
}

/**
 * Dockerfile's Devfile Registry source
 */
export interface FluffyDevfileRegistry {
    /**
     * Id in a devfile registry that contains a Dockerfile. The src in the OCI registry required
     * for the Dockerfile build will be downloaded for building the image.
     */
    id?: string;
    /**
     * Devfile Registry URL to pull the Dockerfile from when using the Devfile Registry as
     * Dockerfile src. To ensure the Dockerfile gets resolved consistently in different
     * environments, it is recommended to always specify the `devfileRegistryUrl` when `Id` is
     * used.
     */
    registryUrl?: string;
}

/**
 * Dockerfile's Git source
 */
export interface TentacledGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: TentacledCheckoutFrom;
    /**
     * Location of the Dockerfile in the Git repository when using git as Dockerfile src.
     * Defaults to Dockerfile.
     */
    fileLocation?: string;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes?: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface TentacledCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Allows importing into the devworkspace the Kubernetes resources defined in a given
 * manifest. For example this allows reusing the Kubernetes definitions used to deploy some
 * runtime components in production.
 */
export interface FluffyKubernetes {
    /**
     * Defines if the component should be deployed during startup.
     *
     * Default value is `false`
     */
    deployByDefault?: boolean;
    endpoints?:       IndigoEndpoint[];
    /**
     * Inlined manifest
     */
    inlined?: string;
    /**
     * Location in a file fetched from a uri.
     */
    uri?: string;
}

export interface IndigoEndpoint {
    /**
     * Annotations to be added to Kubernetes Ingress or Openshift Route
     */
    annotation?: { [key: string]: string };
    /**
     * Map of implementation-dependant string-based free-form attributes.
     *
     * Examples of Che-specific attributes:
     * - cookiesAuthEnabled: "true" / "false",
     * - type: "terminal" / "ide" / "ide-dev",
     */
    attributes?: { [key: string]: any };
    /**
     * Describes how the endpoint should be exposed on the network.
     * - `public` means that the endpoint will be exposed on the public network, typically
     * through a K8S ingress or an OpenShift route.
     * - `internal` means that the endpoint will be exposed internally outside of the main
     * devworkspace POD, typically by K8S services, to be consumed by other elements running on
     * the same cloud internal network.
     * - `none` means that the endpoint will not be exposed and will only be accessible inside
     * the main devworkspace POD, on a local address.
     *
     * Default value is `public`
     */
    exposure?: Exposure;
    name:      string;
    /**
     * Path of the endpoint URL
     */
    path?: string;
    /**
     * Describes the application and transport protocols of the traffic that will go through
     * this endpoint.
     * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `https` when the `secure` field is set to `true`.
     * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
     * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `wss` when the `secure` field is set to `true`.
     * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
     * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
     * application protocol.
     * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
     * application protocol.
     *
     * Default value is `http`
     */
    protocol?: Protocol;
    /**
     * Describes whether the endpoint should be secured and protected by some authentication
     * process. This requires a protocol of `https` or `wss`.
     */
    secure?: boolean;
    /**
     * Port number to be used within the container component. The same port cannot be used by
     * two different container components.
     */
    targetPort?: number;
}

/**
 * Allows importing into the devworkspace the OpenShift resources defined in a given
 * manifest. For example this allows reusing the OpenShift definitions used to deploy some
 * runtime components in production.
 */
export interface FluffyOpenshift {
    /**
     * Defines if the component should be deployed during startup.
     *
     * Default value is `false`
     */
    deployByDefault?: boolean;
    endpoints?:       IndecentEndpoint[];
    /**
     * Inlined manifest
     */
    inlined?: string;
    /**
     * Location in a file fetched from a uri.
     */
    uri?: string;
}

export interface IndecentEndpoint {
    /**
     * Annotations to be added to Kubernetes Ingress or Openshift Route
     */
    annotation?: { [key: string]: string };
    /**
     * Map of implementation-dependant string-based free-form attributes.
     *
     * Examples of Che-specific attributes:
     * - cookiesAuthEnabled: "true" / "false",
     * - type: "terminal" / "ide" / "ide-dev",
     */
    attributes?: { [key: string]: any };
    /**
     * Describes how the endpoint should be exposed on the network.
     * - `public` means that the endpoint will be exposed on the public network, typically
     * through a K8S ingress or an OpenShift route.
     * - `internal` means that the endpoint will be exposed internally outside of the main
     * devworkspace POD, typically by K8S services, to be consumed by other elements running on
     * the same cloud internal network.
     * - `none` means that the endpoint will not be exposed and will only be accessible inside
     * the main devworkspace POD, on a local address.
     *
     * Default value is `public`
     */
    exposure?: Exposure;
    name:      string;
    /**
     * Path of the endpoint URL
     */
    path?: string;
    /**
     * Describes the application and transport protocols of the traffic that will go through
     * this endpoint.
     * - `http`: Endpoint will have `http` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `https` when the `secure` field is set to `true`.
     * - `https`: Endpoint will have `https` traffic, typically on a TCP connection.
     * - `ws`: Endpoint will have `ws` traffic, typically on a TCP connection. It will be
     * automaticaly promoted to `wss` when the `secure` field is set to `true`.
     * - `wss`: Endpoint will have `wss` traffic, typically on a TCP connection.
     * - `tcp`: Endpoint will have traffic on a TCP connection, without specifying an
     * application protocol.
     * - `udp`: Endpoint will have traffic on an UDP connection, without specifying an
     * application protocol.
     *
     * Default value is `http`
     */
    protocol?: Protocol;
    /**
     * Describes whether the endpoint should be secured and protected by some authentication
     * process. This requires a protocol of `https` or `wss`.
     */
    secure?: boolean;
    /**
     * Port number to be used within the container component. The same port cannot be used by
     * two different container components.
     */
    targetPort?: number;
}

/**
 * Allows specifying the definition of a volume shared by several other components
 */
export interface FluffyVolume {
    /**
     * Ephemeral volumes are not stored persistently across restarts. Defaults to false
     */
    ephemeral?: boolean;
    /**
     * Size of the volume
     */
    size?: string;
}

export interface ParentDependentProject {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Path relative to the root of the projects to which this project should be cloned into.
     * This is a unix-style relative path (i.e. uses forward slashes). The path is invalid if it
     * is absolute or tries to escape the project root through the usage of '..'. If not
     * specified, defaults to the project name.
     */
    clonePath?: string;
    /**
     * Project's Git source
     */
    git?: StickyGit;
    /**
     * Project name
     */
    name: string;
    /**
     * Project's Zip source
     */
    zip?: FluffyZip;
}

/**
 * Project's Git source
 */
export interface StickyGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: StickyCheckoutFrom;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes?: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface StickyCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Project's Zip source
 */
export interface FluffyZip {
    /**
     * Zip project's source location address. Should be file path of the archive, e.g.
     * file://$FILE_PATH
     */
    location?: string;
}

/**
 * Reference to a Kubernetes CRD of type DevWorkspaceTemplate
 */
export interface ParentKubernetes {
    name:       string;
    namespace?: string;
}

export interface ParentProject {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Path relative to the root of the projects to which this project should be cloned into.
     * This is a unix-style relative path (i.e. uses forward slashes). The path is invalid if it
     * is absolute or tries to escape the project root through the usage of '..'. If not
     * specified, defaults to the project name.
     */
    clonePath?: string;
    /**
     * Project's Git source
     */
    git?: IndigoGit;
    /**
     * Project name
     */
    name: string;
    /**
     * Project's Zip source
     */
    zip?: TentacledZip;
}

/**
 * Project's Git source
 */
export interface IndigoGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: IndigoCheckoutFrom;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes?: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface IndigoCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Project's Zip source
 */
export interface TentacledZip {
    /**
     * Zip project's source location address. Should be file path of the archive, e.g.
     * file://$FILE_PATH
     */
    location?: string;
}

export interface ParentStarterProject {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Description of a starter project
     */
    description?: string;
    /**
     * Project's Git source
     */
    git?: IndecentGit;
    /**
     * Project name
     */
    name: string;
    /**
     * Sub-directory from a starter project to be used as root for starter project.
     */
    subDir?: string;
    /**
     * Project's Zip source
     */
    zip?: StickyZip;
}

/**
 * Project's Git source
 */
export interface IndecentGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: IndecentCheckoutFrom;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes?: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface IndecentCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Project's Zip source
 */
export interface StickyZip {
    /**
     * Zip project's source location address. Should be file path of the archive, e.g.
     * file://$FILE_PATH
     */
    location?: string;
}

export interface DevfileSpecProject {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Path relative to the root of the projects to which this project should be cloned into.
     * This is a unix-style relative path (i.e. uses forward slashes). The path is invalid if it
     * is absolute or tries to escape the project root through the usage of '..'. If not
     * specified, defaults to the project name.
     */
    clonePath?: string;
    /**
     * Project's Git source
     */
    git?: HilariousGit;
    /**
     * Project name
     */
    name: string;
    /**
     * Project's Zip source
     */
    zip?: IndigoZip;
}

/**
 * Project's Git source
 */
export interface HilariousGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: HilariousCheckoutFrom;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface HilariousCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Project's Zip source
 */
export interface IndigoZip {
    /**
     * Zip project's source location address. Should be file path of the archive, e.g.
     * file://$FILE_PATH
     */
    location?: string;
}

export interface DevfileSpecStarterProject {
    /**
     * Map of implementation-dependant free-form YAML attributes.
     */
    attributes?: { [key: string]: any };
    /**
     * Description of a starter project
     */
    description?: string;
    /**
     * Project's Git source
     */
    git?: AmbitiousGit;
    /**
     * Project name
     */
    name: string;
    /**
     * Sub-directory from a starter project to be used as root for starter project.
     */
    subDir?: string;
    /**
     * Project's Zip source
     */
    zip?: IndecentZip;
}

/**
 * Project's Git source
 */
export interface AmbitiousGit {
    /**
     * Defines from what the project should be checked out. Required if there are more than one
     * remote configured
     */
    checkoutFrom?: AmbitiousCheckoutFrom;
    /**
     * The remotes map which should be initialized in the git project. Projects must have at
     * least one remote configured while StarterProjects & Image Component's Git source can only
     * have at most one remote configured.
     */
    remotes: { [key: string]: string };
}

/**
 * Defines from what the project should be checked out. Required if there are more than one
 * remote configured
 */
export interface AmbitiousCheckoutFrom {
    /**
     * The remote name should be used as init. Required if there are more than one remote
     * configured
     */
    remote?: string;
    /**
     * The revision to checkout from. Should be branch name, tag or commit id. Default branch is
     * used if missing or specified revision is not found.
     */
    revision?: string;
}

/**
 * Project's Zip source
 */
export interface IndecentZip {
    /**
     * Zip project's source location address. Should be file path of the archive, e.g.
     * file://$FILE_PATH
     */
    location?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDevfileSpec(json: string): DevfileSpec {
        return cast(JSON.parse(json), r("DevfileSpec"));
    }

    public static devfileSpecToJson(value: DevfileSpec): string {
        return JSON.stringify(uncast(value, r("DevfileSpec")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "DevfileSpec": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "commands", js: "commands", typ: u(undefined, a(r("DevfileSpecCommand"))) },
        { json: "components", js: "components", typ: u(undefined, a(r("DevfileSpecComponent"))) },
        { json: "dependentProjects", js: "dependentProjects", typ: u(undefined, a(r("DevfileSpecDependentProject"))) },
        { json: "events", js: "events", typ: u(undefined, r("Events")) },
        { json: "metadata", js: "metadata", typ: u(undefined, r("Metadata")) },
        { json: "parent", js: "parent", typ: u(undefined, r("Parent")) },
        { json: "projects", js: "projects", typ: u(undefined, a(r("DevfileSpecProject"))) },
        { json: "schemaVersion", js: "schemaVersion", typ: "" },
        { json: "starterProjects", js: "starterProjects", typ: u(undefined, a(r("DevfileSpecStarterProject"))) },
        { json: "variables", js: "variables", typ: u(undefined, m("")) },
    ], false),
    "DevfileSpecCommand": o([
        { json: "apply", js: "apply", typ: u(undefined, r("PurpleApply")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "composite", js: "composite", typ: u(undefined, r("PurpleComposite")) },
        { json: "exec", js: "exec", typ: u(undefined, r("PurpleExec")) },
        { json: "id", js: "id", typ: "" },
    ], false),
    "PurpleApply": o([
        { json: "component", js: "component", typ: "" },
        { json: "group", js: "group", typ: u(undefined, r("PurpleGroup")) },
        { json: "label", js: "label", typ: u(undefined, "") },
    ], false),
    "PurpleGroup": o([
        { json: "isDefault", js: "isDefault", typ: u(undefined, true) },
        { json: "kind", js: "kind", typ: r("Kind") },
    ], false),
    "PurpleComposite": o([
        { json: "commands", js: "commands", typ: u(undefined, a("")) },
        { json: "group", js: "group", typ: u(undefined, r("FluffyGroup")) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "parallel", js: "parallel", typ: u(undefined, true) },
    ], false),
    "FluffyGroup": o([
        { json: "isDefault", js: "isDefault", typ: u(undefined, true) },
        { json: "kind", js: "kind", typ: r("Kind") },
    ], false),
    "PurpleExec": o([
        { json: "commandLine", js: "commandLine", typ: "" },
        { json: "component", js: "component", typ: "" },
        { json: "env", js: "env", typ: u(undefined, a(r("PurpleEnv"))) },
        { json: "group", js: "group", typ: u(undefined, r("TentacledGroup")) },
        { json: "hotReloadCapable", js: "hotReloadCapable", typ: u(undefined, true) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "workingDir", js: "workingDir", typ: u(undefined, "") },
    ], false),
    "PurpleEnv": o([
        { json: "name", js: "name", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "TentacledGroup": o([
        { json: "isDefault", js: "isDefault", typ: u(undefined, true) },
        { json: "kind", js: "kind", typ: r("Kind") },
    ], false),
    "DevfileSpecComponent": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "container", js: "container", typ: u(undefined, r("PurpleContainer")) },
        { json: "image", js: "image", typ: u(undefined, r("PurpleImage")) },
        { json: "kubernetes", js: "kubernetes", typ: u(undefined, r("PurpleKubernetes")) },
        { json: "name", js: "name", typ: "" },
        { json: "openshift", js: "openshift", typ: u(undefined, r("PurpleOpenshift")) },
        { json: "volume", js: "volume", typ: u(undefined, r("PurpleVolume")) },
    ], false),
    "PurpleContainer": o([
        { json: "annotation", js: "annotation", typ: u(undefined, r("PurpleAnnotation")) },
        { json: "args", js: "args", typ: u(undefined, a("")) },
        { json: "command", js: "command", typ: u(undefined, a("")) },
        { json: "cpuLimit", js: "cpuLimit", typ: u(undefined, "") },
        { json: "cpuRequest", js: "cpuRequest", typ: u(undefined, "") },
        { json: "dedicatedPod", js: "dedicatedPod", typ: u(undefined, true) },
        { json: "endpoints", js: "endpoints", typ: u(undefined, a(r("PurpleEndpoint"))) },
        { json: "env", js: "env", typ: u(undefined, a(r("FluffyEnv"))) },
        { json: "image", js: "image", typ: "" },
        { json: "memoryLimit", js: "memoryLimit", typ: u(undefined, "") },
        { json: "memoryRequest", js: "memoryRequest", typ: u(undefined, "") },
        { json: "mountSources", js: "mountSources", typ: u(undefined, true) },
        { json: "sourceMapping", js: "sourceMapping", typ: u(undefined, "") },
        { json: "volumeMounts", js: "volumeMounts", typ: u(undefined, a(r("PurpleVolumeMount"))) },
    ], false),
    "PurpleAnnotation": o([
        { json: "deployment", js: "deployment", typ: u(undefined, m("")) },
        { json: "service", js: "service", typ: u(undefined, m("")) },
    ], false),
    "PurpleEndpoint": o([
        { json: "annotation", js: "annotation", typ: u(undefined, m("")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "exposure", js: "exposure", typ: u(undefined, r("Exposure")) },
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "protocol", js: "protocol", typ: u(undefined, r("Protocol")) },
        { json: "secure", js: "secure", typ: u(undefined, true) },
        { json: "targetPort", js: "targetPort", typ: 0 },
    ], false),
    "FluffyEnv": o([
        { json: "name", js: "name", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "PurpleVolumeMount": o([
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
    ], false),
    "PurpleImage": o([
        { json: "autoBuild", js: "autoBuild", typ: u(undefined, true) },
        { json: "dockerfile", js: "dockerfile", typ: r("PurpleDockerfile") },
        { json: "imageName", js: "imageName", typ: "" },
    ], false),
    "PurpleDockerfile": o([
        { json: "args", js: "args", typ: u(undefined, a("")) },
        { json: "buildContext", js: "buildContext", typ: u(undefined, "") },
        { json: "devfileRegistry", js: "devfileRegistry", typ: u(undefined, r("PurpleDevfileRegistry")) },
        { json: "git", js: "git", typ: u(undefined, r("PurpleGit")) },
        { json: "rootRequired", js: "rootRequired", typ: u(undefined, true) },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "PurpleDevfileRegistry": o([
        { json: "id", js: "id", typ: "" },
        { json: "registryUrl", js: "registryUrl", typ: u(undefined, "") },
    ], false),
    "PurpleGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("PurpleCheckoutFrom")) },
        { json: "fileLocation", js: "fileLocation", typ: u(undefined, "") },
        { json: "remotes", js: "remotes", typ: m("") },
    ], false),
    "PurpleCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "PurpleKubernetes": o([
        { json: "deployByDefault", js: "deployByDefault", typ: u(undefined, true) },
        { json: "endpoints", js: "endpoints", typ: u(undefined, a(r("FluffyEndpoint"))) },
        { json: "inlined", js: "inlined", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "FluffyEndpoint": o([
        { json: "annotation", js: "annotation", typ: u(undefined, m("")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "exposure", js: "exposure", typ: u(undefined, r("Exposure")) },
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "protocol", js: "protocol", typ: u(undefined, r("Protocol")) },
        { json: "secure", js: "secure", typ: u(undefined, true) },
        { json: "targetPort", js: "targetPort", typ: 0 },
    ], false),
    "PurpleOpenshift": o([
        { json: "deployByDefault", js: "deployByDefault", typ: u(undefined, true) },
        { json: "endpoints", js: "endpoints", typ: u(undefined, a(r("TentacledEndpoint"))) },
        { json: "inlined", js: "inlined", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "TentacledEndpoint": o([
        { json: "annotation", js: "annotation", typ: u(undefined, m("")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "exposure", js: "exposure", typ: u(undefined, r("Exposure")) },
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "protocol", js: "protocol", typ: u(undefined, r("Protocol")) },
        { json: "secure", js: "secure", typ: u(undefined, true) },
        { json: "targetPort", js: "targetPort", typ: 0 },
    ], false),
    "PurpleVolume": o([
        { json: "ephemeral", js: "ephemeral", typ: u(undefined, true) },
        { json: "size", js: "size", typ: u(undefined, "") },
    ], false),
    "DevfileSpecDependentProject": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "clonePath", js: "clonePath", typ: u(undefined, "") },
        { json: "git", js: "git", typ: u(undefined, r("FluffyGit")) },
        { json: "name", js: "name", typ: "" },
        { json: "zip", js: "zip", typ: u(undefined, r("PurpleZip")) },
    ], false),
    "FluffyGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("FluffyCheckoutFrom")) },
        { json: "remotes", js: "remotes", typ: m("") },
    ], false),
    "FluffyCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "PurpleZip": o([
        { json: "location", js: "location", typ: u(undefined, "") },
    ], false),
    "Events": o([
        { json: "postStart", js: "postStart", typ: u(undefined, a("")) },
        { json: "postStop", js: "postStop", typ: u(undefined, a("")) },
        { json: "preStart", js: "preStart", typ: u(undefined, a("")) },
        { json: "preStop", js: "preStop", typ: u(undefined, a("")) },
    ], false),
    "Metadata": o([
        { json: "architectures", js: "architectures", typ: u(undefined, a(r("Architecture"))) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "displayName", js: "displayName", typ: u(undefined, "") },
        { json: "globalMemoryLimit", js: "globalMemoryLimit", typ: u(undefined, "") },
        { json: "icon", js: "icon", typ: u(undefined, "") },
        { json: "language", js: "language", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "projectType", js: "projectType", typ: u(undefined, "") },
        { json: "provider", js: "provider", typ: u(undefined, "") },
        { json: "supportUrl", js: "supportUrl", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "version", js: "version", typ: u(undefined, "") },
        { json: "website", js: "website", typ: u(undefined, "") },
    ], "any"),
    "Parent": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "commands", js: "commands", typ: u(undefined, a(r("ParentCommand"))) },
        { json: "components", js: "components", typ: u(undefined, a(r("ParentComponent"))) },
        { json: "dependentProjects", js: "dependentProjects", typ: u(undefined, a(r("ParentDependentProject"))) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "kubernetes", js: "kubernetes", typ: u(undefined, r("ParentKubernetes")) },
        { json: "projects", js: "projects", typ: u(undefined, a(r("ParentProject"))) },
        { json: "registryUrl", js: "registryUrl", typ: u(undefined, "") },
        { json: "starterProjects", js: "starterProjects", typ: u(undefined, a(r("ParentStarterProject"))) },
        { json: "uri", js: "uri", typ: u(undefined, "") },
        { json: "variables", js: "variables", typ: u(undefined, m("")) },
        { json: "version", js: "version", typ: u(undefined, "") },
    ], false),
    "ParentCommand": o([
        { json: "apply", js: "apply", typ: u(undefined, r("FluffyApply")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "composite", js: "composite", typ: u(undefined, r("FluffyComposite")) },
        { json: "exec", js: "exec", typ: u(undefined, r("FluffyExec")) },
        { json: "id", js: "id", typ: "" },
    ], false),
    "FluffyApply": o([
        { json: "component", js: "component", typ: u(undefined, "") },
        { json: "group", js: "group", typ: u(undefined, r("StickyGroup")) },
        { json: "label", js: "label", typ: u(undefined, "") },
    ], false),
    "StickyGroup": o([
        { json: "isDefault", js: "isDefault", typ: u(undefined, true) },
        { json: "kind", js: "kind", typ: u(undefined, r("Kind")) },
    ], false),
    "FluffyComposite": o([
        { json: "commands", js: "commands", typ: u(undefined, a("")) },
        { json: "group", js: "group", typ: u(undefined, r("IndigoGroup")) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "parallel", js: "parallel", typ: u(undefined, true) },
    ], false),
    "IndigoGroup": o([
        { json: "isDefault", js: "isDefault", typ: u(undefined, true) },
        { json: "kind", js: "kind", typ: u(undefined, r("Kind")) },
    ], false),
    "FluffyExec": o([
        { json: "commandLine", js: "commandLine", typ: u(undefined, "") },
        { json: "component", js: "component", typ: u(undefined, "") },
        { json: "env", js: "env", typ: u(undefined, a(r("TentacledEnv"))) },
        { json: "group", js: "group", typ: u(undefined, r("IndecentGroup")) },
        { json: "hotReloadCapable", js: "hotReloadCapable", typ: u(undefined, true) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "workingDir", js: "workingDir", typ: u(undefined, "") },
    ], false),
    "TentacledEnv": o([
        { json: "name", js: "name", typ: "" },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], false),
    "IndecentGroup": o([
        { json: "isDefault", js: "isDefault", typ: u(undefined, true) },
        { json: "kind", js: "kind", typ: u(undefined, r("Kind")) },
    ], false),
    "ParentComponent": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "container", js: "container", typ: u(undefined, r("FluffyContainer")) },
        { json: "image", js: "image", typ: u(undefined, r("FluffyImage")) },
        { json: "kubernetes", js: "kubernetes", typ: u(undefined, r("FluffyKubernetes")) },
        { json: "name", js: "name", typ: "" },
        { json: "openshift", js: "openshift", typ: u(undefined, r("FluffyOpenshift")) },
        { json: "volume", js: "volume", typ: u(undefined, r("FluffyVolume")) },
    ], false),
    "FluffyContainer": o([
        { json: "annotation", js: "annotation", typ: u(undefined, r("FluffyAnnotation")) },
        { json: "args", js: "args", typ: u(undefined, a("")) },
        { json: "command", js: "command", typ: u(undefined, a("")) },
        { json: "cpuLimit", js: "cpuLimit", typ: u(undefined, "") },
        { json: "cpuRequest", js: "cpuRequest", typ: u(undefined, "") },
        { json: "dedicatedPod", js: "dedicatedPod", typ: u(undefined, true) },
        { json: "endpoints", js: "endpoints", typ: u(undefined, a(r("StickyEndpoint"))) },
        { json: "env", js: "env", typ: u(undefined, a(r("StickyEnv"))) },
        { json: "image", js: "image", typ: u(undefined, "") },
        { json: "memoryLimit", js: "memoryLimit", typ: u(undefined, "") },
        { json: "memoryRequest", js: "memoryRequest", typ: u(undefined, "") },
        { json: "mountSources", js: "mountSources", typ: u(undefined, true) },
        { json: "sourceMapping", js: "sourceMapping", typ: u(undefined, "") },
        { json: "volumeMounts", js: "volumeMounts", typ: u(undefined, a(r("FluffyVolumeMount"))) },
    ], false),
    "FluffyAnnotation": o([
        { json: "deployment", js: "deployment", typ: u(undefined, m("")) },
        { json: "service", js: "service", typ: u(undefined, m("")) },
    ], false),
    "StickyEndpoint": o([
        { json: "annotation", js: "annotation", typ: u(undefined, m("")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "exposure", js: "exposure", typ: u(undefined, r("Exposure")) },
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "protocol", js: "protocol", typ: u(undefined, r("Protocol")) },
        { json: "secure", js: "secure", typ: u(undefined, true) },
        { json: "targetPort", js: "targetPort", typ: u(undefined, 0) },
    ], false),
    "StickyEnv": o([
        { json: "name", js: "name", typ: "" },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], false),
    "FluffyVolumeMount": o([
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
    ], false),
    "FluffyImage": o([
        { json: "autoBuild", js: "autoBuild", typ: u(undefined, true) },
        { json: "dockerfile", js: "dockerfile", typ: u(undefined, r("FluffyDockerfile")) },
        { json: "imageName", js: "imageName", typ: u(undefined, "") },
    ], false),
    "FluffyDockerfile": o([
        { json: "args", js: "args", typ: u(undefined, a("")) },
        { json: "buildContext", js: "buildContext", typ: u(undefined, "") },
        { json: "devfileRegistry", js: "devfileRegistry", typ: u(undefined, r("FluffyDevfileRegistry")) },
        { json: "git", js: "git", typ: u(undefined, r("TentacledGit")) },
        { json: "rootRequired", js: "rootRequired", typ: u(undefined, true) },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "FluffyDevfileRegistry": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "registryUrl", js: "registryUrl", typ: u(undefined, "") },
    ], false),
    "TentacledGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("TentacledCheckoutFrom")) },
        { json: "fileLocation", js: "fileLocation", typ: u(undefined, "") },
        { json: "remotes", js: "remotes", typ: u(undefined, m("")) },
    ], false),
    "TentacledCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "FluffyKubernetes": o([
        { json: "deployByDefault", js: "deployByDefault", typ: u(undefined, true) },
        { json: "endpoints", js: "endpoints", typ: u(undefined, a(r("IndigoEndpoint"))) },
        { json: "inlined", js: "inlined", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "IndigoEndpoint": o([
        { json: "annotation", js: "annotation", typ: u(undefined, m("")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "exposure", js: "exposure", typ: u(undefined, r("Exposure")) },
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "protocol", js: "protocol", typ: u(undefined, r("Protocol")) },
        { json: "secure", js: "secure", typ: u(undefined, true) },
        { json: "targetPort", js: "targetPort", typ: u(undefined, 0) },
    ], false),
    "FluffyOpenshift": o([
        { json: "deployByDefault", js: "deployByDefault", typ: u(undefined, true) },
        { json: "endpoints", js: "endpoints", typ: u(undefined, a(r("IndecentEndpoint"))) },
        { json: "inlined", js: "inlined", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "IndecentEndpoint": o([
        { json: "annotation", js: "annotation", typ: u(undefined, m("")) },
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "exposure", js: "exposure", typ: u(undefined, r("Exposure")) },
        { json: "name", js: "name", typ: "" },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "protocol", js: "protocol", typ: u(undefined, r("Protocol")) },
        { json: "secure", js: "secure", typ: u(undefined, true) },
        { json: "targetPort", js: "targetPort", typ: u(undefined, 0) },
    ], false),
    "FluffyVolume": o([
        { json: "ephemeral", js: "ephemeral", typ: u(undefined, true) },
        { json: "size", js: "size", typ: u(undefined, "") },
    ], false),
    "ParentDependentProject": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "clonePath", js: "clonePath", typ: u(undefined, "") },
        { json: "git", js: "git", typ: u(undefined, r("StickyGit")) },
        { json: "name", js: "name", typ: "" },
        { json: "zip", js: "zip", typ: u(undefined, r("FluffyZip")) },
    ], false),
    "StickyGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("StickyCheckoutFrom")) },
        { json: "remotes", js: "remotes", typ: u(undefined, m("")) },
    ], false),
    "StickyCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "FluffyZip": o([
        { json: "location", js: "location", typ: u(undefined, "") },
    ], false),
    "ParentKubernetes": o([
        { json: "name", js: "name", typ: "" },
        { json: "namespace", js: "namespace", typ: u(undefined, "") },
    ], false),
    "ParentProject": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "clonePath", js: "clonePath", typ: u(undefined, "") },
        { json: "git", js: "git", typ: u(undefined, r("IndigoGit")) },
        { json: "name", js: "name", typ: "" },
        { json: "zip", js: "zip", typ: u(undefined, r("TentacledZip")) },
    ], false),
    "IndigoGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("IndigoCheckoutFrom")) },
        { json: "remotes", js: "remotes", typ: u(undefined, m("")) },
    ], false),
    "IndigoCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "TentacledZip": o([
        { json: "location", js: "location", typ: u(undefined, "") },
    ], false),
    "ParentStarterProject": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "git", js: "git", typ: u(undefined, r("IndecentGit")) },
        { json: "name", js: "name", typ: "" },
        { json: "subDir", js: "subDir", typ: u(undefined, "") },
        { json: "zip", js: "zip", typ: u(undefined, r("StickyZip")) },
    ], false),
    "IndecentGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("IndecentCheckoutFrom")) },
        { json: "remotes", js: "remotes", typ: u(undefined, m("")) },
    ], false),
    "IndecentCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "StickyZip": o([
        { json: "location", js: "location", typ: u(undefined, "") },
    ], false),
    "DevfileSpecProject": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "clonePath", js: "clonePath", typ: u(undefined, "") },
        { json: "git", js: "git", typ: u(undefined, r("HilariousGit")) },
        { json: "name", js: "name", typ: "" },
        { json: "zip", js: "zip", typ: u(undefined, r("IndigoZip")) },
    ], false),
    "HilariousGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("HilariousCheckoutFrom")) },
        { json: "remotes", js: "remotes", typ: m("") },
    ], false),
    "HilariousCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "IndigoZip": o([
        { json: "location", js: "location", typ: u(undefined, "") },
    ], false),
    "DevfileSpecStarterProject": o([
        { json: "attributes", js: "attributes", typ: u(undefined, m("any")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "git", js: "git", typ: u(undefined, r("AmbitiousGit")) },
        { json: "name", js: "name", typ: "" },
        { json: "subDir", js: "subDir", typ: u(undefined, "") },
        { json: "zip", js: "zip", typ: u(undefined, r("IndecentZip")) },
    ], false),
    "AmbitiousGit": o([
        { json: "checkoutFrom", js: "checkoutFrom", typ: u(undefined, r("AmbitiousCheckoutFrom")) },
        { json: "remotes", js: "remotes", typ: m("") },
    ], false),
    "AmbitiousCheckoutFrom": o([
        { json: "remote", js: "remote", typ: u(undefined, "") },
        { json: "revision", js: "revision", typ: u(undefined, "") },
    ], false),
    "IndecentZip": o([
        { json: "location", js: "location", typ: u(undefined, "") },
    ], false),
    "Kind": [
        "build",
        "debug",
        "deploy",
        "run",
        "test",
    ],
    "Exposure": [
        "internal",
        "none",
        "public",
    ],
    "Protocol": [
        "http",
        "https",
        "tcp",
        "udp",
        "ws",
        "wss",
    ],
    "Architecture": [
        "amd64",
        "arm64",
        "ppc64le",
        "s390x",
    ],
};
