"use client"

import { io } from "socket.io-client";
import { useState, useMemo } from "react";

let socket;

export const initSocket = () => {

    // const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:3001";
    // const socketUrl = "http://localhost";
    const socketUrl = "https://my-personal-website-craqo.ondigitalocean.app"

    console.log("socketURL: ", socketUrl);
    // socket = io(socketUrl, { path: "/ws/", transports: ["websocket"] });
    socket = io(socketUrl, { path: "/ws", transports: ["websocket"] });

    socket.on("connect", () => {
        console.info("Socket connection established.");
    });

    socket.on("disconnect", () => {
        console.info("Socket connection disconnected.");
    });

    socket.on("connect_error", (err) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);

        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);

        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
    });

    return socket;
};

export const registerSocketCallback = (callback) => {
    if (!socket) {
        console.warn("Socket not initialized.")
        return;
    }

    socket.on("search_result", (data) => {
        console.info("registerSocketCallback: Search Result: ", data);
        callback(data);
    });
};

export const disconnectSocket = () => {
    if (socket) {
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
