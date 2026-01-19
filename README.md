# EchoVault Website (Public)

Public-facing marketing site for EchoVault.

## Local dev

```bash
npm install
npm run dev
```

Dev server runs on `http://localhost:3333`.

## Build

```bash
npm run build
```

Static export output is written to `./out/`.

## Env

Copy `./.env.local.example` to `./.env.local` and fill values as needed.

- `NEXT_PUBLIC_SITE_URL` (recommended): canonical base URL for SEO tags (e.g. `https://www.echovault-ai.com`)
- `NEXT_PUBLIC_HEIRLOOM_CAL_URL` (optional): shows a booking link on `/pricing`
