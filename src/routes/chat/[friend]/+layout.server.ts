import { type Actions, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import apiPath from "$lib/apiPath";

export const load: LayoutServerLoad = async ({ cookies, params }) => {
    return {
        friend: params.friend
    };
};
