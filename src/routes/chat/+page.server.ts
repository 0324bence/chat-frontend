import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({ cookies }) => {
        cookies.delete("token", { path: "/" });
        return redirect(302, "/auth/login");
    }
} satisfies Actions;
