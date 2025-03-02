"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login({ email, password }) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function signUp({ email, password, name }) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: name,
            },
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}
