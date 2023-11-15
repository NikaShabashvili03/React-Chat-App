import { io } from 'socket.io-client';

const URL = "https://reactchatapp-jg1f.onrender.com";

export const socket = io(URL);