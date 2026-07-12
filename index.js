"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const max_bot_api_1 = require("@maxhub/max-bot-api");
// Инициализируем бота токеном проекта GS
const token = 'f9LHodD0cOLdaTDRMbiKEUUfgRi7binYeU38S-mXvDf6STKUDxdxx8sJh84JEAwe61gweBKoXJ2bsVamp_bl';
const bot = new max_bot_api_1.Bot(token);
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
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sender = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.sender;
    const name = (sender === null || sender === void 0 ? void 0 : sender.first_name) || (sender === null || sender === void 0 ? void 0 : sender.name) || 'Пользователь';
    const senderId = sender === null || sender === void 0 ? void 0 : sender.user_id;
    lastLogAction = `Пользователь ${name} (ID: ${senderId}) вызвал команду /start`;
    const welcomeMessage = `Привет, ${name}! 👋\n\n` +
        '🤖 Вас приветствует официальный чат-бот проекта **GS**.\n\n' +
        'Используйте встроенное меню команд или введите /help для получения навигации!';
    return ctx.reply(welcomeMessage);
}));
// 2. Обработчик команды /help
bot.command('help', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.reply('ℹ️ **Доступные команды:**\n\n/start — Приветствие\n/support — Написать в поддержку\n/help — Справка');
}));
// 3. Обработчик команды /support
bot.command('support', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.reply('📥 **Обратная связь проекта GS**\n\nПросто напишите ваше сообщение или вопрос обычным текстом прямо сюда в чат, и администратор его увидит!');
}));
// 4. Скрытая команда /logs (доступна только вам)
bot.command('logs', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const senderId = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.sender) === null || _b === void 0 ? void 0 : _b.user_id;
    if (Number(senderId) !== ADMIN_ID) {
        return ctx.reply('❌ У вас нет прав для выполнения этой команды.');
    }
    return ctx.reply(`📋 **Последнее действие в боте:**\n\n${lastLogAction}`);
}));
// 5. Единый обработчик текстовых сообщений
bot.on('message_created', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const message = ctx.message;
    if (!message || !message.text)
        return;
    const text = message.text;
    const senderId = (_a = message.sender) === null || _a === void 0 ? void 0 : _a.user_id;
    const senderName = ((_b = message.sender) === null || _b === void 0 ? void 0 : _b.first_name) || ((_c = message.sender) === null || _c === void 0 ? void 0 : _c.name) || 'Пользователь';
    // Игнорируем команды, чтобы не дублировать логи
    if (text.startsWith('/'))
        return;
    // Записываем действие пользователя в лог-переменную
    lastLogAction = `Пользователь ${senderName} (ID: ${senderId}) написал в поддержку: "${text}"`;
    // Если пишет обычный пользователь (не вы) — бот дублирует лог в консоль сервера
    if (Number(senderId) !== ADMIN_ID) {
        console.log(`[ПОДДЕРЖКА] ${senderName} (ID: ${senderId}): ${text}`);
        // Отправляем пользователю подтверждение
        return ctx.reply('✅ Ваше сообщение передано администратору GS!');
    }
}));
// Запуск бота
bot.start();
console.log('Бот успешно запущен в режиме администратора!');
