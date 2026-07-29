@AGENTS.md
@GRAPH_REPORT.md

## Graphify (knowledge graph)

This project has a code knowledge graph in `graphify-out/` (graph.html, graph.json), built with the `graphify` CLI (`uv tool install graphifyy` if not on PATH).

- For architecture / "how does X connect to Y" questions, prefer `graphify query "<question>"`, `graphify explain "<node>"`, or `graphify path "A" "B"` over grepping/reading files one by one — it's faster and cheaper.
- After making code changes in this project, run `graphify update .` to refresh `graphify-out/graph.json` (local AST re-extraction only, no LLM cost, safe to run every time).
- If the graph feels stale/missing, rebuild fully with `graphify extract . --code-only --out .` then `graphify cluster-only . --no-label`.
