# ಹವಿ ರುಚಿ ಕಿಚನ್ | Havi Ruchi Kitchen

> Traditional Havyaka home-cooked food delivery — Sirsi, Karnataka.

🌐 **Live:** [havi-ruchi-sirsi.vercel.app](https://havi-ruchi-sirsi.vercel.app/)

---

## Quick Start

```bash
cd haviruchi-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, today's menu (auto-detects day), how it works, catering banner |
| `/menu` | Full weekly menu — day selector + meal tabs + add to cart |
| `/order` | Order form — generates WhatsApp deep link with pre-filled order |
| `/admin` | Dashboard — orders, regular customers, stats (password: `haviruchi2024`) |
| `/catering` | Catering enquiry form — WhatsApp deep link |

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Language | TypeScript |
| Hosting | Vercel |

---

## Deploy

```bash
npm run build
```

Or push to GitHub and connect to [Vercel](https://vercel.com) — zero config needed.

---

## Notes

- **WhatsApp ordering works** — opens `wa.me/919980864037` with a pre-filled order message.
- **Menu data** is hardcoded in `src/lib/menu-data.ts` — rotate weekly as needed.
- **Admin password** is hardcoded for prototype use — replace with Supabase Auth before going to production.
