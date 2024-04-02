<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<script lang="ts">
    import UserCard from "$lib/components/UserCard.svelte";
    import { navigating } from "$app/stores";
    import apiPath from "$lib/apiPath";
    import type { LayoutData } from "./$types";
    import redirectToLogin from "$lib/redirectToLogin";
    import { invalidate, invalidateAll } from "$app/navigation";

    export let data: LayoutData;

    console.log(data);

    console.log(data.incomingRequests.length);

    let friendsMode = true;
    let newFriend = false;
    let newUserSearch = "";
    let searchPromise: Promise<any> | undefined = undefined;

    function searchUser() {
        searchPromise = fetch(`${apiPath}/users/searchUsersByName?value=${newUserSearch}&onlyBeginning=false`)
            .then(res => res.json())
            .catch(() => {
                redirectToLogin();
            });
    }
    function sendFriendRequest(name: string) {
        console.log(name);
        fetch(`${apiPath}/users/sendFriendRequest`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + data.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: name })
        }).then(() => {
            newFriend = false;
        });
    }
    function acceptFriendRequest(name: string) {
        fetch(`${apiPath}/users/acceptFriendRequest`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + data.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: name })
        }).then(() => {
            invalidateAll();
        });
    }
    function declineFriendRequest(name: string) {
        alert("Decline");
        // fetch(`${apiPath}/users/declineFriendRequest`, {
        //     method: "POST",
        //     headers: {
        //         Authorization: "Bearer " + data.token,
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ user: name })
        // }).then(() => {
        //     invalidateAll();
        // });
    }
</script>

<div id="container">
    <div id="sidebar">
        <div id="sidebar-header">
            <UserCard name={data.user.name} picture={data.user.picture}></UserCard>
            <form method="post">
                <input type="submit" value="Logout" />
            </form>
        </div>
        <div id="menu-selector">
            <button id="chats" class={!friendsMode ? "selected" : ""}>Beszélgetések</button>
            <button id="friends" class={friendsMode ? "selected" : ""}>Barátok</button>
        </div>
        <div id="list-container">
            {#if friendsMode}
                <div id="friends-header">
                    <p>Barátok</p>
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
                {#if data.incomingRequests.length > 0}
                    <div class="friends-list-header">
                        <p>Bejövő kérések</p>
                    </div>
                {/if}
                {#each data.incomingRequests as friend}
                    <div class="incoming-card-container">
                        <h2>{friend}</h2>
                        <button
                            class="first"
                            on:click={() => {
                                //TODO
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                />
                            </svg>
                        </button>
                        <button
                            on:click={() => {
                                acceptFriendRequest(friend);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                />
                            </svg>
                        </button>
                    </div>
                {/each}
                {#if data.sentRequests.length > 0}
                    <div class="friends-list-header">
                        <p>Kimenő kérések</p>
                    </div>
                {/if}
                {#each data.sentRequests as friend}
                    <div class="sent-card-container">
                        <h2>{friend}</h2>
                        <!-- <button class="first">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                />
                            </svg>
                        </button> -->
                    </div>
                {/each}
                {#each data.friends as friend}
                    <div class="friend-card-container">
                        <h2>{friend.name}</h2>
                        <!-- <button class="first">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                />
                            </svg>
                        </button> -->
                    </div>
                {/each}
            {/if}
        </div>
        {#if newFriend}
            <div
                id="new-friend-container"
                on:click|self={() => {
                    newFriend = false;
                }}
            >
                <div id="new-friend-modal">
                    <div id="new-friend-search">
                        <input type="text" placeholder="Felhasználónév" bind:value={newUserSearch} />
                        <button on:click={searchUser}>Keresés</button>
                    </div>
                    <div id="new-friend-list">
                        {#if searchPromise != undefined}
                            {#await searchPromise}
                                <h2>Betöltés...</h2>
                            {:then friends}
                                {#each friends as friend}
                                    <div class="card-container">
                                        <UserCard
                                            name={friend.name}
                                            picture={friend.picture}
                                            friendButton={true}
                                            friendCallback={sendFriendRequest}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                                <path
                                                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                                                />
                                            </svg>
                                        </UserCard>
                                    </div>
                                {/each}
                            {/await}
                        {/if}
                    </div>
                    <div id="new-friend-cancel">
                        <button
                            on:click={() => {
                                newFriend = false;
                            }}
                        >
                            Mégse
                        </button>
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

                    h2 {
                        text-align: center;
                    }

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

                    #new-friend-list {
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                        gap: 0.5rem;

                        color: black;

                        .card-container {
                            border-bottom: 1px solid black;
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

                .card-container {
                    border-bottom: 1px solid #ccc;
                }

                .incoming-card-container,
                .sent-card-container,
                .friend-card-container {
                    color: cadetblue;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    border-bottom: #ccc 1px solid;
                    button {
                        aspect-ratio: 1 / 1;
                        display: grid;
                        place-items: center;
                        height: 100%;
                        cursor: pointer;
                        background: none;
                        border: none;
                        outline: none;
                        fill: green;

                        &:hover {
                            fill: lighten(green, 10%);
                        }
                    }
                    .first {
                        margin-left: auto;
                        fill: red;

                        &:hover {
                            fill: lighten(red, 10%);
                        }
                    }
                }

                .friend-card-container {
                    color: white;
                }

                .friends-list-header {
                    padding: 0.5rem;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    justify-content: flex-start;
                    text-decoration: underline;
                }

                #friends-header {
                    padding: 0.5rem;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    justify-content: space-between;
                    text-decoration: underline;

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
