"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { PropsWithChildren } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <ProgressBar
                height="4px"
                color="#808080"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </QueryClientProvider>
    );
}
