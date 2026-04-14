# wiki_with_zmd

Build and maintain the Pastel Sketchbook wiki using `zmd` as the local retrieval
layer across raw transcripts and synthesized detail pages.

## Use When

- You need to generate or refresh `wiki/videos/details/*.md` from transcripts.
- You want retrieval over both `wiki/raw/transcripts/*.md` and wiki pages.
- You are triaging missing transcript/detail failures from `_failed.json` files.
- You want faster, targeted context extraction before LLM summarization.

## Do Not Use When

- The task is unrelated to this repository's wiki/transcript pipeline.
- You are editing non-wiki app features (UI, API, infra, deployment).

## Repo Paths

- Raw transcripts: `wiki/raw/transcripts/`
- Transcript failures: `wiki/raw/transcripts/_failed.json`
- Detail pages: `wiki/videos/details/`
- Detail failures: `wiki/videos/details/_failed.json`
- Wiki log: `wiki/log.md`
- Scripts:
  - `homepage/scripts/export-transcripts.ts`
  - `homepage/scripts/generate-video-details.ts`
  - `homepage/scripts/generate-wiki.ts`

## zmd Setup Workflow

Run from repo root:

```bash
zmd collection add wiki "./wiki" || true
zmd update wiki
zmd status
```

Notes:
- `zmd get` uses zmd URIs, e.g.
  `zmd://wiki/raw/transcripts/<videoId>.md`.
- Refresh index after transcript/detail generation.

## Standard Workflow

1) Export transcripts (incremental or full)

```bash
task wiki:transcripts -- --top 50
# or
task wiki:transcripts -- --all
```

2) Reindex wiki for retrieval

```bash
zmd update wiki
```

3) Generate details from raw transcripts first (with YouTube fallback)

```bash
task wiki:details -- --top 50
# or
task wiki:details -- --all
```

4) Regenerate wiki pages/indexes

```bash
bun --cwd homepage scripts/generate-wiki.ts
```

5) Reindex after detail updates

```bash
zmd update wiki
```

## Failure-Driven Retry Strategy

- Inspect transcript failures:
  - `wiki/raw/transcripts/_failed.json`
- Inspect detail failures:
  - `wiki/videos/details/_failed.json`
- Retry targeted IDs first (`--id`) before re-running broad batches.

Examples:

```bash
task wiki:transcripts -- --id <VIDEO_ID> --force --max-chars 120000
task wiki:details -- --id <VIDEO_ID> --force
```

## Force Mode Rule for Details

`--force` in detail generation is optimized to avoid wasteful LLM calls:

- If an existing detail file already has full sections (summary, takeaways, topics),
  it is skipped.
- Incomplete pages are regenerated.
- Quota/rate-limit failures are recorded in `wiki/videos/details/_failed.json` and
  skipped instead of writing partial outputs.

## Retrieval Patterns (zmd)

- Broad keyword recall:

```bash
zmd search "zero-copy"
```

- Avoid single-word generic queries (e.g., `"modern"`) because ranking can be
  noisy across large transcript corpora.

- Context snippets for prompt grounding:

```bash
zmd context "code review"
```

- Hybrid retrieval:

```bash
zmd query "service mesh authorization patterns"
```

### Recommended Query Workflow

1) Start with intent-rich phrase (2-5 words), not a generic single term.

```bash
zmd context "modern code review workflow"
zmd context "modern zero trust kubernetes"
```

2) Use returned `zmd://` path(s) to open authoritative sources.

```bash
zmd get "zmd://wiki/raw/transcripts/<VIDEO_ID>.md"
zmd get "zmd://wiki/videos/details/<VIDEO_ID>.md"
```

3) If recall is weak, broaden with FTS and then refine.

```bash
zmd search "code review"
zmd query "code review guardrails deterministic"
```

4) Prefer `context` + `get` as primary workflow for wiki authoring.


- Fetch canonical source text:

```bash
zmd get "zmd://wiki/raw/transcripts/<VIDEO_ID>.md"
```

## Quality Gates

- Do not overwrite user-authored wiki content unnecessarily.
- Prefer incremental generation and failure-targeted retries.
- Keep `wiki/log.md` append-only and parseable.
- Reindex (`zmd update wiki`) after any bulk wiki changes.
