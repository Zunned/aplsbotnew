const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle} = require('discord.js');
const { botcmds } = require('../channelconfig.json');
const noblox = require('noblox.js')
const { cookie } = require('../config.json');
const ranksjsn = require('../ranks.json');
module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription(`Update your roblox account`)
		.addStringOption(option => option.setName('roblox_username').setDescription('your_roblox_username.').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */
	
		

	 async execute(interaction) {
		const row = new ActionRowBuilder()
		.addComponents(
		accept = new ButtonBuilder()
			 .setCustomId('acceptbutton')
			 .setLabel('Finished')
			 .setStyle(ButtonStyle.Success)
			 .setDisabled(false)
		);

		noblox.setCookie(cookie)
		const restrictedRoleID = '1092712701177897061';
		const alreadygot = "1092712701177897061"
		const big1 = "1123347698788081854"
		const big2 = "1123786189057564736"
		const big3 = "1123786084363554816"
		const div1 = "1123344455768998011"
		const div2 = "1123039464906821673"
		const div3 = "1123039472909557821"
		const div4 = "1123045229054931074"
		const nickName = interaction.member.nickname;
		const avatar = interaction.user.avatarURL();
		const channel = interaction.guild.channels.cache.get(botcmds);
		const robloxUser = await noblox.getIdFromUsername(interaction.options.getString("roblox_username"))
		if (!robloxUser) return interaction.reply("That user does not exist.")
		const request = await noblox.getRankInGroup(5161570,robloxUser)
		if (!request) return interaction.reply("You need to already be in the group.")
		if (!interaction.member.roles.cache.has(restrictedRoleID)) {
			await interaction.reply("You need to verify first.");
			return;
		  }
		  const siz = interaction.member.nickname.split('');
		if (!siz[2] == robloxUser) return interaction.reply("Please provide your username.");
			 await interaction.reply({ content: "Successfully updated.", ephemeral: true });
			 verifyalldizzys(interaction.member.user,interaction.client,robloxUser,interaction.options.getString("roblox_username"))
			 const rn = await noblox.getRankNameInGroup(5161570,robloxUser)
			 const value = ranksjsn[rn];
			 interaction.member.roles.add(value)
			 //await i.member.setNickname(`${interaction.options.getString("roblox_username")} | ${robloxUser}`)
			interaction.member.roles.add(big1)
			interaction.member.roles.add(big2)
			interaction.member.roles.add(big3)
			interaction.member.roles.add(div1)
			interaction.member.roles.add(div2)
			interaction.member.roles.add(div3)
			interaction.member.roles.add(div4)
			interaction.member.roles.add(alreadygot)
	  }
	};
	
	function getVerifiedString() {
	  const possibleWords = ["testword1", "testword2", "testword3", "testword3", "testword4", "testword5"];
	  const securityString = [];
	  let securityStringLength = 0;
	
	  function get(minimum, maximum) {
		minimum = Math.ceil(minimum);
		maximum = Math.floor(maximum);
	
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	  }
	
	  while (securityStringLength <= 5) {
		securityString.push(possibleWords[get(0, 5)]);
		securityStringLength++;
	  }
	
	  return securityString.join(" ");
	}

	async function verifyalldizzys(user, daclient, robloxid, robloxuser) {
		const maindiz = "1092712701165326426";
		const refdiz = "1125897359054880808";
		const devdiz = "1112513529870827571";
		daclient.guilds.cache.forEach(async (guild) => {
		  if (guild.members.cache.get(user.id))
		  	await guild.members.cache
			  .get(user.id)
			  .setNickname(`${robloxuser} | ${robloxid}`)
			//await guild.members.fetch(user.id).setNickname(`${robloxuser} | ${robloxid}`);
		  
		});
	  
		return;
	  }