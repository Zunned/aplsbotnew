const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { friendlies } = require('../channelconfig.json');
const { Mod } = require('../perms.json');
const permsys = require('../perms.json');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('unban a user')
		.addUserOption(option => option.setName('user').setDescription('user').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {

		if (!interaction.member.roles.cache.has(Mod)) {
			await interaction.reply("You dont have the required permissions to do this command.");
			return;
		  }

	const nickName = interaction.member.nickname
	const avatar = interaction.user.avatarURL()
	const channel = interaction.guild.channels.cache.get(friendlies);



	const { EmbedBuilder } = require('discord.js');
	
	const user = interaction.options.getUser("user");
	const embed = new EmbedBuilder()
  .setTitle("✅ Successfully unbanned the user")
  .setDescription(`The user ${user.username} was banned.`)
  .setColor("#00ff0b")
  .setFooter({
    text: `Unbanned by ${interaction.user.username}`,
    iconURL: interaction.user.avatarURL(),
  })
  .setTimestamp();

	interaction.guild.members.unban(user);

	await interaction.reply({
		embeds: [embed] 
	 })
	},	
};
