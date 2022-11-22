const { getEmbed, getIndexFromFooter, getMemoIDFromTitle, isInArchiveMode } = require('../../helpers/generateMemoEmbed')
const { setArchived }= require('../../api.js')

module.exports = {
    data: {
        name: "restore"
    },
    async execute(interaction, client) {
        
        var currentMemo = getMemoIDFromTitle(interaction.message.embeds[0].title)
        var archiveMode = isInArchiveMode(interaction.message.embeds[0].title)

        try {
            await setArchived(currentMemo, false).then(
                await getEmbed(0, archiveMode).then(data => {
                    interaction.update(data);
                })
            )
        } catch {
            interaction.update("rate limit")
        }
    }
}