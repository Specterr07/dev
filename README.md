# Migrated Portfolio to React

## CI/CD Migration Phases

- Phase 1: Baseline scripts for CI checks (`lint`, `test`, `build`) while keeping current `gh-pages` deploy.
- Phase 2: Add PR CI workflow (install, lint, test, build).
- Phase 3: Add main branch CD workflow for automatic GitHub Pages deployment.
- Phase 4: Remove manual local deploy flow (`gh-pages` package/scripts) after pipeline validation.
- test 1