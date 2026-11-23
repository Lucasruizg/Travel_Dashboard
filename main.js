/*Ciudades*/

const cities = {
    Barcelona: { country: "España", lat: 41.38, lon: 2.17, currency: "EUR" },
    London: { country: "UK", lat: 51.50, lon: -0.12, currency: "GBP" },
    Paris: { country: "Francia", lat: 48.85, lon: 2.35, currency: "EUR" },
    "New York": { country: "USA", lat: 40.71, lon: -74.00, currency: "USD" },
    Tokyo: { country: "Japón", lat: 35.68, lon: 139.69, currency: "JPY" }
};

/*Resumen*/

function showCity(city, temp = "--") {
    const data = cities[city];

    document.getElementById("summary").innerHTML = `
        <h2>${city}</h2>
        <p>País: ${data.country}</p>
        <p>Temperatura actual: ${temp}°C</p>
        <p>Moneda local: ${data.currency}</p>
    `;
}

/*Lluvia*/

function rainText(prob) {
    if (prob < 20) return "Sin lluvia";
    if (prob < 50) return "Posible lluvia";
    return "Probable lluvia";
}


function message(temp) {
    if (temp < 10) return "Lleva chaqueta";
    return "Buen tiempo para pasear";
}

/*Clima*/

async function getWeather(lat, lon) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation_probability`);
    if (!res.ok) throw new Error("Respuesta meteorológica no válida");
    return res.json();
}

let weatherRequest = 0;

async function loadWeather(city) {
    const request = ++weatherRequest;
    showCity(city);
    document.getElementById("weather").innerText = "Cargando el clima…";
    document.getElementById("message").innerText = "";
    try {
        const c = cities[city];
        const data = await getWeather(c.lat, c.lon);

        if (request !== weatherRequest) return;
        const temp = data.current?.temperature_2m;
        const rain = data.current?.precipitation_probability;
        if (!Number.isFinite(temp) || !Number.isFinite(rain)) throw new Error("Datos meteorológicos incompletos");

        showCity(city, temp);

        document.getElementById("weather").innerHTML = `
            <p>Temperatura: ${temp}°C</p>
            <p>${rainText(rain)} (${rain}%)</p>
        `;

        document.getElementById("message").innerText = message(temp);
    } catch (error) {
        if (request !== weatherRequest) return;
        document.getElementById("weather").innerText = "Error al cargar el clima";
        document.getElementById("message").innerText = "No se ha podido obtener la información";
    }
}

/*Moneda*/

async function getRate(currency) {
    if (currency === "EUR") return 1;
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
    if (!res.ok) throw new Error("Respuesta de cambio no válida");
    const data = await res.json();
    const rate = data.rates?.[currency];
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("Tipo de cambio no disponible");
    return rate;
}

let conversionRequest = 0;

async function convert(city) {
    const request = ++conversionRequest;
    const input = document.getElementById("amount");
    const output = document.getElementById("result");
    const amount = input.valueAsNumber;
    if (!Number.isFinite(amount) || amount < 0) {
        output.innerText = "Introduce una cantidad válida en euros.";
        return;
    }
    output.innerText = "Consultando el tipo de cambio…";
    try {
        const rate = await getRate(cities[city].currency);
        if (request !== conversionRequest) return;
        const result = amount * rate;

        document.getElementById("result").innerText =
            `${amount} EUR = ${result.toFixed(2)} ${cities[city].currency}`;
    } catch (error) {
        if (request === conversionRequest) output.innerText = "Error en la conversión";
    }
}

/*Eventos*/

document.getElementById("citySelect").addEventListener("change", (e) => {
    const city = e.target.value;
    conversionRequest++;
    document.getElementById("result").innerText = "";
    loadWeather(city);
});

document.getElementById("convert").addEventListener("click", () => {
    const city = document.getElementById("citySelect").value;
    convert(city);
});


loadWeather("Barcelona");
