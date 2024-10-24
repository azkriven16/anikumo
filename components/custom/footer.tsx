import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-background py-5 mt-20 px-3 flex flex-row items-center justify-between z-30">
            <p className="text-sm ">
                © {new Date().getFullYear()} Anime App. All rights reserved.
            </p>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/about" className="text-sm">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="text-sm">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link href="/terms" className="text-sm">
                            Terms of Service
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};
