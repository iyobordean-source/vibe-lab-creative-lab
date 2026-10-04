# Project TODO

## 1. Project foundation — complete

- [x] Create the React, Vite, TypeScript, and Tailwind CSS foundation.
- [x] Define initial working design tokens and document the design direction.
- [x] Document the product, intended architecture, contribution guidance, and local setup.
- [x] Leave the React app visually empty; do not build a page or form in this slice.

## 2. Landing page — implementation complete

- [ ] Gather approved Vibe Lab logo, brand assets, and photography.
- [x] Use the supplied Creative Lab description and interests without adding unsupported claims.
- [x] Build the responsive editorial page and clear apply actions using DESIGN.md.
- [ ] Review the composition visually at phone, tablet, and desktop sizes.
- [x] Make /apply reachable from the apply actions with a placeholder for the next slice.

## 3. Application form

- [ ] Agree the minimum necessary application fields and required/optional status with the team.
- [ ] Build the focused, accessible form with clear labels, guidance, validation, and error recovery.
- [ ] Add a clear confirmation state that is shown only after successful submission.
- [ ] Verify keyboard use, mobile layout, and preservation of entered values after recoverable errors.

## 4. Submission and storage

- [ ] Confirm hosting, data access, and retention expectations; select a managed storage option that fits.
- [ ] Implement a server-side submission endpoint with validation and safe error handling.
- [ ] Persist applications and return success only after storage completes.
- [ ] Keep credentials server-side and avoid logging application contents.

## 5. WhatsApp handoff

- [ ] Confirm the Vibe Lab recipient and the team's approved WhatsApp account and sending method.
- [ ] Format a concise message from the stored application details.
- [ ] Send the message server-side after persistence and handle delivery failures without losing the record.
- [ ] Agree and document a practical fallback if automatic delivery is unavailable.

## 6. Final polish and testing

- [ ] Review content accuracy and confirm there are no invented claims or imagery.
- [ ] Check responsive layouts, contrast, keyboard navigation, focus states, and reduced motion.
- [ ] Exercise success, validation, storage-failure, and WhatsApp-failure paths.
- [ ] Run the production build and agreed checks; resolve issues before launch.