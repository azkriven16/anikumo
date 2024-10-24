import { genSaltSync, hashSync } from "bcrypt-ts";
import prisma from "@/lib/prisma";

export async function getUser(email: string) {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
        console.error("Failed to get user from database");
        throw error;
    }
}

export async function createUser(email: string, password: string) {
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);

    try {
        return await prisma.user.create({ data: { email, password: hash } });
    } catch (error) {
        console.error("Failed to create user in database");
        throw error;
    }
}
