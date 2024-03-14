<script lang="ts">
    import type {ActionData, PageData} from "../../../../.svelte-kit/types/src/routes/auth/[action]/$types";
    
    export let data: PageData;
    export let form: ActionData;
</script>

<form method="post">

    <label for="username">Felhasználó név</label>
    <input type="text" id="name" name="username" required>

    <label for="password">Jelszó</label>
    <input type="password" name="password" id="password" >
    
    <span id="error">{form?.message || ""}</span>

    {#if data.action === "login"}
        <a href="register">Regisztráció</a>
    {/if}
    
    <input type="submit" formaction="?/{data.action}" value={data.action === "login" ? "Bejelentkezés" : "Regisztráció"}>
</form>