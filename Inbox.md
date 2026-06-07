# Inbox

Paste URLs here (one per line) — **YouTube videos or web articles**, mixed freely — then run
the pipeline.

## Queue

<!-- Paste links below this line (videos and/or articles) -->


## Workflow

1. Paste a URL above (a YouTube link or any article/blog/docs URL).
2. Run `@source-extractor` in OpenCode — it detects the URL type, extracts the content
   (transcript for video, markdown for article), and saves an immutable raw source in
   `sources/` with `status: unprocessed`.
3. Run `@knowledge-indexer` — it curates the raw source into the typed-link ontology
   (`concepts/`, `entities/`), updates [[index]] and [[log]].
4. Ask questions: `@knowledge-indexer query "how does X relate to Y?"`

One-shot: just give `@source-extractor` a URL directly — no need to use this file.
