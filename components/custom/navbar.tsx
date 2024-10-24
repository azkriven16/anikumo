import { auth, signOut } from "@/app/(auth)/auth";
import { IconSearch, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { Logo } from "../shared/logo";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

export const Navbar = async () => {
    let session = await auth();

    return (
        <>
            <div className="bg-background border-b fixed top-0 left-0 w-full py-2 px-3 flex flex-row items-center justify-between z-30">
                <div className="flex flex-row items-center">
                    <Logo />
                </div>

                <div className="hidden md:flex flex-row items-center gap-2">
                    <Button asChild variant="outline">
                        <Link href="/search">
                            <IconSearch />{" "}
                            <span className="text-muted-foreground">
                                find anime...
                            </span>
                        </Link>
                    </Button>
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="py-1.5 px-2 h-fit font-normal"
                                    variant="secondary"
                                >
                                    {session.user?.email}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <ThemeToggle />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-1 z-50">
                                    <form
                                        className="w-full"
                                        action={async () => {
                                            "use server";

                                            await signOut({
                                                redirectTo: "/",
                                            });
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="w-full text-left px-1 py-0.5 text-red-500"
                                        >
                                            Sign out
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            asChild
                            className="py-1.5 px-2 h-fit font-normal"
                        >
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                    <ThemeToggle />
                </div>

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <IconMenu2 />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="flex flex-col gap-4 mt-4 p-4">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/search">
                                    <IconSearch />{" "}
                                    <span className="text-muted-foreground">
                                        find anime...
                                    </span>
                                </Link>
                            </Button>
                            {session ? (
                                <>
                                    <Button
                                        className="py-1.5 px-2 h-fit font-normal w-full"
                                        variant="secondary"
                                    >
                                        {session.user?.email}
                                    </Button>
                                    <form
                                        className="w-full"
                                        action={async () => {
                                            "use server";

                                            await signOut({
                                                redirectTo: "/",
                                            });
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="w-full text-left px-1 py-0.5 text-red-500"
                                        >
                                            Sign out
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <Button
                                    asChild
                                    className="py-1.5 px-2 h-fit font-normal w-full"
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                            )}
                            <ThemeToggle />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
};
