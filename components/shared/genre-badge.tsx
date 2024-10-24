import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import path from "@/lib/path";

interface GenreBadgeProps {
    genre: string;
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({ genre }) => {
    return (
        <Link href={path.genres(genre)}>
            <Badge
                variant="default"
                className="hover:bg-primary/10 transition-colors"
            >
                {genre}
            </Badge>
        </Link>
    );
};
