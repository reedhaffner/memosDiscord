const { getEmbed, getIndexFromFooter, getMemoIDFromTitle } = require('../../helpers/generateMemoEmbed')
const { setArchived }= require('../../api.js')

module.exports = {
    data: {
        name: "archive"
    },
    async execute(interaction, client) {
        var currentMemo = getMemoIDFromTitle(interaction.message.embeds[0].title)

        await setArchived(currentMemo, true).then(
            await getEmbed(0).then(data => {
                interaction.update(data);
            })
        )
    }
}