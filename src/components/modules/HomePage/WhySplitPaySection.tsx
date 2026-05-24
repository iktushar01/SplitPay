import { CheckCircle2, MinusCircle } from "lucide-react";

const comparisons = [
  ["Manual calculation", "Auto split"],
  ["Who paid what confusion", "Clear balances"],
  ["Awkward asking money", "One click settle"],
];

const WhySplitPaySection = () => {
  return (
    <section className="bg-white py-20 dark:bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            Why SplitPay
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Replace the old way with clear settlements.
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border bg-background shadow-sm">
          <div className="grid grid-cols-2 border-b bg-muted/50 text-sm font-semibold">
            <div className="px-5 py-4">Old way</div>
            <div className="border-l px-5 py-4">SplitPay</div>
          </div>

          {comparisons.map(([oldWay, splitPay]) => (
            <div key={oldWay} className="grid grid-cols-2 border-b last:border-b-0">
              <div className="flex items-center gap-3 px-5 py-5 text-muted-foreground">
                <MinusCircle className="size-5 text-rose-500" />
                <span>{oldWay}</span>
              </div>
              <div className="flex items-center gap-3 border-l px-5 py-5 font-medium">
                <CheckCircle2 className="size-5 text-emerald-600" />
                <span>{splitPay}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySplitPaySection;
