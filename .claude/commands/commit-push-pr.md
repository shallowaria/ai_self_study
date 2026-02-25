---
description: 自动收集 git status、生成 commit message、推代码、开 PR
---

## Commands

- `/commit-push-pr`:
  1. 执行 `git status` 收集变更信息。
  2. 调用 `github.create_commit` 或使用本地 git 生成符合“约定式提交”的 message。
  3. 执行 `git push`（若远程分支不存在则自动创建）。
  4. 调用 `github.create_pull_request`，标题需简洁，正文需概括本次修改的核心功能（参照项目宪法）。
