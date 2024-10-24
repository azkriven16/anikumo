"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    IconCalendar,
    IconClock,
    IconStar,
    IconPlayerPlay,
    IconBookmark,
} from "@tabler/icons-react";
import { useQuery } from "react-query";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import NotFound from "@/components/shared/not-found";
import { getAnimeInfo } from "@/anime/queries";
import { AnimeRelationsGrid } from "./anime-relations-grid";
import { AnimeRecommendationsGrid } from "./anime-recommendations-grid";
import { getAnimeTitle } from "@/lib/contants";
import Link from "next/link";

interface AnimeInfoSectionProps {
    animeInfo: string;
}

export const AnimeInfoSection: React.FC<AnimeInfoSectionProps> = ({
    animeInfo: id,
}) => {
    const {
        data: animeInfo,
        isLoading,
        isError,
    } = useQuery(["animeInfo", id], () => getAnimeInfo(id));

    if (isError) {
        return <NotFound />;
    }

    if (isLoading || !animeInfo) {
        return <LoadingSpinner />;
    }

    return (
        <section className="flex flex-col items-center justify-center w-full mx-auto gap-6 ">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative aspect-[9/16]  h-96">
                    <Image
                        src={animeInfo.image}
                        alt={getAnimeTitle(animeInfo.title)}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-center md:text-left">
                        {animeInfo.title.romaji || animeInfo.title.english}
                    </h1>
                    <p
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{
                            __html: animeInfo.description,
                        }}
                    ></p>
                    <div className="flex flex-wrap gap-2">
                        {animeInfo.genres.map((genre, index) => (
                            <Badge key={index} variant="secondary">
                                {genre}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <IconStar size={16} />
                            <span>
                                {animeInfo.rating
                                    ? animeInfo.rating.toFixed(1)
                                    : "N/A"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IconCalendar size={16} />
                            <span>{animeInfo.releaseDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IconClock size={16} />
                            <span>{animeInfo.duration} min</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button asChild>
                            <Link
                                className="flex items-center gap-2"
                                href={`/watch?animeId=${animeInfo.id}&episodeId=${animeInfo.episodes[0].id}`}
                            >
                                <IconPlayerPlay size={16} />
                                Watch Now
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <IconBookmark size={16} />
                            Add to List
                        </Button>
                    </div>
                </div>
            </div>
            {animeInfo?.relations?.length > 0 && (
                <AnimeRelationsGrid data={animeInfo.relations} />
            )}

            {animeInfo?.recommendations?.length > 0 && (
                <AnimeRecommendationsGrid data={animeInfo.recommendations} />
            )}
        </section>
    );
};
