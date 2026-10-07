---
title: Overview
description: My daily game development and design methods, tools, and further reading.
---

# Contents
- [Method](#method)
  - [Overall Strategy](#overall-strategy)
  - [On Agentic Coding](#on-agentic-coding)
  - [On Agentic Game Dev & Design](#on-agentic-game-dev--design)
  - [On Current Models](#on-current-models)
  - [Workflow hacks](#workflow-hacks)
- [Agent Harness](#agent-harness)
  - [Packages and Extensions](#packages-and-extensions)
    - [Typical setup](#typical-setup)
- [Dev tools](#dev-tools)
- [Unity](#unity)
  - [Unity with Agents](#unity-with-agents)
    - [Packages & Tools](#packages--tools)
      - [Always](#always)
      - [Notable](#notable)
- [Version Control](#version-control)
- [Project Management](#project-management)

# Method
## Maxims
- Build it yourself
- Be curious
- Do the part you enjoy doing
- Do the weird thing
## Overall Strategy
Friction is useful. A great way to learn is to avoid automating everything right away. Learn what happens at each stage and build up from there. Remember, at any point you can always work with an agent to learn something!

How do you avoid slop? 
* If something doesn't exist yet: I want the agent to ***ask me*** what should exist.
* If something already exists: I want the agent to ***tell me*** what it is. 
## General Development Loop
1. I pick a task from my backlog and iterate on a plan with an agent. I'm looking for a plan that aligns with my expectations and is of an appropriate scope.
	- If the initial feature description is poorly defined, I have the agent check for relevant context and ask me a few targeted questions. I make sure to tell the agent what I want it to focus on. My goal is to get my intent into context, so the agent doesn't make its own decision. Often, agents will return with recommended answers. If you're not good at ignoring suggestions, you might want to tell it not to do that.
	- Decide on a "definition of done" here. Have an expectation of what you want to happen and what is or isn't acceptable. This is about giving yourself permission to finish working on this task and move on.
	- See my [effort estimation rubric](https://github.com/aefreedman/pi-project-management/blob/main/skills/estimating-effort/references/scoring-model.md) for an idea of how I estimate scope. My rule-of-thumb is "effort: 3" is the target. Effort is not a measure of time. 
	- My plans always include test coverage. Depending on your setup, you may need to explicitly tell agents to add test coverage.
	- Think _really really_ hard if there's a better way to do what you're about to do. Current models are trained to do what you tell them to do, and they'll try their best to finish a task that is impossible.
2. Record the feature description, plan, spec, whatever somewhere outside of the agent session. For example, a summary goes in my project tracker, and a more detailed plan is written to a .md file.
3. Execute the plan. All work always happens on its own branch.
	- I have my workflow set up to automatically test and review and fix errors until the task is provably complete. _This may not be the best choice for you_.
	- Be careful with tasks involving input handling or visual changes.
4. This is where I switch to another task. I may start or finish another loop. _Or, take a break or something._
5. Developer playtesting and review. Depending on the task, this can be quick or the longest part of the whole process.
	- It doesn't need to be perfect; it needs to be _done_. What was your definition of done at the beginning?
	- I avoid extended variable tweaking sessions. It can be slow, frustrating, and a poor use of tokens. I'd rather tune by hand and then have the agent check that I didn't break something and run validation.
6. Integration into a development branch.
	- I also make sure to do any documentation cleanup and housekeeping here.
7. Player playtesting and feedback.
	- This is where you test your assumptions from the initial idea against reality.
## On Agentic Coding
- Programming isn't a special, privileged skill to hold on a pedestal. That doesn't mean learning as much as you can about it won't help.
- Nothing is stopping you from learning something. I've learned just as much, if not more, about game dev, game design, project management, business management, and software development this year as at any other point.
- Read the documentation. Actually read the [Claude](https://code.claude.com/docs/en/overview) or [Codex](https://developers.openai.com/codex/) or [Unity](https://docs.unity3d.com/Manual/) manuals. Have some kind of idea of what is _supposed_ to happen.
## On Agentic Game Dev & Design
- I never ask an agent for advice on high-level game design. I have it ask _me_.
- Agents love writing test code that validates flaky game design variables, like text or tuning settings. Watch out for that.
- Agents can be very bad at understanding what _your_ game is, how it works, and how all the pieces work together.
- Remember to think about how you want to make edits to your game in the future, not just right now. How are you going to tune it? Where are the settings? How are you going to find them?
- Current models match patterns they find in your codebase. Studying resources like [Game Programming Patterns](https://gameprogrammingpatterns.com) will help you understand high-level architecture.  [Characteristics of Games](https://mitpress.mit.edu/9780262542692/characteristics-of-games/) is also great as a design-focused resource.
## On Current Models
- I typically use Low or Medium thinking levels.
- [GPT 6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol) is very capable.
## Workflow hacks
- Leave something unfinished when you stop working. You'll always know where to start the next day.
# Agent Harness
I use [Pi](https://pi.dev). It's easy to modify to fit my needs, even on a per-project basis. It's also straightforward to inspect and debug. Read the [manual](https://pi.dev/docs/latest).

Pi is also very lean and you have fine-grained control over what it loads into context and how it behaves. It's great for running on a limited token budget.

I've previously used [OpenCode](https://opencode.ai/), but it's fussier to modify and inspect. I only use [Codex](https://developers.openai.com/codex/) or [Claude Code](https://code.claude.com/docs/en/overview) for basic chat or tasks involving something like [Google Drive](https://drive.google.com/). Working with image generation can also be easier in the providers' own apps.
## Packages and Extensions

> [!NOTE] Source
> See [Pi packages](https://pi.dev/packages?name=%40aefree) or check my [GitHub](https://github.com/aefreedman)

My packages are focused on tool-use and skills for CLIs and APIs that don't have coverage yet.

The most frequently developed packages are [`pi-codecks`](https://pi.dev/packages?name=%40aefree%2Fpi-codecks), [`pi-plastic`](https://pi.dev/packages?name=%40aefree%2Fpi-plastic), and [`pi-unity`](https://pi.dev/packages?name=%40aefree%2Fpi-unity), with [`pi-unity-docs`](https://pi.dev/packages?name=%40aefree%2Fpi-unity-docs) an important secondary package. [`pi-themes`](https://pi.dev/packages?name=%40aefree%2Fpi-themes) has Solarized Light and Dark themes. Many of the other ones are experiments or niche workflow aids of questionable helpfulness.
### Typical setup
Packages are mine unless otherwise noted.
- @nicopreme:[`pi-subagents`](https://github.com/nicobailon/pi-subagents)
	- I have my own `pi-subagents` package I used for a long time, but I no longer update it.
- @nicopreme:[`pi-web-access`](https://github.com/nicobailon/pi-web-access)
- [`pi-themes`](https://pi.dev/packages?name=%40aefree%2Fpi-themes)
- [`pi-codecks`](https://pi.dev/packages?name=%40aefree%2Fpi-codecks)
- [`pi-unity`](https://pi.dev/packages?name=%40aefree%2Fpi-unity)
- [`pi-unity-docs`](https://pi.dev/packages?name=%40aefree%2Fpi-unity-docs)
- [`pi-plastic`](https://pi.dev/packages?name=%40aefree%2Fpi-plastic)
- [`pi-project-management`](https://pi.dev/packages?name=%40aefree%2Fpi-project-management)
# Dev tools
- Credential Management: [1Password](https://1password.com/)
- Shells and Terminals:
	- OSX/Linux: [zsh](https://www.zsh.org/), [tmux](https://github.com/tmux/tmux/wiki), [WezTerm](https://wezterm.org/)
	- Windows: [Powershell 7](https://learn.microsoft.com/powershell/), [Windows Terminal](https://learn.microsoft.com/windows/terminal/), [WezTerm](https://wezterm.org/)
	- powerline renderer: [oh-my-posh](https://ohmyposh.dev/)
	- git: [serie](https://github.com/lusingander/serie)
	- markdown: [glow](https://github.com/charmbracelet/glow)
- Containerization: [Docker](https://docs.docker.com/get-started/)
- Remote Access: 
	- [Tailscale](https://tailscale.com/)
	- [Parsec](https://parsec.app/)
	- [Windows RDP](https://learn.microsoft.com/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access) as backup
- IDE: [VS Code](https://code.visualstudio.com/)
	- I basically turn everything off and just use it as a file browser with syntax highlighting
- Text editor
	- [Obsidian](https://obsidian.md/) -> see [aefreedman/obsidian-mono](https://github.com/aefreedman/obsidian-mono)
- [Windows PowerToys](https://learn.microsoft.com/windows/powertoys/). Highlights: adds [native .md viewing](https://learn.microsoft.com/windows/powertoys/file-explorer) to Windows Explorer. [FancyZones](https://learn.microsoft.com/windows/powertoys/fancyzones) is also useful for managing multiple instances of windows from the same app
- Fonts:
	- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) + [Nerd Font](https://www.nerdfonts.com/)
	- [Iosevka](https://github.com/be5invis/Iosevka)
	- [Recursive](https://www.recursive.design/)
# Unity
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
# Version Control
 - [UnityVCS (Plastic/`cm`)](https://docs.unity.com/ugs/en-us/manual/devops/manual/unity-version-control): See [@aefree:pi-plastic](https://pi.dev/packages?name=%40aefree%2Fpi-plastic)
	 - The free tier covers most usage when you want private storage, up to five collaborators, and easy binary file storage. The downside is it's cloud-only and models aren't good at using it without some help.
	 - Notable `cm` quirks: `cm diff` _only_ opens an interactive GUI
 - [git](https://git-scm.com/book/en/v2)
	 - Better for public projects and those without a lot of binary assets.
# Project Management
- [Codecks](https://www.codecks.io/) for collaborative work or project where I need to track player feedback sent from builds.
- Otherwise I use .md files with basic subfolders and YAML frontmatter to track the workflow.
	- For example `docs/plans` and `docs/ideas` and `status: [draft, ready, done]`
- For full-blown production, I use both with additional automation tooling to help move full milestone planning breakdowns into Codecks (or whatever other tool).
- For an understanding of my general production workflow, it looks a lot like what is described in [Playful Production Process](https://www.playfulproductionprocess.com).
- Also check [@aefree:pi-project-management](https://pi.dev/packages?name=%40aefree%2Fpi-project-management)
