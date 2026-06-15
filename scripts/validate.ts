#!/usr/bin/env -S npx tsx
/**
 * validate.ts — Raw-Knowledge convention validator.
 *
 * Checks structural invariants defined in AGENTS.md against the vault
 * using @pavani/obsidian-eval for scan + frontmatter parsing.
 *
 * Usage:
 *   npm run validate
 *   npx tsx scripts/validate.ts
 *
 * Exit: 0 if clean, 1 if violations found.
 */

import { scan, parseFrontmatter } from "@pavani/obsidian-eval";
import { resolve, dirname } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// ── Path setup ─────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

// ── Types ──────────────────────────────────────────────────────────────────

interface Violation {
  file: string;
  line: number;
  check: string;
  message: string;
}

interface Frontmatter {
  type?: string;
  source_type?: string;
  source?: string;
  status?: string;
  video_id?: string;
  channel?: string | unknown[];
  author?: string | unknown[];
  duration?: string;
  published?: string;
  created?: string;
  extraction_method?: string;
  entity_type?: string;
  aliases?: unknown[];
  tags?: string[];
  source_count?: number;
  last_updated?: string;
  date?: string;
  sources_covered?: number;
  sources?: unknown[];
  // Relationship fields (concept + entity)
  parent?: unknown[];
  "part-of"?: unknown[];
  defines?: unknown[];
  "relates-to"?: unknown[];
  contradicts?: unknown[];
  supports?: unknown[];
  extends?: unknown[];
  [key: string]: unknown;
}

// ── Constants ──────────────────────────────────────────────────────────────

const VALID_TYPES = ["source", "concept", "entity", "digest"] as const;
const VALID_SOURCE_TYPES = ["video", "article"] as const;
const VALID_STATUSES = ["unprocessed", "processed"] as const;
const VALID_ENTITY_TYPES = ["company", "project", "tool", "organization"] as const;

const TYPE_DIR_MAP: Record<string, string> = {
  source: "sources",
  concept: "concepts",
  entity: "entities",
  digest: "digests",
};

const CONCEPT_RELATIONSHIP_FIELDS = [
  "parent", "part-of", "defines", "relates-to",
  "contradicts", "supports", "extends", "sources",
];

const ENTITY_RELATIONSHIP_FIELDS = [
  "relates-to", "part-of", "sources",
];

const MONITORED_DIRS = ["sources/", "concepts/", "entities/", "digests/"];

const CHECK_LABELS: Record<string, string> = {
  C01: "C01: Frontmatter mandatory (sources/, concepts/, entities/, digests/, index.md)",
  C02: "C02: Valid type field",
  C03: "C03: Type matches directory",
  C04: "C04: Slug format (YYYY-MM-DD-slug.md for sources, lowercase-hyphens for concepts/entities/digests)",
  C05: "C05: Source required fields (source_type, source, status, body section)",
  C06: "C06: Concept required fields (aliases, tags, source_count, relationship fields)",
  C07: "C07: Entity required fields (entity_type, tags, source_count, relationship fields)",
  C08: "C08: Digest required fields (date, sources_covered, sources, tags)",
  C09: "C09: No raw markdown links in monitored dirs (use wikilinks instead)",
  C10: "C10: channel/author must be plain strings, not wikilinks",
};

// ── Scan vault ─────────────────────────────────────────────────────────────

const vault = scan(REPO_ROOT);
const violations: Violation[] = [];

// ── Helpers ────────────────────────────────────────────────────────────────

function parseFm(absPath: string): Frontmatter | null {
  try {
    const result = parseFrontmatter(absPath);
    return (result?.frontmatter as Frontmatter) ?? null;
  } catch {
    return null;
  }
}

function isMonitoredFile(relPath: string): boolean {
  if (relPath === "index.md") return true;
  return MONITORED_DIRS.some((d) => relPath.startsWith(d));
}

/** Check if a string contains any wikilink pattern */
function containsWikilink(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /\[\[.+\]\]/.test(value);
}

/** Check slug format: YYYY-MM-DD-slug.md */
function isSourceSlug(filename: string): boolean {
  return /^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*\.md$/.test(filename);
}

/** Check slug format: lowercase, hyphens, no spaces/underscores (except _moc-) for concepts/entities */
function isConceptEntitySlug(filename: string): boolean {
  // .gitkeep is not a content file
  if (filename === ".gitkeep") return true;
  // _moc- prefix for Maps of Content
  if (filename.startsWith("_moc-")) {
    return /^_moc-[a-z0-9][a-z0-9-]*\.md$/.test(filename);
  }
  return /^[a-z0-9][a-z0-9-]*\.md$/.test(filename);
}

// ══════════════════════════════════════════════════════════════════════════
// C01: Frontmatter mandatory
// ══════════════════════════════════════════════════════════════════════════

for (const [relPath] of vault.notes) {
  const filename = relPath.split("/").pop() ?? relPath;
  if (filename === ".gitkeep") continue;
  if (!isMonitoredFile(relPath)) continue;

  const absPath = resolve(REPO_ROOT, relPath);
  const fm = parseFm(absPath);

  if (fm === null) {
    violations.push({
      file: relPath, line: 1, check: "C01",
      message: "missing YAML frontmatter (no '---' delimiters on line 1)",
    });
    continue;
  }

  // ════════════════════════════════════════════════════════════════════════
  // C02: Valid type field
  // ════════════════════════════════════════════════════════════════════════

  if (!fm.type) {
    violations.push({
      file: relPath, line: 1, check: "C02",
      message: "missing 'type:' field in frontmatter",
    });
  } else if (!VALID_TYPES.includes(fm.type as typeof VALID_TYPES[number])) {
    violations.push({
      file: relPath, line: 1, check: "C02",
      message: `invalid type '${fm.type}' — must be one of: ${VALID_TYPES.join(", ")}`,
    });
  }

  const fmType = fm.type as string;

  // ════════════════════════════════════════════════════════════════════════
  // C03: Type matches directory
  // ════════════════════════════════════════════════════════════════════════

  if (fmType && VALID_TYPES.includes(fmType as typeof VALID_TYPES[number])) {
    const expectedDir = TYPE_DIR_MAP[fmType];
    if (!relPath.startsWith(expectedDir + "/") && relPath !== "index.md") {
      violations.push({
        file: relPath, line: 1, check: "C03",
        message: `type '${fmType}' belongs in '${expectedDir}/', but file is at '${relPath}'`,
      });
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════
// C04: Slug format
// ══════════════════════════════════════════════════════════════════════════

for (const [relPath] of vault.notes) {
  const filename = relPath.split("/").pop() ?? relPath;
  if (filename === ".gitkeep") continue;
  if (!isMonitoredFile(relPath)) continue;

  if (relPath.startsWith("sources/")) {
    if (!isSourceSlug(filename)) {
      violations.push({
        file: relPath, line: 1, check: "C04",
        message: `source filename '${filename}' must match pattern YYYY-MM-DD-slug.md`,
      });
    }
  } else if (relPath.startsWith("concepts/") || relPath.startsWith("entities/")) {
    if (!isConceptEntitySlug(filename)) {
      violations.push({
        file: relPath, line: 1, check: "C04",
        message: `filename '${filename}' must use lowercase-hyphens (no spaces, no underscores except _moc- prefix)`,
      });
    }
  } else if (relPath.startsWith("digests/")) {
    if (!/^\d{4}-\d{2}-\d{2}\.md$/.test(filename)) {
      violations.push({
        file: relPath, line: 1, check: "C04",
        message: `digest filename '${filename}' must match pattern YYYY-MM-DD.md`,
      });
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════
// C05-C08: Type-specific required fields
// ══════════════════════════════════════════════════════════════════════════

for (const [relPath] of vault.notes) {
  const filename = relPath.split("/").pop() ?? relPath;
  if (filename === ".gitkeep") continue;
  if (!isMonitoredFile(relPath)) continue;

  const absPath = resolve(REPO_ROOT, relPath);
  const fm = parseFm(absPath);
  if (!fm || !fm.type) continue;

  const fmType = fm.type as string;

  // ── C05: Source ──────────────────────────────────────────────────────

  if (fmType === "source") {
    // source_type
    if (!fm.source_type) {
      violations.push({
        file: relPath, line: 1, check: "C05",
        message: "source must have 'source_type' field (video or article)",
      });
    } else if (!VALID_SOURCE_TYPES.includes(fm.source_type as typeof VALID_SOURCE_TYPES[number])) {
      violations.push({
        file: relPath, line: 1, check: "C05",
        message: `invalid source_type '${fm.source_type}' — must be 'video' or 'article'`,
      });
    }

    // source URL
    if (!fm.source) {
      violations.push({
        file: relPath, line: 1, check: "C05",
        message: "source must have 'source' field (URL)",
      });
    }

    // status
    if (!fm.status) {
      violations.push({
        file: relPath, line: 1, check: "C05",
        message: "source must have 'status' field (unprocessed or processed)",
      });
    } else if (!VALID_STATUSES.includes(fm.status as typeof VALID_STATUSES[number])) {
      violations.push({
        file: relPath, line: 1, check: "C05",
        message: `invalid status '${fm.status}' — must be 'unprocessed' or 'processed'`,
      });
    }

    // Video-specific
    if (fm.source_type === "video") {
      if (!fm.video_id) {
        violations.push({
          file: relPath, line: 1, check: "C05",
          message: "video source must have 'video_id' field",
        });
      }
      if (fm.channel === undefined) {
        violations.push({
          file: relPath, line: 1, check: "C05",
          message: "video source should have 'channel' field",
        });
      }
      // Body section check: ## Transcript
      try {
        const raw = readFileSync(absPath, "utf-8");
        if (!/^## Transcript$/m.test(raw)) {
          violations.push({
            file: relPath, line: 1, check: "C05",
            message: "video source must have '## Transcript' body section",
          });
        }
      } catch { /* skip if unreadable */ }
    }

    // Article-specific
    if (fm.source_type === "article") {
      // Body section check: ## Content
      try {
        const raw = readFileSync(absPath, "utf-8");
        if (!/^## Content$/m.test(raw)) {
          violations.push({
            file: relPath, line: 1, check: "C05",
            message: "article source must have '## Content' body section",
          });
        }
      } catch { /* skip if unreadable */ }
    }

    // created date
    if (!fm.created) {
      violations.push({
        file: relPath, line: 1, check: "C05",
        message: "source must have 'created' field (extraction date)",
      });
    }
  }

  // ── C06: Concept ─────────────────────────────────────────────────────

  if (fmType === "concept") {
    // aliases: must be present (even if empty array)
    if (fm.aliases === undefined) {
      violations.push({
        file: relPath, line: 1, check: "C06",
        message: "concept must have 'aliases' field (use [] if none)",
      });
    } else if (!Array.isArray(fm.aliases)) {
      violations.push({
        file: relPath, line: 1, check: "C06",
        message: "'aliases' must be a YAML list",
      });
    }

    // tags: must be present and non-empty
    if (!fm.tags || !Array.isArray(fm.tags)) {
      violations.push({
        file: relPath, line: 1, check: "C06",
        message: "concept must have 'tags' as a non-empty YAML list",
      });
    } else if (fm.tags.length === 0) {
      violations.push({
        file: relPath, line: 1, check: "C06",
        message: "'tags' list must not be empty",
      });
    }

    // source_count
    if (fm.source_count === undefined) {
      violations.push({
        file: relPath, line: 1, check: "C06",
        message: "concept must have 'source_count' field",
      });
    }

    // last_updated
    if (!fm.last_updated) {
      violations.push({
        file: relPath, line: 1, check: "C06",
        message: "concept must have 'last_updated' field",
      });
    }

    // All relationship fields must be present as YAML lists (AGENTS.md requires them)
    for (const field of CONCEPT_RELATIONSHIP_FIELDS) {
      if (fm[field] === undefined) {
        violations.push({
          file: relPath, line: 1, check: "C06",
          message: `concept must have '${field}' field (use [] if none)`,
        });
      } else if (!Array.isArray(fm[field])) {
        violations.push({
          file: relPath, line: 1, check: "C06",
          message: `'${field}' must be a YAML list, got ${typeof fm[field]}`,
        });
      }
    }
  }

  // ── C07: Entity ──────────────────────────────────────────────────────

  if (fmType === "entity") {
    // entity_type
    if (!fm.entity_type) {
      violations.push({
        file: relPath, line: 1, check: "C07",
        message: "entity must have 'entity_type' field (company, project, tool, or organization)",
      });
    } else if (!VALID_ENTITY_TYPES.includes(fm.entity_type as typeof VALID_ENTITY_TYPES[number])) {
      violations.push({
        file: relPath, line: 1, check: "C07",
        message: `invalid entity_type '${fm.entity_type}' — must be one of: ${VALID_ENTITY_TYPES.join(", ")}`,
      });
    }

    // tags: must be present and non-empty
    if (!fm.tags || !Array.isArray(fm.tags)) {
      violations.push({
        file: relPath, line: 1, check: "C07",
        message: "entity must have 'tags' as a non-empty YAML list",
      });
    } else if (fm.tags.length === 0) {
      violations.push({
        file: relPath, line: 1, check: "C07",
        message: "'tags' list must not be empty",
      });
    }

    // source_count
    if (fm.source_count === undefined) {
      violations.push({
        file: relPath, line: 1, check: "C07",
        message: "entity must have 'source_count' field",
      });
    }

    // last_updated
    if (!fm.last_updated) {
      violations.push({
        file: relPath, line: 1, check: "C07",
        message: "entity must have 'last_updated' field",
      });
    }

    // Relationship fields must be present as YAML lists
    for (const field of ENTITY_RELATIONSHIP_FIELDS) {
      if (fm[field] === undefined) {
        violations.push({
          file: relPath, line: 1, check: "C07",
          message: `entity must have '${field}' field (use [] if none)`,
        });
      } else if (!Array.isArray(fm[field])) {
        violations.push({
          file: relPath, line: 1, check: "C07",
          message: `'${field}' must be a YAML list, got ${typeof fm[field]}`,
        });
      }
    }
  }

  // ── C08: Digest ──────────────────────────────────────────────────────

  if (fmType === "digest") {
    if (!fm.date) {
      violations.push({
        file: relPath, line: 1, check: "C08",
        message: "digest must have 'date' field",
      });
    }

    if (fm.sources_covered === undefined) {
      violations.push({
        file: relPath, line: 1, check: "C08",
        message: "digest must have 'sources_covered' field",
      });
    }

    if (!fm.sources || !Array.isArray(fm.sources)) {
      violations.push({
        file: relPath, line: 1, check: "C08",
        message: "digest must have 'sources' as a YAML list",
      });
    } else if (fm.sources.length === 0) {
      violations.push({
        file: relPath, line: 1, check: "C08",
        message: "digest 'sources' list must not be empty",
      });
    }

    if (!fm.tags || !Array.isArray(fm.tags) || fm.tags.length === 0) {
      violations.push({
        file: relPath, line: 1, check: "C08",
        message: "digest must have non-empty 'tags' list",
      });
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════
// C09: No raw markdown links in monitored dirs
// ══════════════════════════════════════════════════════════════════════════

for (const [relPath] of vault.notes) {
  const filename = relPath.split("/").pop() ?? relPath;
  if (filename === ".gitkeep") continue;
  if (!isMonitoredFile(relPath)) continue;

  const absPath = resolve(REPO_ROOT, relPath);
  try {
    const raw = readFileSync(absPath, "utf-8");
    const lines = raw.split("\n");
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Track fenced code block state
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;
      // Strip inline code spans before scanning for raw links
      const stripped = line.replace(/`[^`]+`/g, "");
      // Match [text](path.md) but NOT external URLs (http/https) and NOT image links ![alt](url)
      const rawLinkMatch = stripped.match(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g);
      if (rawLinkMatch) {
        for (const match of rawLinkMatch) {
          const urlMatch = match.match(/\(([^)]+)\)/);
          if (!urlMatch) continue;
          const url = urlMatch[1];
          // Allow external URLs
          if (url.startsWith("http://") || url.startsWith("https://")) continue;
          // Allow anchor-only links like (#section)
          if (url.startsWith("#")) continue;
          violations.push({
            file: relPath, line: i + 1, check: "C09",
            message: `raw markdown link '${match}' — use [[wikilink]] instead`,
          });
        }
      }
    }
  } catch { /* skip if unreadable */ }
}

// ══════════════════════════════════════════════════════════════════════════
// C10: channel/author must be plain strings, not wikilinks
// ══════════════════════════════════════════════════════════════════════════

for (const [relPath] of vault.notes) {
  const filename = relPath.split("/").pop() ?? relPath;
  if (filename === ".gitkeep") continue;
  if (!isMonitoredFile(relPath)) continue;

  const absPath = resolve(REPO_ROOT, relPath);
  const fm = parseFm(absPath);
  if (!fm || fm.type !== "source") continue;

  // channel (video) or author (article) must be plain non-empty strings, not wikilinks
  if (fm.channel !== undefined) {
    if (typeof fm.channel !== "string" || fm.channel.trim().length === 0) {
      violations.push({
        file: relPath, line: 1, check: "C10",
        message: `'channel' must be a plain non-empty string (no people entities), got ${typeof fm.channel}`,
      });
    } else if (containsWikilink(fm.channel)) {
      violations.push({
        file: relPath, line: 1, check: "C10",
        message: "'channel' must not contain wikilinks (no people entities)",
      });
    }
  }

  if (fm.author !== undefined) {
    if (typeof fm.author !== "string" || fm.author.trim().length === 0) {
      violations.push({
        file: relPath, line: 1, check: "C10",
        message: `'author' must be a plain non-empty string (no people entities), got ${typeof fm.author}`,
      });
    } else if (containsWikilink(fm.author)) {
      violations.push({
        file: relPath, line: 1, check: "C10",
        message: "'author' must not contain wikilinks (no people entities)",
      });
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════
// Report
// ══════════════════════════════════════════════════════════════════════════

if (violations.length === 0) {
  console.log("validate: OK — 0 violations found");
  process.exitCode = 0;
} else {
  // Group by check
  const byCheck = new Map<string, Violation[]>();
  for (const v of violations) {
    const group = byCheck.get(v.check) ?? [];
    group.push(v);
    byCheck.set(v.check, group);
  }

  for (const [check, items] of byCheck) {
    const label = CHECK_LABELS[check] ?? check;
    console.log(`\n${label}`);
    for (const v of items) {
      console.log(`  ${v.file}:${v.line}: ${v.message}`);
    }
  }

  console.log(`\n${violations.length} violation(s) found`);
  process.exitCode = 1;
}
