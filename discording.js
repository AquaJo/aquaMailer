
// HERE IS SOME JS CODE FOR SENDING MESSAGES TO DISCORD, ASIDE FROM THE MAIN INTENTION PROGRAMMED IN INDEX.JS, A MAIL-FORWARDING-SERVICE

// Require the necessary discord.js classes
/*
const { Client, Events, GatewayIntentBits } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token

client.on('message', (msg) => {
  console.log("TRIGGER")
  client.on('message', message => {
    if (message.content === '!ping') {
      message.channel.send('Pong.');
    }
  });
});

client.login(process.env.DC_TOKEN);
/*
client.on('message', (msg) => {
  cconsole.log("TRIGGER")
  client.on('message', message => {
    if (message.content === '!ping') {
      message.channel.send('Pong.');
    }
  });
});

const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('pingaa')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};*/


/*
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
})

client.on("ready", (client) => {
  console.log(`${client.user.username} is ready!`);
})
*/


/*
const Discord= require("discord.js") // Import Discord.js for use in the project
const fs = require("fs") // Import FS to read event files

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        // ...
    ]
})

client.commands = new Discord.Collection() // Create an object-like data structure to store all our commands
client.cooldowns = new Discord.Collection() // Also create one for user cooldowns

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Get all files ending with .js in the commands folder
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); // Get all files ending with .js in the events folder

for(const file of commandFiles) { // For each file in the commands folder that we fetched earlier do:
  const command = require(`./commands/${file}`); // Import the file to the current instance
  client.commands.set(command.name, command); // Set it to the commands collection
}

for (const file of eventFiles) { // For each file in the events folder do:
  const event = require(`./events/${file}`); // Import the file
  if (event.once) { // event.once means should it be run once, which we will cover more of later.
    client.once(event.name, (...args) => event.run(...args, client)); // Define the event to run when called, but only once
  } else {
    client.on(event.name, (...args) => event.run(...args, client)); // Define the event to run every time it is called. Pass all arguments to the event code.
  }
}

// To start setting up commands, next read interactionCreate.js in the events folder

client.login(process.env.DC_TOKEN) // Your bot token must be secured, read these steps to set one up:


/*
1. To create your bot account, go to https://discord.com/developers/applications
2. Click new application and give it a name
3. On the left panel, click "Bot"
4. Make the application into a bot user
5. Copy the token
6. On the left side of this repl, click the padlock
7. In the key, type "token" without the quotes. In the value, paste the token
8. Hit "Add new secret"

Your bot can now be customised on the developer portal. You must not share your bot token or anyone will be able to access it with full permissions.
*/


const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.on('ready', () => {
  console.log("bot is ready");
  //client.user.setUsername("aquaMailer");
})

client.on('messageCreate', message => {
  if (message.content === "!ping") message.reply('pong');
  if (message.content === ("!dm")) {
    client.users.cache.get(message.author.id).send('HI');
    console.log(message.author)
  }
})

client.on("warn", () => {
  console.log("warn")
})


client.on('debug', (info) => {
  //console.log(info)
  if (info === '429 on /client/login') {
    exec('kill 1', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
});

client.on('rateLimit', (rateLimitInfo) => {
  console.log("rateLimitInfo")
});

client.login('MTA2NTM0NDE3NDg2NzYyMzkzNg.GLdelF.npC8nImuFjQBwoefH0vJB75OnS8pXVo9oe774g');
