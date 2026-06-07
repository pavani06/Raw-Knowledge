# Inbox

Paste YouTube URLs here (one per line), then run the pipeline.

## Queue

<!-- Paste YouTube links below this line -->


## Workflow

1. Paste a YouTube URL above.
2. Run `@transcript-extractor` in OpenCode — it extracts the transcript and saves an
   immutable raw source in `sources/` with `status: unprocessed`.
3. Run `@knowledge-indexer` — it curates the raw transcript into the typed-link ontology
   (`concepts/`, `entities/`), updates [[index]] and [[log]].
4. Ask questions: `@knowledge-indexer query "how does X relate to Y?"`

One-shot: just give `@transcript-extractor` a URL directly — no need to use this file.
