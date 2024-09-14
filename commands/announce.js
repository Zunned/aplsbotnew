const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction} = require('discord.js');
const { friendlies } = require('../channelconfig.json');
const { HR } = require('../perms.json');
module.exports = {
	cooldown: 1,
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announcements')
		.addChannelOption(option => option.setName('channel').setDescription('channel').setRequired(true))
		.addStringOption(option => option.setName('title').setDescription('title').setRequired(true))
		.addStringOption(option => option.setName('text').setDescription('text').setRequired(true))
		.addBooleanOption(option => option.setName('ping_everyone').setDescription('ping everyone?').setRequired(true))
		.addStringOption(option => option.setName('image_link').setDescription('add a image link').setRequired(false)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {

		if (!interaction.member.roles.cache.has(HR)) {
			await interaction.reply("You dont have the required permissions to do this command.");
			return;
		  }

	const nickName = interaction.member.nickname
	const avatar = interaction.user.avatarURL()
	const channel = interaction.guild.channels.cache.get(friendlies);
	const pall = interaction.options.getBoolean("ping_everyone")


	const { EmbedBuilder } = require('discord.js');

	const title = interaction.options.getString("title");
	const img = interaction.options.getString("image link");
	const channelp = interaction.options.getChannel("channel")
	const txt = interaction.options.getString("text");

	const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(`${title}`)
		.setFooter({
			text: `${nickName}`,
			iconURL: `${avatar}` ,
		  })
		.setAuthor({ name: `Announcment`, iconURL: "https://i.ibb.co/yQQqfzT/lool.png"})
		.setDescription(txt)
		.setImage(img)
		.setTimestamp()

		if (pall == false) {

			channelp.send({embeds: [exampleEmbed]});

		} else if (pall == true) {

			channelp.send({content: "@everyone",embeds: [exampleEmbed]});

		}

	await interaction.reply({
		content: '``Sent!``',
		ephemeral: true,
	 })
	},	
};
