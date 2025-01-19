const WebSocket = require("ws");

// Connect to the WebSocket server
const ws = new WebSocket("ws://localhost:5000");

ws.on("open", () => {
    console.log("🟢 Connected to WebSocket server");

    // Send the CREW_SELECTED message
    const message = {
        type: "CREW_SELECTED",
        roomCode: "Q979VR",
        selectedCrew: ["tester1@gmail.com", "tester3@gmail.com", "tester2@gmail.com"],
    };

    ws.send(JSON.stringify(message));
    console.log("📤 Message sent:", message);
});

ws.on("message", (data) => {
    console.log("📩 Response received:", data.toString());
});

ws.on("close", () => {
    console.log("🔴 Disconnected from WebSocket server");
});

ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err);
});
