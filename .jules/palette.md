## 2025-05-18 - Keyboard Navigation for Clickable Category Cards
**Learning:** Interactive `<div>` elements with `(click)` handlers in Angular components lack native keyboard focus and activation support unless explicitly given `role="button"`, `tabindex="0"`, `aria-label`, and `keydown` event bindings (`enter` and `space`).
**Action:** When creating or editing card-based navigation or selector components, ensure interactive wrapper elements include full ARIA role, tabindex, aria-label, and keyboard handlers.
