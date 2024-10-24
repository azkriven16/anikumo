import { getAnimeInfo } from "@/anime/queries";
import { AnimeInfoSection } from "@/components/sections/anime-info-section";
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
            title: `${
                animeInfo.title.romaji || animeInfo.title.english
            } | Anikumo`,
            description: animeInfo.description,
            openGraph: {
                title: `${
                    animeInfo.title.romaji || animeInfo.title.english
                } | Anikumo`,
                description: animeInfo.description,
                images: [{ url: animeInfo.image }],
            },
        };
    } catch (error) {
        console.error("Error fetching anime info:", error);
        return {
            title: "Anime | Anikumo",
            description: "Discover anime on Anikumo",
        };
    }
}

export default async function AnimeInfoPage({ params }: Props) {
    return (
        <main className="flex flex-col items-center justify-center bg-background min-h-screen w-full overflow-x-hidden mt-16 py-2 px-3 gap-2">
            <AnimeInfoSection animeInfo={params.id} />
        </main>
    );
}
