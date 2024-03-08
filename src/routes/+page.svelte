<script lang="ts">
    import apiPath from "$lib/apiPath";
    function testFetch() {
        const route = `${apiPath}/test`;
        console.log(route)
        fetch(route, {
            // mode: "no-cors"
        })
            .then((res) => {
                console.log(res)
                return res.text()
            })
            .then((data) => {
                console.log(data)
            })
    }
</script>

<a href="/auth">Auth</a>
<button on:click={testFetch}>Test Fetch</button>
