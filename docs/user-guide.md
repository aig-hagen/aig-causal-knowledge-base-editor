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

* background atoms (also called exogenous variables)
* explainable atoms (also called endogenous variables)
* causal relations between atoms

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

* <kbd>Left double-click</kbd> on the canvas to create an atom
    * Do this three times in different places to create three atoms.
* <kbd>Left-click</kbd> on the created atom to edit its name, description, and other properties.
    * Give each item an expressive name. Let's name them `influenza`, `flu` and `fever`.
* <kbd>Right-click</kbd> on an atom, hold, and drag the arrow towards a *port* (gray circle) of another atom to establish a causal dependency
    * Create a causal relation from `influenza` to `flu`
    * Create a causal relation from `flu` to `fever`

![Causal model for the given example](/images/step_1_create_atoms.png)


### Background Atoms

In our example, `influenza` is a background atom. An atom is a *background atom* if it is not the target of any causal dependency. They are not caused by anything inside our model.

Compared to [explainable atoms](#explainable-atoms), you can specify so-called *assumptions* about them. They become relevant during the [evaluation](#running-evalution).

To change the assumptions of a background atom, <kbd>left-click</kbd> on it and edit the checkboxes in the appearing dialog.

![Dialog for editing atom propereties](/images/step_2_edit_dialog.png)


With these assumptions, you can express the following states of knowledge regarding the atom:

* we assume that the statement is likely to hold (only select `true`)
* we assume that the statement is more likely to not hold (only select `false`)
* we are uncertain or have no further information about the truth of the statement (select both `true` and `false`)

### Explainable Atoms

In our example, `flu` and `fever` are explainable atoms. Explainable atoms are atoms that are directly caused by other atoms within our model.

Compared to [background atoms](#background-atoms), you do not specify assumptions about them. But during evaluation, you can specify their presumed factuality by providing *observations*.

### Causal Relations

The factuality of a statement can depend on the factuality of other statements. We express this relation by drawing *causal relations* between atoms.

In our [example](#atoms), we have so far only considered *regular* causal relations. In general, we can model the following basic causal relations:

* A *is caused by* B
* A *is caused by the absence of* B
* A *is caused by* either B *or* C
* A *is caused by* B *and* C together

The first causal relation is the default case as shown in the example before.
The second relation is a *negative* causal relation.
For that, let us consider the statement: the absence of `rain` will cause a `drought`, which can be modeled as follows. After selecting a causal relation with a <kbd>left-click</kbd>, you can edit in a dialog whether it should be regular or negated.

![Dialog for editing causal relation properties](/images/step_3_edit_dialog_relation.png)


An atom in a causal model can have multiple causes and these may be **dependent** or **independent** of each other. How they are combined in the model depends on how they are connected to the targeted atom. 
Let us expand our example as follows:

* The `flu` disease is caused by the `influenza` virus.
* The `covid` disease is caused by the `corona` virus.
* The `fever` symptom is caused by either `flu` or `covid`.
* The `short-of-breath` symptom appears if the patient has the `covid` disease and is `at-risk` of developing respiratory diseases.

In the following picture you can see how `covid` and `at-risk` are connected to the same port (denoted with `&`) of `short-of-breath`, representing that they only cause this atom jointly.
In contrast to that, `flu` and `covid` are connected to different ports of `fever`, because they can cause `fever` independently of each other.

![Causal model demonstrating dependent and independent causal relations](/images/step_4_combination_of_relations.png)

## Evaluating the Causal Model

On the right you have an evaluation console.

At the top of the console you will see the *assumptions* about your background atoms. This is only a read-only overview. To edit the assumptions edit them by clicking on the atom in the model and edit the assumptions in the property dialog. Per default, all possible assumptions are included, representing the fact that we make no assumptions about the background atoms.

Next, you can select observations about your explainable atoms. By setting observations, you presume some statements to be either true or false. By evaluating with different observations, you can use this tool to explore alternative results for hypothetical realities (aka. counterfactual reasoning or "what if" questions).

Finally, you can instruct the reasoner to make conclusions about one specific atom (or all) by selecting an option in the dropdown next to the "Evaluate" button and then starting the evaluation by pressing the button.
For instance, if we observe that the patient has `flu` but not `covid`, the evaluation will then come to the conclusions shown in the following picture.

![Conclusions drawn by running the evaluation](/images/step_5_evaluation_result.png)

::: info
The tool currently only provided a qualitative evaluation of the causal model.
A method for quantitative evaluation is still in development.
:::

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

The graphically modeled knowledge in this tool corresponds to a simplified version of _causal models_ as described by J. Pearl[^1][^2].
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
