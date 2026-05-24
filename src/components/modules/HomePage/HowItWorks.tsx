import { BadgeDollarSign, Scale, UserRoundPlus } from "lucide-react";

const steps = [
  {
    icon: UserRoundPlus,
    title: "Create a group",
    text: "Add friends, roommates, or travel partners in seconds.",
  },
  {
    icon: BadgeDollarSign,
    title: "Add expenses",
    text: "Log who paid and choose how the bill should be split.",
  },
  {
    icon: Scale,
    title: "Get automatic settlements",
    text: "See the cleanest way to settle every balance.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-20 dark:bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps from bill chaos to clear balances.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
                  <step.icon className="size-6" />
                </div>
                <span className="text-sm font-bold text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks
