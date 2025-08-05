import { createElement } from "@/lib/react-dom"

export function MyCode({ children }: { children?: any }) {
  return (
    <pre className="language-javascript text-sm! ">
      <code className="language-javascript">{children}</code>
    </pre>
  )
}
