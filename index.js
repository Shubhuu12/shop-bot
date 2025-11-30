const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID; // channel where bot posts

client.once("ready", () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});

// ROUTE THAT THE ROBLOX GAME WILL CALL
app.post("/shop-update", async (req, res) => {
    const { items } = req.body;

    const channel = await client.channels.fetch(CHANNEL_ID);

    const message = `🔔 **New Shop Rotation!**\n${items.map(i => `• ${i}`).join("\n")}`;

    channel.send(message);

    res.send("OK");
});

client.login(TOKEN);

// Start server
app.listen(3000, () => console.log("Bot server is running"));
