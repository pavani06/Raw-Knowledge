#!/usr/bin/env bash
#
# youtube-transcript.sh — extract a clean plain-text transcript from a YouTube URL.
#
# Usage:
#   bash scripts/youtube-transcript.sh "<YOUTUBE_URL>" [OUTPUT_FILE]
#
# Fallback chain (stops at first success):
#   1. SerpApi youtube_video_transcript — paid, no bot-detection issues
#      (skipped silently when SERPAPI_API_KEY is unset)
#   2. youtube-transcript-api  — free, fastest, zero download, clean text
#   3. yt-dlp subtitles        — resilient when the API is IP-blocked
#   4. yt-dlp audio + whisper  — last resort, for videos with NO captions
#
# On NixOS, tools are invoked via `nix run` / `uvx` so nothing needs global install.
# Prints the extraction method used on the LAST line of stderr as: METHOD=<serpapi|api|yt-dlp|whisper>
#
set -uo pipefail

URL="${1:?Usage: youtube-transcript.sh <YOUTUBE_URL> [OUTPUT_FILE]}"
OUTPUT_FILE="${2:-transcript.txt}"

# Resolve tool runners: prefer a binary on PATH, else nix run.
run_ytdlp() { if command -v yt-dlp >/dev/null 2>&1; then yt-dlp "$@"; else nix run nixpkgs#yt-dlp -- "$@"; fi; }
run_yta()   { if command -v youtube_transcript_api >/dev/null 2>&1; then youtube_transcript_api "$@"; else uvx --from youtube-transcript-api youtube_transcript_api "$@"; fi; }
run_whisper(){ if command -v whisper-cli >/dev/null 2>&1; then whisper-cli "$@"; else nix run nixpkgs#whisper-cpp -- "$@"; fi; }

# Extract the 11-char video ID (watch?v= / youtu.be/ / shorts/).
VIDEO_ID=$(echo "$URL" | grep -oP '(?:v=|youtu\.be/|/shorts/)\K[a-zA-Z0-9_-]{11}' | head -1)
if [ -z "$VIDEO_ID" ]; then
  echo "ERROR: could not extract a video ID from: $URL" >&2
  exit 2
fi
echo "Extracting transcript for video ID: $VIDEO_ID" >&2

# ── PRIMARY: SerpApi youtube_video_transcript ────────────────────────────────
echo "[1/4] Trying SerpApi youtube_video_transcript ..." >&2
if [ -n "${SERPAPI_API_KEY:-}" ]; then
  if curl -sf --get https://serpapi.com/search \
      -d engine="youtube_video_transcript" \
      -d v="$VIDEO_ID" \
      -d language_code="${TRANSCRIPT_LANG:-en}" \
      -d api_key="$SERPAPI_API_KEY" \
      -o "/tmp/serpapi_${VIDEO_ID}.json" 2>/tmp/serpapi_err.$$; then
    python3 -c '
import json, sys
d = json.load(open(sys.argv[1]))
snippets = [t.get("snippet", "").strip() for t in (d.get("transcript") or [])]
print(" ".join(s for s in snippets if s))
' "/tmp/serpapi_${VIDEO_ID}.json" > "$OUTPUT_FILE"
    if [ -s "$OUTPUT_FILE" ]; then
      echo "OK: transcript via SerpApi" >&2
      echo "METHOD=serpapi" >&2
      exit 0
    fi
  fi
  echo "  SerpApi failed: $(tail -1 /tmp/serpapi_err.$$ 2>/dev/null)" >&2
else
  echo "  SERPAPI_API_KEY unset — skipping SerpApi tier" >&2
fi

# ── FALLBACK 1: youtube-transcript-api ───────────────────────────────────────
echo "[2/4] Trying youtube-transcript-api ..." >&2
if run_yta "$VIDEO_ID" --languages en --format text > "$OUTPUT_FILE" 2>/tmp/yta_err.$$; then
  if [ -s "$OUTPUT_FILE" ]; then
    echo "OK: transcript via youtube-transcript-api" >&2
    echo "METHOD=api" >&2
    exit 0
  fi
fi
echo "  youtube-transcript-api failed: $(tail -1 /tmp/yta_err.$$ 2>/dev/null)" >&2

# ── FALLBACK 2: yt-dlp subtitles ─────────────────────────────────────────────
echo "[3/4] Trying yt-dlp subtitles ..." >&2
run_ytdlp \
  --skip-download \
  --write-subs --write-auto-subs \
  --sub-langs "en.*" \
  --sub-format "ttml" \
  --convert-subs srt \
  --output "/tmp/yt_${VIDEO_ID}.%(ext)s" \
  "$URL" >/tmp/ytdlp_err.$$ 2>&1

SRT=$(ls /tmp/yt_${VIDEO_ID}.*.srt 2>/dev/null | head -1)
if [ -n "${SRT:-}" ] && [ -s "$SRT" ]; then
  grep -v '^[0-9]*$' "$SRT" \
    | grep -v '^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]' \
    | sed 's/<[^>]*>//g' \
    | sed '/^[[:space:]]*$/d' \
    | tr '\n' ' ' \
    > "$OUTPUT_FILE"
  rm -f "$SRT"
  if [ -s "$OUTPUT_FILE" ]; then
    echo "OK: transcript via yt-dlp subtitles" >&2
    echo "METHOD=yt-dlp" >&2
    exit 0
  fi
fi
echo "  yt-dlp subtitles failed (no caption track)." >&2

# ── LAST RESORT: yt-dlp audio + whisper ──────────────────────────────────────
echo "[4/4] No captions found. Downloading audio for whisper transcription ..." >&2
run_ytdlp -x --audio-format wav \
  --postprocessor-args "-ar 16000 -ac 1" \
  -o "/tmp/yt_audio_${VIDEO_ID}.%(ext)s" \
  "$URL" >/tmp/ytaudio_err.$$ 2>&1

AUDIO="/tmp/yt_audio_${VIDEO_ID}.wav"
if [ -f "$AUDIO" ]; then
  run_whisper \
    --model base.en --language en --output-txt \
    --output-file "/tmp/whisper_${VIDEO_ID}" \
    --file "$AUDIO" >/tmp/whisper_err.$$ 2>&1
  if [ -s "/tmp/whisper_${VIDEO_ID}.txt" ]; then
    tr '\n' ' ' < "/tmp/whisper_${VIDEO_ID}.txt" > "$OUTPUT_FILE"
    rm -f "$AUDIO" "/tmp/whisper_${VIDEO_ID}.txt"
    echo "OK: transcript via whisper (audio)" >&2
    echo "METHOD=whisper" >&2
    exit 0
  fi
fi

echo "ERROR: all extraction methods failed for $URL" >&2
echo "  Check: /tmp/serpapi_err.$$  /tmp/yta_err.$$  /tmp/ytdlp_err.$$  /tmp/ytaudio_err.$$  /tmp/whisper_err.$$" >&2
exit 1
