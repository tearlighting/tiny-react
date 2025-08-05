import { useEffect, useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

export function RenderTimeRecoder({ value }: { value: any }) {
  return (
    <div className="w-90 flex items-center">
      <label className="font-bold">renderTimes</label>
      <input
        disabled
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 placeholder-gray-400
           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
           hover: cursor-not-allowed
           hover:border-gray-400 transition duration-150 ml-2"
        type="text"
        value={value}
      />
    </div>
  )
}
