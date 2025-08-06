export function getPathName() {
  const res = window.location.pathname.replace(import.meta.env.VITE_BASE_PATH, "").slice(1)
  if (!res) return "flow"
  return res
}
