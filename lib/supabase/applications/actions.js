"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchProfile() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data } = await supabase
            .from("profiles")
            .select("name, email, avatar_url")
            .eq("id", user.id)
            .single();

        if (data) return data;
    }
}
