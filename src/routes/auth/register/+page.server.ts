import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import apiPath from "$lib/apiPath";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        
        console.log(username, password)

        const res = await fetch(`${apiPath}/users/add?name=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.ok) {
            return redirect(301, '/auth');
        }
        const body = await res.json();
        return { message: body.message};
    },
} satisfies Actions;