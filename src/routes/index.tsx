import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import sakuraHero from "@/assets/sakura-hero.jpg";
import { Petals } from "@/components/Petals";
import { Chatroom } from "@/components/Chatroom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plane,
  MapPin,
  ShoppingBag,
  CalendarClock,
  FileText,
  Sparkles,
  Cherry,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sakura Days — Our 2-Week Japan Trip" },
      {
        name: "description",
        content:
          "A 2-week cherry blossom Japan itinerary: Tokyo, Kyoto, Osaka. Checklist, shopping guide, booking timeline, maps, TikToks and a live ideas chatroom.",
      },
      { property: "og:title", content: "Sakura Days — Our 2-Week Japan Trip" },
      {
        property: "og:description",
        content: "Plan our cherry blossom adventure together 🌸",
      },
    ],
  }),
  component: Index,
});

// EDITABLE: paste your live Google Doc here
const GOOGLE_DOC_URL = "https://docs.google.com/document/d/REPLACE_WITH_YOUR_DOC_ID/edit";

const itinerary = [
  { days: "Day 1–5", city: "Tokyo", emoji: "🗼", notes: "Shibuya, Shinjuku, Asakusa, teamLab, Meguro River blossoms at night." },
  { days: "Day 6", city: "Hakone day trip", emoji: "♨️", notes: "Onsen + Mt. Fuji views (optional add-on)." },
  { days: "Day 7–11", city: "Kyoto", emoji: "⛩️", notes: "Fushimi Inari at dawn, Arashiyama, Philosopher's Path, Gion." },
  { days: "Day 12–13", city: "Osaka", emoji: "🍜", notes: "Dotonbori street food, Osaka Castle gardens, day trip to Nara." },
  { days: "Day 14", city: "Tokyo → Home", emoji: "✈️", notes: "Last-minute shopping in Ginza, fly out from Haneda." },
];

const mustSee = [
  { name: "Meguro River (Tokyo)", why: "Pink tunnel of sakura at night with lanterns" },
  { name: "Shinjuku Gyoen (Tokyo)", why: "1,000+ cherry trees, late-blooming varieties" },
  { name: "Philosopher's Path (Kyoto)", why: "2km canal lined with sakura" },
  { name: "Maruyama Park (Kyoto)", why: "Iconic weeping cherry, hanami picnics" },
  { name: "Osaka Castle Park", why: "300+ cherry trees + castle backdrop" },
  { name: "Mt. Yoshino (Nara)", why: "30,000 trees blooming up the mountainside" },
];

const initialChecklist = [
  "Passport (valid 6+ months)",
  "Visa check (most don't need one)",
  "JR Pass voucher (decide before booking)",
  "Pocket WiFi or eSIM (Ubigi / Airalo)",
  "Suica / Pasmo IC card (or Apple Wallet)",
  "Universal power adapter (Type A)",
  "Comfy walking shoes (15k+ steps/day)",
  "Light layers + a warm jacket (April nights are chilly)",
  "Compact umbrella",
  "Reusable tote (Japan = minimal plastic bags)",
  "Cash (¥30k starter — many places still cash-only)",
  "Credit card with no FX fee",
  "Allergy translation card (if needed)",
  "Picnic blanket for hanami 🌸",
];

const shopping = [
  { cat: "Skincare & Beauty", picks: ["Hada Labo Gokujyun", "Shiseido Senka", "Canmake", "DHC cleansing oil"] },
  { cat: "Snacks to bring home", picks: ["Tokyo Banana", "KitKats (matcha, sake, hojicha)", "Royce' chocolate", "Calbee Jagariko"] },
  { cat: "Stationery", picks: ["Itoya Ginza", "Tokyu Hands", "Loft", "Pilot & Uni-ball pens"] },
  { cat: "Fashion / Streetwear", picks: ["Uniqlo & GU flagships", "BEAMS", "Harajuku vintage (Ragtag)", "Don Quijote (everything)"] },
  { cat: "Souvenirs", picks: ["Furoshiki cloth", "Yunomi tea cups", "Daruma doll", "Handmade chopsticks (Kyoto)"] },
];

const timeline = [
  { when: "6 months out", task: "Book international flights (cherry season fares spike fast)", icon: Plane },
  { when: "5 months out", task: "Reserve hotels in Kyoto — they sell out first", icon: CalendarClock },
  { when: "4 months out", task: "Book teamLab Planets, Ghibli Museum, Robot Cabaret", icon: Sparkles },
  { when: "3 months out", task: "Reserve Shinkansen seats once JR opens (30 days prior in Japan; agent booking earlier)", icon: Plane },
  { when: "2 months out", task: "Buy travel insurance + JR Pass voucher if using one", icon: FileText },
  { when: "1 month out", task: "Order pocket WiFi / activate eSIM, exchange a bit of yen", icon: ShoppingBag },
  { when: "1 week out", task: "Download Google Maps offline, Google Translate JP pack, check sakura forecast 🌸", icon: MapPin },
];

// EDITABLE: replace IDs with your favorite Japan TikToks
const tiktoks = [
  "7339876543210987654",
  "7351234567890123456",
  "7362345678901234567",
];

function Index() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (item: string) => setChecked((c) => ({ ...c, [item]: !c[item] }));

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-ink">
      <Petals />

      {/* HERO */}
      <header className="relative z-10">
        <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
          <img
            src={sakuraHero}
            alt="Cherry blossoms in front of a Kyoto pagoda"
            width={1920}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="font-hand text-3xl text-sakura-deep md:text-4xl">our trip of a lifetime</p>
            <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-ink md:text-7xl lg:text-8xl">
              Sakura Days
            </h1>
            <p className="mt-4 max-w-xl font-display text-lg text-ink/80 md:text-xl">
              2 weeks chasing cherry blossoms across Tokyo, Kyoto &amp; Osaka 🌸
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-sakura-deep text-white hover:bg-sakura-deep/90">
                <a href="#chatroom"><Cherry className="mr-2 h-4 w-4" /> Drop an idea</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-sakura-deep/40 bg-white/80">
                <a href={GOOGLE_DOC_URL} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" /> Open the planning doc
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        {/* ITINERARY */}
        <Section title="The 2-Week Itinerary" kicker="day by day">
          <div className="grid gap-4 md:grid-cols-2">
            {itinerary.map((it) => (
              <div key={it.days} className="rounded-3xl border border-sakura/30 bg-white/80 p-6 shadow-[var(--shadow-petal)] backdrop-blur transition hover:-translate-y-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-3xl">{it.emoji}</span>
                  <div>
                    <p className="font-hand text-xl text-sakura-deep">{it.days}</p>
                    <h3 className="font-display text-2xl font-bold">{it.city}</h3>
                  </div>
                </div>
                <p className="text-sm text-ink/80">{it.notes}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* MUST SEE */}
        <Section title="Must-See Cherry Blossom Spots" kicker="the bucket list">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mustSee.map((s) => (
              <div key={s.name} className="rounded-2xl bg-gradient-to-br from-sakura/20 to-white p-5">
                <h4 className="font-display font-bold text-ink">🌸 {s.name}</h4>
                <p className="mt-1 text-sm text-ink/70">{s.why}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* MAP */}
        <Section title="Where We're Going" kicker="on the map">
          <div className="overflow-hidden rounded-3xl border-2 border-sakura/30 shadow-[var(--shadow-petal)]">
            <iframe
              title="Japan trip map"
              src="https://www.google.com/maps/d/embed?mid=1xQ8m4QY4kqz5Tokyo-Kyoto-Osaka&hl=en"
              className="h-[450px] w-full"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Tip: replace the iframe <code>src</code> in <code>src/routes/index.tsx</code> with your own My Maps URL.
          </p>
        </Section>

        {/* CHECKLIST */}
        <Section title="Packing & Prep Checklist" kicker="don't forget">
          <div className="rounded-3xl border border-sakura/30 bg-white/80 p-6 shadow-[var(--shadow-petal)] backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              {initialChecklist.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-sakura/10"
                >
                  <Checkbox
                    checked={!!checked[item]}
                    onCheckedChange={() => toggle(item)}
                  />
                  <span className={checked[item] ? "text-muted-foreground line-through" : ""}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Section>

        {/* TIMELINE */}
        <Section title="When to Book What" kicker="planning timeline">
          <ol className="relative space-y-4 border-l-2 border-dashed border-sakura-deep/40 pl-6">
            {timeline.map(({ when, task, icon: Icon }) => (
              <li key={when} className="relative">
                <span className="absolute -left-[34px] flex h-8 w-8 items-center justify-center rounded-full bg-sakura-deep text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="font-hand text-lg text-sakura-deep">{when}</p>
                  <p className="text-ink">{task}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* SHOPPING */}
        <Section title="Shopping Guide" kicker="what to bring back">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shopping.map((s) => (
              <div key={s.cat} className="rounded-3xl border border-sakura/30 bg-white/80 p-5 backdrop-blur">
                <div className="mb-3 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-sakura-deep" />
                  <h4 className="font-display text-lg font-bold">{s.cat}</h4>
                </div>
                <ul className="space-y-1 text-sm text-ink/80">
                  {s.picks.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* TIKTOKS */}
        <Section title="Inspo from TikTok" kicker="watch & save">
          <div className="grid gap-6 md:grid-cols-3">
            {tiktoks.map((id) => (
              <div key={id} className="overflow-hidden rounded-3xl bg-white/80 p-2 shadow-[var(--shadow-petal)]">
                <iframe
                  title={`tiktok-${id}`}
                  src={`https://www.tiktok.com/embed/v2/${id}`}
                  allow="encrypted-media"
                  className="h-[560px] w-full rounded-2xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Tip: swap the <code>tiktoks</code> array in <code>src/routes/index.tsx</code> with your favorite video IDs.
          </p>
        </Section>

        {/* GOOGLE DOC */}
        <Section title="Live Planning Doc" kicker="edit together">
          <a
            href={GOOGLE_DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-3xl border-2 border-dashed border-sakura-deep/50 bg-white/80 p-8 text-center transition hover:bg-sakura/10"
          >
            <FileText className="mx-auto mb-3 h-10 w-10 text-sakura-deep" />
            <p className="font-display text-2xl font-bold">Open the shared Google Doc</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Update reservations, notes & links — everyone can edit
            </p>
          </a>
        </Section>

        {/* CHATROOM */}
        <Section id="chatroom" title="Drop Your Ideas" kicker="trip chatroom">
          <p className="mb-4 text-center text-ink/70">
            Anyone can post — no login. Ideas, restaurants, hidden gems, pleas to add Hokkaido… all welcome 🌸
          </p>
          <Chatroom />
        </Section>
      </main>

      <footer className="relative z-10 border-t border-sakura/30 bg-white/60 py-8 text-center text-sm text-ink/60 backdrop-blur">
        Made with 🌸 for our Japan trip
      </footer>
    </div>
  );
}

function Section({
  id,
  title,
  kicker,
  children,
}: {
  id?: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-20">
      <div className="mb-8 text-center">
        <p className="font-hand text-2xl text-sakura-deep">{kicker}</p>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
