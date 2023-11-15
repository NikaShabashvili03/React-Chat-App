import { io } from 'socket.io-client';

const URL = "https://reactchatapp-lzua.onrender.com";

export const socket = io(URL);