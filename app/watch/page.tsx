import { getAnimeInfo } from "@/anime/queries";
import { AnimeWatchSection } from "@/components/sections/anime-watch-section";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
    params: { id: string };
};

const getAnimeInfoCached = cache(getAnimeInfo);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const animeInfo = await getAnimeInfoCached(params.id);

        return {
            title: `Watch ${
                animeInfo.title.romaji || animeInfo.title.english
            } | Anikumo`,
            description: `Watch ${
                animeInfo.title.romaji || animeInfo.title.english
            } on Anikumo`,
            openGraph: {
                title: `Watch ${
                    animeInfo.title.romaji || animeInfo.title.english
                } | Anikumo`,
                description: `Watch ${
                    animeInfo.title.romaji || animeInfo.title.english
                } on Anikumo`,
                images: [{ url: animeInfo.image }],
            },
        };
    } catch (error) {
        console.error("Error fetching anime info:", error);
        return {
            title: "Watch Anime | Anikumo",
            description: "Watch anime on Anikumo",
        };
    }
}

export default async function WatchPage({ params }: Props) {
    return (
        <main className="flex flex-col items-center justify-start bg-background min-h-screen w-full overflow-x-hidden mt-16 py-2 px-3 gap-2">
            <AnimeWatchSection animeId={params.id} />
        </main>
    );
}
