const express = require('express');
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const { token } = require('./config.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/receivePlayerData', (req, res) => {
  const playerData = req.body;

  const channelId = '1092712701773488252'; // Replace with your Discord channel ID

  const client = new Discord.Client();

  client.once('ready', () => {
    const channel = client.channels.cache.get(channelId);
    channel.send(`Received player data:\n${JSON.stringify(playerData, null, 2)}`);
    client.destroy();
  });

  client.login(token);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});