import { ArrowRight, CheckCircle2, Plus, ReceiptText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroPage = () => {
  return (
    <section className="relative border-b bg-white py-20 dark:bg-background sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-600" />
            Group expenses made obvious
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Split expenses. Settle instantly.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Track group expenses, split bills, and see who owes what automatically.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 px-5" size="lg">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button className="h-11 px-5" size="lg" variant="outline">
              <Plus className="size-4" />
              Create Group
            </Button>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-sm">
            {["No spreadsheets", "Auto balances", "Fast settle"].map((item) => (
              <div key={item} className="rounded-lg border bg-background px-3 py-2 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-slate-950 p-3 shadow-2xl shadow-slate-900/15">
          <div className="rounded-md bg-white p-4 text-slate-950">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm text-slate-500">Trip group</p>
                <h2 className="text-xl font-bold">Cox&apos;s Bazar Weekend</h2>
              </div>
              <div className="flex -space-x-2">
                {["A", "R", "S"].map((person) => (
                  <div
                    key={person}
                    className="grid size-9 place-items-center rounded-full border-2 border-white bg-cyan-100 text-sm font-semibold text-cyan-800"
                  >
                    {person}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-sm text-emerald-700">Total spent</p>
                <p className="mt-1 text-2xl font-bold">৳12,840</p>
              </div>
              <div className="rounded-lg bg-cyan-50 p-4">
                <p className="text-sm text-cyan-700">To settle</p>
                <p className="mt-1 text-2xl font-bold">3 payments</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["Hotel booking", "Rafi paid", "৳6,000"],
                ["Seafood dinner", "Sara paid", "৳3,240"],
                ["Bus tickets", "Amin paid", "৳3,600"],
              ].map(([title, paidBy, amount]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-lg bg-slate-100">
                      <ReceiptText className="size-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-slate-500">{paidBy}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{amount}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Users className="size-4" />
                Automatic settlement
              </div>
              <p className="mt-2 text-lg font-semibold">Amin pays Rafi ৳1,120</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage
