<script lang="ts">
    import type { PageData, ActionData } from './$types';
    
    export let form: ActionData;
</script>

<div id="wrapper">
    <form action="" method="post" id="register">
        <h1>Register</h1>
        {#if form?.message}
            <p>{form.message}</p>
        {/if}
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="submit" value="Register">
    </form>
</div>