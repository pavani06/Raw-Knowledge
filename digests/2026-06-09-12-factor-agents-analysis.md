# Análise de Conhecimento Não-Óbvio: 12-Factor Agents (Dex Horthy)

> Fonte: [[sources/2026-06-09-12-factor-agents]]
> Extraído: 2026-06-09
> Regras: sem marketing, anedotas, histórias pessoais, repetição

---

## 1. Frameworks & Arquiteturas

### 1.1 O Modelo de Loop do Agente como Quatro Componentes Owanáveis

O agente é decomposto em exatamente quatro partes que o builder deve **possuir diretamente**, não delegar a um framework:

```
[prompt] → [switch statement] → [context builder] → [loop]
```

- **Prompt**: instruções sobre como selecionar o próximo passo (não um template mágico do framework).
- **Switch statement**: recebe o JSON de saída do modelo e decide deterministicamente o que fazer.
- **Context builder**: como o histórico é montado e passado ao modelo — formato, densidade, limpeza.
- **Loop**: determina quando, onde, como e por que sair — `break`, `switch`, `summarize`, `LM as judge`.

A implicação não-óbvia: se você possui o loop, você pode injetar operações arbitrárias nele (sumarização, validação por outro LLM, interrupção para aprovação humana) sem que o framework saiba ou precise saber. O loop deixa de ser uma caixa-preta do runtime para ser código de aplicação comum.

### 1.2 Arquitetura de Micro-Agents (Factor 10)

```
[DAG determinístico] → [micro-agent loop: 3-10 passos] → [DAG determinístico]
```

Características não-óbvias:

- **O DAG é majoritariamente determinístico**. Apenas nós específicos contêm loops de agente.
- **Cada micro-agent tem responsabilidade clara e escopo limitado** — exatamente o oposto do "agente autônomo monolítico" que recebe um goal e descobre o caminho.
- **O modelo não decide o DAG inteiro**; ele decide apenas o próximo passo dentro de um nó já predeterminado pelo código determinístico.
- Exemplo concreto (HumanLayer deploy): CI/CD determinístico → merge PR → agent decide ordem de deploy (frontend/backend) → human approval → deploy → de volta ao código determinístico para testes E2E → se falha, rollback agent (outro micro-agent, mesma estrutura).

**Tradeoff**: você sacrifica a "mágica" do agente autônomo em troca de previsibilidade e debugabilidade. O custo é mais código determinístico para escrever; o ganho é que os pontos de falha são isolados e reversíveis.

### 1.3 Scaffolding vs. Wrapper (Factor 12)

Distinção emprestada do ecossistema frontend:

| Modelo | Exemplo | Quem possui o código |
|---|---|---|
| **Wrapper** | Bootstrap CSS | O framework é uma dependência opaca; você configura parâmetros |
| **Scaffolding** | shadcn/ui | O código é copiado para o seu projeto; você possui e modifica |

Aplicado a agentes: `create-12-factor-agent` gera código que você possui, não uma biblioteca que você importa. A diferença é que quando o agente chega em 70-80% de qualidade e você precisa dos últimos 20%, você não está "sete camadas de call stack tentando fazer engenharia reversa de como o prompt é montado" — você edita o prompt diretamente no seu código.

---

## 2. Padrões de Implementação

### 2.1 "Tool Use is Harmful" — O Reframe

**Tese**: tool use é uma abstração errada. Na prática, "tools" são:

```python
# O que o framework te faz pensar:
agent.use_tool("send_email", to="...", body="...")

# O que realmente acontece:
json_output = llm.generate(prompt)          # LLM produz JSON
result = deterministic_handler(json_output) # switch statement processa
context = append_to_context(result)         # resultado vai pro context window
```

O LLM não está "usando uma ferramenta" — está gerando tokens que são interpretados por código determinístico como dispatch. Não há nada de especial ou "mágico" no mecanismo.

**Consequências de design não-óbvias**:

- Se você entende que tools são só JSON + switch, você pode testar o dispatch handler deterministicamente, sem LLM.
- Você pode versionar, logar e auditar cada dispatch como uma operação de software normal.
- Você pode adicionar validação, rate limiting, e circuit breaking no switch statement como faria em qualquer API.
- O loop de erro (tool call falha → erro no context → retry → pode espiralar) fica visível e controlável porque você possui o context builder.

### 2.2 Primeiro Token como Decisão de Intenção (Factor 8)

**Padrão**: em vez de ter um campo separado no schema de output (`type: "tool_call" | "message"`), a distinção é empurrada para o **primeiro token de linguagem natural** que o modelo gera.

```
// Schema tradicional (campo separado):
{"action": "tool_call", "tool": "send_email", ...}
{"action": "message", "content": "Hello..."}

// Padrão do primeiro token:
"I'll send an email to..."     → dispatch para ferramenta
"I need clarification on..."   → mensagem para humano
"The task is complete."        → finalizar
```

**Por que isso é não-óbvio**: o primeiro token é onde o modelo coloca mais massa de probabilidade e onde o sampling tem mais impacto. Ao empurrar a decisão de routing para o primeiro token, você está fazendo a decisão mais importante no ponto de maior confiança do modelo. O modelo "entende" linguagem natural melhor do que entende schemas de ação.

**Implicação**: você ganha múltiplas intenções sem precisar de um enum fechado — o modelo pode expressar "preciso falar com um manager" sem que isso esteja hardcoded no schema.

### 2.3 Serialização de Contexto para Pause/Resume (Factor 7)

**Padrão de implementação**:

```
1. Requisição entra → contexto é carregado do banco
2. LLM decide próximo passo → pode ser long-running tool call
3. Contexto é serializado → salvo no banco com state_id
4. Workflow é interrompido (a ferramenta executa async)
5. Callback chega com state_id + resultado
6. Contexto é carregado do banco via state_id
7. Resultado é appendado ao contexto
8. Contexto é reenviado ao LLM
```

**Detalhe não-óbvio**: o agente **não sabe** que houve uma pausa. Do ponto de vista do LLM, o próximo prompt contém o histórico completo como se nada tivesse acontecido em background. Isso é possível porque o context builder possui o formato do contexto e pode remontá-lo identicamente.

**Pré-condição**: você precisa **possuir o context window** (Factor 3). Se um framework monta o contexto internamente, você não pode serializá-lo e reconstituí-lo.

### 2.4 Limpeza de Erros no Context Window

**Regra operacional**: quando um tool call falha e depois um tool call subsequente é bem-sucedido:

- **Limpar** todos os erros pendentes do contexto.
- **Sumarizar** os erros (não incluir stack traces completos).
- **Nunca** fazer append cego de toda resposta no contexto.

**Por que isso importa**: erros acumulados no context window são uma das causas principais de "spiral out" — o agente começa a alucinar sobre erros passados, tenta corrigir problemas que já foram resolvidos, ou entra em loop de retry porque o contexto está poluído com informação de falha.

---

## 3. Lições Operacionais

### 3.1 O Trap dos 70-80%

**Fenômeno observado**: frameworks permitem chegar a 70-80% de qualidade muito rápido — suficiente para uma demo ou para convencer stakeholders. Mas os últimos 20% exigem possuir os internals (prompts, contexto, control flow). Quem não possui os internals fica preso em "sete camadas de call stack tentando fazer engenharia reversa".

**Padrão de falha**: o time escala (six more people added) baseado na demo de 80%, depois descobre que não consegue ir além sem reescrever. Acaba jogando tudo fora e começando do zero.

**Anti-solução**: tentar resolver os 20% finais adicionando mais detalhes ao prompt dentro do framework, sem acesso ao context builder. O palestrante descreve o caso do DevOps agent onde passou duas horas escrevendo cada vez mais instruções no prompt até perceber que tinha essencialmente escrito um bash script em linguagem natural — mais verboso e menos confiável.

### 3.2 Nem Todo Problema Precisa de um Agente

**Heurística**: se o problema pode ser resolvido deterministicamente com um script simples (ex: ordem de passos de build), **não use um agente**. O teste: você conseguiria escrever a solução em bash/python em menos de 2 minutos? Se sim, provavelmente não é um problema para agentes.

**O caso do DevOps agent**: o palestrante tentou fazer um agente executar passos de build. Depois de duas horas refinando o prompt com a ordem exata de cada passo, percebeu que tinha essencialmente hardcoded a solução no prompt. Um bash script de 90 segundos teria resolvido.

### 3.3 Contextos Longos Degradam Confiabilidade

**Observação**: mesmo que APIs aceitem 2 milhões de tokens (Gemini), colocar muitos tokens no contexto **sempre** degrada a qualidade da resposta comparado a um contexto menor e mais curado.

**Implicação de design**: o "agente com loop simples" (appendar tudo ao contexto até o LLM dizer "pronto") não funciona para workflows longos. A solução não é esperar que modelos fiquem melhores com contextos gigantes — é arquitetar o sistema para manter contextos pequenos e focados (micro-agents).

### 3.4 A Estratégia do "Bleeding Edge"

**Padrão competitivo**: encontre algo que está **exatamente no limite** do que o modelo consegue fazer de forma confiável (não acerta 100% das vezes). Se você conseguir fazer isso funcionar de forma confiável através de engenharia de harness (não através de prompt melhor ou modelo melhor), você criou algo que ninguém mais consegue replicar.

Isso é citado como a estratégia do NotebookLM: não usar o modelo para o que ele já faz perfeitamente, nem para o que ele comprovadamente não consegue fazer — mas para a fronteira onde engenharia de sistema faz a diferença entre funcionar e não funcionar.

---

## 4. Tradeoffs Documentados

| Decisão | Ganho | Custo |
|---|---|---|
| Micro-agents em DAG determinístico vs. agente autônomo monolítico | Previsibilidade, debugabilidade, contextos pequenos | Mais código determinístico para escrever e manter; menos "mágica" |
| Possuir o context window vs. delegar ao framework | Controle sobre densidade de tokens, pause/resume, limpeza de erros | Responsabilidade por formato, serialização, reconstituição |
| Scaffolding (shadcn-style) vs. Wrapper (bootstrap-style) | Código que você entende e modifica; sem camadas opacas | Duplicação de código entre projetos; sem atualizações automáticas do framework |
| Primeiro token como routing vs. campo de ação no schema | Modelo opera no domínio que entende melhor (linguagem natural); intenções abertas | Perda de garantias estruturais; parsing de intenção é fuzzy |
| Framework abstrai infra vs. framework abstrai AI | Builders focam em prompts, contexto, eval — o que realmente diferencia qualidade | Infraestrutura (state, human contact, serialização) vira responsabilidade do framework, exigindo confiança no fornecedor |
| Stateless agents + state externo vs. stateful agents | Reconstituição, pause/resume, debug via inspeção de estado | Complexidade de gerenciar estado externo; latência de serialização/desserialização |

---

## 5. Padrões de Falha

1. **Append cego de erros no contexto** → spiral out, perda de contexto, loops de retry infinitos.
2. **Delegar o context window ao framework** → impossibilidade de limpar, sumarizar ou otimizar tokens; perda de qualidade em workflows longos.
3. **Começar com framework que abstrai AI parts** → os 20% finais de qualidade são inalcançáveis sem reescrever.
4. **Agente autônomo para problemas deterministicos** → horas de prompt engineering para reproduzir o que um script faria em segundos.
5. **Contexto monolítico crescente** → degradação de qualidade proporcional ao tamanho do contexto, mesmo em modelos com janelas grandes.
6. **Schema rígido para intenção do agente** (tool_call vs message) → impede o modelo de expressar nuances como "preciso de aprovação de um manager" sem redefinir o schema.

---

## 6. Síntese: O Princípio Unificador

> **Context engineering** é a disciplina unificada. Prompt, memória, RAG, histórico — tudo é "como colocar os tokens certos no modelo". O harness (switch, loop, state, serialização) existe para servir o contexto, não o contrário.

Isso implica que:

- Frameworks devem expor o context builder como API pública, não como detalhe interno.
- Testes de agente devem incluir testes do contexto montado (snapshot testing de tokens).
- A otimização principal não é de latência ou throughput do LLM — é de **densidade de informação por token** no contexto.
