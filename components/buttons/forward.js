const { getEmbed, getIndexFromFooter, isInArchiveMode } = require('../../helpers/generateMemoEmbed')

module.exports = {
    data: {
        name: "forward"
    },
    async execute(interaction, client) {

        var archiveMode = isInArchiveMode(interaction.message.embeds[0].title)
        var currentPos = getIndexFromFooter(interaction.message.embeds[0].footer.text)
        var nextPos = currentPos+1
        await getEmbed(nextPos, archiveMode).then(data => {
			interaction.update(data);
		})
    }
}