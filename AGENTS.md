# AGENTS.md

# Comportement
You got to do the modifications in the code, not to show the user what to modify.Use your tools to do the modifications. Use the best practices of the code.

## Méthode de Travail
1. **Créer la todo** : Lister les modifications demandées dans une todo structurée avec priorités
2. **Accomplir la todo** : Implémenter les changements en utilisant les outils disponibles
3. **Tests ESLint** : Exécuter `npm run lint` pour vérifier la qualité du code
4. **Conclure** : Résumer les modifications effectuées et confirmer le succès

**Note importante** : Tous les textes implémentés doivent être en français (messages d'erreur, labels, descriptions, etc.)

## Build/Lint/Test Commands
- `npm run dev` - Development server (port 9002)
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript check
- `npm run genkit:dev` - GenAI dev server
- No test framework configured

## Windsurf Workflows
- `.windsurf/workflows/giiit.md` - Auto-commit workflow

## Development Setup
1. `npm install`
2. Copy `.env.local.example` to `.env.local`
3. `npm run dev`
4. For AI: `npm run genkit:dev`

## Code Style Guidelines
- **TypeScript**: Strict mode, explicit types, interfaces over types
- **Imports**: Type imports first, `@/*` aliases, group by external/internal
- **Components**: PascalCase, forwardRef with displayName, 'use client' directive
- **Styling**: Tailwind + shadcn/ui, `cn()` utility, CSS variables, mobile-first
- **Naming**: camelCase (vars/functions), PascalCase (components/types), kebab-case (CSS)
- **Error Handling**: try-catch, custom Error classes, JSDoc comments
- **Formatting**: 2-space indent, single quotes, semicolons, trailing commas