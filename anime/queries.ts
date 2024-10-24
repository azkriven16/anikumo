import client from "@/lib/client";
import { convertQueryArrayParams } from "@/lib/contants";
import { Anime, AnimeEpisodeStreaming, AnimeInfo, RecentAnime } from "./types";
import { AnimeResponse, SearchAdvancedQuery } from "./utils";

export const default_provider = "gogoanime";

export const getRecentAnime = async (limit: number = 20, page: number = 1) => {
    const response = await client.get<AnimeResponse<RecentAnime>>(
        "/recent-episodes",
        {
            params: {
                page: page,
                perPage: limit,
                provider: default_provider,
            },
        }
    );
    return response.data.results;
};

export const getTrendingAnime = async (
    limit: number = 20,
    page: number = 1
) => {
    const response = await client.get<AnimeResponse<Anime>>("/trending", {
        params: {
            page,
            perPage: limit,
            provider: default_provider,
        },
    });

    return response.data.results;
};

export const getMostPopular = async (limit: number = 20, page: number = 1) => {
    const response = await client.get<AnimeResponse<Anime>>("/popular", {
        params: {
            page,
            perPage: limit,
            provider: default_provider,
        },
    });

    return response.data.results;
};

export const searchAdvanced = async (queries?: SearchAdvancedQuery) => {
    const response = await client.get<AnimeResponse<Anime>>(
        "/advanced-search",
        {
            params: {
                ...queries,
                provider: default_provider,
            },
        }
    );

    return response.data;
};

export const getAnimeInfo = async (
    id: string,
    provider: string = default_provider
) => {
    const response = await client.get<AnimeInfo>(`/info/${id}`);

    return response.data;
};

export const getAnimeEpisodeStreaming = async (
    episodeId: string
): Promise<AnimeEpisodeStreaming> => {
    const response = await client.get(`/watch/${episodeId}`);
    return response?.data;
};

export const getAllAnime = async () => {
    const data = await Promise.all([
        getTrendingAnime(),
        getMostPopular(),
        getRecentAnime(),
        searchAdvanced({
            sort: convertQueryArrayParams(["FAVOURITES_DESC"]),
            type: "ANIME",
        }),
        searchAdvanced({
            type: "ANIME",
            status: "FINISHED",
            sort: convertQueryArrayParams(["SCORE_DESC"]),
        }),
        searchAdvanced({
            season: "FALL",
            perPage: 5,
        }),
        searchAdvanced({
            season: "WINTER",
            perPage: 5,
        }),
        searchAdvanced({
            season: "SPRING",
            perPage: 5,
        }),
        searchAdvanced({
            season: "SUMMER",
            perPage: 5,
        }),
    ]);

    return data;
};
