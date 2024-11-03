async function getBalance() {
    try {
        const response = await fetch("/get-balance");
        const data = await response.json();
        document.getElementById("balance").innerText = `Баланс: ${data.balance} звёзд`;
    } catch (error) {
        document.getElementById("balance").innerText = "Ошибка загрузки баланса";
    }
}

async function payWithStar() {
    try {
        const response = await fetch("/pay-star", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: 1 }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Оплата успешно проведена!");
            getBalance(); // Обновляем баланс после оплаты
        } else {
            alert(result.message || "Недостаточно звёзд для оплаты.");
        }
    } catch (error) {
        alert("Произошла ошибка при оплате.");
    }
}

// Загрузка баланса при открытии страницы
getBalance();
