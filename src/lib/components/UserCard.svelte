<script lang="ts">
    export let name: string;
    export let picture: string | undefined = undefined;
    export let friendButton: boolean = false;
    export let friendCallback: (name: string) => void = _ => {};
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
    {#if friendButton}
        <button
            class="icon-container"
            on:click={() => {
                friendCallback(name);
            }}
        >
            <slot />
        </button>
    {/if}
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

    .icon-container {
        display: grid;
        place-items: center;
        cursor: pointer;
        background-color: transparent;
        border: none;
        outline: none;
        margin-left: auto;
        aspect-ratio: 1 / 1;
        height: 25px;

        svg {
            fill: black;
        }
    }

    .name {
        margin: 0;
    }
</style>
