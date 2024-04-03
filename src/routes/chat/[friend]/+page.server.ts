import { type Actions, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad, PageServerLoad } from "./$types";
import apiPath from "$lib/apiPath";

export const load: PageServerLoad = async ({ cookies, params }) => {
    const token = cookies.get("token");
    if (token === undefined) {
        return redirect(302, "/auth");
    }

    const messages = await fetch(`${apiPath}/messages/getMessagesBetweenUsers?user=${params.friend}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(res => res.json());

    console.log(params.friend);
    console.log(messages);

    return {
        messages
    };
};
