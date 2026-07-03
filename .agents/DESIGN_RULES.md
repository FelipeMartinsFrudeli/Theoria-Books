# Design Rules

Theoria Books should feel like a calm intellectual companion, not a generic tracker.

## Visual Direction

Use:

- calm surfaces
- restrained shadows
- quiet hierarchy
- compact controls
- readable typography
- gentle gamification

Avoid:

- noisy colors
- childish badges
- dense academic dashboards
- social-media-style feeds
- decorative blobs or gradient orbs

## Palette

Use colors from `src/shared/styles/theme.ts`:

- primary dark blue: `#183B56`
- secondary blue: `#244E68`
- soft green-gray: `#DDE8E1`
- main background: `#F8FAF9`
- paper: `#FFFFFF`
- muted text: `#8A9499`
- chip background: `#E9EEF0`
- success/streak: `#6BAA75`
- warning/XP: `#F2B84B`
- philosophy accent: `#8D6E63`

Do not introduce random colors in feature components.

## Spacing

All spacing must use multiples of 4px.

Preferred values:

- 4px for icon/text gaps
- 8px for compact internal gaps
- 16px for standard padding
- 24px for card/section padding
- 32px for major section separation

Allowed values:

- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48
- 56
- 64
- 80

When using MUI spacing props, remember that `1 = 8px` by default. Use `0.5`, `1`, `1.5`, `2`, `3`, `4`, etc. only when they resolve to multiples of 4px.

## Border Radius

The current theme base radius is `4px`.

Keep the design cleaner and less rounded:

- cards: 12px
- buttons: 12px
- compact chips: 8px
- bottom navigation: 16px
- hero section bottom curve: 16px
- progress bars: 8px
- embedded PDF frame: 12px

Avoid:

- huge pill cards
- nested rounded cards
- arbitrary radii like 13px, 17px, or 27px

## Layout

The app is mobile-first.

- Keep the centered mobile shell.
- Do not build a desktop dashboard layout yet.
- Keep bottom navigation fixed inside the shell.
- Keep content scrollable above bottom navigation.

## Components

- Do not nest cards inside cards.
- Cards are for repeated items, dialogs, or genuinely framed tools.
- Page sections should be clean layouts, not decorative card stacks.
- Prefer icon buttons for compact actions.
- Use menus for option sets.
- Use tabs only where multiple sibling views are necessary.

## Text Fit

- Text must not overlap.
- Buttons must fit their labels on mobile.
- Avoid viewport-width font sizing.
- Letter spacing must remain `0`.

