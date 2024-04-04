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

    let friendsMode = true;
    let newFriend = false;
    let newUserSearch = "";
    let searchPromise: Promise<any> | undefined = undefined;

    function searchUser() {
        searchPromise = fetch(`${apiPath}/users/searchUsersByName?value=${newUserSearch}&onlyBeginning=false`)
            .then(res => res.json())
            .then((ret: any[]) => {
                return ret.filter(v => (data.friends as any[]).some(e => e.name == v.name) == false).filter(x =>  x.name !== data.user.name);
            })
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

<svelte:head>
    <title>Chat</title>
</svelte:head>

<div id="container">
    <div id="sidebar">
        <div id="sidebar-header">
            <UserCard name={data.user.name} picture={data.user.picture}></UserCard>
            <form method="post" action="/chat">
                <input type="submit" value="Logout" />
            </form>
        </div>
        <div id="list-container">
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
            {#each data.friends as friend}
                <a href="/chat/{friend.name}" class="friend-card-container">
                    <h2>{friend.name}</h2>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
                            />
                        </svg>
                    </div>
                    <!--<button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                />
                            </svg>
                        </button> -->
                </a>
            {/each}
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
                .friend-card-container {
                    text-decoration: none;
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

                    .icon {
                        aspect-ratio: 1 / 1;
                        display: grid;
                        place-items: center;
                        height: 100%;
                        background: none;
                        border: none;
                        outline: none;
                        fill: white;
                        margin-left: auto;
                    }

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }

                    &:focus {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
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
