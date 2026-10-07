---
title: Unity
description: Working in Unity with agents, plus useful packages and tools.
---

I typically use the latest stable major release of Unity. I upgrade as soon as possible as long as the project is still in development.
## Unity with Agents
- For task parallelization, use multiple copies of a Unity project. How you do this may differ depending on the VCS you use, but because Unity projects can be large and have a long initial import step, I prefer permanent copies over ephemeral copies.
- Building your own custom tools in Unity is very easy now, just make sure you use [UI Toolkit](https://docs.unity3d.com/Manual/UIElements.html).
- [Unity CLI](https://docs.unity.com/en-us/unity-cli/unity-cli) and [pipeline](https://docs.unity3d.com/Packages/com.unity.pipeline@latest/) are super useful. Unity CLI includes the same skills and MCP that the Codex and Claude Code plugins do, and you can use it directly from Pi or any other harness.
	- Have you actually looked at the [Unity Skills and MCP](https://github.com/Unity-Technologies/skills)? I guarantee most of what is in there you don't actually need.
- Current models are bad at handling input and UI interactions without a lot of guidance. This is one place where knowing how to do it by hand and providing clear instructions to agents will save a lot of frustration.
- See [`pi-unity`](https://pi.dev/packages?name=%40aefree%2Fpi-unity) for more tips. There's a lot inside of the Skills.
### Packages & Tools
Nowadays, you can do almost everything with Unity's own packages and tools.
#### Always
- [unity CLI](https://docs.unity.com/en-us/unity-cli/unity-cli) with [`pipeline`](https://docs.unity3d.com/Packages/com.unity.pipeline@latest/)
	- Facilitates agentic interactions with the Unity Editor
- [UI Toolkit](https://docs.unity3d.com/Manual/UIElements.html)
	- UGUI is being phased out in favor of UITK in modern Unity. It is web-like, more modular, and also easier for agents to work with. I have completely replaced UGUI with UITK in all my projects.
- [InputSystem](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest/)
	- This is the Unity default now and has replaced all other input manager packages I used to use.
#### Notable
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
