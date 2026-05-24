import {
  Clock3,
  History,
  ListChecks,
  MonitorSmartphone,
  Split,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: Split,
    title: "Auto expense splitting",
    text: "Split equally or by custom shares.",
  },
  {
    icon: UsersRound,
    title: "Group management",
    text: "Keep every trip or home group organized.",
  },
  {
    icon: ListChecks,
    title: "Balance tracking",
    text: "Know who is ahead and who needs to pay.",
  },
  {
    icon: Clock3,
    title: "Who owes whom system",
    text: "Get the simplest payment path instantly.",
  },
  {
    icon: History,
    title: "Expense history",
    text: "Review every payment and edit mistakes.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile friendly UI",
    text: "Add bills quickly from any screen size.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-slate-50 py-20 dark:bg-slate-950/30">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything a group needs to settle up cleanly.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection
