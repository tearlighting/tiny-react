## 感想

刚学习 react 那会，自己也查过原理，什么 Scheduler，Reconciler,Render 三块，什么 useEffect 的异步执行，什么 useLayoutEffect 发生在 useEffect 之前........
但是具体为啥可以重新渲染，说具体点 setData 的时候发生了什么，对我来说真就是纯黑箱。我个人是比较讨厌这种黑箱的，虽然对程序员来说，可能不知道更有利于心智健康，毕竟我们也不是都需要进行库的开发，日常的开发的话，其实会用了就没有太大问题。但是果然是讨厌一无所知，就是想知道干啥了，当然也有时代的因素，如果不能往前继续前进，将来最先被 AI 取代的可能就是自己。
而且，之前也自己手搓过 Vue 的响应式系统，虽然我没有写到双端 diff,没有写到 patch，但是 effect,track,trigger 对我来说意义非凡，不手搓过真的很难想像的到 computed 这东西是 dity+effect 实现的。至少现在看到 Vue,我不会感到黑箱，proxy 可以在任意地方用，再也不用想 vue2 那会还要 created 递归 Object.defineProporty，再加上使用现代浏览器对 es6 的支持，dev 只把用到的东西编译成 es6 模块，也解决了 Vue2 是 webpack 巨慢的问题。但是要知道这些也不算轻松，还记得几年前吧，我那时连 npm run serve 都不知道是什么。现在也算是对 webpack 有了深刻的了解，entry-> loader-> bundle->output,plugin 的话应该是贯穿始终。但是前端并不是只有 Vue 啊，还有另一座大山，React。
这次真的是从模糊的概念一路推到底了，中间遇到各种各样的问题，当然主要还是对 fiber 的调试太难了，还有链表描述页面嵌套太深了。beginWork 去 diff vnode 和 alternate 的 children，两次遍历 diff,第二次使用 O(1)的 map 搜索，然后编辑 PlaceMent，Deletion;completeWork 去 diff props 标记 update,去复用 dom,去标记 Ref，然后冒泡.等这个 workLoop 的 dfs 执行完了，开始去 commitWork.beforeMutation 去清掉旧 Ref，mutation 根据标记去操作 dom,然后是切换两颗 fiber tree,layout 去重新挂载 ref,触发 useLayoutEffect，useImpretiveHandle 的同步方法。最后异步触发 useEffect。我忽然感觉我好像通了。
我有几大吃惊，
一是 hooks,通过 memoriedState 缓存一个 hooks 的链表。每个 hooks 通过 updateWorkInProgressHook 去拿缓存值，不同 hooks 存的值也不同。
二是 hooks 和 fiber 的环形链表，这东西真的没有见过，真的是学到了。
三是 Scheduler 的玩法，最小堆其实还好，我刷算法题也不是没有见过。但是 MessageChannel 的宏任务是确实第一次玩，感觉以后的 pub-sub 甚至也可以这样玩了，如果不需要同步的话。
四是，为了 timing slicing，循序写的奇奇怪怪的，每次都 return 然后继续。其实我个人是很喜欢递归的，甚至称自己为递归狂人，但是看到这种操作我不禁陷入了沉思。递归的 stack 模式是中断不了的，我看到了局限。

其实现在从很细的点跳出来之后，发现宏观上 vue 和 React 的思路真的很简单。vue 是观察者模式，自己自动收集依赖触发更新，reactive 的条件就是响应式数据（proxy）+Effect，正好 compile 之后，一个组件的 render 函数是放在 effect 里面，实现了组件级更新。react 就更简单了，通过 useReducer 的 dispatch 触发整地的 diff，通过 diff 去判断那些需要更新。说的更直白一点就是，vue 数据变化，对应组件重新渲染。react dispatch 之后，整体重新渲染。
可能简单的东西才是真理吧，但是如果我哪天发现了真理，但是没有足够的力量去实现他，那一定会让人感到遗憾吧。所以，我将继续前进，不会停滞不前的，我相信未来的我一定会感谢现在的自己。
