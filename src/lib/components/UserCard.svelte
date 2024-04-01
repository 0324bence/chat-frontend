<script lang="ts">
    export let name: string;
    export let picture: string | undefined = undefined;
</script>

<div class="card-container">
    <div class="picture-container">
        <img
            src={picture == undefined ? "https://via.placeholder.com/150" : "data:image/png;base64, " + picture}
            alt="Profile"
        />
    </div>
    <div class="info-container">
        <h2 class="name">{name}</h2>
    </div>
</div>

<style lang="scss">
    .card-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .picture-container img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .info-container {
        display: flex;
        flex-direction: column;
    }

    .name {
        margin: 0;
    }
</style>
