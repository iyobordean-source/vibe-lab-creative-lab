# Architecture

## Principle

Keep the product small: one applicant-facing React experience, one submission path, one durable application record, and one WhatsApp handoff to the Vibe Lab team. The team should be able to receive applications without logging into a new admin product. Provider choices should fit the confirmed hosting environment and the team's existing WhatsApp setup.

## Frontend

- React and TypeScript, built and served with Vite.
- Tailwind CSS for utility styling, with the working design tokens defined in src/styles.css.
- The landing page and the temporary /apply destination live in the flat React entry experience; native links are enough for this small scope, so no router dependency is needed.
- Keep page sections and form behavior in small, accessible components as the experience grows. Avoid adding state libraries or component kits until a demonstrated need exists.
- The /apply path is a temporary placeholder only. It contains no application form or submission behavior.

## Application submission

- The eventual form submits a typed payload to one server-side endpoint over HTTPS.
- The server validates and normalizes the submitted fields; client-side checks are for usability and do not replace server validation.
- Return success only after the application has been stored. Return a clear recoverable error if persistence fails, without discarding the applicant's entered details.
- Keep secrets and provider credentials on the server. Do not send them to the browser or include application contents in routine logs.

## Data storage

- Persist one record per submitted application in a managed store supported by the chosen deployment platform.
- Agree on the minimum necessary fields and access/retention expectations with the Vibe Lab team before selecting a provider or implementing storage.
- Keep storage private to the submission service and authorized maintainers. The V1 has no applicant-facing account and no team dashboard.
- Provider and schema remain undecided until hosting and form fields are confirmed; do not create a database in the foundation slice.

## WhatsApp handoff

- After persistence succeeds, format the necessary application fields into a concise, readable message and deliver it to the designated Vibe Lab contact through an approved WhatsApp sending method.
- Use server-side credentials for any provider integration. Confirm the team's WhatsApp account, recipient, and approved sending route before implementation.
- Treat storage and message delivery as separate outcomes: a WhatsApp delivery problem must not make a stored application appear lost. Define a simple retry or team-visible failure path when the provider is selected, without creating an admin dashboard.
- If automatic delivery is not available in the chosen setup, agree on an explicit fallback before launch; do not silently claim a message was sent.

## Current implementation boundary

The public landing page is implemented. The /apply route is a clearly labeled placeholder for the next slice. No application form, API endpoint, database, WhatsApp integration, authentication, or admin dashboard is implemented.