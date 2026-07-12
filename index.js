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


const token = process.env.BOT_TOKEN;
if (!token) {
    console.error('Ошибка: Переменная окружения BOT_TOKEN не задана!');
    process.exit(1);
}

const bot = new max_bot_api_1.Bot(token);


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


bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('--- ПОЛУЧЕНА КОМАНДА /start ---');
    const sender = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.sender;
    const name = (sender === null || sender === void 0 ? void 0 : sender.first_name) || (sender === null || sender === void 0 ? void 0 : sender.name) || 'Пользователь';
    const welcomeMessage = `Привет, ${name}! 👋\n\n` +
        '🤖 Вас приветствует официальный чат-бот проекта **GS**.\n\n' +
        'Используйте встроенное меню команд или введите /help для получения навигации!';
    return ctx.reply(welcomeMessage);
}));


bot.command('help', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('--- ПОЛУЧЕНА КОМАНДА /help ---');
    const helpText = ('ℹ️ **Доступные команды:**\n\n' +
        '/start — Перезапустить приветственное окно\n' +
        '/help — Показать это меню помощи');
    return ctx.reply(helpText);
}));


bot.start();
console.log('Бот успешно запущен и готов к работе!');

