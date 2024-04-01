<script lang="ts">
    import UserCard from "$lib/components/UserCard.svelte";
    import { navigating } from "$app/stores";
    import apiPath from "$lib/apiPath";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;

    let friendsMode = true;
    let newFriend = false;
    let newUserSearch = "";

    function searchUser() {
        fetch(`${apiPath}/users/searchUsersByName`, {
            body: JSON.stringify({ value: newUserSearch, onlyBeginning: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }
</script>

<div id="container">
    <div id="sidebar">
        <div id="sidebar-header">
            <UserCard name={data.user.name} picture={data.user.picture} />
        </div>
        <div id="menu-selector">
            <button id="chats" class={!friendsMode ? "selected" : ""}>Beszélgetések</button>
            <button id="friends" class={friendsMode ? "selected" : ""}>Barátok</button>
        </div>
        <div id="list-container">
            {#if friendsMode}
                <div id="friends-header">
                    <button
                        on:click={() => {
                            newFriend = true;
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                            />
                        </svg>
                    </button>
                </div>
            {/if}
        </div>
        {#if newFriend}
            <div id="new-friend-container">
                <div id="new-friend-modal">
                    <div id="new-friend-search">
                        <input type="text" placeholder="Felhasználónév" bind:value={newUserSearch} />
                        <button on:click={searchUser}>Keresés</button>
                    </div>
                    <div id="new-friend-list"></div>
                    <div id="new-friend-cancel">
                        <button>Mégse</button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <slot />
</div>

<style lang="scss">
    @import "src/lib/styles/variables.scss";
    #container {
        display: grid;
        grid-template-columns: 2fr 10fr;
        height: 100vh;

        #sidebar {
            display: flex;
            flex-direction: column;
            border-right: 1px solid #ccc;
            position: relative;

            #new-friend-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 1rem;

                #new-friend-modal {
                    background-color: white;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    #new-friend-search {
                        display: flex;
                        gap: 0.5rem;

                        input {
                            padding: 0.5rem;
                            flex: 1 1;
                            border: 1px solid #ccc;
                            border-radius: 0.5rem;
                        }
                    }

                    button {
                        padding: 0.5rem;
                        flex: 1 1;
                        border: none;
                        background-color: $main-grey;
                        color: white;
                        cursor: pointer;
                        border-radius: 0.5rem;

                        &:hover {
                            background-color: hsl(0, 0%, 30%);
                        }
                    }
                }
            }

            #sidebar-header {
                padding: 0.5rem;
                border-bottom: 1px solid #ccc;
            }

            #menu-selector {
                display: flex;
                border-bottom: 1px solid #ccc;
                background-color: #ccc;
                gap: 1px;

                .selected {
                    text-decoration: underline;
                }

                button {
                    padding: 0.5rem;
                    flex: 1;
                    border: none;
                    background-color: $main-grey;
                    cursor: pointer;
                    color: white;

                    &:hover {
                        background-color: hsl(0, 0%, 30%);
                    }
                }
            }

            #list-container {
                overflow-y: auto;
                flex: 1;
                display: flex;
                flex-direction: column;

                #friends-header {
                    padding: 0.5rem;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    justify-content: flex-end;

                    button {
                        background-color: transparent;
                        border: none;
                        cursor: pointer;
                        display: grid;
                        place-items: center;
                        aspect-ratio: 1 / 1;
                        height: 1rem;

                        svg {
                            fill: white;
                        }
                    }
                }
            }
        }
    }
</style>
