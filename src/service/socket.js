import io from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_CLIENT_URL || 'http://localhost:3000';

export const socket = io(socketUrl);

