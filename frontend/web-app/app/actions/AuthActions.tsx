'use server'

import { auth } from "@/auth";

export async function getCurrentUser() {
    try {
        const session = await auth();
        if (!session) {
            return null;
        } else {
            return session.user;
        }
    } catch (error) {
        return null;
    }
}