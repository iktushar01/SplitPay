import { BadgeCheck, GraduationCap, Map, Users } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    text: "Shared meals, class events, and weekend plans stay easy to track.",
  },
  {
    icon: Map,
    title: "Travelers",
    text: "Trip expenses stay organized from first booking to final settle.",
  },
  {
    icon: Users,
    title: "Roommates",
    text: "Rent, groceries, utilities, and small IOUs stay visible.",
  },
];

const testimonials = [
  {
    quote: "We stopped doing calculator screenshots after every trip.",
    name: "Ari, student group lead",
  },
  {
    quote: "The balance view made settling feel normal, not awkward.",
    name: "Nadia, apartment roommate",
  },
];

const TrustSection = () => {
  return (
    <section className="border-y bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-emerald-100">
              <BadgeCheck className="size-4" />
              Fast, simple, no confusion finance tracker
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Built for students, travelers, and roommates.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {audiences.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
              >
                <item.icon className="size-5 text-cyan-300" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-lg border border-white/10 bg-white/[0.06] p-6"
            >
              <blockquote className="text-lg font-medium leading-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-slate-300">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
