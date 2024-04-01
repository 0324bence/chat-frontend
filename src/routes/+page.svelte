<script lang="ts">
    import apiPath from "$lib/apiPath";
    import redirectToLogin from "$lib/redirectToLogin";

    function testFetch() {
        const route = `${apiPath}/test`;
        console.log(route);
        fetch(route, {
            // mode: "no-cors"
        })
            .then(res => {
                console.log(res);
                return res.text();
            })
            .then(data => {
                console.log(data);
            });
    }
    function auth() {
        redirectToLogin();
    }
</script>

<button on:click={auth}>Auth</button>
<button on:click={testFetch}>Test Fetch</button>
