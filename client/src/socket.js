import { io } from 'socket.io-client';

const URL = "https://nikas-chat-app.onrender.com";

export const socket = io(URL);