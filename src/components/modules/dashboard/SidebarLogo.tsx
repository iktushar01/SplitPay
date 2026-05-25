import Link from "next/link";
import { ReceiptText } from "lucide-react";

const SidebarLogo = () => {
  return (
    <Link href="/dashboard" className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
        <ReceiptText className="size-5" />
      </span>
      <div className="grid min-w-0 leading-tight">
        <span className="truncate text-sm font-bold">SplitPay</span>
        <span className="truncate text-xs text-muted-foreground">
          Bill splitting
        </span>
      </div>
    </Link>
  );
};

export default SidebarLogo;
