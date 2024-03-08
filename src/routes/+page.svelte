<script lang="ts">
    import apiPath from "$lib/apiPath";
    function testFetch() {
        fetch(apiPath)
            .then((res) => res.text())
            .then((data) => console.log(data));
    }
</script>

<a href="/auth">Auth</a>
<button on:click={testFetch}>Test Fetch</button>
