# Storybook documentation contract

Documentation template version 2 uses real Storybook. It replaces the earlier custom Wix-inspired shell specification. Keep the native Storybook manager, search, sidebar tree, Docs, Canvas, Controls, event log, and deep links across every project. Do not recreate their appearance in a Next.js page.

## Start alongside desktop

```sh
npm ci
npm run dev
# In a second terminal:
npm run storybook
```

The Next.js site runs on port 3000 and Storybook on port 6006. Storybook uses the installed `@storybook/nextjs-vite` adapter. It is a separate development application and static build, not a Next.js route. Use `npm run typecheck:storybook` and `npm run build:storybook`; the latter generates `storybook-static/`. Serve that folder over HTTP to review or host it. Do not publish it without the user's authorization.

`.storybook/main.ts` selects stories and addons. `.storybook/manager.ts` keeps the native light documentation interface stable. `.storybook/preview.tsx` loads actual site CSS and providers. `stories/` contains typed CSF stories importing production components. These files are included in the starter, not a future implementation task.

## Native hierarchy

Use Category / Folder / Component / Docs or Story. Slash-delimited `meta.title` values build Storybook's actual tree. Keep the top-level order below; omit empty groups and add project-specific folders where needed.

```text
Foundations
  Tokens
    Docs
    Colors
    Typography
    Spacing
    Geometry
Components
  Actions
    Button
      Docs
      Primary
      Secondary
      Ghost
      Small
      Disabled
      Loading
      Long Label
      Click Interaction
  Navigation
    Button Link
    Text Link
  Content
    Card
  Forms
    Field
Patterns
  Section
Motion
  GSAP Controls
Pages
  Home
    Desktop
```

Each component has a single owning story file, a stable title, and named stories for meaningful supported states. Use readable names, not numbered screenshot labels. A story is an actual rendered configuration of the source component. Pages assemble real page components; Patterns document reusable compositions. Replace demo content with the current project's inventory. Do not invent unused variants, states, pages, or mobile stories to fill the tree.

## Component documentation and interaction

Use `Meta` and `StoryObj` from `@storybook/nextjs-vite`, `component`, `args`, and explicit `argTypes`. Autodocs is enabled globally. Keep native Docs structure: component purpose, live primary example, typed props/Controls, source, and named examples. Add concise usage, semantic roles, consumed tokens, keyboard behavior, motion behavior, and known limitations through component/story descriptions. Use MDX only when standard Autodocs cannot express the actual guidance; retain the same hierarchy and chrome.

Controls change the current example's props. Use selects for semantic variants, booleans for supported states, and text for content. Avoid arbitrary CSS controls on core components. Use `fn()` from `storybook/test` for observable event callbacks. Meaningful `play` functions may exercise interactions and assert the outcome; they do not replace visual inspection of motion over time.

Keep hover, focus-visible, active, loading, and disabled behavior in the real component. Demonstrate interaction on the live specimen. Do not fake these states with copied markup or a separate CSS implementation. Do not turn every pseudo-state into an unsupported boolean prop merely to expose it in Controls.

## Shared styles and stable chrome

The site and stories import the same components and generated token CSS. Storybook's manager is a separate document. The Vite preview transform scopes the original base/component/layout CSS to `.project-preview`, so project heading and control selectors do not restyle native Docs. `.storybook/preview.css` contains specimen layout only. Preserve this boundary when adding styles; check new global selectors and keyframes. Do not copy production styles into stories.

The manager and Docs remain light. The project theme toolbar affects isolated specimens only; additional project themes still require scope. `Pages/Home` renders the real App with its own theme switch and provider, so use the page controls for that integrated example. Documentation UI controls are Storybook-owned; project controls keep their own tokens and styles. Verify heading scales within their respective scopes.

## Controls versus persistent tokens

Storybook Controls are temporary args previews, not source persistence. Saving stories from the UI is disabled. Foundations reads `src/design/tokens.json` and renders generated CSS values. Persistent project edits follow `tokens.json` -> `npm run tokens` -> `tokens.css`, updating both applications after rebuild/reload (HMR in development). Draft changes in the Next.js token lab are not automatically broadcast to the separate Storybook application.

The Next.js `/design-system` route remains a supporting token lab and integrated preview. Its motion editor already supports validated local source saving. Storybook's GSAP controls support preview/replay but hide that save button because Storybook has no Next.js write endpoint. Persistent color/size/typography editing is implemented in the local Next.js Design tools panel under [DESIGN-TOOLS.md](DESIGN-TOOLS.md); Controls remain a separate preview mechanism. If draft synchronization across both applications is added, implement an explicit validated bridge and verify it.

## GSAP specimens

Use the actual upward-mask and hover components under MOTION-DEFAULTS.md. The preview toolbar offers standard, slow and reduced motion; the GSAP controls support replay and timing preview. Observe ScrollSmoother on the integrated Next.js page. Keep the documentation shell stationary. Do not introduce additional motion recipes in stories.

## Delivery and verification

Create/update stories alongside each shared component during desktop implementation. Show the first desktop preview promptly. Before desktop acceptance, finish the project's actual component inventory, supported state stories, token documentation, and required motion examples. Demonstrate working sidebar navigation, search, Docs/Canvas links, Controls changes, event callbacks, and replay. Verify no project CSS leaks into documentation UI. Record Storybook version, covered stories, and limitations in the brief.

The accessibility addon reports findings for focused inspection; its presence is not an accessibility pass and must not automatically recolor or dim the design. Run the full browser/viewport matrix only at the existing final QA stage after approved desktop and authorized mobile adaptation. Storybook page stories do not exercise server routes, persistence, or actual Next.js navigation; verify those in the Next.js application. Static CI typechecks and builds both applications.

## Official references

- [Next.js with Vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite)
- [Naming and hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy)
- [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs)
- [Args](https://storybook.js.org/docs/writing-stories/args)
- [Controls](https://storybook.js.org/docs/essentials/controls)
