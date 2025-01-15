const socket = new WebSocket("ws://localhost:3000/api/socket");

socket.onopen = () => {
    console.log("Connexion WebSocket ouverte");

    // Exemple : Créer une room
    socket.send(
        JSON.stringify({
            type: "CREATE_ROOM",
            host: "Alice",
        })
    );
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message reçu :", data);
};

socket.onclose = () => {
    console.log("Connexion WebSocket fermée");
};
