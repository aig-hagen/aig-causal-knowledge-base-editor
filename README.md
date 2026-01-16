# Causal Knowledge Base Editor

Graphical editor to create causal knowledge bases as described in [_Argumentation-based Causal and Counterfactual Reasoning_](https://www.researchgate.net/publication/363185581_Argumentation-based_Causal_and_Counterfactual_Reasoning). 

## Usage

### Public Deployment

Try it out at https://causal-knowledge-base-editor.aig.fernuni-hagen.de

### OCI Image

[Container images](https://github.com/aig-hagen/aig-causal-knowledge-base-editor/pkgs/container/aig-causal-knowledge-base-editor) are provided and can be run with Docker, Podman or other  container runtimes.

```sh
docker run -p 8080:8080 ghcr.io/aig-hagen/aig-causal-knowledge-base-editor:latest
```

### Java Archive

JARs are provided as Artifacts with each [release](https://github.com/aig-hagen/aig-causal-knowledge-base-editor/releases) and can be run with Java 17 or higher.

```sh
java -jar ./org.tweetyproject.web-with-causal-knowledge-base-editor-0.8.0.jar
```

## Acknowledgment

### [TweetyProject](https://tweetyproject.org/)

It's web server is used for logical reasoning and explanation and is bundled with the [OCI Image](#oci-image) and [Java Archive](#java-archive).

Maintained by [Matthias Thimm](https://mthimm.de/), collaboratively developed by several contributors and [licensed (mostly) under the LGPL License version 3](https://github.com/TweetyProjectTeam/TweetyProject?tab=readme-ov-file#license).

### [Graph Component](https://github.com/aig-hagen/aig_graph_component)

This component is used to display and edit graphs.

It is developed by the Artificial Intelligence Group of the University of Hagen and [licensed under the MIT License](third_party/aig-hagen/aig_graph_component/420ec12/LICENSE.md).

### [Argumentation Framework eXplanation, Reasoning, and AnalYsis](https://github.com/xai-ca/xray)

This projects [example argumentation frameworks](third_party/xai-ca/xray/7a83aa5/examples/) are bundled and used. Moreover, inspired by it was the automatic layout of argumentation frameworks with Graphviz.

It is developed by employees of the University of Illinois Urbana-Champaign and [licensed under the MIT License](third_party/xai-ca/xray/7a83aa5/LICENSE).

## Development

### Install Dependencies

```sh
npm install-clean
```

### Run with Hot-Reload

```sh
npm run dev
```

### Run Tests

```sh
npm run test:unit
npm run test:browser
```

### IDE Support

See [IDE Support for Vue](https://vuejs.org/guide/typescript/overview.html#ide-support)
