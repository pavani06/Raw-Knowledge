---
title: "Unity Catalog"
type: entity
entity_type: tool
aliases: []
tags: [data, catalog, governance, metadata, pii]
source_count: 1
last_updated: 2026-06-25
relates-to: ["[[entities/databricks]]", "[[entities/delta-lake]]"]
part-of: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Unity Catalog

[[entities/databricks|Databricks]]' centralized data catalog and governance layer. Provides
centralized permissions, data sharing via Delta Sharing, data discovery, ownership tracking,
and metadata tagging at the catalog level. Key capability for AI: tagging columns as PII,
adding table/column descriptions, and enriching metadata that AI agents consume as context
when querying data — making it "really easy for AI to then get that context when it queries
these tables."

In the [[concepts/data-foundation|data foundation]] pillar, Unity Catalog is the governance
layer sitting above [[entities/delta-lake|Delta Lake]] and below AI/BI applications.

## Mentioned In

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Unity Catalog as the centralized governance/catalog layer enabling metadata-enriched AI queries
