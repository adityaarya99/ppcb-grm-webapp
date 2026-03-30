<!-- BEGIN:nextjs-agent-rules -->
# PPCB GRM Webapp - AI Agent Guidelines

> **Important:** This project uses Next.js 16+ with App Router. APIs, conventions, and file structure may differ from older versions. Always check `node_modules/next/dist/docs/` for breaking changes and deprecation notices.

---

## 1. Project Overview

This is a scalable **Next.js (App Router)** project for the Punjab Pollution Control Board Grievance Redressal Mechanism (PPCB GRM). Built with **JavaScript** and **Tailwind CSS**, following modern React patterns and best practices.

---

## 2. Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16+ | React framework with App Router |
| JavaScript (ES6+) | Programming language |
| Tailwind CSS 4 | Utility-first styling |
| ESLint | Code linting |
| Prettier | Code formatting |

---

## 3. Folder Structure Rules

```
├── app/                    # Next.js App Router pages & layouts
│   ├── api/               # API routes (route.js files)
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # Shared components
│   ├── ui/                # Reusable UI primitives (Button, Input, Card, Modal)
│   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   └── index.js           # Central exports
├── features/              # Feature-based modules
│   └── [feature]/         # Each feature contains:
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Feature-specific hooks
│       ├── services/      # Feature-specific API calls
│       ├── utils/         # Feature-specific utilities
│       └── index.js       # Public API exports
├── hooks/                 # Global reusable hooks
├── lib/                   # Utilities, constants, helpers
├── services/              # Global API client & services
├── styles/                # Additional stylesheets
├── public/                # Static assets
└── types/                 # Type definitions (if needed)
```

### Folder Purposes

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js App Router - pages, layouts, API routes |
| `components/ui/` | Reusable UI primitives (Button, Input, Card, etc.) |
| `components/layout/` | Layout components (Header, Footer, Sidebar) |
| `features/` | Feature modules with self-contained logic |
| `hooks/` | Global reusable React hooks |
| `lib/` | Utilities, constants, helper functions |
| `services/` | API client, external service integrations |
| `styles/` | CSS files, Tailwind customizations |
| `public/` | Static assets (images, fonts, icons) |

---

## 4. Coding Standards

### General Rules

- ✅ Use **functional components** only (no class components)
- ✅ Use **ES6+ syntax** (arrow functions, destructuring, spread operator)
- ✅ Write **clean, readable, maintainable** code
- ✅ Follow **separation of concerns** (UI, logic, data)
- ✅ Use **meaningful variable and function names**
- ✅ Add **JSDoc comments** for functions and components
- ✅ Keep functions **small and focused** (single responsibility)

### Naming Conventions

- Components: `PascalCase` (e.g., `GrievanceForm.js`)
- Hooks: `camelCase` with `use` prefix (e.g., `useGrievances.js`)
- Utilities: `camelCase` (e.g., `formatDate.js`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `API_BASE_URL`)
- Files: Match the default export name

### Imports Order

1. React/Next.js imports
2. Third-party libraries
3. Local components
4. Local hooks/utils
5. Styles

---

## 5. Styling Guidelines (Tailwind CSS)

### Rules

- ✅ Use **utility-first** approach with Tailwind classes
- ✅ **Avoid inline styles** unless absolutely necessary
- ✅ Reuse patterns via **component abstraction**
- ✅ Use CSS variables for theming (defined in `styles/tailwind.css`)
- ✅ Group related utilities logically in className

### Best Practices

```jsx
// ✅ Good - Clean, grouped utilities
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
  Submit
</button>

// ❌ Bad - Inline styles
<button style={{ padding: '8px 16px', backgroundColor: '#036b6b' }}>
  Submit
</button>
```

### Color Variables

- `--color-primary`: Main brand color
- `--color-accent`: Accent/highlight color
- `--color-success`, `--color-danger`, `--color-warning`: Semantic colors

---

## 6. Component Rules

### UI Components (`components/ui/`)

- Keep **small and focused** (single purpose)
- Accept **props for customization** (variants, sizes)
- Use **sensible defaults**
- Export from `components/ui/index.js`

### Feature Components (`features/[feature]/components/`)

- Feature-specific components stay within the feature folder
- Only expose through feature's `index.js` if needed externally

### Component Structure

```jsx
/**
 * ComponentName
 * Brief description of what the component does
 */

import { useState } from 'react';

export default function ComponentName({ prop1, prop2 = 'default' }) {
  // State/hooks
  const [state, setState] = useState(null);
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

---

## 7. Routing Guidelines

### App Router Conventions

| File | Purpose |
|------|---------|
| `page.js` | Page component (route segment) |
| `layout.js` | Shared layout for segment and children |
| `loading.js` | Loading UI (Suspense boundary) |
| `error.js` | Error UI (Error boundary) |
| `not-found.js` | 404 UI |
| `route.js` | API endpoint |

### Rules

- ✅ Use `app/` directory for all routes
- ✅ Create nested folders for nested routes
- ✅ Use `(group)` folders for route groups without URL impact
- ✅ Use `[param]` for dynamic routes
- ✅ Use `[...slug]` for catch-all routes

---

## 8. API Handling

### API Routes (`app/api/`)

- Use `route.js` files with HTTP method exports (GET, POST, PUT, DELETE)
- Return `NextResponse.json()` for JSON responses
- Always include proper error handling

### API Route Structure

```javascript
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Logic here
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### Service Layer (`services/`)

- Keep API calls in service files
- Use `apiClient` from `services/api.js` for HTTP requests
- Feature-specific APIs go in `features/[feature]/services/`

---

## 9. State Management

### Rules

- ✅ **Prefer React hooks** (`useState`, `useReducer`, `useContext`)
- ✅ Use **custom hooks** to encapsulate stateful logic
- ✅ Keep state **as local as possible**
- ✅ Lift state only when necessary
- ❌ **Avoid unnecessary global state**
- ❌ Don't use external state libraries unless absolutely required

### Patterns

- Form state: Custom hooks (e.g., `useGrievanceForm`)
- Server state: Custom fetch hooks (e.g., `useGrievances`)
- UI state: Local component state

---

## 10. Environment Variables

### Usage

- Store in `.env.local` (not committed to git)
- Access via `process.env.VARIABLE_NAME`

### Naming Rules

| Prefix | Availability |
|--------|--------------|
| `NEXT_PUBLIC_` | Client + Server (exposed to browser) |
| No prefix | Server only (secure) |

### Example

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...  # Server only
API_SECRET_KEY=xxx             # Server only
```

---

## 11. Linting & Formatting

### Tools

- **ESLint**: Code quality and error detection
- **Prettier**: Code formatting (if configured)

### Rules

- ✅ Run `npm run lint` before committing
- ✅ Fix all ESLint errors and warnings
- ✅ Follow consistent formatting throughout

---

## 12. AI Agent Instructions

When generating code for this project:

### DO

- ✅ Follow the folder structure exactly
- ✅ Use Tailwind CSS for styling
- ✅ Use functional components with hooks
- ✅ Add proper error handling
- ✅ Write clean, production-ready code
- ✅ Export from index.js files for clean imports
- ✅ Use path aliases (`@/components`, `@/lib`, etc.)

### DON'T

- ❌ Add unnecessary dependencies
- ❌ Use class components
- ❌ Use inline styles
- ❌ Create files outside the defined structure
- ❌ Skip error handling
- ❌ Use deprecated Next.js APIs

### When Creating New Features

1. Create feature folder in `features/`
2. Add `components/`, `hooks/`, `services/`, `utils/` subfolders as needed
3. Create `index.js` to expose public API
4. Keep feature self-contained

---

## 13. Output Expectations

When scaffolding or generating code:

1. **Include folder structure** showing where files go
2. **Provide complete, working code** (no placeholders)
3. **Follow all conventions** listed above
4. **Use existing components** from `components/ui/` when available
5. **Match existing patterns** in the codebase

### Example Response Format

```
📁 features/newFeature/
├── components/
│   ├── NewComponent.js
│   └── index.js
├── hooks/
│   └── useNewFeature.js
├── services/
│   └── newFeatureService.js
└── index.js

[Code for each file...]
```

---

## Quick Reference

| Task | Location |
|------|----------|
| New page | `app/[route]/page.js` |
| New API route | `app/api/[route]/route.js` |
| New UI component | `components/ui/` |
| New feature | `features/[name]/` |
| New global hook | `hooks/` |
| New utility | `lib/utils.js` |
| New constant | `lib/constants.js` |
| New service | `services/` |

<!-- END:nextjs-agent-rules -->
