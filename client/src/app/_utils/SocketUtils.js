"use client"

import { io } from "socket.io-client";
import { useState, useMemo } from "react";

let socket;

export const initSocket = () => {

        socket = io("http://localhost:3001", { transports: ["websocket"]});
    
        socket.on("connect", () => {
            console.info("Socket connection established.");
        });
    
        socket.on("disconnect", () => {
            console.info("Socket connection disconnected.");
        });
    
    return socket;
};

export const registerSocketCallback = (callback) => {
    if(!socket) {
        console.warn("Socket not initialized.")
        return;
    }

    socket.on("search_result", (data) => {
        console.info("registerSocketCallback: Search Result: ", data);
        callback(data);
    });    
};

export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
    }
};


export const useSocketClientSession = () => {
    const [clientID, setClientID] = useState(null);

    const setID = (clientId) => {
        setClientID(clientId);
    };

    const unsetID = () => {
        setClientID(null);
    };

    const socketClientSession = useMemo(() => ({
        clientID,
        setID,
        unsetID
    }), [clientID]);

    return socketClientSession;
};
