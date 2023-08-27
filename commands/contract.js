const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField} = require('discord.js');
const { message } = require('noblox.js');
const { botcmds, contractlogs } = require('../channelconfig.json');

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('contract')
		.setDescription('sign players to your team')
		.addUserOption(option => option.setName('signee').setDescription('Player').setRequired(true))
		.addStringOption(option => option.setName('team').setDescription('Team').setRequired(true))
		.addStringOption(option => option.setName('position').setDescription('Position').setRequired(true))
		.addStringOption(option => option.setName('role').setDescription('Role').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
		if (!interaction.member.roles.cache.has("1092712701177897064")) {
			await interaction.reply("You dont have the required permissions to do this command.");
			return;
		  }
	const row = new ActionRowBuilder()
	.addComponents(
		accept = new ButtonBuilder()
			 .setCustomId('acceptbutton')
			 .setLabel('Accept')
			 .setStyle(ButtonStyle.Success)
			 .setDisabled(false),
		deny = new ButtonBuilder()
			 .setCustomId('denybutton')
			 .setLabel('Deny')
			 .setStyle(ButtonStyle.Danger)
			 .setDisabled(false)
	 );
	
	const signee = interaction.options.getUser("signee");
	const position = interaction.options.getString("position");
	const role = interaction.options.getString("role");
	const team = interaction.options.getString("team");
	const contractor = interaction.user
	//const AddIDS = contractor.id+signee.id
	const ContractID = contractor.id+signee.id/interaction.id
	const channel = interaction.guild.channels.cache.get(botcmds);
	const channel2 = interaction.guild.channels.cache.get(contractlogs);

	const { EmbedBuilder } = require('discord.js');

	const exampleEmbed = new EmbedBuilder()
	.setTitle("Team Contract")
	.setDescription("Signing this contract means you agree to join the team the contractor is offering, and stay with the team until the end of the season, team disbandment, or getting released.")
	.addFields(
	  {
		name: "Signee:",
		value: `<@${signee.id}>`,
		inline: true
	  },
	  {
		name: "Contractor",
		value: `<@${contractor.id}>`,
		inline: true
	  },
	  {
		name: "Contract ID:",
		value: `${ContractID}`,
		inline: true
	  },
	  {
		name: "Team:",
		value: `${team}`,
		inline: true
	  },
	  {
		name: "Position:",
		value: `${position}`,
		inline: true
	  },
	  {
		name: "Role:",
		value: `${role}`,
		inline: true
	  },
	)
	.setColor("#00b0f4")
	.setFooter({
	  text: "American Professional League Soccer",
	  iconURL: "https://i.ibb.co/Gpsnq2c/apls-logo.png",
	})
	.setTimestamp();

	const hehe = await channel.send({content: `:page_facing_up: | <@${contractor.id}>`,embeds: [exampleEmbed], components: [row]});

	await interaction.reply({
		content: '``Sent!``',
		ephemeral: true
	 })
	 const filter = i => [i.customId === 'acceptbutton' || i.customId === 'denybutton']  && i.user.id === signee.id 

	 const collector = hehe.createMessageComponentCollector({ filter, time: 15000 });
	 
	 collector.on('collect', async i => {
		 if (i.customId === 'acceptbutton') {
			 await i.reply({ content: "You have accepted this contract", ephemeral: true });
			 row.components[0].setDisabled(true)
			 row.components[1].setDisabled(true)
			 const new2 = exampleEmbed.setColor("#00f444");
			 hehe.edit({content: `:white_check_mark: | <@${contractor.id}>, the player has accepted the contract.`,embeds: [new2], components: [row]});



			

		 } else if (i.customId === 'denybutton') {
			await i.reply({ content: "You have denied this contract", ephemeral: true });
			 row.components[0].setDisabled(true)
			 row.components[1].setDisabled(true)
			 const new3 = exampleEmbed.setColor("#f40036");
			 hehe.edit({content: `:x: | <@${contractor.id}>, the player has denied the contract.`,embeds: [new3], components: [row]});
		 };
	 });

	},	
};
