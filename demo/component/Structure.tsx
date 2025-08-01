import { createElement } from "@/lib/react-dom"

export function Structure({ content, footer }: { content: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="page-contain ">
      <div className="content">{content}</div>
      <div className="footer">{footer || null}</div>
    </div>
  )
}
