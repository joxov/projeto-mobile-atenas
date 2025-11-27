import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { styles } from "./styleSalas";
import { themas } from "../../global/themes";
import { ptBR } from "../../utils/localeCalendarConfig";
import { ScrollView } from "react-native-gesture-handler";
import { agendar } from "../../services/agendamentoService";
import { getHorariosDisponiveis } from "../../services/disponibilidadeService";
import { Alert } from "react-native";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const FIXED_BUTTON_HEIGHT = 180;

export default function SalasAgenda() {
  const [day, setDay] = useState<DateData>();
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [reservedHours, setReservedHours] = useState<string[]>([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [horarios, setHorarios] = useState<
    { hora: string; reservado: boolean }[]
  >([]);

  const fetchDailyAvailability = async (dateString: string) => {
    setLoadingHours(true);

    const sala = "Auditorio";

    try {
      const disponiveis = await getHorariosDisponiveis(sala, dateString);

      const todosHorarios = [
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

      const lista = todosHorarios.map((hora) => ({
        hora,
        reservado: !disponiveis.includes(hora),
      }));

      setHorarios(lista);

      const ocupados = lista.filter((h) => h.reservado).map((h) => h.hora);
      setReservedHours(ocupados);
    } catch (error) {
      console.log("Error:", error);
    }

    setLoadingHours(false);
  };

  const handleDayPress = async (selectedDay: DateData) => {
    setDay(selectedDay);
    setSelectedHour(null);

    await fetchDailyAvailability(selectedDay.dateString);
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>FAÇA SEU AGENDAMENTO</Text>
      <ScrollView>
        <Calendar
          style={styles.calendar}
          headerStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: themas.colors.secondary,
            paddingBottom: 10,
          }}
          theme={{
            textMonthFontSize: 20,
            todayTextColor: "#a54d00ff",
            selectedDayBackgroundColor: "#001effff",
            selectedDayTextColor: "#ffffffff",
            textDayStyle: { color: "#000000" },
            textDisabledColor: "#57555571",
          }}
          minDate={new Date().toDateString()}
          hideExtraDays={true}
          onDayPress={handleDayPress}
          markedDates={
            day && {
              [day.dateString]: { selected: true },
            }
          }
        />

        {day && (
          <>
            <Text style={styles.subtitle}>HORÁRIO</Text>
            <ScrollView style={{ width: "90%" }}>
              {horarios.map((item) => {
                const isReserved = item.reservado;
                const isSelected = selectedHour === item.hora;

                return (
                  <TouchableOpacity
                    key={item.hora}
                    disabled={isReserved}
                    style={[
                      styles.hourRow,
                      isReserved
                        ? styles.hourReserved
                        : isSelected
                        ? styles.hourSelected
                        : styles.hourAvailable,
                    ]}
                    onPress={() => setSelectedHour(item.hora)}
                  >
                    <Text style={styles.hourText}>{item.hora}</Text>

                    <Text
                      style={[
                        styles.statusText,
                        isReserved
                          ? styles.statusReserved
                          : styles.statusAvailable,
                      ]}
                    >
                      {isReserved ? "RESERVADO" : "DISPONÍVEL"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </ScrollView>

      {selectedHour && (
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={async () => {
              if (!day || !selectedHour) return;

              try {
                await agendar("Auditorio", day.dateString, selectedHour);

                Alert.alert("Sucesso!", "Agendamento realizado!");

                await fetchDailyAvailability(day.dateString);

                setSelectedHour(null);
              } catch (e: any) {
                Alert.alert("Erro", e.message);
              }
            }}
          >
            <Text style={styles.confirmText}>Confirmar Agendamento</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
