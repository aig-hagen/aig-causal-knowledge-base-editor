# User Guide

## Introduction

The *Causal Knowledge Base Editor* is a tool that enables you to

* graphically model causal relations between statements, 
* query the model for conclusions, 
* and visually explain the results.

In the next sections, you’ll see how each of these features works in practice.
In the end you will also find a section about [the theoretical background](#theoretical-background).

## Modeling Causal Knowledge

The first step is to put our knowledge in a so-called *causal model*.
Such a model consists of:

* background atoms
* explainable atoms
* causal dependencies between atoms

### Atoms

*Atoms* represent statements. For example, they represent:

* facts about real things
* properties of abstract concepts
* hypotheses in a research field

The factuality of an atom can be caused by one or multiple other atoms.
Let us, for example, take the following two relations:

* The `influenza` virus causes the `flu` disease.
* The `flu` disease causes the `fever` symptom.

In our tool we can model the relation as follows:

* **Double left-click** in the canvas to create an atom
    * Do this three times in different places to create three atoms.
* **Left-click** to edit its name, description, and other properties.
    * Give each item an expressive name. Let's name them `influenza`, `flu` and `fever`.
* **Right-click** on an atom **hold** and **drag** the arrow from one atom to the *port* (gray circle) to establish a causal dependency
    * Create a causal dependency from `influenza` to `flu`
    * Create a causal dependency from `flu` to `fever`

![Causal model for the given example](/images/step_1_create_atoms.png)


### Background Atoms

In our example, `influenza` is a background atom. An atom is a *background atom* if it is not the target of any causal dependency. They are not caused by anything inside our model.

Compared to [explainable atoms](#explainable-atoms), you can specify so-called *assumptions* about them. They become relevant during [evaluation](#running-evalution).

To change the assumptions of a background atom, *right-click* on it and edit the checkboxes in the appearing dialog.

![Dialog for editing atom propereties](/images/step_2_edit_dialog.png)


With assumptions, you can express the statement represented by the atom to be:

* factual (aka. true)
* nonfactual (aka. false)
* unknown (aka. possibly true and false)

### Explainable Atoms

`flu` and `fever` are explainable atoms. Explainable atoms are those that are a target of a causal relation. They are caused by other atoms inside our model.

Compared to [background atoms](#background-atoms), you do not specify assumptions about them. But during evaluation, you can specify their presumed factuality by providing *observations*.

### Causal Relations

The factuality of a statement can depend on the factuality of other statements. We express this relation by drawing *causal relations* between atoms.

The example in the [explanation of atoms](#atoms) has shown *regular* causal relations. In addition, causal relations can be:

* *negated*
* *dependently* combined
* *independently* combined

Take for negated relation the let us consider that absence of `rain` will cause a `drought`. After selecting a causal relation with a **left-click**, you can edit in a dialog whether it should be regular or negated.

![Dialog for editing causal relation propereties](/images/step_3_edit_dialog_relation.png)

Causal relations targeting one atom can be combined **dependently** or **independently**. How they are combined in the model depends on how they are connected to the targeted atom. Let us use the following example:

* The `influenza` virus causes the `flu` disease.
* The `flu` disease causes the `fever` symptom.
* The `corona` virus causes the `covid` disease.
* The `covid` disease causes the `fever` symptom.
* The `covid` disease and being `at-risk` together cause being `short-of-breath`.

In the following image you can see how `covid` and `at-risk` are connected to the same port because only together they cause `short-of-breath`.
Compare that to `flu` and `covid` being connected to different ports because they individually can cause `fever`.

![Causal model demonstrating dependently and independently combined relations](/images/step_4_combination_of_relations.png)

## Running Evaluation

On the right you have an evaluation console.

At the top you will see the *assumptions* about your background atoms. It is only a read-only overview. To edit the assumptions edit them by clicking on the atom and edit the assumptions in the property dialog.

Next, you can select observations about your explainable atoms. By setting observations, you presume some statements to be either true or false. By evaluating with different observations, you can use this tool to explore alternative results for hypothetical realities (aka. counterfactual reasoning or "what if" questions).

Finally, you can instruct the reasoner to make conclusions about one specific atom (or all) by selecting an option in the dropdown next to the "Evaluate" button and then starting the evaluation by pressing the button.

![Conclusions drawn by running evaluation](/images/step_5_evaluation_result.png)

## Getting Explanations


After running the evaluation, you can select to explain how the conclusion of an atom was drawn.
This will give you a text about which other atoms influenced the conclusion about your selected atom.
It will also highlight the atoms and connections in the model that contributed to its conclusion.

::: info
The current explanation is very rudimentary.
We continue development to provide more insightful explanations.
:::

To get an explanation:

* locate the button titled "Explain"
* Select an atom in the dropdown next to it
* click the button

![Explanation of a selected atom](/images/step_6_explanation_results.png)


## Theoretical Background

The graphically modeled knowledge in this tool corresponds to _causal models_ as described by J. Pearl[^1][^2].
Together with them, we use an approach based on _formal argumentation_ as defined by P. M. Dung[^3][^4] for argumentation-based causal and counterfactual reasoning[^5]. This approach appears promising, as it allows techniques from argumentation frameworks—such as sequence explanations[^6]—to be applied in explanation of reasoning with causal models.

[^1]: [Jearl, J.: Causality: Models, Reasoning and Inference, vol. 29. Cambridge Univer-
sity Press (2000)](https://dl.acm.org/doi/book/10.5555/331969)
[^2]: [Causal model - Wikipedia](https://en.wikipedia.org/wiki/Causal_model)
[^3]: [Bengel, L., Blümel, L., Rienstra, T., Thimm, M.: Argumentation-based causal and
counterfactual reasoning. In: 1st International Workshop on Argumentation for
eXplainable AI, Cardiff. CEUR Workshop Proceedings, vol. 3209 (2022)](https://doi.org/10.1007/978-3-031-63536-6_13)
[^4]: [Dung, P.M.: On the acceptability of arguments and its fundamental role in non-
monotonic reasoning, logic programming and n-person games. Artif. Intell. 77(2),
321–358 (1995)](https://doi.org/10.1016/0004-3702(94)00041-X)
[^5]: [Argumentation framework - Wikipedia](https://en.wikipedia.org/wiki/Argumentation_framework)
[^6]: [Bengel, L., Thimm, M.: Sequence explanations for acceptance in abstract argumentation. In: Proceedings of the 22nd International Conference on Principles of Knowledge Representation and Reasoning, (2025)](https://www.mthimm.de/pub/2025/Bengel_2025c.pdf)
