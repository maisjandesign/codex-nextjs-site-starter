# Motion and Zoom

`prefers-reduced-motion`, zoom and reflow, and unit choices that respect user settings.

## prefers-reduced-motion

Follow docs/MOTION-DEFAULTS.md for the three GSAP families. Use static, fully visible content and native scrolling under reduced motion. Preserve focus and state feedback.

## Autoplay and timed UI

Motion the user didn't ask for, and UI that acts on its own schedule:

- **No autoplaying media without visible controls** (WCAG 2.2.2): anything that moves, blinks or updates automatically for more than 5 seconds needs a visible pause/stop control. Muted looping hero videos included.
- **Prefer explicit dismissal over timers.** Auto-dismissing toasts are acceptable only for low-stakes confirmations; anything containing an action, an error, or information the user may need to act on stays until dismissed. If a toast must time out, 5 seconds is the floor, and hovering or focusing it pauses the timer.
- **Never put critical information only in a timed element.** A vanished toast with the only link to an undo action is data loss on a schedule.

## Zoom and reflow

- **200% zoom** (WCAG 1.4.4): all content and functionality must survive text scaled to 200%. Never block zoom: no `user-scalable=no`, no `maximum-scale=1`. Safari ignores the cap but every other browser enforces it.
- **Reflow at 320px** (WCAG 1.4.10): at 400% zoom on a 1280px viewport (equivalent to a 320px viewport) the page must work with vertical scrolling only: no two-dimensional scrolling except for genuinely 2D content (tables, maps, code blocks), which scroll inside their own container.

Fixed heights are what break under zoom: use `min-height` on anything containing text and let containers grow.

### rem vs px

Respect how the codebase is set up: if the project sizes in `px` (or an established Tailwind scale), stay consistent with it; don't introduce mixed units into someone else's system. Where you do have the choice (new code, or a codebase already on `rem`), `rem` respects the user's base font size and `px` ignores it:

| Use `rem` | Use `px` |
| --- | --- |
| `font-size` | Borders and hairlines |
| `max-width` of text containers | Focus outline width and offset |
| Media-query breakpoints (`@media (min-width: 48rem)`) | `box-shadow` details |
| Spacing that should scale with text | Fixed-size decorations |

Breakpoints are where the choice matters most: at a larger base font size, an `em`/`rem` query switches to the mobile layout when the text needs it; a `px` query doesn't.
