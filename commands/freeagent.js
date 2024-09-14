const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { freeagency } = require('../channelconfig.json');

module.exports = {
	cooldown: 120,
	data: new SlashCommandBuilder()
		.setName('freeagent')
		.setDescription(`Announce you're looking for a team to join`)
		.addStringOption(option => option.setName('text').setDescription('text').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
	const nickName = interaction.member.displayName
	const avatar = interaction.user.avatarURL()
	const channel = interaction.guild.channels.cache.get(freeagency);



	const { EmbedBuilder } = require('discord.js');
	
	const txt = interaction.options.getString("text");

	const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Free Agent')
		.setAuthor({ name: `${nickName}`, iconURL: `${avatar}`})
		.setDescription(txt)
		.setTimestamp()

	channel.send({content: "<@1092712701165326433>",embeds: [exampleEmbed]});

	await interaction.reply({
		content: '``Sent!``',
		ephemeral: true,
	 })
	},	
};
