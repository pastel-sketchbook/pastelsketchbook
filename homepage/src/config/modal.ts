/**
 * Video Modal Configuration Constants
 * Centralized configuration for modal behavior, animations, and scaling
 */

export const VIDEO_MODAL_CONFIG = {
  scale: {
    MIN: 0.6,
    MAX: 1.4,
    STEP: 0.1,
    INITIAL: 1
  },
  opacity: {
    MIN: 0.15,
    MAX: 0.6
  },
  animations: {
    DURATION_MS: 300,
    HOVER_DURATION_MS: 200
  },
  keyboard: {
    ZOOM_IN_KEYS: ['+', '='],
    ZOOM_OUT_KEYS: ['-', '_'],
    CLOSE_KEY: 'Escape'
  }
} as const
