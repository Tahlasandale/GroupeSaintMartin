# AGENTS.md

## Build/Lint/Test Commands
- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript type checking
- No test framework configured

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Use explicit types for function parameters and return values
- Prefer interfaces over types for object shapes
- Use `type` for unions and primitives

### Imports
- Type imports first, then regular imports
- Use path aliases: `@/*` for `./src/*`
- Group imports by external libraries, then internal modules

### Components
- PascalCase naming
- Use `React.forwardRef` with `displayName` for ref-forwarding components
- 'use client' directive for client components

### Styling
- Tailwind CSS with shadcn/ui design system
- Use `cn()` utility for conditional classes
- CSS variables for theming (dark mode support)
- Responsive design with mobile-first approach

### Naming Conventions
- camelCase: variables, functions, hooks
- PascalCase: components, types, interfaces
- kebab-case: CSS classes (via Tailwind)

### Error Handling
- Use try-catch for async operations
- Custom error classes extending Error
- JSDoc comments for complex error-related functions

### Formatting
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline objects/arrays