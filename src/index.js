import { Collection } from "discord.js";
import fs from "fs"

const commands = new Collection();
const commandFiles = fs
    .readdirSync("src/commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    try {
        command.default.data.aliases.forEach(element => {
            commands.set(element, command.default.execute)
        });
    } catch (err) {
        console.error(err);
        console.error(`failed to load command: ${file}, likely missing data`);
    }
}

async function MessageCreate(message) {
    if (!message.content.startsWith("p/")) {
        message.reply("no prefix idiot")
        return;
    }
    const commandcased =
            message.content // this is just the substring between the prefix and the first space lowercased
                .slice(2)
                .split(/ +/)
                .shift() || "";
        const command = commandcased.toLowerCase();

        if (command == "") {
            log.error("no command found in message");
            return;
        } // return if command == '' (probably caused by entering just the prefix)

        if (!commands.has(command)) {
            message.reply(`invalid command: ${command}, baffoon!`);
            return;
        }
        const commandFn = commands.get(command);
        await commandFn(message)
}

process.stdin.on("data", async (data) => {
    const input = data.toString().trim();
    class SpoofMessage {
        constructor() {
                this.content = input,
                this.cleanContent = input,
                this.bot = false,
                this.channel = {
                    id: "1",
                    name: "output",
                    type: "text",
                    guild: {
                        id: "1",
                        name: "console_guild",
                    },
                    send: (content) => console.log(content),
                },
                this.channelId = this.channel.id,
                this.author = {
                    id: "1",
                    username: "CONSOLE",
                    bot: false
                },
                this.reply = (content) => console.log(content),
                this.guild = this.channel.guild
        }
    }
    const spoofedMsg = await new SpoofMessage();
    MessageCreate(spoofedMsg)
});