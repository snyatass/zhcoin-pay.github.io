const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // Обслуживание статических файлов из корня проекта

const users = {
    "user_id": { balance: 5 } // Пример данных пользователя с балансом 5 звёзд
};

app.get("/get-balance", (req, res) => {
    const userId = "user_id"; // Замените на реальный идентификатор пользователя
    const user = users[userId];
    if (user) {
        res.json({ balance: user.balance });
    } else {
        res.status(404).json({ message: "Пользователь не найден" });
    }
});

app.post("/pay-star", (req, res) => {
    const userId = "user_id"; // Замените на реальный идентификатор пользователя
    const user = users[userId];

    if (user && user.balance >= 1) {
        user.balance -= 1;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Недостаточно звёзд" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
