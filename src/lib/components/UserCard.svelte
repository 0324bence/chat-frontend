<script lang="ts">
    export let name: string;
    export let picture: string | undefined = undefined;
    export let friendButton: boolean = false;
    export let friendCallback: (name: string) => void = (_) => {};
    export let isOwnPic: boolean = false;
    export let setOwnPicCallback: (file: File) => void = (_) => {};

    function openPicDialog() {
        if (!isOwnPic) {
            return;
        }

        let input = document.querySelector(
            ".pic-file-input"
        )! as HTMLInputElement;
        input.click();
        console.log(input.files);
    }

    function handleFileSelect(event: Event, setOwnPicCallback: Function) {
        if (isOwnPic && setOwnPicCallback) {
            let target = event.target as HTMLInputElement;
            setOwnPicCallback((target.files as FileList)[0]);
        }
    }
</script>

<div class="card-container">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="picture-container" on:click={openPicDialog}>
        <img
            src={picture == undefined
                ? "https://via.placeholder.com/150"
                : picture}
            alt="Profile"
            class={isOwnPic ? "own-profile-pic" : ""}
        />
        <div class="picture-change-label">
            {#if isOwnPic}
                <p>Change</p>
                <input
                    type="file"
                    class="pic-file-input"
                    accept="image/*"
                    on:change={(event) => {
                        handleFileSelect(event, setOwnPicCallback);
                    }}
                />
            {/if}
        </div>
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

    .own-profile-pic {
        cursor: pointer;
    }

    .picture-container {
        position: relative;
    }

    .picture-container img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .picture-container {
        .picture-change-label {
            display: none;

            .pic-file-input {
                display: none;
            }
        }
    }

    .picture-container:hover {
        .picture-change-label {
            display: inline;
            user-select: none;
            pointer-events: none;
            background-color: rgba(0, 0, 0, 0.589);
            position: absolute;
            top: -15%;
            left: 0;
            width: 50px;
            font-size: 0.7rem;
            margin: auto;
            margin-top: 50%;
            text-align: center;
        }
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
