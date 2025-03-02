import { logout } from "@/lib/supabase/auth/actions";
import { Button } from "../components/ui/button";
export default async function DashboardPage() {
    return (
        <div>
            DashboardPage
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
