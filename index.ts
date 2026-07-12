import { Bot } from '@maxhub/max-bot-api';


const token = process.env.BOT_TOKEN;

if (!token) {
    console.error('Ошибка: Переменная окружения BOT_TOKEN не задана!');
    process.exit(1);
}

const bot = new Bot(token);


const ADMIN_ID = process.env.ADMIN_ID ? Number(process.env.ADMIN_ID) : null;


bot.api.setMyCommands([
    {
        name: 'start',
        description: 'Запустить приветственное окно',
    },
    {
        name: 'help',
        description: 'Показать список доступных команд',
    },
]);


bot.command('start', async (ctx) => {
    console.log('--- ПОЛУЧЕНА КОМАНДА /start ---');
    
    const sender = (ctx as any).message?.sender;
    const name = sender?.first_name || sender?.name || 'Пользователь';

    const welcomeMessage = 
        `Привет, ${name}! 👋\n\n` +
        '🤖 Вас приветствует официальный чат-бот проекта **GS**.\n\n' +
        'Используйте встроенное меню команд или введите /help для получения навигации!';

    return ctx.reply(welcomeMessage);
});


bot.command('help', async (ctx) => {
    console.log('--- ПОЛУЧЕНА КОМАНДА /help ---');
    
    const helpText = (
        'ℹ️ **Доступные команды:**\n\n' +
        '/start — Перезапустить приветственное окно\n' +
        '/help — Показать это меню помощи'
    );
    
    return ctx.reply(helpText);
});


bot.start();
console.log('Бот успешно запущен и готов к работе!');








