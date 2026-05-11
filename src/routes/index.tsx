import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import sakuraHero from "@/assets/sakura-hero.jpg";
import stopTokyo from "@/assets/stop-tokyo.jpg";
import stopHakone from "@/assets/stop-hakone.jpg";
import stopKyoto from "@/assets/stop-kyoto.jpg";
import stopOsaka from "@/assets/stop-osaka.jpg";
import { Chatroom } from "@/components/Chatroom";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Search, ShoppingCart, Send } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sakura Days — Our 2-Week Japan Trip" },
      {
        name: "description",
        content:
          "A 2-week cherry blossom Japan itinerary: Tokyo, Kyoto, Osaka. Checklist, shopping guide, booking timeline, maps and a live ideas board.",
      },
      { property: "og:title", content: "Sakura Days — Our 2-Week Japan Trip" },
      { property: "og:image", content: sakuraHero },
    ],
  }),
  component: Index,
});

const GOOGLE_DOC_URL = "https://docs.google.com/document/d/REPLACE_WITH_YOUR_DOC_ID/edit";

const stops = [
  { num: "01", days: "Day 1–5", city: "Tokyo", img: stopTokyo, blurb: "Shibuya, Shinjuku, Asakusa, teamLab, Meguro River blossoms at night." },
  { num: "02", days: "Day 6", city: "Hakone", img: stopHakone, blurb: "Onsen + Mt. Fuji views. Easy day trip from Tokyo by Romancecar." },
  { num: "03", days: "Day 7–11", city: "Kyoto", img: stopKyoto, blurb: "Fushimi Inari at dawn, Arashiyama bamboo, Philosopher's Path, Gion." },
  { num: "04", days: "Day 12–13", city: "Osaka", img: stopOsaka, blurb: "Dotonbori street food, Osaka Castle gardens, day trip to Nara." },
];

const mustSee = [
  { name: "Meguro River", city: "Tokyo", why: "Pink tunnel of sakura at night with lanterns" },
  { name: "Shinjuku Gyoen", city: "Tokyo", why: "1,000+ cherry trees, late-blooming varieties" },
  { name: "Philosopher's Path", city: "Kyoto", why: "2km canal lined with sakura" },
  { name: "Maruyama Park", city: "Kyoto", why: "Iconic weeping cherry, hanami picnics" },
  { name: "Osaka Castle Park", city: "Osaka", why: "300+ cherry trees, castle backdrop" },
  { name: "Mt. Yoshino", city: "Nara", why: "30,000 trees blooming up the mountainside" },
];

const initialChecklist = [
  "Passport (valid 6+ months)",
  "Visa check (most don't need one)",
  "JR Pass voucher",
  "Pocket WiFi or eSIM",
  "Suica / Pasmo IC card",
  "Universal power adapter (Type A)",
  "Comfy walking shoes",
  "Light layers + warm jacket",
  "Compact umbrella",
  "Reusable tote",
  "¥30k cash starter",
  "Credit card with no FX fee",
  "Allergy translation card",
  "Picnic blanket for hanami",
];

const shopping = [
  { cat: "Skincare & Beauty", picks: ["Hada Labo Gokujyun", "Shiseido Senka", "Canmake", "DHC cleansing oil"] },
  { cat: "Snacks", picks: ["Tokyo Banana", "KitKats (matcha, sake, hojicha)", "Royce' chocolate", "Calbee Jagariko"] },
  { cat: "Stationery", picks: ["Itoya Ginza", "Tokyu Hands", "Loft", "Pilot & Uni-ball pens"] },
  { cat: "Fashion", picks: ["Uniqlo & GU flagships", "BEAMS", "Harajuku vintage (Ragtag)", "Don Quijote"] },
  { cat: "Souvenirs", picks: ["Furoshiki cloth", "Yunomi tea cups", "Daruma doll", "Handmade chopsticks"] },
];

const timeline = [
  { when: "6 months out", task: "Book international flights — sakura fares spike fast" },
  { when: "5 months out", task: "Reserve hotels in Kyoto first; they sell out earliest" },
  { when: "4 months out", task: "Book teamLab Planets, Ghibli Museum, Robot Cabaret" },
  { when: "3 months out", task: "Reserve Shinkansen seats once JR opens (30 days prior)" },
  { when: "2 months out", task: "Buy travel insurance + JR Pass voucher if using one" },
  { when: "1 month out", task: "Order pocket WiFi / activate eSIM, exchange a bit of yen" },
  { when: "1 week out", task: "Download Maps offline, Translate JP pack, check sakura forecast" },
];

const tiktoks = [
  "7339876543210987654",
  "7351234567890123456",
  "7362345678901234567",
];

function Index() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (item: string) =>
    setChecked((c) => ({ ...c, [item]: !c[item] }));

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      {/* TOP NAV */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-sakura-deep text-xs font-black text-white">桜</span>
            <span className="font-display text-lg font-black tracking-tight">SAKURA DAYS</span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {["Itinerary", "Spots", "Map", "Plan", "Shop", "Ideas"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-display text-sm font-bold uppercase tracking-wide hover:text-sakura-deep"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-ink/70" />
            <ShoppingCart className="hidden h-5 w-5 text-ink/70 md:block" />
            <a
              href={GOOGLE_DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-background hover:bg-ink/85"
            >
              Open Doc
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
          <img
            src={sakuraHero}
            alt="Cherry blossoms at night with pagoda silhouette"
            width={1920}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 text-white">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em]">Spring 2026</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              We know
              <br />
              where to go
            </h1>
            <div className="mt-8 max-w-xl bg-sakura p-6 text-ink shadow-xl">
              <p className="font-sans text-base leading-relaxed">
                Two weeks chasing cherry blossoms across Tokyo, Hakone, Kyoto and Osaka. The full plan — from must-see hanami spots to when to book your Shinkansen seat.
              </p>
              <a
                href="#itinerary"
                className="mt-5 inline-flex items-center gap-3 rounded-sm bg-ink px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-background hover:bg-ink/85"
              >
                See the itinerary <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 text-xs text-white/70">Photo · Sakura Days editorial</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6">
        {/* ITINERARY */}
        <Section id="itinerary" eyebrow="The Route" title="Four stops, two weeks" />
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {stops.map((s) => (
            <article key={s.num} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={s.img}
                  alt={s.city}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-background px-3 py-1 font-display text-xs font-black tracking-widest">
                  {s.num}
                </span>
              </div>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {s.days}
              </p>
              <h3 className="mt-1 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
                {s.city}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/80">{s.blurb}</p>
            </article>
          ))}
        </div>

        {/* MUST-SEE LIST */}
        <Section id="spots" eyebrow="Hanami Bucket List" title="Best cherry blossom spots" />
        <div className="grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0">
          {mustSee.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-baseline gap-6 py-6 ${i % 2 === 0 ? "md:border-r md:border-border md:pr-8" : "md:pl-8"}`}
            >
              <span className="font-display text-2xl font-black text-sakura-deep">
                0{i + 1}
              </span>
              <div className="flex-1">
                <h4 className="font-display text-xl font-bold uppercase tracking-tight">{s.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.city}</p>
                <p className="mt-2 text-sm text-ink/80">{s.why}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAP */}
        <Section id="map" eyebrow="On the Ground" title="Where we'll be" />
        <div className="overflow-hidden border border-border">
          <iframe
            title="Japan trip map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6614085.7!2d136.5!3d36.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000"
            className="h-[480px] w-full"
            loading="lazy"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Swap the iframe <code>src</code> in <code>src/routes/index.tsx</code> with your own Google My Maps URL.
        </p>

        {/* PLAN: timeline + checklist */}
        <Section id="plan" eyebrow="Get Ready" title="When to book what" />
        <div className="grid gap-12 lg:grid-cols-2">
          <ol className="space-y-0 border-t border-border">
            {timeline.map((t) => (
              <li key={t.when} className="flex items-start gap-6 border-b border-border py-5">
                <span className="w-32 shrink-0 font-display text-xs font-bold uppercase tracking-widest text-sakura-deep">
                  {t.when}
                </span>
                <p className="flex-1 text-sm leading-relaxed text-ink/85">{t.task}</p>
              </li>
            ))}
          </ol>

          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Packing checklist
            </h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {initialChecklist.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3 border-b border-border py-2 text-sm transition hover:text-sakura-deep"
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
        </div>

        {/* SHOPPING */}
        <Section id="shop" eyebrow="Bring it home" title="Shopping guide" />
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {shopping.map((s, i) => (
            <div key={s.cat} className="border-t-2 border-ink pt-4">
              <p className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                0{i + 1} / Category
              </p>
              <h4 className="mt-1 font-display text-2xl font-black uppercase tracking-tight">{s.cat}</h4>
              <ul className="mt-3 space-y-1 text-sm text-ink/85">
                {s.picks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-sakura-deep" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CURRENCY */}
        <Section id="currency" eyebrow="Money" title="Yen → KYD converter">
          <p className="-mt-4 mb-8 max-w-2xl text-base text-ink/75">
            Live rate from open.er-api.com. Tap the arrows to flip between Japanese Yen and Cayman Islands Dollar.
          </p>
        </Section>
        <CurrencyConverter />

        {/* TIKTOKS */}
        <Section eyebrow="Inspiration" title="Saved from TikTok" />
        <div className="grid gap-6 md:grid-cols-3">
          {tiktoks.map((id) => (
            <div key={id} className="overflow-hidden border border-border bg-muted">
              <iframe
                title={`tiktok-${id}`}
                src={`https://www.tiktok.com/embed/v2/${id}`}
                allow="encrypted-media"
                className="h-[560px] w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Replace IDs in the <code>tiktoks</code> array with your favorite videos.
        </p>

        {/* CHATROOM */}
        <Section id="ideas" eyebrow="Reader Ideas" title="Drop your tip">
          <p className="-mt-4 mb-8 max-w-2xl text-base text-ink/75">
            Anyone can post — no login. Restaurants, hidden gems, hotel reviews, pleas to add Hokkaido. All welcome.
          </p>
        </Section>
        <Chatroom />
      </main>

      {/* FOOTER */}
      <footer className="mt-32 border-t border-border bg-muted">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-sakura-deep text-xs font-black text-white">桜</span>
              <span className="font-display text-lg font-black tracking-tight">SAKURA DAYS</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Our shared planning hub for two weeks in Japan during cherry blossom season.
            </p>
          </div>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest">Plan</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li><a href="#itinerary" className="hover:text-sakura-deep">Itinerary</a></li>
              <li><a href="#spots" className="hover:text-sakura-deep">Hanami spots</a></li>
              <li><a href="#plan" className="hover:text-sakura-deep">Booking timeline</a></li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest">Collaborate</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li><a href={GOOGLE_DOC_URL} target="_blank" rel="noopener noreferrer" className="hover:text-sakura-deep">Shared Google Doc</a></li>
              <li><a href="#ideas" className="hover:text-sakura-deep">Ideas board</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sakura Days · Made for the trip
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-24 scroll-mt-24">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-sakura-deep">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
            {title}
          </h2>
        </div>
        <a
          href="#"
          className="hidden shrink-0 items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-ink md:flex"
        >
          View all <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      {children}
    </section>
  );
}
