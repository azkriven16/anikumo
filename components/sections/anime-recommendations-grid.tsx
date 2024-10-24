import React from "react";
import { AnimeCard } from "@/components/sections/anime-card";
import { Recommendation } from "@/anime/types";

interface AnimeRecommendationsGridProps {
    data: Recommendation[];
}

export const AnimeRecommendationsGrid: React.FC<
    AnimeRecommendationsGridProps
> = ({ data }) => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((anime) => (
                    <AnimeCard
                        key={anime.id}
                        id={anime.id}
                        title={anime.title}
                        image={anime.image}
                    />
                ))}
            </div>
        </div>
    );
};
