---
title: Tools and Setup
description: Agent harness, packages, development tools, version control, and current model preferences.
---

## Agent Harness

I use [Pi](https://pi.dev). It's easy to modify to fit my needs, even on a per-project basis. It's also straightforward to inspect and debug. Read the [manual](https://pi.dev/docs/latest).

Pi is also very lean and you have fine-grained control over what it loads into context and how it behaves. It's great for running on a limited token budget.

I've previously used [OpenCode](https://opencode.ai/), but it's fussier to modify and inspect. I only use [Codex](https://developers.openai.com/codex/) or [Claude Code](https://code.claude.com/docs/en/overview) for basic chat or tasks involving something like [Google Drive](https://drive.google.com/). Working with image generation can also be easier in the providers' own apps.

### Packages and Extensions

> [!WARNING]
> If you're just starting out, I recommend not using anyone else's packages. If you need something, make it yourself!

My packages are focused on tool-use and skills for CLIs and APIs that don't have coverage yet. See [Pi packages](https://pi.dev/packages?name=%40aefree) or check my [GitHub](https://github.com/aefreedman)

The most frequently developed packages are [`pi-codecks`](https://pi.dev/packages?name=%40aefree%2Fpi-codecks), [`pi-plastic`](https://pi.dev/packages?name=%40aefree%2Fpi-plastic), and [`pi-unity`](https://pi.dev/packages?name=%40aefree%2Fpi-unity), with [`pi-unity-docs`](https://pi.dev/packages?name=%40aefree%2Fpi-unity-docs) an important secondary package. [`pi-themes`](https://pi.dev/packages?name=%40aefree%2Fpi-themes) has Solarized Light and Dark themes. Many of the other ones are experiments or niche workflow aids of questionable helpfulness.

#### Typical setup

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

## On Current Models

- I typically use Low or Medium thinking levels.
- [GPT 6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol) is very capable.

## Dev tools

- Credential Management: [1Password](https://1password.com/)
- Shells and Terminals:
    - OSX/Linux: [zsh](https://www.zsh.org/), [tmux](https://github.com/tmux/tmux/wiki), [WezTerm](https://wezterm.org/)
    - Windows: [Powershell 7](https://learn.microsoft.com/powershell/), [Windows Terminal](https://learn.microsoft.com/windows/terminal/), [WezTerm](https://wezterm.org/)
    - powerline renderer: [oh-my-posh](https://ohmyposh.dev/)
    - markdown: [glow](https://github.com/charmbracelet/glow)
- Version Control
	- git
		- [serie](https://github.com/lusingander/serie)
		- [SourceTree](www.sourcetreeapp.com)
	- UnityVCS
		- my [fork](https://github.com/aefreedman/serie) of serie supports UnityVCS
		- You have to use the official GUI app for a lot still, like auth
- Containerization: [Docker](https://docs.docker.com/get-started/)
- Remote Access:
    - [Tailscale](https://tailscale.com/)
    - [Parsec](https://parsec.app/)
    - [Windows RDP](https://learn.microsoft.com/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access) as backup
- IDE: [VS Code](https://code.visualstudio.com/)
    - I turn everything off and just use it as a file browser with syntax highlighting.
    - I use [JetBrains Rider](https://www.jetbrains.com/rider/) when I need a full-blown IDE, which is never, anymore.
- Markdown editor
    - [Obsidian](https://obsidian.md/) -> see [aefreedman/obsidian-mono](https://github.com/aefreedman/obsidian-mono)
- [Windows PowerToys](https://learn.microsoft.com/windows/powertoys/). Highlights: adds [native .md viewing](https://learn.microsoft.com/windows/powertoys/file-explorer) to Windows Explorer. [FancyZones](https://learn.microsoft.com/windows/powertoys/fancyzones) is also useful for managing multiple instances of windows from the same app
- Fonts:
    - [JetBrains Mono](https://www.jetbrains.com/lp/mono/) + [Nerd Font](https://www.nerdfonts.com/)
    - [Iosevka](https://github.com/be5invis/Iosevka)
    - [Recursive](https://www.recursive.design/)

## Version Control

- [UnityVCS (Plastic/`cm`)](https://docs.unity.com/ugs/en-us/manual/devops/manual/unity-version-control): See [@aefree:pi-plastic](https://pi.dev/packages?name=%40aefree%2Fpi-plastic)
    - The free tier covers most usage when you want private storage, up to five collaborators, and easy binary file storage. The downside is it's cloud-only and models aren't good at using it without some help.
    - Notable `cm` quirks: `cm diff` _only_ opens an interactive GUI
- [git](https://git-scm.com/book/en/v2)
    - Better for public projects and those without a lot of binary assets.

## Related notes

See [[unity#Packages & Tools|Unity packages and tools]] for the engine-specific setup, and [[development-workflow#Project Management|project management]] for planning and tracking.
