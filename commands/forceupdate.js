const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle} = require('discord.js');
const { botcmds } = require('../channelconfig.json');
const noblox = require('noblox.js')
const { cookie } = require('../config.json');
const ranksjsn = require('../ranks.json');
const { Staff } = require('../perms.json');
module.exports = {
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('forceupdate')
		.setDescription(`Update someones roles for them`)
		.addUserOption(option => option.setName('user').setDescription('user').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */
	
		

	 async execute(interaction) {
		if (!interaction.member.roles.cache.has(Staff)) {
			await interaction.reply("You dont have the required permissions to do this command.");
			return;
		  }
		const row = new ActionRowBuilder()
		.addComponents(
		accept = new ButtonBuilder()
			 .setCustomId('acceptbutton')
			 .setLabel('Finished')
			 .setStyle(ButtonStyle.Success)
			 .setDisabled(false)
		);

		noblox.setCookie(cookie)
		const userx = interaction.options.getMember("user");
		const siz = userx.nickname.split(' ');
		//const restrictedRoleID = '1092712701177897061';
		const nickName = interaction.member.nickname;
		const avatar = interaction.user.avatarURL();
		const channel = interaction.guild.channels.cache.get(botcmds);

		const robloxUser = await noblox.getIdFromUsername(siz[0])
		//console.log(`${userx} and ${siz[1]}`)
		if (!robloxUser) return interaction.reply("That user does not exist.")
		const request = await noblox.getRankInGroup(5161570,robloxUser)
		if (!request) return interaction.reply("You need to already be in the group.")



			 await interaction.reply({ content: "Successfully updated.", ephemeral: true });
			 verifyalldizzys(userx.user,interaction.client,robloxUser,siz[0])
			 if (interaction.guild && userx) {
				const memberRoles = userx.roles.cache;
			
				for (const roleName in ranksjsn) {
					const roleID = ranksjsn[roleName];
					const role = interaction.guild.roles.cache.get(roleID);
			  
					if (role && memberRoles.has(roleID)) {
					  console.log(`${userx.nickname} has the role ${roleName}`);
					  interaction.member.roles.remove(roleID)
				  }
				}
			  }
			 const rn = await noblox.getRankNameInGroup(5161570,robloxUser)
			 const value = ranksjsn[rn];
			 interaction.member.roles.add(value)
			 //await i.member.setNickname(`${interaction.options.getString("roblox_username")} | ${robloxUser}`)
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