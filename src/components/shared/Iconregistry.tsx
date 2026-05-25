import {
  Activity,
  BanknoteArrowUp,
  ChartNoAxesCombined,
  CircleDollarSign,
  CreditCard,
  Gauge,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Settings,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

export const iconRegistry = {
  Activity,
  BanknoteArrowUp,
  ChartNoAxesCombined,
  CircleDollarSign,
  CreditCard,
  Gauge,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Settings,
  ShieldCheck,
  Users,
  WalletCards,
} as const;

export type IconName = keyof typeof iconRegistry;
