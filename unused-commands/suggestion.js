const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { suggestions } = require('../channelconfig.json');

module.exports = {
	cooldown: 120,
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Suggest a feature to add/remove from gameplay')
		.addStringOption(option => option.setName('title').setDescription('title').setRequired(true))
		.addStringOption(option => option.setName('content').setDescription('text').setRequired(true)),
		//.addAttachmentOption(option => option.setName('attachment').setDescription('add an attachment if needed').setRequired(false)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
	const nickName = interaction.member.nickname
	const avatar = interaction.user.avatarURL()
	const channel = interaction.guild.channels.cache.get(suggestions);



	const { EmbedBuilder } = require('discord.js');
	
	const cnt = interaction.options.getString("content");
	const ttl = interaction.options.getString("title");
	const img = interaction.options.getAttachment("attachment");

	const forum = interaction.guild.channels.cache.get('1145132822806401085');

	forum.threads
	.create({
	name: `${ttl} : ${interaction.member.displayName}` ,
	message: {
	content: cnt,
	},
	reason: 'Suggestion/Feedback',
	})
	.catch(console.error);

	await interaction.reply({
		content: '``Sent!``',
		ephemeral: true,
	 })
	},	
};
