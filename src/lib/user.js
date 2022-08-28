import { writable } from 'svelte/store';

let userObj = { name: 'zuriii' };

let user = writable(import.meta.env['VITE_MODE'] === 'dev' ? userObj : undefined);

export default user;
