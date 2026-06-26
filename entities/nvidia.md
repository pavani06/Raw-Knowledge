---
title: "NVIDIA"
type: entity
entity_type: company
aliases: ["Nvidia", "NVDA"]
tags: [ia, semicondutores, infraestrutura, hardware]
source_count: 1
last_updated: 2026-06-25
relates-to: []
part-of:    []
sources:    ["[[sources/2026-06-25-futuro-ia-juros-brasil-visao-daniel-goldberg]]"]
---

# NVIDIA

Empresa dominante no layer de chips da inteligência artificial. Além de fabricar GPUs, controla o ecossistema de software (CUDA) e a camada de orquestração dos chips — o que a torna "um pouquinho mais que uma empresa de semicondutores". Captura entre 50% e 170% do spread econômico da inferência de AI.

## Posição na Stack de AI

- No framework de [[concepts/ai-transformacao-energetica|AI como transformação energética]], a NVIDIA ocupa o layer de infraestrutura (chips) e captura uma parcela desproporcional do spread entre custo de energia (~$3/M tokens) e preço da inferência ($15-50/M tokens)

- O descasamento contábil viabiliza essa captura: o capex do hyperscaler em GPUs é depreciado em 5-6 anos (despesa diluída no DRE), mas é receita imediata para a NVIDIA. O capex de um é a receita do outro

- Em 6 anos (Volta → Blackwell): consumo de energia aumentou 9×, output de tokens aumentou 10,000× — eficiência de 3 ordens de magnitude. A NVIDIA é a principal beneficiária desse ganho, porque cada geração de chips demanda mais energia e os hyperscalers competem para comprar

- Efeito de lock-in: CUDA + software de orquestração criam barreiras de saída para hyperscalers que vão além do hardware. A NVIDIA não é só uma fabricante de chips — é uma plataforma

- O modelo de negócios da NVIDIA é cíclico por natureza (semicondutores são capital-intensivos e cíclicos), mas a demanda atual por AI criou um ciclo de investimento sem precedentes: $750B em capex anual da indústria, ~$5.5T projetados até 2030

> [!inference] A análise de Goldberg sobre a NVIDIA enfatiza o aspecto de captura de spread e o descasamento contábil. A visão não aborda riscos competitivos (ASICs customizados, TPUs do Google, chips da AMD, ou a possibilidade de hyperscalers desenvolverem hardware próprio) que poderiam erodir a posição da NVIDIA no longo prazo.

## Mentioned In

- [[sources/2026-06-25-futuro-ia-juros-brasil-visao-daniel-goldberg|Futuro da IA — Daniel Goldberg]] — Análise da NVIDIA como capturadora desproporcional do spread econômico da AI e o descasamento contábil que mascara o custo real para hyperscalers
