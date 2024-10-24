import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-background py-5 mt-20 px-3 flex flex-row items-center justify-between z-30">
            <p className="text-sm ">
                © {new Date().getFullYear()} Anime App. All rights reserved.
            </p>
            <ThemeToggle />
        </footer>
    );
};
