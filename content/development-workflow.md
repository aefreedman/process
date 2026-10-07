---
title: Development Workflow
description: The day-to-day development loop, planning, playtesting, and production resources.
---
## Basic Loop

1. I pick a task from my backlog.
2. Iterate on the plan with an agent.
3. Record the plan outside of the agent session.
4. Execute the plan.
5. Developer playtesting and review.
6. Documentation cleanup and housekeeping.
7. Integration into a development branch.
8. Player playtesting and feedback.
9. Make follow-up tasks.

## Loop (Detailed)

1. I pick a task from my backlog.
	- Iterate on the plan with an agent. I'm looking for a plan that aligns with my expectations and is of an appropriate scope.
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

## Session Review

If you use a self-inspectable harness like Pi, you can have the agent inspect its own logs and check for errors. I use this to find bugs and workflow issues in my tooling, usually at the end of a week or month.

> Check all session logs from the past [date-range] and check for issues with [insert targets].

Even better: make a package to help you do that. I did.
## Workflow hacks

- Leave something unfinished when you stop working. You'll always know where to start the next day.

## Project Management

- [Codecks](https://www.codecks.io/) for collaborative work or project where I need to track player feedback sent from builds.
- Otherwise I use .md files with basic subfolders and YAML frontmatter to track the workflow.
    - For example `docs/plans` and `docs/ideas` and `status: [draft, ready, done]`
- For full-blown production, I use both with additional automation tooling to help move full milestone planning breakdowns into Codecks (or whatever other tool).
- For an understanding of my general production workflow, it looks a lot like what is described in [Playful Production Process](https://www.playfulproductionprocess.com).
- Also check [@aefree:pi-project-management](https://pi.dev/packages?name=%40aefree%2Fpi-project-management)

## Related notes

For the thinking behind this workflow, see [[principles]]. For branch and storage choices, see [[tools-and-setup#Version Control|version control]].
