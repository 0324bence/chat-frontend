import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import apiPath from "$lib/apiPath";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const token = cookies.get("token");
    if (token === undefined) {
        return redirect(302, "/auth");
    }
    const route = apiPath + "/users/getOwnUserData";
    const res = await fetch(route, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    if (res.status !== 200) {
        console.log("Failed to get own username");
        return redirect(302, "/auth/login");
    }
    const user = await res.json();
    return {
        token,
        user
    };
};
