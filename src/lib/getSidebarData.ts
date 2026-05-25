import type { SidebarData } from "@/types/sidebar";

export const sidebarData: SidebarData = {
  logo: {
    title: "SplitPay",
    description: "User dashboard",
  },
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
        { label: "Activity", href: "/dashboard/activity", icon: "Activity" },
      ],
    },
    {
      title: "SplitPay",
      items: [
        { label: "Groups", href: "/dashboard/groups", icon: "Users" },
        { label: "Expenses", href: "/dashboard/expenses", icon: "ReceiptText" },
        { label: "Balances", href: "/dashboard/balances", icon: "WalletCards" },
        {
          label: "Settlements",
          href: "/dashboard/settlements",
          icon: "CircleDollarSign",
        },
      ],
    },
    {
      title: "Account",
      items: [{ label: "Settings", href: "/dashboard/settings", icon: "Settings" }],
    },
  ],
};

export const getSidebarData = (): SidebarData => sidebarData;
