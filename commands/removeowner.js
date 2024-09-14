const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, Client, BaseInteraction, CommandInteraction } = require('discord.js');
const { friendlies } = require('../channelconfig.json');

module.exports = {
  cooldown: 120,
  data: new SlashCommandBuilder()
    .setName('removeowner')
    .setDescription('Remove users team ownership')
    .addUserOption(option => option.setName('user').setDescription('user').setRequired(true))
    .addRoleOption(option => option.setName('club').setDescription('Club Role').setRequired(true)),

  /**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */

  async execute(interaction) {
    const userx = interaction.options.getMember("user");
    if (!interaction.member.roles.cache.has("1145097821398249713")) {
      await interaction.reply({content: "You dont have the required permissions to do this command.", ephemeral: true,});
      return;
    }

    const clubs = ["1123345147959189524", "1123345149011968000", "1123345149381050400", "1123345150748393502", "1123345152388366376", "1123345153185284116", "1123345154003185664", "1123345155395698829", "1123345156259721267", "1123345160617599020", "1123345161406124063", "1123345162765086761", "1154949367694889030", "1154949368533766245", "1154949369146118145", "1154949377681543208"]

    if (!clubs.includes(interaction.options.getRole('club').id)) {

      await interaction.reply({
        content: '``Club not found!``',
        ephemeral: true,
      })
      return;

    } else {

      userx.roles.remove(interaction.options.getRole('club'))
      userx.roles.remove("1149478114397786192")

    }

    await interaction.reply({
      content: '`Appointed the user the owner.`',
      ephemeral: true,
    })
  },
};
