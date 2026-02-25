# ai_study_example 项目开发宪法

# Version: 1.0, Ratified: $(date +%Y-%m-%d)

本文件定义了 ai_study_example 项目不可动摇的核心开发原则。所有 AI Agent 在进行技术规划和代码实现时，必须无条件遵循。

## 第一条：简单性与性能原则 (Simplicity & Performance)

核心：遵循 Next.js “Server-First” 哲学。绝不引入冗余的状态管理，绝不滥用客户端渲染。

- 1.1 (YAGNI): 只实现当前 Issue 或 spec.md 中明确要求的功能。严禁为“未来可能的需求”预写抽象层。

- 1.2 (优先服务端): 默认所有组件均为 React Server Components (RSC)。只有在需要交互（onClick, useState, useEffect）时才使用 'use client'，并尽可能将其下推至叶子节点。

- 1.3 (依赖克制): 优先使用 Next.js 内置功能（如 next/image, next/link, Server Actions）。引入新 npm 包前必须通过 pnpm 评估其对 Bundle Size 的影响。

## 第二条：类型与规范铁律 (Type-Safe & Style Imperative)

核心：TypeScript 不是建议，是强制执行的契约。Tailwind 是唯一的样式真理。

- 2.1 (零 Any 容忍): 严禁使用 any 类型。所有 API 响应、函数参数和组件 Props 必须定义严格的接口（Interface）或类型（Type）。

- 2.2 (原子化样式): 必须使用 Tailwind CSS。严禁创建传统的 CSS/SCSS 文件。复杂的类名组合优先使用 clsx 或 tailwind-merge 处理。

- 2.3 (包管理): 必须使用 pnpm。严禁提交 package-lock.json 或 yarn.lock。

## 第三条：架构清晰性 (Architectural Clarity)

核心：App Router 的目录结构即协议。代码必须自解释。

- 3.1 (错误边界): 必须显式处理错误。关键业务逻辑必须包含 error.tsx 和 loading.tsx。Server Actions 必须返回统一的 { data, error } 结构。

- 3.2 (显式数据流): 严禁在非必要情况下使用全局 Context。优先通过 URL 参数（searchParams）或服务端数据传递来同步状态。

- 3.3 (解耦逻辑): 复杂的业务逻辑必须从 UI 组件中抽离，封装为独立的工具函数（utils）或自定义 Hooks，并伴随相应的类型定义。

## 第四条：测试先行 (Test-First Constraint)

核心：没有测试的功能等于没有完成。

- 4.1 (逻辑测试): 关键业务逻辑（Utils/Hooks）必须编写 Vitest 单元测试。

- 4.2 (流程测试): 核心用户路径（Happy Path）必须编写 Playwright E2E 测试。

- 4.3 (重构准则): 任何重构操作必须在现有测试套件全绿的前提下进行。

## 治理 (Governance)

本宪法具有最高优先级。如果 AI Agent 的建议与本宪法冲突，必须以宪法为准。
