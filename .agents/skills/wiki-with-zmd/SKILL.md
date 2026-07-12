---
name: wiki-with-zmd
description: |
  Build and maintain the Pastel Sketchbook wiki using zmd as the local retrieval
  layer across raw transcripts and synthesized detail pages. Handles transcript
  export, detail page generation, wiki bundle regeneration, zmd indexing,
  failure-driven retries, and syncing new videos into books.
  USE FOR: generate detail pages, export transcripts, regenerate wiki bundle,
  zmd retrieval queries, triage failed transcripts, reindex wiki, sync videos to books.
  DO NOT USE FOR: editing non-wiki features (UI, API, infra), deploying the
  homepage, modifying app components unrelated to the wiki pipeline.
---

# Wiki with zmd

**UTILITY SKILL** — wiki generation, retrieval, and book sync for Pastel Sketchbook.

## Workflow

1. Identify the task area from [references/workflows.md](references/workflows.md)
2. Follow the matching section for commands and procedures
3. Reindex (`zmd update wiki`) and regenerate bundle after changes
4. Evaluate book placement for new videos with details (see workflows.md)

## Key Principles

- Raw transcripts in `wiki/raw/transcripts/` are the source of truth
- Never write to `homepage/public/transcripts/` directly — generated mirror
- Regenerate `wiki-bundle.json` after adding/modifying detail pages
- No empty or stub files — must have content sections
- Prefer incremental generation and failure-targeted retries
- Use `zmd context` + `zmd get` as primary retrieval workflow
- `## Related Videos` is auto-generated — do not write manually
- New videos with details go into `homepage/public/books.json`
- **Ignore YouTube Shorts** — do not fetch transcripts, generate detail pages, add to books, or count in any totals for Shorts. Detection is **duration-based** (authoritative), not title tags:
  1. **Primary:** YouTube `contentDetails.duration` **< 2 minutes (120s)** (`homepage/src/lib/youtube-shorts.ts`, applied in `sync-videos.ts`)
  2. **Offline fallback:** transcript body/file < ~2.5KB
  3. **Last resort only:** legacy `#science #softwarearchitect #smartphone` title tags (optional; many Shorts ship without them)
  Auto-add Shorts to `HIDDEN_VIDEO_IDS`. Never count them in transcript/detail/bundle/book totals or missing-detail tracking.

## Examples

- Generate details: find videos without detail pages, read transcript, write detail, regenerate bundle
- Retrieval: `zmd context "kubernetes networking"` then `zmd get`
- Book sync: classify video, add to appropriate chapter in `books.json`

## Troubleshooting

- Missing from bundle? Check detail file has `## Summary`
- Mirror out of sync? Run `task wiki:transcripts`
- Failed items? Check `_failed.json`, retry with `--id <ID> --force`
- Not in books? Check `books.json` for the video ID
