import type { IconName } from "@/components/shared/Iconregistry";

export type SidebarItem = {
  label: string;
  href: string;
  icon: IconName;
  badge?: string | number;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export type SidebarData = {
  logo: {
    title: string;
    description: string;
  };
  navGroups: SidebarGroup[];
};
