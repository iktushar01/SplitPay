import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-cyan-600 py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
            Start clean
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Stop arguing over money.
          </h2>
          <p className="mt-4 max-w-2xl text-cyan-50">
            Create a group, add the first expense, and let SplitPay show the exact balances.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button className="h-11 bg-white px-5 text-cyan-700 hover:bg-cyan-50" size="lg">
            <Plus className="size-4" />
            Create your first group
          </Button>
          <Button className="h-11 border-white/50 px-5 text-white hover:bg-white/10" size="lg" variant="outline">
            Try SplitPay
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection
