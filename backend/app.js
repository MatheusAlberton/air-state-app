const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = 3000;
const API_KEY = "SUA_API_KEY_AQUI";

app.get("/air-pollution", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "O nome da cidade é obrigatório" });
  }

  try {
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );

    if (geoResponse.data.length === 0) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }

    const { lat, lon } = geoResponse.data[0];

    const pollutionResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    res.json({
      geo: geoResponse.data[0],
      pollution: pollutionResponse.data.list[0],
    });
  } catch (error) {
    console.error("Erro no servidor:", error.message);
    res.status(500).json({ error: "Erro ao buscar dados na API externa" });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};
