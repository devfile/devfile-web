Using the devfile library, you can parse and write any devfile, helping
you maintain consistent development environments and making it easier
for teams to collaborate across shared projects.

- Parse a devfile by running:

```go
// ParserArgs is the struct to pass into parser functions which contains required info for parsing devfile.
parserArgs := parser.ParserArgs{
 	Path:              path,
 	FlattenedDevfile:  &flattenedDevfile,
 	RegistryURLs:      registryURLs,
 	DefaultNamespace:  defaultNamespace,
 	Context:           context,
 	K8sClient:         client,
 }

// Parses the devfile and validates the devfile data
// if top-level variables are not substituted successfully, the warnings can be logged by parsing variableWarning
devfile, variableWarning, err := devfilePkg.ParseDevfileAndValidate(parserArgs)
```

- Get specific content from a devfile by running:

```go
// To get all the components from the devfile
components, err := devfile.Data.GetComponents(DevfileOptions{})

// To get all the components from the devfile with attributes tagged - tool: console-import
// & import: {strategy: Dockerfile}
components, err := devfile.Data.GetComponents(DevfileOptions{
   Filter: map[string]interface{}{
 		"tool": "console-import",
 		"import": map[string]interface{}{
 			"strategy": "Dockerfile",
 		},
 	},
})

// To get all the volume components
components, err := devfile.Data.GetComponents(DevfileOptions{
 	ComponentOptions: ComponentOptions{
 		ComponentType: v1.VolumeComponentType,
 	},
})

// To get all the exec commands that belong to the build group
commands, err := devfile.Data.GetCommands(DevfileOptions{
 	CommandOptions: CommandOptions{
 		CommandType: v1.ExecCommandType,
 		CommandGroupKind: v1.BuildCommandGroupKind,
 	},
})
```

- Get the Kubernetes objects from the devfile by running:

```go
// To get a slice of Kubernetes containers of type corev1.Container from the devfile component containers
containers, err := generator.GetContainers(devfile)

// To generate a Kubernetes deployment of type v1.Deployment
deployParams := generator.DeploymentParams{
        TypeMeta:          generator.GetTypeMeta(deploymentKind, deploymentAPIVersion),
        ObjectMeta:        generator.GetObjectMeta(name, namespace, labels, annotations),
        InitContainers:    initContainers,
        Containers:        containers,
        Volumes:           volumes,
        PodSelectorLabels: labels,
}
deployment := generator.GetDeployment(deployParams)
```

- Update the devfile content by running:

```go
// To update an existing component in the devfile object
err := devfile.Data.UpdateComponent(v1.Component{
	    Name: "component1",
	    ComponentUnion: v1.ComponentUnion{
	    	Container: &v1.ContainerComponent{
	    		Container: v1.Container{
	    			Image: "image1",
             },
         },
     },
})

// To add a new component to the devfile object
err := devfile.Data.AddComponents([]v1.Component{
     {
        Name: "component2",
        ComponentUnion: v1.ComponentUnion{
            Container: &v1.ContainerComponent{
                Container: v1.Container{
                    Image: "image2",
                },
            },
        },
     },
})

// To delete a component from the devfile object
err := devfile.Data.DeleteComponent(componentName)
```

- Write a devfile by running:

```go
// If the devfile object has been created with the devfile path already set, can simply call WriteYamlDevfile to write the devfile
err := devfile.WriteYamlDevfile()


// To write to a devfile from scratch
// create a new DevfileData with a specific devfile version
devfileData, err := data.NewDevfileData(devfileVersion)

// set schema version
devfileData.SetSchemaVersion(devfileVersion)

// To add devfile content, use library APIs
devfileData.AddComponents([]v1.Component{...})
devfileData.AddCommands([]v1.Commands{...})
......

// create a new DevfileCtx
ctx := devfileCtx.NewDevfileCtx(devfilePath)
err = ctx.SetAbsPath()

// create devfile object with the new DevfileCtx and DevfileData
devfile := parser.DevfileObj{
 	Ctx:  ctx,
 	Data: devfileData,
}

// write to the devfile on disk
err = devfile.WriteYamlDevfile()
```
