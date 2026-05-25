const DashboardPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track group expenses, balances, and settlements from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Active groups", "0"],
          ["Open expenses", "0"],
          ["Pending settlements", "0"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-card p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
