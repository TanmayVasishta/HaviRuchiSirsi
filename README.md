# ಹವಿ ರುಚಿ ಕಿಚನ್ | Havi Ruchi Kitchen

Traditional Havyaka home-cooked food delivery — Sirsi, Karnataka.

## Quick Start

```bash
cd haviruchi-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, today's menu (auto-detects day), how it works, catering banner |
| `/menu` | Full weekly menu — day selector + meal tabs + add to cart |
| `/order` | Order form — generates WhatsApp deep link with pre-filled order |
| `/admin` | Dashboard — orders, regular customers, stats (password: `haviruchi2024`) |
| `/catering` | Catering enquiry form — WhatsApp deep link |

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS 4** + **shadcn/ui**
- **TypeScript**
- **Vercel** deployment ready

## Deploy

```bash
npm run build
# or push to GitHub and connect to Vercel
```

## Notes

- WhatsApp ordering actually works — it opens `wa.me/919980864037` with pre-filled messages
- Menu data is hardcoded in `src/lib/menu-data.ts` — rotate weekly
- Admin password is hardcoded for prototype — replace with Supabase auth for production
