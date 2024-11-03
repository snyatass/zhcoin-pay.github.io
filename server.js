const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "https://snyatass.github.io", // Укажите здесь ваш источник
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const users = {
    "user_id": { balance: 2 } // Пример данных пользователя с балансом 5 звёзд
};

app.post("/pay-star", (req, res) => {
    const userId = "user_id"; // Замените на реальный идентификатор пользователя
    const user = users[userId];
    
    // Проверяем, указано ли количество звёзд для списания
    const amount = req.body.amount || 1; // По умолчанию списываем 1 звезду

    if (user && user.balance >= amount) {
        user.balance -= amount; // Списываем звезды
        res.json({ success: true }); // Возвращаем успешный ответ
    } else {
        res.json({ success: false, message: "Недостаточно звёзд для оплаты." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
