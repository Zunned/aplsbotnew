const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { friendlies } = require('../channelconfig.json');
const { Mod } = require('../perms.json');
module.exports = {
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('timeout a user')
		.addUserOption(option => option.setName('user').setDescription('user').setRequired(true))
		.addNumberOption(option => option.setName('time').setDescription('time in minutes').setRequired(true)),

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

		  if (interaction.options.getMember("user").roles.cache.has(Mod)) {

			await interaction.reply("Cant do this command, this user is Moderator+")

		  }		  

	const nickName = interaction.member.nickname
	const avatar = interaction.user.avatarURL()
	const channel = interaction.guild.channels.cache.get(friendlies);



	const { EmbedBuilder } = require('discord.js');
	
	const user = interaction.options.getMember("user");
	const time = interaction.options.getNumber("time")
	const newtime = time
	const embed = new EmbedBuilder()
  .setTitle("Successfully timed out the user.")
  .setDescription(`The user ${user.user.username} was timed out for ${newtime} minute(s)`)
  .setColor("#00ff0b")
  .setFooter({
    text: `Timed out by ${interaction.user.username}`,
    iconURL: interaction.user.avatarURL(),
  })
  .setTimestamp();

	user.timeout(time*60_000);

	await interaction.reply({
		embeds: [embed] 
	 })
	},	
};
