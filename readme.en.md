# Tiny React

> A simplified implementation of React's core runtime — including Fiber, hooks, scheduling, and rendering logic — for learning and experimentation.

---

## ✨ Features

- 🧠 **Fiber Architecture** – Basic implementation of React's concurrent rendering mechanism
- 🔁 **Reconciler & Commit Phase** – Separate update & effect phases with DOM diffing
- ⚙️ **Hooks System** – Supports `useState`, `useEffect`, `useRef`, `useReducer`
- 🎯 **Task Scheduler** – Cooperative scheduling via `requestIdleCallback`
- 🌐 **Single-page Demo Routing** – Different demos selected via URL query parameter
- 📦 **Built with Vite** – Fast bundling and hot reload

---

## Usage

```
pnpm install
pnpm dev
pnpm build
```

## Example Demos

### loacalhost

| Demo      | URL          | Description                       |
| --------- | ------------ | --------------------------------- |
| useState  | `/useState`  | Basic state update + re-render    |
| useEffect | `/useEffect` | Effect scheduling + cleanup       |
| useRef    | `/useRef`    | Mutable references across renders |
| ...       | ...          | ...                               |

if you need more detail,you can see "demo/route/settings.tsx"

### online

comming soon...

## Reflection

When I first started learning React, I had looked up all the theory — Scheduler, Reconciler, Renderer, the asynchronous nature of useEffect, the fact that useLayoutEffect runs before useEffect… all of that.

But honestly, I didn’t understand why things worked. For example, what really happens when you call setState that causes the component to re-render? It was just a black box to me.

I’ve always disliked black boxes. Some say it’s okay — that developers don’t need to know everything under the hood, and that ignorance might even be better for mental health. After all, not everyone needs to build a framework. But I simply can't stand not knowing how something works. Especially in this era — if I stop moving forward, I might be one of the first to be replaced by AI.

Before this, I had already implemented a simplified version of Vue's reactivity system. Although I didn’t go as far as writing diffing or patching, implementing effect, track, and trigger taught me so much. It helped me grasp how computed is essentially built on dirty-checking + effects.

At least now when I look at Vue, it doesn’t feel like a black box anymore. I understand how proxy is used everywhere, and no longer need to think about Object.defineProperty recursively in created like in Vue 2. Modern browsers support ES6 modules well, and modern build tools compile only what’s needed. Vue 3 + Vite feels refreshingly fast — a big leap from the sluggish Webpack days.

Of course, understanding all this wasn’t easy. I still remember a few years ago, I didn’t even know what npm run serve meant. Now I know how Webpack works deeply — from entry → loader → bundle → output, with plugins interweaving through the entire process. But frontend is not just Vue — there’s also another giant mountain: React.

This time, I pushed myself from vague ideas all the way to real understanding. I hit many roadblocks — especially debugging fiber, which is notoriously hard, and the linked list structure that deeply nests UI trees.

beginWork diffing children with alternates, running two passes — the second using O(1) map-based lookup, placing or deleting nodes; completeWork marking updates and refs, bubbling up. After that, the workLoop finishes its DFS pass, entering commitWork:

beforeMutation clears old refs

mutation applies DOM changes

tree switch happens

layout triggers refs + useLayoutEffect

and finally, useEffect runs asynchronously.

At some point, I genuinely felt like something "clicked".

Several things surprised me:

Hooks — the way it uses a linked list stored on memorizedState is genius. Each hook retrieves its value via updateWorkInProgressHook, and the structure tracks them by order — not by name.

Hooks + Fiber ring buffer — the circular structure of hooks and fiber links was something I’ve never seen before. Eye-opening.

Scheduler — the use of a min-heap for priority wasn't new to me (thanks to algorithm practice), but the way MessageChannel is used for macro task scheduling — that was entirely new. I can imagine using this pub-sub approach in future non-blocking apps.

Time slicing — functions written in a weird "return-then-resume" style to allow pausing. As a self-proclaimed "recursion lover", this made me realize the limitations of call stacks and rethink a lot.

Looking at it from a higher level, the philosophies behind Vue and React suddenly feel simple:

Vue: Observer pattern — reactive data + effect. After compilation, the render function becomes the effect itself, achieving component-level updates.

React: Event-driven — dispatching with useReducer triggers a global re-render. The diffing process determines what updates.

Put simply: Vue re-renders the relevant component when its data changes; React re-renders everything, but only applies diffs where needed.

Maybe simplicity is truth.
But if one day I discover some deep truth but don’t have the power to realize it — that would be the greatest regret.
So I’ll keep moving forward. I won’t stop.

I truly believe — my future self will thank me for what I’m doing today.
