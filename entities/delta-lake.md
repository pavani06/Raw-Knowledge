---
title: "Delta Lake"
type: entity
entity_type: project
aliases: []
tags: [data, storage, open-source, lakehouse]
source_count: 1
last_updated: 2026-06-25
relates-to: ["[[entities/databricks]]", "[[entities/apache-spark]]", "[[entities/unity-catalog]]"]
part-of: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Delta Lake

Open source storage layer that brings database-like properties (ACID transactions,
versioning, schema enforcement) to data lakes. A foundational technology of
[[entities/databricks|Databricks]], sitting between cloud storage (raw data: images,
text files, videos) and the governance/catalog layer. Delta Lake enables incremental
data loading and structured data management on top of raw object storage through
manifest files.

In the [[concepts/data-foundation|data foundation]] pillar of the Databricks production
AI framework, Delta Lake is the structured data layer that makes tracing data queryable
and manageable at enterprise scale.

## Mentioned In

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Delta Lake as the structured data layer in Databricks' data foundation stack
