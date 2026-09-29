# Git

`main` is the published line, and it is the default branch on GitHub (`dinoslabtech/atlas`). Work does not land there directly. It receives a merge from `dev` when that line is published.

`dev` is the local integration branch, cut from `main`. Feature branches merge here.

`feature/<short-name>` is cut from `dev` and merged back into `dev` with `--no-ff`. It stays on this machine. Do not push it to `origin`. After the merge, remove the worktree and delete the local branch.

Check the feature branch out under `.worktrees/<name>`. `.worktrees/README.md` is tracked. Everything else under `.worktrees/` is ignored. Leave the primary checkout on `dev`.

## Commit messages

Write an imperative subject, then a body when the reason is not obvious. Keep a commit to one change. Mention the tests that ran.

Do not rewrite history or force-push.

## Identity

Commits belong to Michele Forese, `61668083+micheleforese@users.noreply.github.com`. This machine has no global `user.name` or `user.email`. Set both in this repository before committing.

## Publish

Push `main` only when asked. `dev` and `feature/*` stay local.
