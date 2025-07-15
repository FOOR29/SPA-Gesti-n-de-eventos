export const enpointUsers = "http://localhost:3000/users"
export const enpointEvents = "http://localhost:3000/events"


import { router } from './router';

window.addEventListener('DOMContentLoaded', () => {
    router();
    window.addEventListener('hashchange', router);
});
