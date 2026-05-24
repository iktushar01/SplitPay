import { Calculator, MessageCircleWarning, WalletCards } from "lucide-react";

const problems = [
  {
    icon: Calculator,
    title: "Friend trip e hisab bhule jaowa",
    text: "Small payments pile up and nobody remembers the full picture.",
  },
  {
    icon: WalletCards,
    title: "Who paid what confusion",
    text: "One person books tickets, another pays dinner, and the math gets messy.",
  },
  {
    icon: MessageCircleWarning,
    title: "End of trip awkward money talk",
    text: "Asking friends for money should not feel like a negotiation.",
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950/30">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            The real problem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Money gets awkward when the group math is unclear.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="grid size-11 place-items-center rounded-lg bg-rose-50 text-rose-600">
                <problem.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{problem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{problem.text}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xl font-semibold">
          SplitPay solves this automatically.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection
