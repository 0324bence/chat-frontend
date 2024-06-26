import { type Actions, fail, redirect } from "@sveltejs/kit";
import apiPath from "$lib/apiPath";

export const actions = {
    login: async ({ cookies, request }) => {
        //TODO debug
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");

        if (username === null || password === null) return { message: "Invalid input" };

        const res = await fetch(`${apiPath}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                password
            })
        });

        const body = await res.json();

        if (res.status == 201) {
            //TODO
            cookies.set("token", body.access_token, {
                path: "/",
                maxAge: 60 * 60
            });
            console.log(body);
            return redirect(302, "/");
        }
        return { message: body.message };
    },
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");

        if (username === null || password === null) return { message: "Invalid input" };
        console.log(username, password);

        const res = await fetch(`${apiPath}/users/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                password
            })
        });
        if (res.ok || res.status == 201) {
            return redirect(302, "/auth");
        }
        const body = await res.json();
        return { message: body.message };
    }
} satisfies Actions;
