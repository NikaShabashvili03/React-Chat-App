import { io } from 'socket.io-client';

const URL = "https://reactchatapp-j3ch.onrender.com";

export const socket = io(URL);