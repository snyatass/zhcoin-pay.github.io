async function payWithStar() {
    try {
        const response = await fetch("https://zhcoin-pay-github-io-acxh-lt5vvtts1-snyatass-projects.vercel.app/pay-star", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: 1 }), // Указываем, сколько звёзд оплачиваем
        });

        const result = await response.json();
        if (result.success) {
            alert("Оплата успешно проведена!");
        } else {
            alert(result.message || "Неизвестная ошибка при оплате.");
        }
    } catch (error) {
        alert("Произошла ошибка при оплате.");
    }
}
