# Script Manager — Frontend Quick Start

This project is a Next.js app. These steps show how to run the frontend locally. No database or backend setup is required.

## Requirements
- Node.js 20+ (LTS recommended)
- pnpm (recommended)

Install pnpm (one-liners):
- macOS: `brew install pnpm`
- Windows (PowerShell): `npm install -g pnpm`
- Linux: `npm install -g pnpm`

## One-liners
Run everything (clone → env → install → start) in a single command.

macOS/Linux (bash/zsh) using pnpm:
```
sh -c "git clone <repo-url> && cd script-manager && cp .env.example .env && printf '\nSKIP_ENV_VALIDATION=1\n' >> .env && pnpm install && pnpm dev"
```

Windows (PowerShell) using pnpm:
```
powershell -NoProfile -Command "git clone <repo-url>; Set-Location script-manager; Copy-Item .env.example .env -Force; Add-Content .env 'SKIP_ENV_VALIDATION=1'; pnpm install; pnpm dev"
```

Prefer npm or yarn?
- macOS/Linux with npm:
```
sh -c "git clone <repo-url> && cd script-manager && cp .env.example .env && printf '\nSKIP_ENV_VALIDATION=1\n' >> .env && npm install && npm run dev"
```
- macOS/Linux with yarn:
```
sh -c "git clone <repo-url> && cd script-manager && cp .env.example .env && printf '\nSKIP_ENV_VALIDATION=1\n' >> .env && yarn && yarn dev"
```

## 1) Get the code
```
# using git
git clone <repo-url>
cd script-manager
```

## 2) Install dependencies
```
pnpm install
```
(You can use `npm install` or `yarn` if you prefer, but this repo uses pnpm.)

## 3) Create an env file (frontend-only)
This app validates environment variables at startup. Since we’re only running the frontend, we’ll skip validation.

```
# copy example env and add a skip flag
cp .env.example .env
# open .env and ensure this line exists
SKIP_ENV_VALIDATION=1
```

Note: If you prefer not to skip, you can also satisfy validation by setting a placeholder URL:
```
DATABASE_URL=https://example.com
```

## 4) Start the dev server
```
pnpm dev
```
Then open http://localhost:3000 in your browser.

## Scripts
- `pnpm dev` — start the development server
- `pnpm build` — build the app for production
- `pnpm start` — run the built app locally

## Troubleshooting
- Env validation error: add `SKIP_ENV_VALIDATION=1` to your `.env` (see step 3).
- pnpm not found: install pnpm with `brew install pnpm` (macOS) or `npm install -g pnpm`.
- Port in use: stop the other app using port 3000, or run `PORT=3001 pnpm dev` and open http://localhost:3001.
