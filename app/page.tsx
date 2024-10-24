"use client";

import { getAllAnime } from "@/anime/queries";
import { AnimeGrid } from "@/components/sections/anime-grid";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import NotFound from "@/components/shared/not-found";
import { useQuery } from "react-query";

export default function Home() {
    const { data, isLoading, isError } = useQuery("home", getAllAnime);

    if (isError) {
        return <NotFound />;
    }
    if (!data || isLoading) {
        return <LoadingSpinner />;
    }

    const [trendingAnime, mostPopularAnime] = data;

    return (
        <main className="flex flex-col items-center justify-center bg-background min-h-screen w-full overflow-x-hidden mt-16 py-2 px-3 gap-2">
            <div className="w-full flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                    Discover and stream anime for free on Anikumo.
                </span>
            </div>
            <AnimeGrid data={[...trendingAnime, ...mostPopularAnime]} />
        </main>
    );
}
