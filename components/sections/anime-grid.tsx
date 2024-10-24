import { Anime } from "@/anime/types";
import { AnimeCard } from "@/components/sections/anime-card";

export function AnimeGrid({ data }: { data: Anime[] }) {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full max-w-7xl">
            {data.map((anime) => (
                <AnimeCard
                    key={anime.id}
                    id={anime.id}
                    title={anime.title}
                    image={anime.image}
                    className="h-full w-full"
                />
            ))}
        </div>
    );
}
