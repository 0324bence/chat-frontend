<script lang="ts">
    import type { LayoutData } from "./$types";
    import apiPath from "$lib/apiPath";
    import { invalidateAll } from "$app/navigation";

    export let data: LayoutData;
    let message = "";

    let messageResolved = true;

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
            } else {
                console.error("Message not sent");
            }
        });
    }
</script>

<div id="chat-container">
    <slot />
    <form id="input-container" on:submit|preventDefault={sendMessage}>
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

    #chat-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 100%;
        width: 100%;
        padding: 0.5rem;
        overflow-y: auto;

        #input-container {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            height: 3.5rem;
            position: sticky;
            bottom: 0;
            // background-color: $main-grey;

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
