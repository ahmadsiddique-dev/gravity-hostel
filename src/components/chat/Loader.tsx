// components/chat/loader.tsx
"use client"

import { motion } from "framer-motion"

export function ThinkingLoader() {
  return (
    <div className="flex items-center gap-3 py-4">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-5 w-5 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 blur-[2px]"
      />
      <span className="text-sm font-medium text-muted-foreground animate-pulse">
        Thinking...
      </span>
    </div>
  )
}