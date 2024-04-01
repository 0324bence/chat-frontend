import { goto } from "$app/navigation";

function redirectToLogin() {
    goto("/auth");
}

export default redirectToLogin;
