const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction, EmbedBuilder} = require('discord.js');
const { freeagency } = require('../channelconfig.json');
const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
	cooldown: 120,
	data: new SlashCommandBuilder()
		.setName('ownerlist')
		.setDescription(`list all the owners`),

	/**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

	async execute(interaction) {
    // Define the array of team role IDs
    const teamRoles = ["1123345147959189524", "1123345149011968000", "1123345149381050400", "1123345147959189524", "1123345150748393502", "1123345152388366376", "1123345153185284116", "1123345154003185664", "1123345155395698829", "1123345156259721267", "1123345160617599020", "1123345161406124063", "1123345162765086761", "1154949367694889030", "1154949368533766245", "1154949369146118145", "1154949377681543208"];

    // Replace 'YOUR_ROLE_ID' with the actual owner role ID
    const ownerRoleId = '1149478114397786192'; // Owner role ID

    // Get the target role
    const targetRole = interaction.guild.roles.cache.get(ownerRoleId);

    if (!targetRole) {
      await interaction.reply('Owner role not found.');
      return;
    }

    // Find members with the owner role
    const owners = targetRole.members;

    if (owners.size > 0) {
      // Create an array to store the embed data
      const embedData = [];

      // Iterate through the owner members
      owners.forEach((ownerMember) => {
        const user = ownerMember.user;
        const userTag = user.tag;

        const userRoles = ownerMember.roles.cache;

        // Check if the owner has any of the team roles
        const teamRole = teamRoles.find((roleId) => userRoles.has(roleId));

        // Prepare the data to add to the embed description
        if (teamRole) {
          embedData.push(`${user} - ${interaction.guild.roles.cache.get(teamRole)}`);
        } else {
          embedData.push(`${user} - No team role`);
        }
      });

      // Create the embed using EmbedBuilder
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Ownerlist')
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL() })
        .setDescription(embedData.join('\n'))
        .setTimestamp();

      // Send the embed as a response
      await interaction.reply({
        embeds: [exampleEmbed],
        ephemeral: false, // Set to true to make the response visible only to the user who issued the command
      });
    } else {
      await interaction.reply('No owners found with the specified owner role.');
    }
	},	
};
