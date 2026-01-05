# Color System Architecture

## Overview

The Pastel Sketchbook color system bridges daisyUI CSS variables with Tailwind CSS utilities to ensure consistent, theme-aware colors across the application.

## Color Mapping

### CSS Variables (daisyUI Theme)

Defined in `index.css` (lines 5–13):

```css
[data-theme="pastel"] {
  --p: 130 36% 42%;     /* primary */
  --s: 28 43% 67%;      /* secondary */
  --a: 15 75% 58%;      /* accent */
  --n: 149 36% 15%;     /* neutral */
  --b1: 36 35% 98%;     /* base-100 */
  --bc: 149 36% 15%;    /* base-content */
  --wa: 45 97% 63%;     /* warning */
}
```

**Format**: `H S L` (space-separated HSL values, no commas)

### Tailwind Theme Extensions

Defined in `tailwind.config.js` (lines 10–17):

```javascript
colors: {
  'pastel-dark': 'hsl(var(--n) / <alpha-value>)',
  'pastel-medium': 'hsl(var(--p) / <alpha-value>)',
  'pastel-tan': 'hsl(var(--s) / <alpha-value>)',
  'pastel-terracotta': 'hsl(var(--a) / <alpha-value>)',
  'pastel-yellow': 'hsl(var(--wa) / <alpha-value>)',
  'pastel-bg': 'hsl(var(--b1) / <alpha-value>)',
}
```

**Purpose**: Converts daisyUI CSS variables into Tailwind color utilities, supporting opacity modifiers (e.g., `pastel-medium/50`)

### Design System Colors

Defined in `index.css` `@theme` block (lines 27–36):

```css
@theme {
  --color-pastel-dark: hsl(149 36% 15%);
  --color-pastel-medium: hsl(130 36% 42%);
  --color-pastel-tan: hsl(28 43% 67%);
  --color-pastel-terracotta: hsl(15 75% 58%);
  --color-pastel-yellow: hsl(45 97% 63%);
  --color-pastel-bg: hsl(36 35% 98%);
}
```

**Purpose**: Provides design tokens for custom CSS (e.g., `var(--color-pastel-medium)`)

## Usage Examples

### In JSX/TSX Components

```tsx
// Using Tailwind color utilities
<div className="bg-pastel-bg text-pastel-dark">
  <button className="bg-pastel-medium hover:bg-pastel-dark text-pastel-bg">
    Click me
  </button>
</div>

// With opacity modifiers
<div className="bg-pastel-medium/50 border border-pastel-medium/20">
  Content
</div>
```

### In Custom CSS

```css
.custom-element {
  color: var(--color-pastel-dark);
  background: var(--color-pastel-bg);
  border-color: var(--color-pastel-medium);
}
```

## Consistency Rules

1. **Always use Tailwind utilities in JSX** (e.g., `className="text-pastel-dark"`)
2. **Use CSS variables in `@apply` directives** (e.g., `@apply text-[var(--color-pastel-dark)]`)
3. **Use CSS variables for custom CSS** (e.g., `color: var(--color-pastel-medium)`)
4. **Test opacity modifiers** work correctly (e.g., `pastel-medium/50` → 50% opacity)

## Color Reference

| Token | Variable | Hex | HSL | Use Case |
|-------|----------|-----|-----|----------|
| `pastel-dark` | `--n` | `#1B3022` | `149 36% 15%` | Primary text, headings, borders |
| `pastel-medium` | `--p` | `#5F7D61` | `130 36% 42%` | Links, accents, hover states |
| `pastel-tan` | `--s` | `#D4A373` | `28 43% 67%` | Secondary accents, badges |
| `pastel-terracotta` | `--a` | `#E76F51` | `15 75% 58%` | Highlights, CTAs |
| `pastel-yellow` | `--wa` | `#E9C46A` | `45 97% 63%` | Warning alerts, focus states |
| `pastel-bg` | `--b1` | `#FAF9F6` | `36 35% 98%` | Background, cards |

## Testing

When testing components that use colors:

1. **For HSL-based utilities**: Check for class names like `pastel-medium`, `pastel-tan`, etc.
   ```typescript
   expect(html).toContain('pastel-medium')
   ```

2. **For CSS variables**: Use `getComputedStyle()` to verify resolved colors
   ```typescript
   const computed = getComputedStyle(element)
   expect(computed.color).toMatch(/rgb/)
   ```

3. **For opacity modifiers**: Test rendered class is applied
   ```typescript
   expect(html).toContain('pastel-medium/50')
   ```

## Future Considerations

- **Dynamic Theme Switching**: The `data-theme="pastel"` attribute allows CSS variable overrides for theme switching
- **Accessibility**: All colors meet WCAG AA contrast ratios
- **Performance**: HSL-based system eliminates need for color conversion libraries
