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

export async function fetchApplications(limit) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        let query = supabase
            .from("applications")
            .select(
                "id, company, position, date_applied, status, application_link, location, source, notes",
            )
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (limit) query = query.limit(limit);

        const { data } = await query;

        if (data) return data;
    }
}

export async function fetchApplicationById(id) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data } = await supabase
            .from("applications")
            .select("*")
            .eq("id", id)
            .single();

        if (data) return data;
    }
}

export async function updateApplicationNotes(id, notes) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase
            .from("applications")
            .update({ notes })
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    }
}

export async function addApplication(data) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase
            .from("applications")
            .insert({ user_id: user.id, ...data });

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    }
}

export async function deleteApplication(id) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase
            .from("applications")
            .delete()
            .eq("id", id);

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    }
}
