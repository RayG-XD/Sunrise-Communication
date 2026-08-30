## 2025-05-18 - Keyboard Navigation for Clickable Category Cards
**Learning:** Interactive `<div>` elements with `(click)` handlers in Angular components lack native keyboard focus and activation support unless explicitly given `role="button"`, `tabindex="0"`, `aria-label`, and `keydown` event bindings (`enter` and `space`).
**Action:** When creating or editing card-based navigation or selector components, ensure interactive wrapper elements include full ARIA role, tabindex, aria-label, and keyboard handlers.

## 2025-05-18 - Form Label Associations in Angular Templates
**Learning:** Reactive form controls in Angular HTML templates often lack explicit `for` and `id` attributes matching labels to inputs/selects, which prevents screen readers from identifying input field labels and disables tap-label-to-focus behavior.
**Action:** Always add explicit `for="<id>"` on `<label>` elements and matching `id="<id>"` on `<input>` and `<select>` controls in Angular form components.
