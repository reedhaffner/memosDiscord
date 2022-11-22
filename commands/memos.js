const { SlashCommandBuilder } = require('discord.js');
const { getEmbed } = require('../helpers/generateMemoEmbed')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('memos')
		.setDescription('View your memos')
		.addBooleanOption(option => option.setName("archive").setDescription("Show Archived Memos")),


	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
	
		await getEmbed(0, interaction.options.getBoolean("archive") ?? false).then(data => {
			interaction.editReply(data);
		})


	},



};
