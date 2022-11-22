const fs = require('node:fs');
const path = require('node:path');

module.exports = (client) => {
    client.componentHandler = async () => {
        const componentsPath = path.join(__dirname, '../components');
        for (const folder of fs.readdirSync(componentsPath)) {
            const componentFiles = fs.readdirSync(path.join(componentsPath, folder)).filter(file => file.endsWith('.js'));
            
            const { buttons } = client

            switch(folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(path.join(componentsPath, folder, file))
                        if ('data' in button && 'execute' in button) {
                            buttons.set(button.data.name, button)
                        } else {
                            console.log(`[WARNING] The component at ${path.join(componentsPath, folder, file)} is missing a required "data" or "execute" property.`);
                        }
                    }
                    break;
                default:
                    break;
            }

        }

    }
}