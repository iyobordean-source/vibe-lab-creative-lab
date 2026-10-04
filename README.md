# Vibe Lab Creative Lab

A small web experience for people interested in joining The Vibe Lab's volunteer creative community. The intended journey is: discover the Creative Lab, apply, receive confirmation, and have the application details organized and sent to the Vibe Lab team through WhatsApp.

The current slice is the responsive Creative Lab landing page. The /apply destination is a temporary placeholder for the upcoming application-form slice. No form, database, WhatsApp integration, or admin dashboard is implemented.

## Run locally

Requirements: Node.js ^20.19.0 or >=22.12.0 and npm.

    npm install
    npm run dev

Vite prints the local URL in the terminal. To create and preview a production build:

    npm run build
    npm run preview

## Project notes

- PRODUCT.md — problem, users, goal, journey, V1 scope, and non-goals.
- DESIGN.md — visual direction, working design tokens, and interface principles.
- ARCHITECTURE.md — intended frontend, submission, storage, and WhatsApp handoff.
- TODO.md — staged delivery plan.
- AGENTS.md — guidance for future coding agents.

The color palette and system font stacks in the starter CSS are working proposals because no logo, official palette, or font files were included with the brief. Confirm them against any client-supplied brand assets before the interface is finalized.