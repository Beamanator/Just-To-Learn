// just a js file cuz it's not a real 'component'
import { derived, writable, readable, get } from "svelte/store";

// writeable store
export const username = writable("Guest");
// yes, this works
username.subscribe((newValue) => {
    console.log("username updated:", newValue);
});

// readable store
export const count = readable(0, (set) => {
    setInterval(() => {
        set(get(count) + 1);
    }, 1000);
});

// derived store
// Note: inner function's $ is just convention, not needed here
export const welcomeMessage = derived(username, ($username) => {
    return `Welcome, ${$username}`;
});
