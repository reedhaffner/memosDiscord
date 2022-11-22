const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { memosDomain } = require('../settings');

const { getMemos } = require("../api");

module.exports = {
    async getEmbed(currentIndex, rowStatus) {
        var searchRow = "NORMAL"
        if(rowStatus) {
            searchRow = "ARCHIVE"
        }
        if(!currentIndex) currentIndex=0;
        var row = new ActionRowBuilder()

        row = row.addComponents(
            new ButtonBuilder()
                .setCustomId('back')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Secondary)
        );

        if(rowStatus) {
            row = row.addComponents(
                new ButtonBuilder()
                    .setCustomId('restore')
                    .setEmoji('🔁')
                    .setLabel('Restore')
                    .setStyle(ButtonStyle.Primary)
            );
            row = row.addComponents(
                new ButtonBuilder()
                    .setCustomId('delete')
                    .setEmoji('🗑️')
                    .setLabel('Permanently delete')
                    .setStyle(ButtonStyle.Danger)
            );
        } else {
            row = row.addComponents(
                new ButtonBuilder()
                    .setCustomId('archive')
                    .setEmoji('🗄️')
                    .setLabel('Archive')
                    .setStyle(ButtonStyle.Danger)
            );
        }

        row = row.addComponents(
            new ButtonBuilder()
                .setCustomId('forward')
                .setEmoji('➡️')
                .setStyle(ButtonStyle.Secondary)
        );

        let data = await getMemos()
        let dic = data.data

        dic = dic.filter(memo => {
            return memo.rowStatus.includes(searchRow)
        })
        
        let objectCount = Object.keys(dic).length;

        if(objectCount==0){
            return({content: "There are currently no memos, add one by sending a message", embeds: [], components: []})
        }

        if(currentIndex==-1) currentIndex=objectCount-1;
        if(currentIndex>=objectCount) currentIndex=0;

        var embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Memo #'+dic[currentIndex].id)
            .setURL(memosDomain+"/m/"+dic[currentIndex].id)
            .setFooter({text: "Sorted by newest first • Index: "+currentIndex.toString()})
            .setTimestamp(new Date(dic[currentIndex].createdTs * 1000))
            .setDescription(dic[currentIndex].content);

        if (rowStatus) embed = embed.setTitle('Archived Memo #'+dic[currentIndex].id)

        return {embeds: [embed], components: [row]}


    },
    getIndexFromFooter(footer){
        const regSearch = /Index: (\d+)/;
        return Number(footer.match(regSearch)[1])
    },
    getMemoIDFromTitle(title){
        const regSearch = /Memo #(\d+)/;
        return Number(title.match(regSearch)[1])
    },
    isInArchiveMode(title){
        const regSearch = /(Archived)/;
        try {
            title.match(regSearch)[1]
            return true
        } catch {
            return false
        }
    }
}