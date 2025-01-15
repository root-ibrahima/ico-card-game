import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:4000");

socket.on("open", () => {
    console.log("Connexion ouverte");

    // Rejoindre une room
    socket.send(
        JSON.stringify({
            type: "JOIN_ROOM",
            roomCode: "test-room",
        }),
        (err) => {
            if (err) {
                console.error("Erreur lors de l'envoi du message JOIN_ROOM :", err);
            }
        }
    );

    // Envoyer un message
    setTimeout(() => {
        socket.send(
            JSON.stringify({
                type: "SEND_MESSAGE",
                roomCode: "test-room",
                payload: { content: "Bonjour depuis Node.js !" },
            }),
            (err) => {
                if (err) {
                    console.error("Erreur lors de l'envoi du message SEND_MESSAGE :", err);
                }
            }
        );
    }, 1000);
});

socket.on("message", (data) => {
    try {
        const message = JSON.parse(data.toString());
        console.log("Message reçu :", message);
    } catch (error) {
        console.error("Erreur lors de la réception du message :", error);
    }
});

socket.on("close", () => {
    console.log("Connexion fermée");
});

socket.on("error", (error) => {
    console.error("Erreur WebSocket :", error);
});
