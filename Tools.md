# Unity
I typically use the latest stable major release of Unity, and upgrade as soon as possible, as long as the project is still in development.
### Packages & Tools
### Always
- Unity CLI
- `pipeline`
- UI Toolkit
	- I have completely replaced UGUI with UITK in all my projects at this point.
- InputSystem

### Project-dependent
- UniTask
	- I've generally replaced coroutines with async/await in my current projects. If the project is complex enough I'll use UniTask, otherwise I'll stick with Unity's `awaitable` if I'm just doing basic coroutine replacement.
- YarnSpinner
	- My go-to for dialogue writing.
- Shapes
	- If you need to do any kind of runtime primitive drawing, this is the package for it.
- DoTween Pro
	- Agents will tend to write their own tweens, but I would still prefer they use the DoTween API for this instead of every tween having a bespoke runner.
- Odin Inspector & Validator
	- Still the best for editor customization, but with UI Toolkit becoming more mature recently, it's become much easier to do this "by hand".
# Version Control

For Unity: typically UnityVCS (Plastic). Otherwise, git.

# Project Management
- [Codecks](codecks.io) for collaborative work or project where I need to track player feedback sent from builds.
- Otherwise I use .md files with basic subfolders and YAML frontmatter to track the workflow.
	- For example `docs/plans` and `docs/ideas` and `status: [draft, ready, done]`
- For real full-blown production, I use both, with additional automation tooling to help move full milestone planning breakdowns into Codecks (or whatever other tool).
- For an understanding of my general production workflow, it looks a lot like what is described in [Playful Production Process](https://www.playfulproductionprocess.com)
# Agent Harness
I use [Pi](https://pi.dev). It's easy to modify to fit my needs, even on a per-project basis. It's also straightforward to inspect and debug.

I've previously used OpenCode (it's a little fussier to modify). I barely use Codex or Claude Code, mostly just for basic chat or tasks involving something like Google Drive.
## Packages and Extensions
See [Pi packages](https://pi.dev/packages?name=%40aefree) or check my [GitHub]([https://github.com/aefreedman).

The most frequently developed ones are `pi-codecks`, `pi-plastic`, and `pi-unity`, with `pi-unity-docs` an important secondary package. `pi-themes` has Solarized Light and Dark themes. Many of the other ones are experiments or niche workflow aids of questionable helpfulness.
### Typical setup
Packages are mine unless otherwise noted.
- @nicopreme:`pi-subagents`
- @nicopreme:`pi-web-access`
- `pi-themes`
- `pi-codecks`
- `pi-unity`
- `pi-plastic`
- 

### Unity-specific
- I don't end up using the Unity MCP or Skills much, mostly because I already have my own package