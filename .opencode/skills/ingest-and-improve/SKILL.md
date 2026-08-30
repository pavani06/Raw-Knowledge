---
name: ingest-and-improve
description: "One-command routine: YouTube URL -> transcript -> analyze-and-improve pipeline. Chains the youtube-transcript extraction (SerpApi primary) into the harness-analyze-and-improve full pipeline (Phases 0-6) against the target curriculum repo. Use when a user pastes a YouTube link and wants the full knowledge-to-curriculum flow, or says 'ingest and improve', 'youtube to curriculum', 'baixa e analisa', 'ingesta completa'."
license: MIT
compatibility: opencode
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
metadata:
  version: "1.0.0"
  audience: AI agents running the Raw-Knowledge -> curriculum routine
  workflow: orchestration
---

# Ingest and Improve

Encadeia as duas skills da rotina em um comando: extrai o transcript
(via skill `youtube-transcript`) e roda o pipeline completo
`analyze-and-improve` (via skill `harness-analyze-and-improve`) sobre o
documento gerado. Nada aqui substitui as skills de origem — esta skill só
orquestra a passagem de bastão e ativa as alavancas de performance.

## Invocation

| Param | Required | Default | Description |
|---|---|---|---|
| `url` | **Yes** | — | YouTube URL (`watch?v=`, `youtu.be/` or `/shorts/`) |
| `target-repo` | No | `/mnt/c/Users/pavan/long-running-agents` | Repo alvo do pipeline (deve ter `docs/`, `curriculum/`, `mapa-mental-repo/`) |
| `incremental` | No | auto | `true` força Phase 0 incremental; `false` força full rebuild. Auto = incremental quando `mapa-mental-repo/` tem modelos |

Example:

```
Load ingest-and-improve with url=https://www.youtube.com/watch?v=VIDEO_ID
```

## Step 0 — Dedup guard (antes de gastar crédito SerpApi)

1. Extraia o `VIDEO_ID` da URL (11 chars).
2. Grep em `<raw-knowledge>/sources/` por `video_id: "<VIDEO_ID>"` no frontmatter.
3. Se já existe source page para o vídeo: **reuse o path existente** e pule o
   Step 1. Registrar no log que foi reuso, não nova extração.

Sem esse guard, um re-run queima crédito pago da SerpApi à toa.

## Step 1 — Extract transcript (skill youtube-transcript)

A partir da raiz do Raw-Knowledge:

```bash
bash scripts/youtube-transcript.sh "<YOUTUBE_URL>" /tmp/transcript_${VIDEO_ID}.txt
```

O script roda a cadeia completa: SerpApi (pula silenciosamente se
`SERPAPI_API_KEY` não estiver setada) → youtube-transcript-api → yt-dlp →
whisper. A última linha de stderr traz `METHOD=<serpapi|api|yt-dlp|whisper>`.

Depois, siga a skill `youtube-transcript` para: metadados via yt-dlp,
construção do slug, escrita de `sources/YYYY-MM-DD-slug.md` (frontmatter com
`extraction_method` vindo do METHOD) e append em `log.md`.

Guarde o **path absoluto** do arquivo criado — é o `source` do pipeline.

## Step 2 — Activate performance levers

```bash
export AI_LIGHT_CATEGORY=quick
```

Isso ativa o model tiering do harness: Phases 3, 4 e 6 (mecânicas) rodam em
categoria leve; Phases 0, 1 e 2 mantêm `ultrabrain`/`deep` (decisão do
`analyze-and-improve/SKILL.md`, seção Model Tiering).

Phase 0 incremental: o harness não tem parâmetro próprio — a decisão vai por
steering. No modo auto, confira `ls <target-repo>/mapa-mental-repo/*.yaml`:
se houver modelos, escreva em `<target-repo>/harness/templates/STEER.md`
(usando o template como base, nunca deixando o arquivo vazio):

```markdown
STEERING: Phase 0 must run in incremental mode (incremental=true).
Base model: <most-recent mapa-mental-repo/*.yaml>. Follow Passo 0a-0c
from analyze-and-improve SKILL.md Phase 0.
```

O harness injeta o conteúdo do STEER.md no prompt de delegação (Step 3 do
harness) e cada fase lê o que precisa. Se não houver modelos, full rebuild —
não escreva steering.

## Step 3 — Run the pipeline

Dentro da mesma sessão opencode:

```
Load harness-analyze-and-improve with source=<abs-path-to-source.md>, mode=loop
```

O harness cuida de: bootstrap (`PROGRESS.md` + `harness/test-results.json`),
cache check (Phases 1+2 por hash — HIT pula direto para Phase 3), execução das
fases via `task()`, artifacts manifest, Phase 6 e Commit Gate. Não delegue por
bash (`harness-analysis.sh`) dentro de sessão opencode — não funciona.

## Step 4 — Report

Ao encerrar, informe ao usuário em uma linha cada item:

- Source page criada (ou reusada) + método de extração usado
- Diretório `docs/analysis/<date>-<source-slug>/` e se houve cache HIT
- Artefatos gerados (canonical docs, skills, exercises) pelo artifacts manifest
- Status do Commit Gate (commits feitos, push pendente de confirmação)

## Gates

- [ ] Dedup guard executado antes da extração
- [ ] `sources/YYYY-MM-DD-slug.md` criado com `extraction_method` correto
- [ ] `AI_LIGHT_CATEGORY=quick` exportado antes do harness
- [ ] `incremental` resolvido (auto → checagem de `mapa-mental-repo/`)
- [ ] Harness invocado com `source` path absoluto e `mode=loop`
- [ ] Report final entrega os 4 itens do Step 4

## Anti-Patterns

- **Extrair sem checar dedup.** Vídeo já no `sources/` = crédito SerpApi queimado à toa.
- **Rodar o pipeline com `SERPAPI_API_KEY` ausente e reportar falha.** Cadeia cai para youtube-transcript-api — logue o tier usado, não aborte.
- **Invocar `harness-analysis.sh` via bash dentro da sessão.** Use a skill harness nativa.
- **Pular o export de tiering "para não complicar".** Sem ele, Phases 3/4/6 rodam em categoria cara sem ganho de qualidade.
- **Passar path relativo como `source`.** Sub-agentes resolvem a partir de cwd diferentes — sempre absoluto.
- **Intrometer nas fases.** A wrapper termina no Step 4; decisões de fase são do harness, Commit Gate é do harness.
