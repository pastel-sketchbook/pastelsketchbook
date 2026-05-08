---
name: wiki-with-zmd
description: |
  Build and maintain the Pastel Sketchbook wiki using zmd as the local retrieval
  layer across raw transcripts and synthesized detail pages. Handles transcript
  export, detail page generation from raw transcripts, wiki bundle regeneration,
  zmd indexing, and failure-driven retries.
  USE FOR: generate detail pages, export transcripts, regenerate wiki bundle,
  zmd retrieval queries, triage failed transcripts, find missing details,
  reindex wiki, verify bundle completeness.
  DO NOT USE FOR: editing non-wiki features (UI, API, infra), deploying the
  homepage, modifying app components unrelated to the wiki pipeline.
---

# Wiki with zmd

**UTILITY SKILL** — wiki generation and retrieval for Pastel Sketchbook.

## Workflow

1. Identify the task area from [references/workflows.md](references/workflows.md)
2. Follow the matching section for commands and procedures
3. Always reindex (`zmd update wiki`) and regenerate bundle after changes

## Key Principles

- Raw transcripts in `wiki/raw/transcripts/` are the source of truth
- Never write to `homepage/public/transcripts/` directly — it is a generated mirror
- Always regenerate `wiki-bundle.json` after adding/modifying detail pages
- Do not commit empty or stub files (must have content sections)
- Prefer incremental generation and failure-targeted retries over broad reruns
- Use `zmd context` + `zmd get` as primary retrieval workflow
- Do not manually write `## Related Videos` — it is auto-generated

## Examples

- Generate missing details: find videos without detail pages, read raw transcript, write detail page, regenerate bundle
- Retrieval: `zmd context "kubernetes networking"` → `zmd get "zmd://wiki/raw/transcripts/<id>.md"`

## Troubleshooting

- Video missing from bundle? Check detail file has `## Summary` section
- Transcript mirror out of sync? Run `task wiki:transcripts` to re-mirror
- Failed items? Check `_failed.json` files, retry with `--id <ID> --force`
