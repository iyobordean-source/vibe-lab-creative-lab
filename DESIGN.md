# Design system

## Visual direction

Treat the Creative Lab as a creative-community brand with the confidence of an independent studio and the warmth of a real group of people. The page should feel bold, human, energetic, youthful, editorial, and considered. Its identity should come from typography, composition, rhythm, and genuine creative work—not a software-product template.

Use the supplied Vibe Lab identity and approved content as the source of truth. The only supplied tagline in this brief is **“Experiences. Creativity. Good Vibes.”** No logo file, official font, photography, or complete brand palette was supplied here. The colors and font stacks below are proposed working tokens, not claims about existing brand standards; reconcile them with client assets when those are available.

## Typography strategy

- Let typography carry the hierarchy. Use oversized, tightly composed display type for short statements and restrained, highly readable body type for explanations and form labels.
- Working display stack: "Arial Narrow", Impact, sans-serif. Working reading stack: Arial, "Helvetica Neue", sans-serif. These system stacks keep the foundation self-contained; replace or tune them if the client supplies licensed brand fonts.
- Use strong weight and deliberate line breaks before decorative lettering effects. Keep body copy at a comfortable reading size and line length.
- Reserve all-caps and tight tracking for short labels. Do not set long instructions or paragraphs in all caps.

## Color system

| Token | Value | Role |
| --- | --- | --- |
| paper | #F5F1E8 | Warm, open page background |
| ink | #181916 | Primary text, rules, and dark surfaces |
| signal | #D6FF43 | High-energy lime accent and emphasis |
| flare | #E8452E | Sparing warm accent |
| muted | #66675F | Secondary text where contrast remains sufficient |
| white | #FFFDF8 | Light surfaces when separation is needed |

Use a restrained palette: paper and ink do most of the work; lime and warm red are accents. Avoid gradients. Check actual foreground/background pairs for WCAG contrast before using an accent for text or controls. Never communicate state through color alone.

## Spacing and layout

- Use a 4 px base unit, with common spacing built in multiples of 4 and larger section gaps built from 8 px increments.
- Give sections room to breathe. Use a consistent page gutter that scales with the viewport and a readable maximum width for long text.
- Use editorial grids, strong alignment, varied column widths, and a small number of intentional off-axis moments. Keep reading order obvious even when the visual composition is asymmetrical.
- Prefer open layouts, rules, and typographic groupings over containers. Do not turn every section into a rounded card.

## Buttons and controls

- Make the primary action visually unmistakable through contrast, clear wording, and generous touch space—not gradients or ornament.
- Use concise, action-specific labels. Provide visible hover, pressed, keyboard-focus, and disabled states.
- Keep hit targets comfortable on touch screens. Give controls clear boundaries and labels; do not rely on placeholder text as a label.
- Reserve secondary button styling for genuinely secondary actions.

## Form design principles

- Ask only for information the Vibe Lab team needs to consider an application; confirm the field list with the client before implementation.
- Group related questions in a natural order and show which fields are required.
- Write direct, human instructions. Place errors beside the relevant field, explain how to correct them, and preserve entered values.
- Use appropriate input types, autocomplete hints, semantic labels, and keyboard-accessible controls.
- Make the submit action and post-submit confirmation clear. Do not imply an application was received until persistence succeeds.
- Explain any sensitive or optional information at the point it is requested. Do not add decorative or unrelated questions.

## Mobile behavior

- Design for narrow screens first, then expand into editorial columns as space allows.
- Keep the main message, application action, labels, and submit control visible and usable without horizontal scrolling.
- Let type scale fluidly but prevent oversized display text from clipping or dominating the form.
- Stack multi-column content in a deliberate reading order. Preserve comfortable side gutters and touch spacing.
- Check the layout at 320 px wide, at common phone widths, and at larger tablet and desktop widths.

## Motion and animation

- Use motion only to clarify an interaction or add a small amount of personality to a meaningful moment.
- Keep transitions brief and restrained; avoid parallax, looping decoration, scroll hijacking, and motion that delays access to content.
- Respect prefers-reduced-motion and ensure the experience remains complete with animation disabled.

## Image usage

- Prefer genuine, client-approved Creative Lab or community imagery that shows people making, collaborating, or sharing creative work.
- Ask for image rights and context before use. Do not use stock-photo-heavy layouts or imply that staged people are Vibe Lab members.
- Use a few purposeful images with considered crops. Provide useful alt text for informative images and empty alt text for purely decorative images.
- If approved images are not available, use the typographic and editorial system; do not invent photos, events, or member stories.

## Accessibility principles

- Use semantic landmarks, a logical heading order, and keyboard-operable interactions.
- Maintain readable contrast, visible focus, clear labels, and errors announced to assistive technology.
- Do not rely on color, animation, position, or imagery alone to convey meaning.
- Respect zoom, reduced-motion settings, and text resizing. Use descriptive link and button names.
- Review layouts and controls with keyboard navigation and assistive technology during the final polish slice.

## Avoid

- Corporate HR or generic SaaS patterns, dashboard-like card grids, and unnecessary feature panels.
- Purple/blue “AI” aesthetics, generic gradients, glass effects, excessive rounded cards, or decorative shapes without a job.
- Fake statistics, testimonials, achievements, urgency, or membership promises.
- Stock-photo-heavy pages, unapproved brand marks, or invented community stories.
- Dense form walls, ambiguous labels, placeholder-only instructions, and unnecessary motion.