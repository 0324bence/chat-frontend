<script lang="ts">
    import type { PageData } from "./$types";
    import { navigating } from "$app/stores";
    import { invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";

    let container: HTMLDivElement;

    export let data: PageData;

    onMount(() => {
        setInterval(() => {
            invalidateAll();
        }, 500);
    });
</script>

<div id="messages-container" bind:this={container}>
    {#each data.messages as message}
        {#if message.senderName === data.friend}
            <div class="message received">
                <span class="user"> {message.senderName} </span>
                <div class="text-container">
                    <span>{message.textContent}</span>
                </div>
                <span class="timestamp">
                    {(() => {
                        let date = new Date(message.timestamp);
                        return date.toTimeString().split(" ")[0];
                    })()}
                </span>
            </div>
        {:else}
            <div class="message sent">
                <span class="user"> {message.senderName} </span>
                <div class="text-container">
                    <span>{message.textContent}</span>
                </div>
                <span class="timestamp">
                    {(() => {
                        let date = new Date(message.timestamp);
                        return date.toTimeString().split(" ")[0];
                    })()}
                </span>
            </div>
        {/if}
    {/each}
</div>

<style lang="scss">
    @import "src/lib/styles/variables.scss";

    #messages-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: stretch;
        gap: 0.5rem;
        padding: 0.5rem;
        height: 100%;

        .message {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;

            &.sent {
                align-self: flex-end;
                text-align: right;
            }

            &.received {
                align-self: flex-start;
                text-align: left;
            }

            .user {
                font-size: 0.8rem;
                color: white;
            }

            .timestamp {
                font-size: 0.6rem;
                color: white;
            }

            .text-container {
                padding: 0.5rem;
                border-radius: 1rem;
                width: fit-content;
                word-wrap: break-word;
                box-sizing: border-box;
                background-color: lighten($main-grey, 10%);
            }
        }
    }
</style>
