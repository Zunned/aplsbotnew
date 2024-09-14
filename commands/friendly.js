const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { friendlies } = require('../channelconfig.json');

module.exports = {
	cooldown: 120,
	data: new SlashCommandBuilder()
		.setName('friendly')
		.setDescription('Announce your team is looking for a friendly')
		.addStringOption(option => option.setName('text').setDescription('text').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
		if (!interaction.member.roles.cache.has("1149478114397786192") && !interaction.member.roles.cache.has("1149478116633362464") && !interaction.member.roles.cache.has("1149478118336254094")) {
			await interaction.reply({content: "You dont have the required permissions to do this command.", ephemeral: true,});
			return;
		  }
	const nickName = interaction.member.nickname
	const avatar = interaction.user.avatarURL
	const channel = interaction.guild.channels.cache.get(friendlies);



	const { EmbedBuilder } = require('discord.js');
	
	const txt = interaction.options.getString("text");

	const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Friendly')
		.setAuthor({ name: `${nickName}`, iconURL: `${avatar}`})
		.setDescription(txt)
		.setTimestamp()

	channel.send({content: "<@&1274469219626385531>",embeds: [exampleEmbed]});

	await interaction.reply({
		content: '``Sent!``',
		ephemeral: true,
	 })
	},	
};
