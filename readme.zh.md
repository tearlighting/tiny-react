# Tiny React

> 一个简化的 React 核心运行时实现 —— 包括 Fiber、Hooks、调度器、渲染逻辑等，旨在用于学习与实验。

---

## ✨ 特性

- 🧠 **Fiber 架构** – 实现 React 并发渲染机制的基础结构
- 🔁 **Reconciler 与 Commit 阶段** – 更新与副作用分离，支持 DOM diff
- ⚙️ **Hooks 系统** – 支持 `useState`、`useEffect`、`useRef`、`useReducer` 等
- 🎯 **任务调度器** – 基于最小堆实现协作式调度
- 🌐 **单页 Demo 路由** – 可通过 URL 路径选择不同的 demo

---

## 使用方法

```bash
pnpm install
pnpm dev
pnpm build
```

## 示例 Demo

### loacalhost

| Demo      | URL          | 描述                      |
| --------- | ------------ | ------------------------- |
| useState  | `/useState`  | 基本的状态更新 + 重新渲染 |
| useEffect | `/useEffect` | 副作用调度与清理逻辑      |
| useRef    | `/useRef`    | 跨渲染周期持久引用        |
| ...       | ...          | ...                       |

如需更多细节，请查看 demo/route/settings.tsx

### online

comming soon...

## 感想

刚学习 react 那会，自己也查过原理，什么 Scheduler，Reconciler，Render 三块，什么 useEffect 的异步执行，什么 useLayoutEffect 发生在
useEffect 之前........但是具体为啥可以重新渲染，说具体点 setData 的时候发生了什么，对我来说真就是纯黑箱。

我个人是比较讨厌这种黑箱的，虽然对程序员来说，可能不知道更有利于心智健康，毕竟我们也不是都需要进行库的开发，日常的开发的话，其实会用了就没有太大问题。但是果然是讨厌一无所知，就是想知道干啥了，当然也有时代的因素，如果不能往前继续前进，将来最先被 AI 取代的可能就是自己。

而且，之前也自己手搓过 Vue 的响应式系统，虽然我没有写到双端 diff，没有写到 patch，但是 effect，track，trigger 对我来说意义非凡，不手搓过真的很难想像的到 computed 这东西是 dity+effect 实现的。至少现在看到 Vue，我不会感到黑箱，proxy 可以在任意地方用，再也不用想 vue2 那会还要 created 递归 Object.defineProporty，再加上使用现代浏览器对 es6 的支持，dev 只把用到的东西编译成 es6 模块，也解决了 Vue2 是 webpack 巨慢的问题。但是要知道这些也不算轻松，还记得几年前吧，我那时连 npm run serve 都不知道是什么。现在也算是对 webpack 有了深刻的了解，entry-> loader-> bundle->output，plugin 的话应该是贯穿始终。但是前端并不是只有 Vue 啊，还有另一座大山，React。

这次真的是从模糊的概念一路推到底了，中间遇到各种各样的问题，当然主要还是对 fiber 的调试太难了，还有链表描述页面嵌套太深了。beginWork 会去对比 vnode 和 alternate 的 children，遍历两次，第二次使用 O(1) 的 Map 查找并标记新增、删除；completeWork 会标记更新、标记 ref、复用 DOM，并向上传递；workLoop 执行完 DFS 后进入 commitWork：beforeMutation 清除旧的 ref，mutation 执行 DOM 操作，切换 Fiber 树，layout 执行挂载 ref，调用 useLayoutEffect，最后异步触发 useEffect。

有一瞬间，我感觉自己“悟了”。几个让我印象深刻的点：

1. Hooks 的实现 —— 用 memorizedState 缓存一整条 hooks 链表，每次通过 updateWorkInProgressHook 顺序地读取，不是靠名称，而是靠调用顺序。

2. Hooks 和 Fiber updateQueue 的环形链表 —— 这种结构我从没见过，真的是大开眼界。

3. Scheduler 的时间切片调度 —— 使用最小堆不稀奇，毕竟刷过算法题。但 MessageChannel 用来构建宏任务队列，这种写法我还是第一次见。以后写 pub-sub、非阻塞机制时应该能用上。

4. 递归 vs 分片执行 —— 为了支持 time-slicing，所有逻辑都写成“中断-恢复”的风格。虽然我一直自称是“递归狂人”，但看到这里我开始重新思考递归的局限：递归调用栈是无法中断的，而这类 resume 机制才是真正的灵活。

跳出具体实现来看，React 和 Vue 的思想突然显得特别简单：

Vue 是观察者模式 —— reactive + effect，组件 render 被包在 effect 里，形成组件级更新。

React 是事件驱动 —— dispatch（比如用 useReducer）触发全局 render，diff 机制决定哪些部分更新。

说白了就是：

Vue：数据变了，相关组件重新渲染

React：dispatch 后，整体重渲，实际只更新必要部分

也许，真正的真理就是这么简单。但如果有一天我发现了某个真理，却没能力去实现，那才是最大的遗憾。所以我会继续前进，不会停滞。

我坚信——未来的我一定会感谢现在不懈努力的我。

```

```
