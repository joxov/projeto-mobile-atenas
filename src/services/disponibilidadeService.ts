import { db } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getHorariosDisponiveis(sala: string, data: string) {
  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const q = query(
    collection(db, "agendamentos"),
    where("sala", "==", sala),
    where("data", "==", data)
  );

  const snapshot = await getDocs(q);

  const ocupados = snapshot.docs.map((doc) => doc.data().hora);

  const disponiveis = horarios.filter((h) => !ocupados.includes(h));

  return disponiveis;
}
