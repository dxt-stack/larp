const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// A mini-database of tools you can expand later
const toolsDB = {
    vscode: {
        name: "Visual Studio Code",
        category: "Coding",
        platform: "PC, Mac, Linux",
        description: "A free, lightweight, and incredibly powerful code editor with a massive marketplace of extensions.",
        link: "https://code.visualstudio.com",
        price: "100% Free"
    },
    notion: {
        name: "Notion",
        category: "Productivity",
        platform: "Web, PC, Mac, iOS, Android",
        description: "An all-in-one workspace for notes, tasks, wikis, and databases.",
        link: "https://notion.so",
        price: "Free / Paid plans"
    },
    figma: {
        name: "Figma",
        category: "Design",
        platform: "Web, PC, Mac",
        description: "The industry-standard collaborative interface design tool for UI/UX and prototyping.",
        link: "https://figma.com",
        price: "Free / Paid plans"
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tool')
        .setDescription('Look up a tool in The Amazing Digital Library')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the tool (e.g., vscode, notion, figma)')
                .setRequired(true)),
    
    async execute(interaction) {
        const toolName = interaction.options.getString('name').toLowerCase();
        const tool = toolsDB[toolName];

        if (!tool) {
            return interaction.reply({ 
                content: `❌ Tool not found! Try one of these: ${Object.keys(toolsDB).join(', ')}`, 
                ephemeral: true 
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff') // Change this hex code to match your server's theme!
            .setTitle(`🛠️ ${tool.name}`)
            .addFields(
                { name: '📂 Category', value: tool.category, inline: true },
                { name: '💻 Platform', value: tool.platform, inline: true },
                { name: '💰 Price', value: tool.price, inline: true },
                { name: '📝 Description', value: tool.description },
                { name: '🔗 Link', value: `[Click here to visit](${tool.link})` }
            )
            .setFooter({ text: 'The Amazing Digital Library' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
