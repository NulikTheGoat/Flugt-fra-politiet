# Copilot Agent Instructions

## Version Control Rules

- **Always commit and push after every change** - After making any code changes, immediately run:
  ```bash
  git add -A && git commit -m "descriptive message" && git push
  ```

## Project Context

- This is a Three.js car chase game called "Flugt fra politiet" (Escape from Police)
- Primary language: JavaScript
- Framework: Three.js r128
- UI: Vanilla HTML/CSS

## Code Style

- Use Danish for user-facing text (HUD, messages, button labels)
- Use English for code comments and variable names
- Keep performance in mind - cache DOM elements, reuse geometries/materials
- Use delta time for frame-rate independent physics
