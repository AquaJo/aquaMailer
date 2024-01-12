const { Client, GatewayIntentBits, REST } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const configFirst = require("./config.js");
const config = configFirst.config;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = [
  {
    name: "ping",
    description: "Test the bot's responsiveness with a simple ping command",
  },
  {
    name: "version",
    description: "Get the current version of the bot",
  },
  {
    name: "dm",
    description: "Send a direct message to the user",
  },
  // Add more commands as needed
];

const rest = new REST({ version: '9' }).setToken(config.discord.config.dcToken);

client.once('ready', async () => {
  console.log("Bot is ready");

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
  const Guilds = client.guilds.cache.map(guild => guild.id);
  const guild = client.guilds.cache.get(Guilds[0]);  // (...)  lazy ...
  const members = await guild.members.fetch(); // fills cache ig
});

client.on('messageCreate', message => {
  if (message.content === "!ping") message.reply('pong');
  if (message.content === "!version") message.reply("0.2");
  if (message.content === "!dm") {
    client.users.cache.get(message.author.id).send('hi');
  }
});

// Discord.js Slash Commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'version') {
    await interaction.reply('0.2');
  } else if (commandName === 'dm') {
    await interaction.user.send('Hi!');
    await interaction.reply('Message sent!');
  }
});

client.on("warn", () => {
  console.log("Warn");
});

client.on('rateLimit', (rateLimitInfo) => {
  console.log(rateLimitInfo);
});

function sendMsg(ids, msg) {
  console.log(client.users.cache.map(u => u.tag));
  for (let i = 0; i < ids.length; ++i) {
    const user = client.users.cache.find(u => u.tag === ids[i]);
    user.send(msg);
  }
}

client.login(config.discord.config.dcToken);

module.exports = { sendMsg };
