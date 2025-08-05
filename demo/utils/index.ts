export function getPathName() {
  const res = window.location.pathname.slice(1)
  if (!res) return "flow"
  return res
}
