import { motion } from 'framer-motion'

interface VideoSkeletonProps {
  count?: number
}

export function VideoSkeleton({ count = 6 }: VideoSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="h-12 md:h-16 bg-gradient-to-r from-pastel-dark/10 to-pastel-medium/10 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-pastel-dark/5 to-pastel-medium/5 rounded-lg animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-pastel-dark/5 to-pastel-medium/5 rounded-lg animate-pulse w-2/3 mx-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="space-y-4"
          >
            {/* Thumbnail skeleton */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-pastel-tan/20 via-pastel-medium/10 to-pastel-terracotta/20 rounded-lg overflow-hidden relative sketch-border border-pastel-dark/5">
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['100%', '-100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />

                {/* Play button placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/40 rounded-full" />
                </div>
              </div>

              {/* Views badge placeholder */}
              <div className="absolute bottom-2 right-2 h-4 w-16 bg-white/80 rounded shadow-sm animate-pulse" />
            </div>

            {/* Info skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-pastel-dark/10 to-pastel-medium/10 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-pastel-dark/10 to-pastel-medium/10 rounded animate-pulse w-4/5" />
            </div>

            {/* Date placeholder */}
            <div className="flex justify-between items-end">
              <div className="h-3 bg-gradient-to-r from-pastel-tan/20 to-pastel-terracotta/20 rounded w-24 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
