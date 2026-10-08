---
title: Unity
description: Working in Unity with agents, plus useful packages and tools.
---

I typically use the latest stable major release of Unity. I upgrade as soon as possible as long as the project is still in development.

## Unity with Agents

- For task parallelization, use multiple copies of a Unity project. I prefer permanent copies over ephemeral copies because Unity projects can be large and have a long initial import step. See [Multi-Workspace Management](#multi-workspace-management) below.
- Building your own custom tools in Unity is very easy now, just make sure you use [UI Toolkit](https://docs.unity3d.com/Manual/UIElements.html).
- [Unity CLI](https://docs.unity.com/en-us/unity-cli/unity-cli) and [pipeline](https://docs.unity3d.com/Packages/com.unity.pipeline@latest/) are super useful. Unity CLI includes the same skills and MCP that the Codex and Claude Code plugins do, and you can use it directly from Pi or any other harness.
    - Have you actually looked at the [Unity Skills and MCP](https://github.com/Unity-Technologies/skills)? I guarantee most of what is in there you don't actually need.
- Agents are very capable of editing Unity projects with the editor closed. All of my Unity agent tooling prior to Unity CLI existed to facilitate this.
	- You'll need to use Unity CLI or direct `batchmode` calls to run tests and check for compilation errors. See [`pi-unity`](https://pi.dev/packages?name=%40aefree%2Fpi-unity) to see how I handle that.
	- Batch mode steals window focus when it runs tests.
	- Play Mode tests and anything involving visual checks or input tests are more reliable using an open Editor and `pipeline`.
- Current models are bad at handling input and UI interactions without a lot of guidance. This is one place where knowing how to do it by hand and providing clear instructions to agents will save a lot of frustration.
- Set the Game window setting to "Play Unfocused" if you don't want the Unity Editor to constantly steal window focus when agents run tests.
- See [`pi-unity`](https://pi.dev/packages?name=%40aefree%2Fpi-unity) for more tips. There's a lot inside of the Skills.

## Multi-Workspace Management

Parallelization in Unity is non-trivial because of project size, and even harder with [UnityVCS](https://docs.unity.com/ugs/en-us/manual/devops/manual/unity-version-control) (Plastic SCM). I use a small Git repository around multiple UnityVCS workspaces for shared agent instructions, tools, and setup scripts. The Git repo is just a coordination layer. It doesn't contain the game.

For example:

```text
my-game/              # Git: shared instructions and setup
    AGENTS.md
    setup/
    ws1/game-unity/    # UnityVCS workspace: one project copy
    ws2/game-unity/    # UnityVCS workspace: another project copy
    ws3/game-unity/    # UnityVCS workspace: another project copy
```

- Create each `ws*` directory as a separate UnityVCS workspace pointing at the same repository, and ignore those directories in Git. These are independent working copies.
- Start agents from the coordination root and assign each task a workspace. For example, I could work in `ws1` while an agent fixes UI in `ws2` and another works in `ws3`. A typical starting prompt is something like "Check card 6xa. Use ws3. I want to..."
- Use task branches for everything.
- Route tools to the exact project path, not whichever Editor happens to be open. For MCP, I keep one named connection per copy, such as `unity_ws2`, targeting `ws2/game-unity`. Check the reported project path before making changes.
- Make sure to instruct agents *not* to create new workspaces (as if they were using git worktrees). They'll get stuck in a long initial asset import.
- This setup scales to any amount of workspaces. Practically speaking, I've never needed more than three. This is partially due to attention and mental load, and partially to avoid merge conflicts.

I keep workspace-routing rules in a shared YAML file so tools don't each need their own hardcoded paths. A simple version could look like this:

```yaml
workspaces:
  ws1:
    project: ws1/game-unity
    docs: ws1/docs
    todos: ws1/todos
  ws2:
    project: ws2/game-unity
    docs: ws2/docs
    todos: ws2/todos
```

You don't need my packages to do this. A few folders, clear workspace assignments, and explicit project paths are the important parts.

For implementation details, see [`pi-plastic`](https://github.com/aefreedman/pi-plastic) for workspace and branch operations, [`pi-unity`](https://github.com/aefreedman/pi-unity) for Editor workflows, and Unity's [CLI and MCP integration guide](https://github.com/Unity-Technologies/skills/blob/main/skills/unity-cli/references/integration-advanced.md) for connecting tools to a specific project.

## Packages & Tools

Nowadays, you can do almost everything with Unity's own packages and tools.

### Always

- [unity CLI](https://docs.unity.com/en-us/unity-cli/unity-cli) with [`pipeline`](https://docs.unity3d.com/Packages/com.unity.pipeline@latest/)
    - Facilitates agentic interactions with the Unity Editor
- [UI Toolkit](https://docs.unity3d.com/Manual/UIElements.html)
    - UGUI is being phased out in favor of UITK in modern Unity. It is web-like, more modular, and also easier for agents to work with. I have completely replaced UGUI with UITK in all my projects.
- [InputSystem](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest/)
    - This is the Unity default now and has replaced all other input manager packages I used to use.

### Notable

These are non-essential assets and packages I have used in multiple projects.

- [UniTask](https://github.com/Cysharp/UniTask) (free)
    - I've generally replaced coroutines with async/await in my current projects. If the project is complex enough I'll use [UniTask](https://github.com/Cysharp/UniTask), otherwise I'll stick with Unity's [`awaitable`](https://docs.unity3d.com/ScriptReference/Awaitable.html) if I'm just doing basic coroutine replacement.
- [YarnSpinner](https://yarnspinner.dev/) (paid, but free to try)
    - My go-to for dialogue writing. Package is production-ready, extensible, and designed to facilitate localization.
    - [Ink](https://github.com/inkle/ink) is an alternative, with more complex structural affordances, but if you need to support localization, you end up engineering it into [YarnSpinner](https://yarnspinner.dev/).
- [TextAnimator](https://tools.febucci.com/text-animator/) (paid)
    - For when you need to animate or modify text beyond basic rich-text tags.
    - [YarnSpinner](https://yarnspinner.dev/) includes an integration for this package.
- [Shapes](https://www.acegikmo.com/shapes/) (paid)
    - If you need to do runtime primitive drawing, this is the package for it. It's great for prototyping, but I've also made whole games with it.
- [DoTween Pro](https://dotween.demigiant.com/pro.php) (paid)
    - Agents will tend to write their own tweens, but I would still prefer they use the [DoTween API](https://dotween.demigiant.com/documentation.php) for this instead of every tween having a bespoke runner.
- [Odin Inspector](https://odininspector.com/) & [Validator](https://odininspector.com/odin-validator) (paid)
    - Still the best for editor customization, but with [UI Toolkit](https://docs.unity3d.com/Manual/UIElements.html) becoming more mature recently, it's become much easier to do it yourself.

## Related notes

For the broader approach to design, see [[principles#On Agentic Game Dev & Design|game development and design with agents]]. The [[tools-and-setup#Packages and Extensions|agent packages]] and [[tools-and-setup#Version Control|version-control choices]] are covered in Tools and Setup.
