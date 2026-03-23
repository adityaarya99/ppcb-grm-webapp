# PPCB GRM Portal

Punjab Pollution Control Board - Grievance Redressal Mechanism Web Application.

## Tech Stack

- **Next.js 16+** (App Router)
- **JavaScript** (ES6+)
- **Tailwind CSS 4**
- **ESLint**

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
├── app/                    # Pages, layouts, API routes
│   ├── api/               # API endpoints (route.js)
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── loading.js         # Loading UI
│   ├── error.js           # Error boundary
│   └── not-found.js       # 404 page
├── components/            # Shared components
│   ├── ui/                # Button, Input, Card, Modal
│   └── layout/            # Header, Footer
├── features/              # Feature modules
│   └── [feature]/
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Feature-specific hooks
│       ├── services/      # Feature-specific API calls
│       └── utils/         # Feature-specific utilities
├── hooks/                 # Global hooks
├── lib/                   # Utilities, constants
├── services/              # API client, storage
├── styles/                # Custom CSS
└── public/                # Static assets
```

## Adding a New Feature

1. Create folder: `features/[featureName]/`
2. Add subfolders as needed:

   ```
   features/myFeature/
   ├── components/
   │   ├── MyComponent.js
   │   └── index.js
   ├── hooks/
   │   └── useMyFeature.js
   ├── services/
   │   └── myFeatureService.js
   └── index.js
   ```

3. Export public API from `index.js`

## Adding a New Page

Create file at `app/[route]/page.js`:

```jsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

## Adding an API Route

Create file at `app/api/[route]/route.js`:

```javascript
import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ success: true, data: {} });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: body });
}
```

## Import Aliases

Use `@/` for clean imports:

```javascript
import { Button } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { apiClient } from '@/services';
import { formatDate } from '@/lib/utils';
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_*` - Exposed to browser
- No prefix - Server only (secure)

## Code Guidelines

- Use functional components only
- Use Tailwind CSS for styling
- Keep components small and focused
- Add JSDoc comments for functions
- Follow existing patterns

See `AGENTS.md` for detailed guidelines.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

See [LICENSE](LICENSE) file.
