const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle} = require('discord.js');
const { botcmds } = require('../channelconfig.json');
const noblox = require('noblox.js')
const { cookie } = require('../config.json');
const ranksjsn = require('../ranks.json');
const { Staff } = require('../perms.json');
const testschema =  require('../Schemas/test')
const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
	cooldown: 0,
	data: new SlashCommandBuilder()
		.setName('forceupdate')
		.setDescription(`Update someones roles for them`)
		.addUserOption(option => option.setName('user').setDescription('user').setRequired(true))
		.addStringOption(option => option.setName('roblox_username').setDescription('roblox username.').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */
	
		

	 async execute(interaction) {

		interaction.reply("This command is disabled for now."); return

		const tisdadata = await testschema.findOne({DiscordID: interaction.options.getUser("user").id})

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
		//const siz = userx.nickname.split(' ');
		//if (!siz) return interaction.reply("No username found")
		//const restrictedRoleID = '1092712701177897061';
		const nickName = interaction.member.nickname;
		const avatar = interaction.user.avatarURL();
		const channel = interaction.guild.channels.cache.get(botcmds);
		
		const robloxUser = await noblox.getIdFromUsername(interaction.options.getString("roblox_username"))
		//console.log(`${userx} and ${siz[1]}`)
		if (!robloxUser) return interaction.reply("That user does not exist.")
		const request = await noblox.getRankInGroup(5161570,robloxUser)
		if (!request) return interaction.reply("You need to already be in the group.")



			 await interaction.reply({ content: "Successfully updated.", ephemeral: true });
			 verifyalldizzys(userx.user,interaction.client,robloxUser,interaction.options.getString("roblox_username"))
			 if (interaction.guild && userx) {
				const memberRoles = userx.roles.cache;
			
				for (const roleName in ranksjsn) {
					const roleID = ranksjsn[roleName];
					const role = interaction.guild.roles.cache.get(roleID);
			  
					if (role && memberRoles.has(roleID)) {
					  console.log(`${userx.nickname} has the role ${roleName}`);
					  userx.roles.remove(roleID)
					  await delay(500);
				  }
				}
			  }
			 const rn = await noblox.getRankNameInGroup(5161570,robloxUser)
			 const value = ranksjsn[rn];
			 await delay(500);
			 userx.roles.add(value)
			 //await i.member.setNickname(`${interaction.options.getString("roblox_username")} | ${robloxUser}`)

			 if (!tisdadata){

				testschema.create({
					DiscordID: interaction.options.getUser("user").id,
					Data: {
						
						"RobloxUsername": `${interaction.options.getString("roblox_username")}`,
						"IsAPLSVerified": true,
						"RankInGroup": `${rn}`,
					
						"RobloxInfo": {
						
							"RobloxStuff": ""
						
						}
		
					}
		
				  });
				  return;

			}

			tisdadata.collection.findOneAndUpdate(

				{DiscordID: Number(interaction.options.getUser("user").id)},

				
					{$set:{Data: {			
					RobloxUsername: `${interaction.options.getString("roblox_username")}`,
					IsAPLSVerified: true,
					RankInGroup: `${rn}`,
					RobloxInfo: {
						
						RobloxStuff: ""
					
					}

					}}}
	 		)
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