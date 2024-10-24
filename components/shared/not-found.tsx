import React from "react";
import Link from "next/link";
import { IconSpider } from "@tabler/icons-react";

const NotFound = () => {
    return (
        <main className="bg-background text-foreground min-h-screen flex items-center justify-center">
            <div className="text-center">
                <IconSpider size={200} className="text-primary mx-auto" />
                <h1 className="text-3xl font-bold mt-6 mb-3">
                    Oops! Page Not Found
                </h1>
                <p className="text-lg mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    Go Back Home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
