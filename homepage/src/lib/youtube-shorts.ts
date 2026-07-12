/**
 * Reliable YouTube Shorts detection for Pastel Sketchbook.
 *
 * Title hashtags are optional and not reliable — Shorts often ship without them.
 * Duration from YouTube Data API (`contentDetails.duration`) is the authoritative signal.
 *
 * Channel rule: any video under 2 minutes is a Short.
 * Observed on this channel (2026-07 sample):
 *   Shorts:  ~70–85s, canonical URL `/shorts/<id>`
 *   Full:    ≥ ~9 minutes
 */

/** Videos shorter than this (seconds) are treated as Shorts. Under 2 minutes. */
export const SHORTS_MAX_DURATION_SEC = 120

/**
 * Parse an ISO-8601 duration as returned by YouTube (`PT#H#M#S`).
 * Returns total seconds, or null if the string is missing/unparseable.
 */
export function parseIso8601Duration(iso: string | null | undefined): number | null {
  if (!iso || typeof iso !== 'string') return null
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
  if (!m) return null
  const hours = m[1] ? Number.parseInt(m[1], 10) : 0
  const minutes = m[2] ? Number.parseInt(m[2], 10) : 0
  const seconds = m[3] ? Number.parseInt(m[3], 10) : 0
  if (![hours, minutes, seconds].every((n) => Number.isFinite(n))) return null
  return hours * 3600 + minutes * 60 + seconds
}

export type ShortsDetectionInput = {
  /** Duration in seconds from YouTube `contentDetails.duration` (preferred). */
  durationSec?: number | null
  /** ISO-8601 duration string from the API (parsed if durationSec missing). */
  durationIso?: string | null
  /** Video title — optional legacy fallback only. */
  title?: string | null
  /**
   * Raw transcript file size in bytes (or transcript body length).
   * Offline fallback when duration is unknown: Shorts on this channel are ~1.5–2KB;
   * full talks are typically ≥10KB.
   */
  transcriptBytes?: number | null
}

/**
 * Legacy title pattern used on some Shorts. Not required and not sufficient alone
 * once duration is available — kept only as a last-resort offline hint.
 */
const LEGACY_SHORTS_TITLE_TAGS = /#science\s+#softwarearchitect\s+#smartphone/i

/** Offline transcript-size ceiling for Shorts (bytes). Full talks are much larger. */
export const SHORTS_MAX_TRANSCRIPT_BYTES = 2_500

/**
 * Returns true when the video should be treated as a YouTube Short for wiki/pipeline
 * purposes (hide from showcase, skip transcripts/details/books/counts).
 *
 * Priority:
 * 1. durationSec / durationIso  — authoritative
 * 2. transcriptBytes            — offline heuristic
 * 3. legacy title hashtags      — last resort
 */
export function isYouTubeShort(input: ShortsDetectionInput): boolean {
  const fromIso =
    input.durationSec == null || !Number.isFinite(input.durationSec)
      ? parseIso8601Duration(input.durationIso ?? undefined)
      : null
  const durationSec =
    input.durationSec != null && Number.isFinite(input.durationSec)
      ? input.durationSec
      : fromIso

  if (durationSec != null && durationSec > 0) {
    // Strictly under 2 minutes (durationSec < 120)
    return durationSec < SHORTS_MAX_DURATION_SEC
  }

  if (
    input.transcriptBytes != null &&
    Number.isFinite(input.transcriptBytes) &&
    input.transcriptBytes > 0 &&
    input.transcriptBytes < SHORTS_MAX_TRANSCRIPT_BYTES
  ) {
    return true
  }

  if (input.title && LEGACY_SHORTS_TITLE_TAGS.test(input.title)) {
    return true
  }

  return false
}
