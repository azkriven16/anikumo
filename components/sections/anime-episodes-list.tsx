import { Episode } from "@/anime/utils";
import React from "react";
import { Button } from "../ui/button";

interface EpisodeListProps {
    episodes: Episode[];
    episodeId: string;
    animeId: string;
    handleSelectEpisode: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
    episodeId,
    episodes,
    handleSelectEpisode,
}) => {
    return (
        <div className="flex flex-col w-full mt-5">
            <h6 className="font-semibold mb-3">Select an episode:</h6>
            <div className="flex space-x-4 w-full overflow-x-auto">
                {episodes?.length === 0 && (
                    <h6 className="font-semibold w-full text-center">
                        No episodes found
                    </h6>
                )}
                {episodes?.map((item) => (
                    <Button
                        key={item.id}
                        variant={
                            episodeId === item.id ? "default" : "secondary"
                        }
                        onClick={() => handleSelectEpisode(item)}
                    >
                        {item.number}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default EpisodeList;
