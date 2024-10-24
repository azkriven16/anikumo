import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAnimeTitle } from "@/lib/contants";
import { Title } from "@/anime/utils";

interface AnimeCardProps {
    id: string | number;
    title: Title;
    image: string;
    className?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
    id,
    title,
    image,
    className,
}) => {
    return (
        <Link href={`/anime/${id}`} className={cn("group")}>
            <div
                className={cn(
                    "relative aspect-[3/4] overflow-hidden rounded-lg",
                    className
                )}
            >
                <Image
                    src={image}
                    alt={getAnimeTitle(title)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="hidden md:block text-sm font-semibold truncate">
                        {getAnimeTitle(title)}
                    </h3>
                </div>
            </div>
            <h3 className="block md:hidden text-sm font-semibold mt-1 truncate">
                {getAnimeTitle(title)}
            </h3>
        </Link>
    );
};
