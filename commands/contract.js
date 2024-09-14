//const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits} = require('discord.js');
const { Permissions } = require('discord.js');
const { message } = require('noblox.js');
const { contractlogs } = require('../channelconfig.json');
const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const { v4: uuidv4 } = require('uuid');
const { Manager } = require('../perms.json');
const { Assistant } = require('../perms.json');


module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('contract')
		.setDescription('sign players to your team')
		.addUserOption(option => option.setName('signee').setDescription('Player').setRequired(true))
		.addRoleOption(option => option.setName('team').setDescription('Team').setRequired(true))
		.addStringOption(option => option.setName('position').setDescription('Position').setRequired(true))
		.addStringOption(option => option.setName('role').setDescription('Role').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
		if (!interaction.member.roles.cache.has(Manager) && !interaction.member.roles.cache.has(Assistant)) {
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
	const team = interaction.options.getRole("team");
	const contractor = interaction.user
	function generateContractID(contractorID, signeeID) {
		const timestamp = Date.now();
		const random = Math.floor(Math.random() * 1000); // You can adjust this range as needed
		return `${contractorID}${signeeID}${timestamp}${random}`;
	  }
	const ContractID = uuidv4()
	//const channel = interaction.guild.channels.cache.get(botcmds);
	const channel2 = interaction.guild.channels.cache.get(contractlogs);
	//const contractshit = interaction.guild.channels.cache.get("1276220015477133333")

	const { EmbedBuilder } = require('discord.js');

	async function sendContractInformation(ContractID, contractor, signee, team, position, role) {
		const contractChannel = interaction.guild.channels.cache.get("1274459246129319956"); // Replace with the actual channel ID where you want to send the contract info
		
		if (!contractChannel) {
		  console.error("Contract channel not found.");
		  return;
		}
	  
		const exampleEmbed = new EmbedBuilder()
		  .setTitle("Team Contract")
		  .setDescription("Contract ID: " + ContractID)
		  .addFields(
			{
			  name: "Signee:",
			  value: `<@${signee.id}>`,
			  inline: true,
			},
			{
			  name: "Contractor",
			  value: `<@${contractor.id}>`,
			  inline: true,
			},
			{
			  name: "Team:",
			  value: `<@&${team.id}>`,
			  inline: true,
			},
			{
			  name: "Position:",
			  value: `${position}`,
			  inline: true,
			},
			{
			  name: "Role:",
			  value: `${role}`,
			  inline: true,
			}
		  )
		  .setColor("#00b0f4")
		  .setFooter({
			text: "Professional Roblox Football Federation",
			iconURL: "https://i.ibb.co/yQQqfzT/lool.png",
		  })
		  .setTimestamp();
	  
		await contractChannel.send({ embeds: [exampleEmbed] });
	  }
	  

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
	  text: "Professional Roblox Football Federation",
	  iconURL: "https://i.ibb.co/yQQqfzT/lool.png",
	})
	.setTimestamp();

	//console.log(`Creating channel: ${signee.username}'s-${team} Contract`);

	const botcmds = interaction.guild.channels.create({
		name: `${(await interaction.guild.members.fetch(signee)).nickname}'s ${team} contract`,
		type: ChannelType.GuildText,
		parent: '1276220015477133333',
		permissionOverwrites: [
			{
			  id: interaction.guild.roles.everyone.id,
			  deny: [PermissionFlagsBits.ViewChannel],
		   },
		   {
			id: contractor.id,
			allow: [PermissionFlagsBits.ViewChannel],
		 },
		 {
			id: signee.id,
			allow: [PermissionFlagsBits.ViewChannel],
		 }
		 ],
	  });

	const xd = interaction.guild.channels.cache.get((await botcmds).id);
	const hehe = await xd.send({content: `:page_facing_up: | <@${contractor.id}>, <@${signee.id}>`,embeds: [exampleEmbed], components: [row]});

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

			 sendContractInformation(ContractID, contractor, signee, team, position, role);

			 await delay(5000)
			 await xd.delete()
			 .then(deletedChannel => {
			   console.log(`Deleted channel: ${deletedChannel.name}`);
			 })
			 .catch(error => {
			   console.error(`Error deleting channel: ${error}`);
			 });



			

		 } else if (i.customId === 'denybutton') {
			await i.reply({ content: "You have denied this contract", ephemeral: true });
			 row.components[0].setDisabled(true)
			 row.components[1].setDisabled(true)
			 const new3 = exampleEmbed.setColor("#f40036");
			 hehe.edit({content: `:x: | <@${contractor.id}>, the player has denied the contract.`,embeds: [new3], components: [row]});
			 await delay(5000)
			 await xd.delete()
			 .then(deletedChannel => {
			   console.log(`Deleted channel: ${deletedChannel.name}`);
			 })
			 .catch(error => {
			   console.error(`Error deleting channel: ${error}`);
			 });
		 }

	 });

	 collector.on('end', async (collected, reason) => {

		if (reason === 'time') {
			if (collected.size > 0) return
			console.log('Collector ended:', collected.size, 'interactions collected');
			row.components[0].setDisabled(true)
			row.components[1].setDisabled(true)
			const new3 = exampleEmbed.setColor("#f40036");
			hehe.edit({content: `:x: | <@${contractor.id}>, the contract has expired.`,embeds: [new3], components: [row]});
			await delay(5000)
			await xd.delete()
			.then(deletedChannel => {
			  console.log(`Deleted channel: ${deletedChannel.name}`);
			})
			.catch(error => {
			  console.error(`Error deleting channel: ${error}`);
			});
		}

	});

	},	
};
