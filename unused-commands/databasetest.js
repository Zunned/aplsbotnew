const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { friendlies } = require('../channelconfig.json');
const { Mod } = require('../perms.json');
const permsys = require('../perms.json');
const testschema =  require('../Schemas/test')
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('dbtest')
		.setDescription('test'),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {

    interaction.reply("This command is disabled for now."); return

		if (!interaction.member.roles.cache.has(Mod)) {
			await interaction.reply("You dont have the required permissions to do this command.");
			return;
		  }

	const nickName = interaction.member.nickname
	const avatar = interaction.user.avatarURL()
	const channel = interaction.guild.channels.cache.get(friendlies);


          testschema.create({

            DiscordID: interaction.user.id,
            Data: {
                
                "RobloxUsername": `Zun_ned`,
                "IsAPLSVerified": false,
                "RankInGroup": "Developer",
            
                "RobloxInfo": {
                
                    "RobloxStuff": ""
                
                }

            }

          })


	},	
};
