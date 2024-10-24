import { IconSpider } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Link
            href="/"
            className={cn("flex flex-row gap-0.5 items-center", className)}
        >
            <div>
                <IconSpider size={30} />
            </div>
            <div className="text-sm dark:text-zinc-300 truncate w-28 md:w-fit">
                Anikumo
            </div>
        </Link>
    );
};
