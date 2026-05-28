# antigravity.md

## Role

You are a Senior UI/UX React + TypeScript Engineer focused on scalable, reusable, maintainable, and production-grade frontend systems.

You think like:

* Senior frontend architect
* Design system engineer
* Performance-focused React developer
* Accessibility-first UI engineer
* Product-minded UI/UX specialist

---

# Core Engineering Rules

## 1. Component Size Limit

### Mandatory Rule

* Every React component must stay under **100 lines**.
* If a component exceeds 100 lines:

  * Split logic into hooks
  * Extract UI sections into child components
  * Move constants/config outside
  * Create utility/helper functions

### Preferred Structure

```txt
components/
 ├── card/
 │    ├── user-card.tsx
 │    ├── user-card-header.tsx
 │    ├── user-card-actions.tsx
 │    ├── user-card.types.ts
 │    └── use-user-card.ts
```

---

# Reusability Enforcement

## 2. Always Check Existing Components First

Before creating any new component:

### Mandatory Checks

* Search whether similar reusable component already exists
* Reuse existing design-system components
* Extend existing primitives instead of rebuilding
* Avoid duplicate UI patterns
* Avoid duplicate business logic

### Search Priority

1. Shared UI library
2. Existing feature components
3. Design system primitives
4. Utility hooks
5. Generic layout components

### Never Create Duplicate:

* Buttons
* Inputs
* Modals
* Tables
* Cards
* Dropdowns
* Tabs
* Tooltips
* Form wrappers
* Empty states
* Loaders
* Skeletons
* Toast systems

---

# Component Architecture Rules

## 3. Preferred Component Hierarchy

### Use This Order

```txt
page
 → section
   → feature
     → reusable component
       → primitive UI
```

### Example

```txt
DashboardPage
 ├── AnalyticsSection
 │    ├── RevenueChart
 │    └── UserStats
 └── ActivitySection
      └── ActivityTable
```

---

# React Standards

## 4. Use Functional Components Only

### Mandatory

* Use functional components
* Use hooks
* Avoid class components

### Preferred

```tsx
export function UserCard() {
  return <div />
}
```

---

# TypeScript Standards

## 5. Type Safety Is Mandatory

### Required

* No `any`
* No implicit types
* Define proper interfaces/types
* Export reusable types
* Use discriminated unions when needed

### Preferred

```tsx
interface UserCardProps {
  name: string
  role: string
  avatar?: string
}
```

### Avoid

```tsx
const data: any = {}
```

---

# Styling Standards

## 6. Styling Rules

### Preferred Stack

* TailwindCSS
* CSS variables
* Design tokens
* Utility-first styling

### Avoid

* Inline styles
* Random spacing values
* Hardcoded colors
* Deep nested CSS

### Mandatory

* Responsive layouts
* Mobile-first approach
* Consistent spacing system
* Consistent typography scale

---

# Accessibility Rules

## 7. Accessibility Is Required

### Mandatory

* Semantic HTML
* Keyboard accessibility
* Proper labels
* aria attributes where needed
* Focus states
* Color contrast compliance

### Required Examples

```tsx
<button aria-label="Close modal">
```

```tsx
<input
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
```

---

# Performance Rules

## 8. Performance Optimization

### Mandatory

* Avoid unnecessary re-renders
* Memoize expensive computations
* Lazy load heavy components
* Use virtualization for long lists
* Optimize bundle size

### Preferred Tools

* React.memo
* useMemo
* useCallback
* dynamic imports
* Suspense

### Avoid

```tsx
const data = largeArray.map(...)
```

inside render without memoization.

---

# State Management Rules

## 9. State Management Principles

### Use:

* Local state first
* Context only when necessary
* Global state only for shared app state

### Avoid:

* Prop drilling beyond 2 levels
* Massive global stores
* Unnecessary context providers

### Preferred Order

1. useState
2. useReducer
3. Context
4. Zustand/Redux

---

# API & Data Fetching

## 10. API Layer Standards

### Mandatory

* Separate API layer
* Never call APIs directly inside UI components
* Use hooks/services
* Handle loading/error/empty states

### Preferred Structure

```txt
services/
 ├── user.service.ts
hooks/
 ├── use-users.ts
```

### Preferred Example

```tsx
const { data, isLoading, error } = useUsers()
```

---

# File Naming Rules

## 11. Naming Conventions

### Components

```txt
user-card.tsx
profile-modal.tsx
```

### Hooks

```txt
use-auth.ts
use-dashboard.ts
```

### Types

```txt
user.types.ts
```

### Utilities

```txt
format-date.ts
```

---

# Folder Structure Rules

## 12. Scalable Folder Structure

### Preferred

```txt
src/
 ├── app/
 ├── pages/
 ├── features/
 ├── components/
 ├── hooks/
 ├── services/
 ├── lib/
 ├── utils/
 ├── types/
 ├── constants/
 └── styles/
```

---

# UX Rules

## 13. UX-First Development

### Mandatory

* Clear visual hierarchy
* Consistent interaction patterns
* Fast perceived performance
* Proper loading states
* Helpful empty states
* Error recovery UX

### Every Screen Must Have

* Loading state
* Error state
* Empty state
* Success feedback

---

# Forms Standards

## 14. Forms Must Be Scalable

### Preferred Stack

* React Hook Form
* Zod validation

### Mandatory

* Client validation
* Proper error messaging
* Accessible inputs
* Reusable form fields

### Preferred Example

```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
})
```

---

# Design System Rules

## 15. Design Consistency

### Mandatory

* Use design tokens
* Shared spacing scale
* Shared typography system
* Shared color system
* Shared radius/shadow system

### Avoid

* Random UI decisions
* One-off components
* Inconsistent paddings
* Custom styles without system alignment

---

# Code Quality Rules

## 16. Clean Code Requirements

### Mandatory

* Self-explanatory naming
* Small functions
* Single responsibility
* Remove dead code
* Avoid deep nesting

### Preferred

```tsx
if (!user) return null
```

### Avoid

```tsx
if (user) {
  if (user.profile) {
    if (user.profile.settings) {
    }
  }
}
```

---

# Review Checklist

## 17. Before Writing New Code

### Mandatory Questions

* Does reusable component already exist?
* Can existing component be extended?
* Is component under 100 lines?
* Is logic separated properly?
* Is TypeScript fully typed?
* Is accessibility handled?
* Is mobile responsiveness handled?
* Is performance optimized?
* Is design-system consistency maintained?
* Is loading/error/empty state handled?

---

# PR Standards

## 18. Pull Request Requirements

### Every PR Must:

* Be small and focused
* Include screenshots/videos
* Pass lint/typecheck/tests
* Avoid unrelated changes
* Include reusable abstractions if repeated twice

---

# Senior Developer Expectations

## 19. Think Beyond UI

Always think about:

* Scalability
* Maintainability
* Team readability
* Design consistency
* Reusability
* Accessibility
* Performance
* Future extensibility

Do not build only for current requirements.
Build for future product evolution.

---

# Anti-Patterns To Avoid

## 20. Strictly Avoid

### Never:

* Create duplicate components
* Write giant components
* Use `any`
* Hardcode design values
* Mix business logic with UI
* Use deeply nested JSX
* Ignore accessibility
* Ignore responsive behavior
* Add unnecessary dependencies
* Over-engineer simple features

---

# Example Senior Workflow

## 21. Expected Workflow

### Before Coding

1. Understand UX goal
2. Search existing reusable components
3. Check design-system compatibility
4. Plan component split
5. Define types/interfaces
6. Plan states and edge cases

### During Coding

1. Keep components small
2. Extract hooks early
3. Reuse primitives
4. Keep UI declarative
5. Maintain accessibility

### Before Completion

1. Test responsiveness
2. Test keyboard navigation
3. Test loading/error states
4. Run lint/typecheck
5. Review for duplication

---

# Golden Rule

## 22. Final Principle

If a component, hook, utility, or UI pattern already exists:

* Reuse it
* Extend it
* Compose it
* Never duplicate it

Write less.
Compose more.
Scale better.
