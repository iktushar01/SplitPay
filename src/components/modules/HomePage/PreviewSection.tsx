import { ArrowRightLeft, ReceiptText, Scale, Smartphone } from "lucide-react";

const previews = [
  {
    icon: Smartphone,
    title: "Group page",
    text: "Cox's Bazar Weekend",
    meta: "4 members · 9 expenses",
  },
  {
    icon: ReceiptText,
    title: "Expense add modal",
    text: "Dinner at Mermaid Cafe",
    meta: "Paid by Sara · split equally",
  },
  {
    icon: Scale,
    title: "Balance result",
    text: "Rafi receives ৳1,120",
    meta: "2 payments settle the group",
  },
];

const PreviewSection = () => {
  return (
    <section id="demo" className="bg-white py-20 dark:bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Smart demo
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Preview the flow before anyone asks for money.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A group overview, expense entry, and settlement result live together so the next action is always clear.
            </p>
          </div>

          <div className="rounded-lg border bg-slate-950 p-3 shadow-xl">
            <div className="rounded-md bg-slate-100 p-4 text-slate-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">SplitPay demo</p>
                  <h3 className="text-xl font-bold">Weekend settlement</h3>
                </div>
                <div className="grid size-10 place-items-center rounded-lg bg-white">
                  <ArrowRightLeft className="size-5 text-violet-700" />
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {previews.map((preview) => (
                  <div key={preview.title} className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="grid size-10 place-items-center rounded-lg bg-violet-50 text-violet-700">
                      <preview.icon className="size-5" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-500">{preview.title}</p>
                    <h4 className="mt-1 min-h-14 text-lg font-bold leading-7">{preview.text}</h4>
                    <p className="mt-3 text-sm text-slate-500">{preview.meta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Recommended payment</p>
                    <p className="text-xl font-bold">Amin pays Sara ৳840</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    Ready to settle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection
