import { IconLoader2, IconSpider } from "@tabler/icons-react";
import React from "react";
import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "w-full h-[100dvh] relative bg-background text-muted-foreground",
                className
            )}
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <IconSpider
                    size={50}
                    className={cn(
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    )}
                />
                <IconLoader2 className={cn("animate-spin")} size={100} />
            </div>
        </div>
    );
};
