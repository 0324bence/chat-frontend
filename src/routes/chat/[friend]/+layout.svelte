<script lang="ts">
    import type { LayoutData } from "./$types";
    import apiPath from "$lib/apiPath";
    import { invalidateAll } from "$app/navigation";
    import menuState from "$lib/stores/menuState";
    import { onMount } from "svelte";

    export let data: LayoutData;
    let message = "";

    let chatContaiener: HTMLDivElement;

    let messageResolved = true;

    onMount(() => {
        menuState.set(false);
    });

    function sendMessage() {
        if (!messageResolved) {
            return;
        }
        messageResolved = false;
        fetch(`${apiPath}/messages/sendTextMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`
            },
            body: JSON.stringify({
                user: data.friend,
                textContent: message
            })
        }).then(res => {
            if (res.ok) {
                console.log("Message sent");
                console.log(message);
                message = "";
                messageResolved = true;
                invalidateAll();
                chatContaiener.scrollTo({
                    top: 9999999999
                });
            } else {
                console.error("Message not sent");
                messageResolved = true;
            }
        });
    }
</script>

<div id="chat-container" bind:this={chatContaiener}>
    <div id="header" class={!$menuState ? "sticky" : ""}>
        <button on:click={() => ($menuState = true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                />
            </svg>
        </button>
    </div>
    <slot />
    <form id="input-container" on:submit|preventDefault={sendMessage} class={!$menuState ? "sticky" : ""}>
        <input type="text" id="chat-input" placeholder="Üzenet" bind:value={message} autocomplete="off" />
        <button type="submit" id="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                />
            </svg>
        </button>
    </form>
</div>

<style lang="scss">
    @import "src/lib/styles/variables.scss";

    .sticky {
        position: sticky !important;
    }

    @media only screen and (max-width: 900px) {
        #chat-container {
            grid-template-rows: 2rem 1fr 3.5rem !important;

            //scrollbar styles
            scrollbar-width: thin;
            scrollbar-color: lighten($main-grey, 20%) $main-grey;

            #header {
                display: flex !important;
                align-items: center;

                button {
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    background: none;
                    border: none;
                    cursor: pointer;
                    outline: none;
                    fill: white;
                    padding: 0.2rem;
                    display: grid;
                    place-items: center;
                }
            }
        }
    }

    #chat-container {
        display: grid;
        grid-template-rows: 1fr 3.5rem;
        height: 100%;
        width: 100%;
        padding: 0.5rem;
        padding-top: 0;
        padding-bottom: 0;
        overflow-y: auto;

        #header {
            display: none;
            top: 0;
            left: 0;
            right: 0;
            background-color: $main-grey;
            padding-top: 0.5rem;
        }

        #input-container {
            display: flex;
            gap: 0.5rem;
            padding-bottom: 0.5rem;
            align-items: center;
            height: 100%;
            bottom: 0;
            background-color: $main-grey;

            #chat-input {
                flex: 1;
                outline: none;
                border: none;
                border-radius: 0.2rem;
                padding: 0.5rem;
                font-size: 2rem;
                height: 100%;
                color: white;
                box-sizing: border-box;

                background-color: darken($main-grey, 5%);

                &:focus {
                    border: lighten($main-grey, 5%) 1px solid;
                }
            }

            #send-button {
                outline: none;
                border: none;
                height: 100%;
                aspect-ratio: 1 / 1;
                background-color: darken($main-grey, 5%);
                border-radius: 50%;
                margin: 5px;
                cursor: pointer;
                fill: white;
                display: grid;
                place-items: center;
                padding: 1rem;
                padding-left: 0.9rem;

                &:hover {
                    background-color: darken($main-grey, 10%);
                }

                &:focus {
                    border: lighten($main-grey, 5%) 1px solid;
                }
            }
        }
    }
</style>
