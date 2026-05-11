import { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export function CurrencyConverter() {
  const [rate, setRate] = useState<number | null>(null); // 1 JPY = ? KYD
  const [updated, setUpdated] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [amount, setAmount] = useState<string>("1000");
  const [direction, setDirection] = useState<"JPY_TO_KYD" | "KYD_TO_JPY">("JPY_TO_KYD");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/JPY");
        const data = await res.json();
        if (cancelled) return;
        const r = data?.rates?.KYD;
        if (typeof r !== "number") throw new Error("Rate unavailable");
        setRate(r);
        setUpdated(data?.time_last_update_utc ?? "");
      } catch {
        if (!cancelled) setError("Couldn't load live rate. Try again later.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const num = parseFloat(amount) || 0;
  let converted = "—";
  if (rate) {
    const value = direction === "JPY_TO_KYD" ? num * rate : num / rate;
    converted = value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  const from = direction === "JPY_TO_KYD" ? "JPY" : "KYD";
  const to = direction === "JPY_TO_KYD" ? "KYD" : "JPY";

  return (
    <div className="border-t-2 border-ink bg-muted p-6 md:p-8">
      <div className="grid items-end gap-6 md:grid-cols-[1fr_auto_1fr_auto]">
        <label className="block">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {from}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 w-full border-b-2 border-ink bg-transparent pb-2 font-display text-3xl font-black tracking-tight outline-none focus:border-sakura-deep"
          />
        </label>

        <button
          type="button"
          onClick={() =>
            setDirection((d) => (d === "JPY_TO_KYD" ? "KYD_TO_JPY" : "JPY_TO_KYD"))
          }
          aria-label="Swap currencies"
          className="grid h-12 w-12 place-items-center self-center justify-self-center rounded-full border border-ink transition hover:bg-ink hover:text-background"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <div>
          <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {to}
          </span>
          <p className="mt-2 border-b-2 border-border pb-2 font-display text-3xl font-black tracking-tight text-sakura-deep">
            {converted}
          </p>
        </div>

        <div className="text-xs text-muted-foreground md:text-right">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : rate ? (
            <>
              <p>1 JPY = {rate.toFixed(5)} KYD</p>
              {updated && <p className="mt-1">Updated {updated}</p>}
            </>
          ) : (
            <p>Loading live rate…</p>
          )}
        </div>
      </div>
    </div>
  );
}
