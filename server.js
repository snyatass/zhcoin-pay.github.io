const express = require("express");
const cors = require("cors");
const app = express();

// Настройка CORS
app.use(cors({
    origin: "https://snyatass.github.io", // Разрешаем доступ с этого источника
    methods: ["POST", "GET", "OPTIONS"], // Разрешаем эти методы
    allowedHeaders: ["Content-Type"] // Разрешаем заголовки
}));

app.use(express.json());

const users = {
    "user_id": { balance: 5 } // Пример данных пользователя с балансом 5 звёзд
};

// Обработчик POST для платежей
app.post("/pay-star", (req, res) => {
    const userId = "user_id"; // Замените на реальный идентификатор пользователя
    const user = users[userId];

    const amount = req.body.amount || 1; // По умолчанию списываем 1 звезду

    if (user && user.balance >= amount) {
        user.balance -= amount; // Списываем звезды
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Недостаточно звёзд для оплаты." });
    }
});

// Обработчик OPTIONS для preflight запросов
app.options("/pay-star", (req, res) => {
    res.sendStatus(204); // Возвращаем статус 204 (No Content)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
