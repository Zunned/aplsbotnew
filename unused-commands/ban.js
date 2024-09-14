const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { friendlies } = require('../channelconfig.json');
const { Mod } = require('../perms.json');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('ban a user')
		.addUserOption(option => option.setName('user').setDescription('user').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
	
		if (!interaction.member.roles.cache.has(Mod)) {
			await interaction.reply({content: "You dont have the required permissions to do this command.", ephemeral: true,});
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
	const embed = new EmbedBuilder()
  .setTitle("✅ Successfully banned the user")
  .setDescription(`The user ${user.user.username} was banned.`)
  .setColor("#00ff0b")
  .setFooter({
    text: `Banned by ${interaction.user.username}`,
    iconURL: interaction.user.avatarURL(),
  })
  .setTimestamp();

  	interaction.guild.members.ban(user);

	await interaction.reply({
		embeds: [embed] 
	 })
	},	
};
