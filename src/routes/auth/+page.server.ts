import {type Actions, redirect} from "@sveltejs/kit";
import type {PageLoad} from "../../../.svelte-kit/types/src/routes/auth/[action]/$types";

export const load: PageLoad = ({ params }) => {
    redirect(301, '/auth/login')
}