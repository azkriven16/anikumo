"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { getSearchAnime, searchAdvanced } from "@/anime/queries";
import { AnimeGrid } from "@/components/sections/anime-grid";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import NotFound from "@/components/shared/not-found";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const { data, isLoading, isError } = useQuery(
        ["searchAnime", debouncedSearchTerm],
        () => getSearchAnime(debouncedSearchTerm),
        {
            enabled: debouncedSearchTerm.length > 0,
        }
    );

    const handleSearch = () => {
        setDebouncedSearchTerm(searchTerm);
    };

    return (
        <main className="flex flex-col items-center justify-start bg-background min-h-screen w-full overflow-x-hidden mt-16 py-8 px-4 gap-6">
            <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-4">
                <Input
                    type="text"
                    placeholder="Search for an anime..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    className="text-lg py-6 px-4 flex-grow"
                />
                <Button
                    onClick={handleSearch}
                    size="lg"
                    className="w-full sm:w-auto"
                >
                    <IconSearch className="mr-2" size={24} />
                    Search
                </Button>
            </div>

            {isError && <NotFound />}
            {isLoading && <LoadingSpinner />}
            {data && data.length > 0 && <AnimeGrid data={data} />}
            {data && data.length === 0 && (
                <p className="text-muted-foreground text-lg">
                    No results found.
                </p>
            )}
        </main>
    );
}
