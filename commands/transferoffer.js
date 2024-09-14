//const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits} = require('discord.js');
const { Permissions } = require('discord.js');
const { message } = require('noblox.js');
const { botcmds, contractlogs } = require('../channelconfig.json');
const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const { v4: uuidv4 } = require('uuid');


module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('transferoffer')
		.setDescription('request a player transfer')
		.addUserOption(option => option.setName('manager').setDescription('The the manager youre dealing with.').setRequired(true))
		.addUserOption(option => option.setName('receiving_player').setDescription('The player you want to receive.'))
		.addIntegerOption(option => option.setName('receiving_money').setDescription('The ammount of money you want to receive.'))
		.addUserOption(option => option.setName('offered_player').setDescription(`The player you're giving.`))
		.addIntegerOption(option => option.setName('offered_money').setDescription('The ammount of money you want to give.')),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {


		if (!interaction.member.roles.cache.has("1149478114397786192")) {
			await interaction.reply({content: "You dont have the required permissions to do this command.", ephemeral: true,});
			return;
		  }

		  const clubs = ["1123345147959189524", "1123345149011968000", "1123345149381050400", "1123345150748393502", "1123345152388366376", "1123345153185284116", "1123345154003185664", "1123345155395698829", "1123345156259721267", "1123345160617599020", "1123345161406124063", "1123345162765086761", "1154949367694889030", "1154949368533766245", "1154949369146118145", "1154949377681543208"]


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
	
	const signee = interaction.options.getUser("manager");
	const testu = interaction.options.getMember("manager");
	const position = interaction.options.getUser("offered_player") ?? "Nothing"
	const role = interaction.options.getInteger('offered_money') ?? "Nothing"
	const team = interaction.options.getInteger('receiving_money') ?? "Nothing"
	const contractor = interaction.options.getUser("receiving_player") ?? "Nothing"
	const ContractID = uuidv4()
	const channel = interaction.guild.channels.cache.get(botcmds);
	const channel2 = interaction.guild.channels.cache.get(contractlogs);

	const { EmbedBuilder } = require('discord.js');




	async function sendContractInformation(ContractID, contractor, signee, team, position, role) {
		const contractChannel = interaction.guild.channels.cache.get("1101887113571618957"); // Replace with the actual channel ID where you want to send the contract info
		
		if (!contractChannel) {
		  console.error("Contract channel not found.");
		  return;
		}
	  
		const exampleEmbed = new EmbedBuilder()
		  .setTitle("Team Contract")
		  .setDescription("Contract ID: " + ContractID)
		  .addFields(
			{
			  name: "Manager:",
			  value: `<@${signee.id}>`,
			  inline: true,
			},
			{
				name: "Offer By:",
				value: `<@${interaction.user.id}>`,
				inline: true,
			  },
			{
			  name: "Wanted Player:",
			  value: `<@${contractor.id}>`,
			  inline: true,
			},
			{
			  name: "Wanted Money:",
			  value: `${team}`,
			  inline: true,
			},
			{
			  name: "Receiving Player:",
			  value: `<@${position.id}>`,
			  inline: true,
			},
			{
			  name: "Receiving Money:",
			  value: `${role}`,
			  inline: true,
			}
		  )
		  .setColor("#00b0f4")
		  .setFooter({
			text: "American Professional League Soccer",
			iconURL: "https://i.ibb.co/Gpsnq2c/apls-logo.png",
		  })
		  .setTimestamp();
	  
		await contractChannel.send({ embeds: [exampleEmbed] });
	  }
	  

	const exampleEmbed = new EmbedBuilder()
	.setTitle("Transfer Contract")
	.setDescription("Signing this contract means you agree to the transfer of assets outlined in the contract.")
	.addFields(
	  {
		name: "Manager:",
		value: `<@${signee.id}>`,
		inline: true
	  },
	  {
		name: "Wanted Player:",
		value: `<@${contractor.id}>`,
		inline: true
	  },
	  {
		name: "Wanted Money:",
		value: `${team}`,
		inline: true
	  },
	  {
		name: "Receiving Player:",
		value: `<@&${position.id}>`,
		inline: true
	  },
	  {
		name: "Receiving Money:",
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

	//console.log(`Creating channel: ${signee.username}'s-${team} Contract`);
	const newchan = await interaction.guild.channels.create({
		name: `${(await interaction.guild.members.fetch(signee)).nickname}-&-${interaction.member.nickname}-transfer-offer`,
		type: ChannelType.GuildText,
		parent: '1092712702234873869',
		permissionOverwrites: [
			{
			  id: interaction.guild.roles.everyone.id,
			  deny: [PermissionFlagsBits.ViewChannel],
		   },
		   {
			id: interaction.user.id,
			allow: [PermissionFlagsBits.ViewChannel],
		 },
		 {
			id: signee.id,
			allow: [PermissionFlagsBits.ViewChannel],
		 }
		 ],
	  });

	const xd = interaction.guild.channels.cache.get((await newchan).id);
	const hehe = await xd.send({content: `:page_facing_up: | <@${interaction.user.id}>, <@${signee.id}>`,embeds: [exampleEmbed], components: [row]});

	await interaction.reply({
		content: '``Sent!``',
		ephemeral: true
	 })
	 const filter = i => [i.customId === 'acceptbutton' || i.customId === 'denybutton']  && i.user.id === signee.id 

	 const collector = hehe.createMessageComponentCollector({ filter, time: 15000 });
	 
	 collector.on('collect', async i => {
		 if (i.customId === 'acceptbutton') {
			 await i.reply({ content: "You have accepted this offer", ephemeral: true });
			 row.components[0].setDisabled(true)
			 row.components[1].setDisabled(true)
			 const new2 = exampleEmbed.setColor("#00f444");
			 hehe.edit({content: `:white_check_mark: | <@${interaction.user.id}>, the manager has accepted the offer.`,embeds: [new2], components: [row]});


			 await delay(100);
			 

			 sendContractInformation(ContractID, contractor, signee, team, position, role);

			 await delay(5000)
			 await newchan.delete()
			 .then(deletedChannel => {
			   console.log(`Deleted channel: ${deletedChannel.name}`);
			 })
			 .catch(error => {
			   console.error(`Error deleting channel: ${error}`);
			 });



			

		 } else if (i.customId === 'denybutton') {
			await i.reply({ content: "You have denied this offer", ephemeral: true });
			 row.components[0].setDisabled(true)
			 row.components[1].setDisabled(true)
			 const new3 = exampleEmbed.setColor("#f40036");
			 hehe.edit({content: `:x: | <@${interaction.user.id}>, the manager has denied the offer.`,embeds: [new3], components: [row]});
			 await delay(5000)
			 await newchan.delete()
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
			hehe.edit({content: `:x: | <@${interaction.user.id}>, the offer has expired.`,embeds: [new3], components: [row]});
			await delay(5000)
			await newchan.delete()
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
