import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { createElement } from "@/lib/react-dom"

export function Reflection() {
  return (
    <div className="bg-[#f5f2f0] prose max-w-3xl mx-auto h-full px-4 py-10 text-gray-800 dark:text-gray-100 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Reflection: My Tiny React Journey</h1>

      <p className=" mb-2">
        When I first started learning React, I had looked up all the theory — Scheduler, Reconciler, Renderer, the asynchronous nature of <code className="font-semibold ">useEffect</code>, the fact
        that
        <code className="font-semibold "> useLayoutEffect</code> runs before <code className="font-semibold ">useEffect</code>… all of that.
      </p>

      <p className="mb-2">
        But honestly, I didn’t understand why things worked. For example, what really happens when you call <code className="font-semibold ">setState</code> that causes the component to re-render? It
        was just a black box to me.
      </p>

      <p className="mb-2">
        I’ve always disliked black boxes. Some say it’s okay — that developers don’t need to know everything under the hood, and that ignorance might even be better for mental health. After all, not
        everyone needs to build a framework. But I simply can't stand not knowing how something works. Especially in this era — if I stop moving forward, I might be one of the first to be replaced by
        AI.
      </p>

      <p className="mb-2">
        Before this, I had already implemented a simplified version of Vue's reactivity system. Although I didn’t go as far as writing diffing or patching, implementing
        <code className="font-semibold "> effect</code>, <code className="font-semibold ">track</code>, and <code className="font-semibold ">trigger</code> taught me so much. It helped me grasp how{" "}
        <code className="font-semibold ">computed</code> is essentially built on dirty-checking + effects.
      </p>

      <p className="mb-2">
        At least now when I look at Vue, it doesn’t feel like a black box anymore. I understand how
        <code className="font-semibold "> Proxy</code> is used everywhere, and no longer need to think about
        <code className="font-semibold "> Object.defineProperty</code> recursively in <code className="font-semibold ">created</code> like in Vue 2. Modern browsers support ES6 modules well, and
        modern build tools compile only what’s needed. Vue 3 + Vite feels refreshingly fast — a big leap from the sluggish Webpack days.
      </p>

      <p className="mb-2">
        Of course, understanding all this wasn’t easy. I still remember a few years ago, I didn’t even know what <code className="font-semibold ">npm run serve</code> meant. Now I know how Webpack
        works deeply — from <code className="font-semibold ">entry</code> → <code className="font-semibold "> loader</code> → <code className="font-semibold "> bundle</code> →{" "}
        <code className="font-semibold ">output</code>, with <code className="font-semibold "> plugins</code> interweaving through the entire process. But frontend is not just Vue — there’s also
        another giant mountain: React.
      </p>

      <p className="mb-2">
        This time, I pushed myself from vague ideas all the way to real understanding. I hit many roadblocks — especially debugging <code className="font-semibold ">fiber</code>, which is notoriously
        hard, and the linked list structure that deeply nests UI trees.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Fiber Walkthrough</h2>
      <ul className="list-disc pl-6">
        <li>
          <code className="font-semibold ">beginWork</code> diffing children with alternates, two passes
        </li>
        <li>
          <code className="font-semibold ">completeWork</code> marking updates and refs, bubbling up
        </li>
        <li>
          <code className="font-semibold ">commitWork</code> phase with:
        </li>
        <ul className="list-disc pl-6">
          <li>
            <code className="font-semibold ">beforeMutation</code> clears old refs
          </li>
          <li>
            <code className="font-semibold ">mutation</code> applies DOM changes
          </li>
          <li>
            <code className="font-semibold ">layout</code> triggers refs + <code>useLayoutEffect</code>
          </li>
          <li>
            Finally, <code className="font-semibold ">useEffect</code> runs asynchronously
          </li>
        </ul>
      </ul>

      <p>At some point, I genuinely felt like something "clicked".</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What Surprised Me</h2>
      <ul className="list-disc pl-6">
        <li>
          <strong>Hooks</strong> — linked list stored on <code>memorizedState</code>, tracked by order not name.
        </li>
        <li>
          <strong>Hooks + Fiber Ring Buffer</strong> — circular hook structure was eye-opening.
        </li>
        <li>
          <strong>Scheduler</strong> — MessageChannel for macro task scheduling was totally new to me.
        </li>
        <li>
          <strong>Time Slicing</strong> — the "return-then-resume" style showed call stack limits.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Takeaways</h2>
      <p>Looking at it from a higher level, the philosophies behind Vue and React suddenly feel simple:</p>

      <ul className="list-disc pl-6 mb-2">
        <li>
          <strong>Vue</strong>: Observer pattern — reactive data + effect. Component-level updates via effect-wrapped render.
        </li>
        <li>
          <strong>React</strong>: Event-driven — dispatch triggers full diffing, selectively applying updates.
        </li>
      </ul>

      <p>Maybe simplicity is truth. But if one day I discover some deep truth but don’t have the power to realize it — that would be the greatest regret.</p>

      <p className="text-lg  text-gray-600 dark:text-gray-300 mt-6">
        So I’ll keep moving forward. I won’t stop.
        <br />I truly believe — my future self will thank me for what I’m doing today.
      </p>
    </div>
  )
}
