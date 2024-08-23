const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle} = require('discord.js');
const { botcmds } = require('../channelconfig.json');
const noblox = require('noblox.js')
const { cookie } = require('../config.json');
const ranksjsn = require('../ranks.json');
const testschema =  require('../Schemas/test')
var currenttype = "Request"

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('aplsverify')
		.setDescription(`Verify your roblox account`)
		.addStringOption(option => option.setName('roblox_username').setDescription('your_roblox_username.').setRequired(true)),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */
	
		

	 async execute(interaction) {

		interaction.reply("This command is disabled for now."); return

		const row = new ActionRowBuilder()
		.addComponents(
		accept = new ButtonBuilder()
			 .setCustomId('acceptbutton')
			 .setLabel('Finished')
			 .setStyle(ButtonStyle.Success)
			 .setDisabled(false)
		);

		noblox.setCookie(cookie)
		const restrictedRoleID = '1092712701165326435';
		const alreadygot = "1092712701177897061"
		const big1 = "1123347698788081854"
		const big2 = "1123786189057564736"
		const big3 = "1123786084363554816"
		const div1 = "1123344455768998011"
		const div2 = "1123039464906821673"
		const div3 = "1123039472909557821"
		const div4 = "1123045229054931074"
		const div5 = "1123045229054931074"
		const nickName = interaction.member.nickname;
		const avatar = interaction.user.avatarURL();
		const channel = interaction.guild.channels.cache.get(botcmds);
		const robloxUser = await noblox.getIdFromUsername(interaction.options.getString("roblox_username"))
		if (!robloxUser) return interaction.reply("That user does not exist.")
		await delay(100);
		const request2 = await noblox.getRankInGroup(5161570,robloxUser)
		currenttype = "InGroup"
		await delay(100);
		if (!request2){
			const request = await noblox.getJoinRequest(5161570,robloxUser)
			if (!request) return interaction.reply("You need to already have a pending join request/already be in the group.")
			currenttype = "Request"
		}
		await delay(100);
		if (!interaction.member.roles.cache.has(restrictedRoleID)) {
			await interaction.reply("Verify with the AltDentifier bot before running this command");
			return;
		  }
		  if (interaction.member.roles.cache.has(alreadygot)) {
			await interaction.reply("You're already verified.");
			return;
		  }	
		  
		const verifiedString = getVerifiedString()
		  
		  const embed = new EmbedBuilder()
		  .setTitle("Verification Steps")
		  .setDescription(`Put this in your Roblox profiles "About".\n${verifiedString}\nOnce you're done press the "Finished" button.`)
		  .setImage("https://cdn.discordapp.com/attachments/673151136517193758/1124480083588038726/chrome_AZO76CaYrz.gif")
		  .setColor("#00b0f4")
		  .setFooter({
			text: "APLS Bot",
			iconURL: "https://cdn.discordapp.com/attachments/757414601972252762/1145075946316116058/APLSSERVER.png",
		  })
		  .setTimestamp();

		  const hehe = interaction.reply({embeds: [embed], components: [row]})

		  const filter = i => [i.customId === 'acceptbutton']  && i.user.id === interaction.user.id

	 const collector = interaction.channel.createMessageComponentCollector({ filter, time: 200000 });
	 
	 collector.on('collect', async i => {
		 if (i.customId === 'acceptbutton') {

			const about = await noblox.getBlurb(robloxUser)

		if (!about.includes(verifiedString)) return i.reply("The string could not be found, please try again.");
			 interaction.member.roles.add(div5)
			 interaction.member.roles.remove("1092712701165326428")			
			 await i.reply({ content: "Successfully verified.", ephemeral: true });
			 verifyalldizzys(interaction.member.user,interaction.client,robloxUser,interaction.options.getString("roblox_username"))
			 //await i.member.setNickname(`${interaction.options.getString("roblox_username")} | ${robloxUser}`)
			 row.components[0].setDisabled(false)
			 const new2 = embed.setColor("#00f444");
			 if (currenttype == "Request") {

				noblox.handleJoinRequest(5161570, robloxUser, true)
				await new Promise(resolve => setTimeout(resolve, 1000))
				const rn = await noblox.getRankNameInGroup(5161570,robloxUser)
				await delay(100);
				const value = ranksjsn[rn];
				interaction.member.roles.add(value)

			 } else if (currenttype == "InGroup") {

				const rn = await noblox.getRankNameInGroup(5161570,robloxUser)
				await delay(100);
				const value = ranksjsn[rn];
				interaction.member.roles.add(value)

			 }
			interaction.member.roles.add(big1)
			await delay(100);
			interaction.member.roles.add(big2)
			await delay(100);
			interaction.member.roles.add(big3)
			await delay(100);
			interaction.member.roles.add(div1)
			await delay(100);
			interaction.member.roles.add(div2)
			await delay(100);
			interaction.member.roles.add(div3)
			await delay(100);
			interaction.member.roles.add(div4)
			await delay(100);
			interaction.member.roles.add(alreadygot)
			interaction.editReply({content: `:white_check_mark: Successfully verified, welcome to APLS ${interaction.options.getString("roblox_username")}.`,embeds: [new2], components: [row]});
			const realquck = await noblox.getRankNameInGroup(5161570,robloxUser)

			testschema.create({
				DiscordID: interaction.user.id,
				Data: {
					
					"RobloxUsername": `${interaction.options.getString("roblox_username")}`,
					"IsAPLSVerified": true,
					"RankInGroup": `${realquck}`,
				
					"RobloxInfo": {
					
						"RobloxStuff": ""
					
					}
	
				}
	
			  })
		 }
		});
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