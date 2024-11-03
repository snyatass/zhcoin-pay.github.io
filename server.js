const express = require("express");
const app = express();

// Разрешаем CORS для всех источников (для тестирования)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Разрешаем все источники
    res.header("Access-Control-Allow-Methods", "GET, POST"); // Разрешаем GET и POST
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.json());
app.use(express.static(__dirname)); // Обслуживание статических файлов из корня проекта

const users = {
    "user_id": { balance: 5 } // Пример данных пользователя с балансом 5 звёзд
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
