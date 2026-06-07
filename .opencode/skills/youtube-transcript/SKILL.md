---
name: youtube-transcript
description: "Extract a transcript from a YouTube URL and save it as an immutable raw source page. Uses a resilient fallback chain (youtube-transcript-api -> yt-dlp subtitles -> whisper audio). Use when a user provides a YouTube link to ingest into the knowledge base."
license: MIT
compatibility: opencode
allowed-tools: Bash
metadata:
  version: "1.0.0"
  audience: AI agents ingesting YouTube content into a knowledge wiki
  workflow: extract video id, fetch transcript, clean, save raw source
---

# YouTube Transcript Extraction Skill

Turn a YouTube URL into a clean plain-text transcript, then save it as an immutable
`sources/YYYY-MM-DD-slug.md` page with `status: unprocessed`. The `knowledge-indexer`
agent picks it up from there.

> **Environment note**: This vault runs on NixOS where `yt-dlp`, `ffmpeg`, and
> `youtube-transcript-api` may not be globally installed. Use `nix run` to invoke them
> on demand — every command below shows the `nix run` form. If a tool *is* on PATH,
> the bare command works too.

---

## Step 0 — Extract the video ID

Always work with the 11-char video ID, not the raw URL (the Python API requires the ID,
and it makes filenames deterministic).

```bash
YOUTUBE_URL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
VIDEO_ID=$(echo "$YOUTUBE_URL" | grep -oP '(?:v=|youtu\.be/|/shorts/)\K[a-zA-Z0-9_-]{11}' | head -1)
echo "$VIDEO_ID"
```

Handles `watch?v=`, `youtu.be/`, and `/shorts/` forms.

---

## The Fallback Chain (run in order, stop at first success)

```
PRIMARY:     youtube-transcript-api  — fastest, zero download, clean text
FALLBACK:    yt-dlp --write-auto-subs — resilient when API is IP-blocked
LAST RESORT: yt-dlp audio + whisper  — only when the video has NO captions
```

The repo ships `scripts/youtube-transcript.sh` which runs this whole chain. **Prefer it:**

```bash
bash scripts/youtube-transcript.sh "$YOUTUBE_URL" /tmp/transcript_${VIDEO_ID}.txt
```

If you need to run steps manually, use the sections below.

---

## PRIMARY — youtube-transcript-api

`youtube-transcript-api` v1.x **removed** the old static `get_transcript()` — you must
instantiate the class. The CLI takes a **video ID**, not a URL.

```bash
# Plain text transcript via the bundled CLI (uvx = no install needed)
uvx --from youtube-transcript-api youtube_transcript_api "$VIDEO_ID" \
  --languages en --format text > /tmp/transcript_${VIDEO_ID}.txt

# Inspect what tracks exist first (optional)
uvx --from youtube-transcript-api youtube_transcript_api "$VIDEO_ID" --list-transcripts
```

Robust one-liner (handles formatter + multiple langs):

```bash
uvx --with youtube-transcript-api python - "$VIDEO_ID" <<'PY' > /tmp/transcript.txt
import sys
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
api = YouTubeTranscriptApi()
t = api.fetch(sys.argv[1], languages=["en", "en-US", "en-GB"])
print(TextFormatter().format_transcript(t))
PY
```

If this prints a transcript, you are done → set `extraction_method: api`.

**Common errors** → fall through to yt-dlp:
- `TranscriptsDisabled` / `NoTranscriptFound` — no captions in `en`; try whisper.
- `RequestBlocked` / `IpBlocked` / `PoTokenRequired` — datacenter IP flagged; yt-dlp is more resilient.

---

## FALLBACK — yt-dlp subtitles

More resilient to bot detection (mimics a browser client). Downloads a subtitle file,
which we convert to clean text.

```bash
# Check available subtitle tracks
nix run nixpkgs#yt-dlp -- --list-subs "$YOUTUBE_URL"

# Download manual subs, falling back to auto-generated; convert to SRT
nix run nixpkgs#yt-dlp -- \
  --skip-download \
  --write-subs --write-auto-subs \
  --sub-langs "en.*" \
  --sub-format "ttml" \
  --convert-subs srt \
  --output "/tmp/yt_%(id)s.%(ext)s" \
  "$YOUTUBE_URL"
```

> `--sub-format ttml` then `--convert-subs srt` yields fewer duplicate lines than VTT
> (auto-captions are "rolling" and duplicate badly in VTT).

Clean the SRT → plain text:

```bash
SRT=$(ls /tmp/yt_${VIDEO_ID}.*.srt 2>/dev/null | head -1)
grep -v '^[0-9]*$' "$SRT" \
  | grep -v '^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]' \
  | sed 's/<[^>]*>//g' \
  | sed '/^[[:space:]]*$/d' \
  | tr '\n' ' ' \
  > /tmp/transcript_${VIDEO_ID}.txt
```

Set `extraction_method: yt-dlp`.

**Auth (age-restricted / members-only only):**
```bash
nix run nixpkgs#yt-dlp -- --cookies-from-browser firefox "$YOUTUBE_URL" ...
```

---

## LAST RESORT — whisper (no captions exist)

Only when both methods above fail because the video genuinely has no captions.

```bash
# 1. Download audio as 16kHz mono wav
nix run nixpkgs#yt-dlp -- -x --audio-format wav \
  --postprocessor-args "-ar 16000 -ac 1" \
  -o "/tmp/yt_audio_${VIDEO_ID}.%(ext)s" \
  "$YOUTUBE_URL"

# 2. Transcribe with whisper.cpp (fast on CPU)
nix run nixpkgs#whisper-cpp -- \
  --model base.en --language en --output-txt \
  --output-file /tmp/transcript_${VIDEO_ID} \
  --file /tmp/yt_audio_${VIDEO_ID}.wav
# -> /tmp/transcript_${VIDEO_ID}.txt
```

Set `extraction_method: whisper`. Note in the source body that the transcript is
machine-generated from audio (may contain errors on names/jargon).

---

## Getting metadata (title, channel, date, duration)

```bash
nix run nixpkgs#yt-dlp -- --skip-download \
  --print "%(title)s\t%(channel)s\t%(upload_date)s\t%(duration_string)s" \
  "$YOUTUBE_URL"
# upload_date is YYYYMMDD -> reformat to YYYY-MM-DD
```

If yt-dlp metadata is blocked, fall back to extracting the title from the API/markitdown
output, or ask the user for the title.

---

## Building the source filename (slug)

```bash
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9]\+/-/g; s/^-//; s/-$//' \
  | cut -c1-60)
FILE="sources/${DATE}-${SLUG}.md"
```

---

## Writing the raw source page

Use the file tools (or `obsidian create`) to write `sources/YYYY-MM-DD-slug.md` with the
schema from `AGENTS.md`. Template:

```markdown
---
title: "<Video Title>"
type: source
source_type: video
source: "<full youtube url>"
video_id: "<VIDEO_ID>"
channel: "<Channel Name>"
published: <YYYY-MM-DD or omit>
created: <today YYYY-MM-DD>
duration: "<MM:SS or omit>"
extraction_method: <api | yt-dlp | whisper>
tags: [clippings]
concepts: []
entities: []
status: unprocessed
---

# <Video Title>

> Source: <url>
> Channel: <Channel Name> · Extracted: <today> · Method: <method>

## Transcript

<full cleaned transcript text>
```

**The `## Transcript` section is immutable once written.** Do not edit it later.

---

## Done

After writing the source page, append to `log.md`:

```markdown
## <YYYY-MM-DDTHH:MMZ> — extract
- Source: `sources/<file>.md`
- Video: <url>
- Method: <api|yt-dlp|whisper>
- Status: unprocessed (awaiting knowledge-indexer)
```

Then tell the user the source was created and suggest running `@knowledge-indexer` to
curate it into the ontology.

---

## Failure modes cheat-sheet

| Error | Cause | Action |
|---|---|---|
| `TranscriptsDisabled` / `NoTranscriptFound` | No captions in language | → whisper |
| `RequestBlocked` / `IpBlocked` / `PoTokenRequired` | Datacenter IP flagged | → yt-dlp; if also blocked, note and ask user |
| `Sign in to confirm your age` | Age-restricted | `yt-dlp --cookies-from-browser firefox` |
| `Video unavailable` | Private/deleted/geo-blocked | Log and skip; report to user |
| `youtu.be` URL fails in markitdown | Parser bug | Don't use markitdown; use the chain above |
| SRT has duplicate lines | Rolling auto-captions | Use `--sub-format ttml`, or dedup in post |

> **Do not use `markitdown` as the primary extractor** — it wraps an old
> `youtube-transcript-api` API, silently swallows errors, and mishandles `youtu.be`
> short URLs. Use it only if you specifically need title/description metadata.
