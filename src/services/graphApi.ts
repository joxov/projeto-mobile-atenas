// src/services/graphApi.ts

import axios from "axios";

const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0";

// Tipagem básica para o evento
interface CalendarEvent {
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  // Adicione outras propriedades como attendees, location, etc.
}

export const createCalendarEvent = async (
  accessToken: string,
  eventData: CalendarEvent
) => {
  try {
    const response = await axios.post(
      `${GRAPH_BASE_URL}/me/events`, // Endpoint para criar evento no calendário do usuário logado
      eventData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Evento criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar evento do calendário:", error);
    // Trate erros de API (ex: token expirado, permissão negada)
    throw error;
  }
};
