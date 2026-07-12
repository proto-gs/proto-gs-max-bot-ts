import { Bot } from '@maxhub/max-bot-api';

// Инициализируем бота токеном проекта GS
const token = 'f9LHodD0cOLdaTDRMbiKEUUfgRi7binYeU38S-mXvDf6STKUDxdxx8sJh84JEAwe61gweBKoXJ2bsVamp_bl';
const bot = new Bot(token);

// Ваш точный ID администратора из скриншота
const ADMIN_ID = 112897140; 

// Регистрируем публичные команды (logs скрыта)
bot.api.setMyCommands([
    {
        name: 'start',
        description: 'Запустить приветственное окно',
    },
    {
        name: 'help',
        description: 'Показать список доступных команд',
    },
    {
        name: 'support',
        description: 'Связаться с поддержкой проекта',
    },
]);

// Глобальная переменная в памяти для хранения последнего лога пользователей
let lastLogAction = 'Пока логов нет. Бот только что запустился.';

// 1. Обработчик команды /start
bot.command('start', async (ctx) => {
    const sender = (ctx as any).message?.sender;
    const name = sender?.first_name || sender?.name || 'Пользователь';
    const senderId = sender?.user_id;
    
    lastLogAction = `Пользователь ${name} (ID: ${senderId}) вызвал команду /start`;

    const welcomeMessage = 
        `Привет, ${name}! 👋\n\n` +
        '🤖 Вас приветствует официальный чат-бот проекта **GS**.\n\n' +
        'Используйте встроенное меню команд или введите /help для получения навигации!';

    return ctx.reply(welcomeMessage);
});

// 2. Обработчик команды /help
bot.command('help', async (ctx) => {
    return ctx.reply('ℹ️ **Доступные команды:**\n\n/start — Приветствие\n/support — Написать в поддержку\n/help — Справка');
});

// 3. Обработчик команды /support
bot.command('support', async (ctx) => {
    return ctx.reply('📥 **Обратная связь проекта GS**\n\nПросто напишите ваше сообщение или вопрос обычным текстом прямо сюда в чат, и администратор его увидит!');
});

// 4. Скрытая команда /logs (доступна только вам)
bot.command('logs', async (ctx) => {
    const senderId = (ctx as any).message?.sender?.user_id;

    if (Number(senderId) !== ADMIN_ID) {
        return ctx.reply('❌ У вас нет прав для выполнения этой команды.');
    }

    return ctx.reply(`📋 **Последнее действие в боте:**\n\n${lastLogAction}`);
});

// 5. Единый обработчик текстовых сообщений
bot.on('message_created', async (ctx) => {
    const message = (ctx as any).message;
    if (!message || !message.text) return;

    const text = message.text;
    const senderId = message.sender?.user_id;
    const senderName = message.sender?.first_name || message.sender?.name || 'Пользователь';

    // Игнорируем команды, чтобы не дублировать логи
    if (text.startsWith('/')) return;

    // Записываем действие пользователя в лог-переменную
    lastLogAction = `Пользователь ${senderName} (ID: ${senderId}) написал в поддержку: "${text}"`;

    // Если пишет обычный пользователь (не вы) — бот дублирует лог в консоль сервера
    if (Number(senderId) !== ADMIN_ID) {
        console.log(`[ПОДДЕРЖКА] ${senderName} (ID: ${senderId}): ${text}`);
        
        // Отправляем пользователю подтверждение
        return ctx.reply('✅ Ваше сообщение передано администратору GS!');
    }
});

// Запуск бота
bot.start();
console.log('Бот успешно запущен в режиме администратора!');







