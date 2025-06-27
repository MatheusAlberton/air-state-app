document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const cityInput = document.getElementById("city-input");
  const resultsCard = document.getElementById("results-card");

  // Estado Inicial
  function showInitialMessage() {
    resultsCard.innerHTML = `<p>Não há nada aqui. Busque por uma cidade!</p>`;
  }

  // Função principal de busca
  async function fetchAirPollution(city) {
    try {
      // Agora, fazemos a requisição para o nosso próprio servidor back-end
      const response = await fetch(
        `http://localhost:3000/air-pollution?city=${city}`
      );

      // Se a resposta do nosso servidor não for 'ok' (ex: erro 404, 500),
      // nós pegamos a mensagem de erro que o back-end enviou.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ocorreu um erro no servidor");
      }

      const data = await response.json();

      // O back-end nos devolve um objeto combinado.
      // Precisamos acessar os dados de geo e pollution dentro dele.
      renderResults(data.geo, data.pollution);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      resultsCard.innerHTML = `<p>${error.message}</p>`;
    }
  }

  // Função para renderizar os resultados no card
  // Dentro do seu script.js
  function renderResults(geo, pollution) {
    const aqi = pollution.main.aqi;
    const components = pollution.components;

    // Objeto com as cores em códigos hexadecimais e os textos
    const aqiScale = {
      1: { text: "Bom", color: "#22c55e" }, // Verde
      2: { text: "Razoável", color: "#f59e0b" }, // Amarelo
      3: { text: "Moderado", color: "#f97316" }, // Laranja
      4: { text: "Ruim", color: "#EB5861" }, // Vermelho claro
      5: { text: "Muito Ruim", color: "#ef4444" }, // Vermelho
    };

    const currentAqi = aqiScale[aqi] || {
      text: "Desconhecido",
      color: "#6b7280",
    };

    // Calcula o progresso invertido (1=100%, 2=80%, ..., 5=20%)
    const progress = (6 - aqi) * 20;

    resultsCard.innerHTML = `
        <div class="bg-white rounded-2xl p-6 shadow-lg text-center">
            
            <div class="flex items-center justify-center gap-3 mb-4">
                <h2 class="text-2xl font-bold text-gray-800">${geo.name}</h2>
                <img src="https://flagsapi.com/${geo.country}/flat/64.png" alt="Bandeira de ${geo.country}" class="w-8 h-auto">
            </div>

            <div class="w-40 h-40 mx-auto mb-4 rounded-full p-3" style="background: conic-gradient(${currentAqi.color} ${progress}%, #e5e7eb 0)">
                <div class="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
                    <span class="text-5xl font-bold ${currentAqi.color}">${aqi}</span>
                    <span class="font-semibold ${currentAqi.color}">${currentAqi.text}</span>
            </div>
        </div>

            <h3 class="text-lg font-semibold mb-2 text-gray-700">Qualidade do ar</h3>
            <div class="grid grid-cols-3 gap-4 text-sm">
                <div>
                    <p class="font-semibold text-gray-600">CO</p>
                    <p>${components.co}</p>
                </div>
                <div>
                    <p class="font-semibold text-gray-600">NO₂</p>
                    <p>${components.no2}</p>
                </div>
                <div>
                    <p class="font-semibold text-gray-600">O₃</p>
                    <p>${components.o3}</p>
                </div>
                <div>
                    <p class="font-semibold text-gray-600">SO₂</p>
                    <p>${components.so2}</p>
                </div>
                <div>
                    <p class="font-semibold text-gray-600">PM2.5</p>
                    <p>${components.pm2_5}</p>
                </div>
                <div>
                    <p class="font-semibold text-gray-600">PM10</p>
                    <p>${components.pm10}</p>
                </div>
                <div class="text-left text-sm text-gray-600 mt-4">
                    <h4 class="font-semibold mb-1">Legenda do Índice de Qualidade do Ar (IQA)</h4>
                    <p><span class="font-semibold text-green-700">1</span>: Bom</p>
                    <p><span class="font-semibold text-yellow-600">2</span>: Razoável</p>
                    <p><span class="font-semibold text-orange-600">3</span>: Moderado</p>
                    <p><span class="font-semibold text-red-500">4</span>: Ruim</p>
                    <p><span class="font-semibold text-red-600">5</span>: Muito Ruim</p>
                </div>
            </div>
        </div>
    `;
  }
  // Event Listener para o formulário (continua igual)
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
      resultsCard.innerHTML = `<p>Buscando...</p>`;
      fetchAirPollution(city);
    }
  });

  // Mostra a mensagem inicial ao carregar a página (continua igual)
  showInitialMessage();
});
