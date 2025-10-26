import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TENANT_ID = process.env.TENANT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

// === 1. Obter token de acesso via OAuth2 ===
app.post("/auth", async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: CLIENT_ID,
        scope: "https://graph.microsoft.com/.default",
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
        client_secret: CLIENT_SECRET,
        code,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    console.error("Erro ao autenticar:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro na autenticação com Microsoft" });
  }
});

// === 2. Criar um evento no calendário ===
app.post("/create-event", async (req, res) => {
  const { accessToken, subject, start, end } = req.body;

  try {
    const response = await axios.post(
      "https://graph.microsoft.com/v1.0/me/events",
      {
        subject,
        start: { dateTime: start, timeZone: "America/Sao_Paulo" },
        end: { dateTime: end, timeZone: "America/Sao_Paulo" },
        body: { contentType: "HTML", content: "Agendamento via App" },
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao criar evento:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Erro ao criar evento" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// === 3. Obter a disponibilidade de um calendário (opcional) ===
app.post("/get-calendar-events", async (req, res) => {
  const { accessToken, startDate, endDate } = req.body;

  // 💡 Você pode adicionar um ID de calendário específico se estiver
  // verificando a agenda de uma sala de conferência (resource mailbox)
  const calendarId = "me"; // Ou o email da Sala, ex: "sala01@suaempresa.com"

  try {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/users/${calendarId}/calendarview?startDateTime=${startDate}&endDateTime=${endDate}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // Retorna todos os eventos do usuário/sala para o frontend filtrar
    res.json(response.data.value);
  } catch (error) {
    console.error(
      "Erro ao obter eventos:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Erro ao obter eventos" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
