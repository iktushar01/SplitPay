import Link from "next/link";
import { ReceiptText } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t bg-background py-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                    <span className="grid size-9 place-items-center rounded-lg bg-cyan-600 text-white">
                        <ReceiptText className="size-5" />
                    </span>
                    SplitPay
                </Link>

                <p className="text-sm text-muted-foreground">
                    Track group expenses, split bills, and settle without confusion.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
