// components/chat/loader.tsx
"use client"

import { motion } from "framer-motion"

export function ThinkingLoader() {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        Thinking...
      </span>
    </div>
  )
}