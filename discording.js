const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const configFirst = require("./config.js");
const config = configFirst.config;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
})


client.on('ready', async () => {
  console.log("bot is ready");

  const Guilds = client.guilds.cache.map(guild => guild.id);
  const guild = client.guilds.cache.get(Guilds[0]);  // (...)
  const members = await guild.members.fetch();
})

client.on('messageCreate', message => {
  if (message.content === "!ping") message.reply('pong');
  if (message.content === "!version") message.reply("0.2")
  if (message.content === ("!dm")) {
    client.users.cache.get(message.author.id).send('hi');
  }
})

client.on("warn", () => {
  console.log("warn")
})


client.on('rateLimit', (rateLimitInfo) => {
  console.log(rateLimitInfo);
});

function sendMsg(ids, msg) { 
  for (let i = 0; i < ids.length; ++i) {
    const user = client.users.cache.find(u => u.tag === ids[i])
    user.send(msg);
  }
}


client.login(config.discord.config.dcToken);



module.exports = { sendMsg };