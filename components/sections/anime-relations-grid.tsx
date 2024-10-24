import { AnimeCard } from "@/components/sections/anime-card";
import { Relation } from "@/anime/types";

export function AnimeRelationsGrid({ data }: { data: Relation[] }) {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Related Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((relation) => (
                    <AnimeCard
                        key={relation.id}
                        id={relation.id}
                        title={relation.title}
                        image={relation.image}
                    />
                ))}
            </div>
        </div>
    );
}
