"use client";

import { useQuery } from "react-query";
import { getAnimeInfo, getAnimeEpisodeStreaming } from "@/anime/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Episode } from "@/anime/utils";
import NotFound from "@/components/shared/not-found";
import dynamic from "next/dynamic";
import Hls from "hls.js";
import { Button } from "../ui/button";
import EpisodeList from "./anime-episodes-list";
import { Recommendation } from "@/anime/types";
import { AnimeRecommendationsGrid } from "./anime-recommendations-grid";
import { AnimeCard } from "./anime-card";

interface AnimeWatchSectionProps {
    animeId: string;
}

const Player = dynamic(() => import("@/components/custom/player"), {
    ssr: false,
});

export const AnimeWatchSection: React.FC<AnimeWatchSectionProps> = ({
    animeId,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const playerRef = useRef<HTMLVideoElement | null>(null);

    const episodeId = searchParams.get("episodeId");
    const animeIdFromParams = searchParams.get("animeId");

    const {
        data: animeInfo,
        isLoading: isAnimeInfoLoading,
        isError: isAnimeInfoError,
    } = useQuery(
        ["animeInfo", animeIdFromParams],
        () => getAnimeInfo(animeIdFromParams || ""),
        {
            enabled: !!animeIdFromParams,
        }
    );

    const [episode, setEpisode] = useState<Episode | null>(null);
    const [isWatchIframe, setIsWatchIframe] = useState(false);

    const {
        data: episodeData,
        isError: isEpisodeError,
        isFetching: isEpisodeFetching,
    } = useQuery(
        ["episodeStreaming", episodeId],
        () => getAnimeEpisodeStreaming(episodeId || ""),
        {
            enabled: !!episodeId,
        }
    );

    const handleSelectEpisode = (selectedEpisode: Episode) => {
        if (animeInfo && animeInfo.episodes) {
            const foundEpisode = animeInfo.episodes.find(
                (ep) => ep.id === selectedEpisode.id
            );
            if (foundEpisode) {
                setEpisode(foundEpisode);
                router.push(
                    `/watch?animeId=${animeIdFromParams}&episodeId=${foundEpisode.id}`
                );
            }
        }
    };

    return (
        <section className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4 h-full w-full">
                <div className="flex flex-col">
                    {isEpisodeFetching ? (
                        <div className="h-96 aspect-video bg-secondary flex items-center justify-center">
                            <h5 className="text-sm font-semibold">
                                Loading episode data
                            </h5>
                        </div>
                    ) : isEpisodeError ? (
                        <div className="h-96 aspect-video bg-secondary flex items-center justify-center">
                            <h5 className="text-sm font-semibold">
                                Error loading episode data
                            </h5>
                        </div>
                    ) : episodeData ? (
                        <div className="w-full h-full space-y-5">
                            {isWatchIframe ? (
                                <iframe
                                    src={episodeData?.headers?.Referer}
                                    className="h-96 aspect-video"
                                    allowFullScreen
                                />
                            ) : (
                                <Player
                                    Hls={Hls}
                                    source={episodeData?.sources?.map(
                                        (item) => ({
                                            label: item?.quality,
                                            url: item?.url,
                                        })
                                    )}
                                    color="#FF0000"
                                    poster={episode?.image}
                                    className="w-full h-full"
                                    playerRef={playerRef}
                                />
                            )}
                            {episodeData?.headers?.Referer && (
                                <>
                                    <p className="text-sm mb-2">
                                        If the video is not playing, try
                                        enabling iframe.
                                    </p>
                                    <Button
                                        onClick={() =>
                                            setIsWatchIframe((prev) => !prev)
                                        }
                                    >
                                        {!isWatchIframe ? "Enable" : "Disable"}{" "}
                                        iframe
                                    </Button>
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
                <div className="flex flex-col">
                    {isAnimeInfoLoading ? (
                        <div>Loading anime info...</div>
                    ) : isAnimeInfoError || !animeInfo ? (
                        <NotFound />
                    ) : (
                        <div>
                            <EpisodeList
                                animeId={animeInfo?.id}
                                episodeId={episode?.id as string}
                                episodes={animeInfo?.episodes}
                                handleSelectEpisode={handleSelectEpisode}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div>
                {isAnimeInfoLoading ? (
                    <div>Loading recommendations and related anime...</div>
                ) : isAnimeInfoError ? (
                    <div>Error loading recommendations and related anime</div>
                ) : (animeInfo?.recommendations &&
                      animeInfo?.recommendations.length > 0) ||
                  (animeInfo?.relations && animeInfo?.relations.length > 0) ? (
                    <div className="w-full">
                        {animeInfo?.recommendations &&
                            animeInfo?.recommendations.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-bold mb-4">
                                        Recommendations
                                    </h2>
                                    <div className="md:flex flex-col grid grid-cols-3 gap-5 mb-8">
                                        {animeInfo.recommendations.map(
                                            (anime) => (
                                                <AnimeCard
                                                    className="md:aspect-video aspect-[3/4]"
                                                    key={anime.id}
                                                    id={anime.id}
                                                    title={anime.title}
                                                    image={anime.image}
                                                />
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        {animeInfo?.relations &&
                            animeInfo?.relations.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-bold mb-4">
                                        Related Anime
                                    </h2>
                                    <div className="md:flex flex-col grid grid-cols-3 gap-5 mb-8">
                                        {animeInfo.relations.map((anime) => (
                                            <AnimeCard
                                                className="md:aspect-video aspect-[3/4]"
                                                key={anime.id}
                                                id={anime.id}
                                                title={anime.title}
                                                image={anime.image}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                    </div>
                ) : (
                    <div>No recommendations or related anime available</div>
                )}
            </div>
        </section>
    );
};
