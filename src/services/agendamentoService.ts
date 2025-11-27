import { db } from "./firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth } from "./firebaseConfig";

export async function agendar(sala: string, data: string, hora: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");

  const q = query(
    collection(db, "agendamentos"),
    where("sala", "==", sala),
    where("data", "==", data),
    where("hora", "==", hora)
  );

  const consulta = await getDocs(q);
  if (!consulta.empty) {
    throw new Error("Horário já foi agendado.");
  }

  await addDoc(collection(db, "agendamentos"), {
    sala,
    data,
    hora,
    userId: user.uid,
    criadoEm: new Date(),
  });
}
