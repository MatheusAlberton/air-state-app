const express = require("express");
const axios = require("axios");
const cors = require("cors"); 
const app = express();

app.use(cors()); 

const PORT = 3000;

const API_KEY = "453636a722e521ee22184220f22f5c4a";

// Isso é um "endpoint" ou uma "rota".
// O front-end vai pedir informações para este endereço.
app.get("/air-pollution", async (req, res) => {
  // Pegamos o nome da cidade que o front-end nos enviou
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "O nome da cidade é obrigatório" });
  }

  try {
    // 1. Obter coordenadas (a lógica que já tínhamos)
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (geoResponse.data.length === 0) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }
    const { lat, lon } = geoResponse.data[0];

    // 2. Obter dados de poluição
    const pollutionResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    // 3. --- MUDANÇA PRINCIPAL AQUI ---
    // Enviar um objeto combinado de volta para o front-end
    res.json({
      geo: geoResponse.data[0],
      pollution: pollutionResponse.data.list[0],
    });
  } catch (error) {
    console.error("Erro no servidor:", error.message); // Adicionado para depuração
    res.status(500).json({ error: "Erro ao buscar dados na API externa" });
  }
});

// Agora sim, o comando para o servidor ficar "escutando" na porta
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
