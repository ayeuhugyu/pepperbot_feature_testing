export class CommandData {
    constructor({aliases, description, permissions, permissionsReadable, whitelist, canRunFromBot, args}) {
        this.aliases = aliases;
        this.description = description;
        this.permissions = permissions;
        this.permissionsReadable = permissionsReadable;
        this.whitelist = whitelist;
        this.canRunFromBot = canRunFromBot
        this.args = args;
    }
}

export class Command {
    constructor({data, getArguments, execute}) {
        this.data = data;
        this.getArguments = getArguments
        this.execute = async (message) => {
            const args = this.getArguments(message);
            const data = this.data 
            let doNotRun = false
            if (data.whitelist && data.whitelist.length > 0) {
                if (!data.whitelist.includes(message.author.id)) {
                    message.channel.send("You do not have permission to run this command");
                    doNotRun = true
                    return
                }
            }
            if (!doNotRun) {
                return await execute(message, args);
            }
        }
    }
}