import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { styles } from "./styleSalas";
import { themas } from "../../global/themes";
import { ptBR } from "../../utils/localeCalendarConfig";
import { ScrollView } from "react-native-gesture-handler";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const FIXED_BUTTON_HEIGHT = 180;

export default function SalasAgenda() {
  const [day, setDay] = useState<DateData>();
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [reservedHours, setReservedHours] = useState<string[]>([]);
  const [loadingHours, setLoadingHours] = useState(false);

  // Gera horários de 8:00 até 21:00
  const availableHours = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

  // Exemplo de horários já reservados (futuramente virão da API)
  const fetchDailyAvailability = async (dateString: string) => {
    setLoadingHours(true);
    // Simula a requisição à API (você substituirá isso pela sua chamada axios/fetch)
    await new Promise((resolve) => setTimeout(resolve, 500));

    let newReservedHours: string[] = [];

    setReservedHours(newReservedHours);
    setLoadingHours(false);
  };

  const handleDayPress = (selectedDay: DateData) => {
    setDay(selectedDay);
    setSelectedHour(null); // Limpa o horário anterior

    // Chama a função para buscar a disponibilidade do dia
    fetchDailyAvailability(selectedDay.dateString);
  };

  return (
    <View style={styles.mainContainer}>
      {/* TÍTULO */}
      <Text style={styles.title}>FAÇA SEU AGENDAMENTO</Text>
      <ScrollView>
        {/* CALENDÁRIO */}
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

        {/* LISTA DE HORÁRIOS */}
        {day && (
          <>
            <Text style={styles.subtitle}>HORÁRIO</Text>
            <ScrollView style={{ width: "90%" }}>
              {availableHours.map((item) => {
                const isReserved = reservedHours.includes(item);
                const isSelected = selectedHour === item;

                return (
                  <TouchableOpacity
                    key={item} // Key é importante no .map()
                    disabled={isReserved}
                    style={[
                      styles.hourRow,
                      isReserved
                        ? styles.hourReserved
                        : isSelected
                        ? styles.hourSelected
                        : styles.hourAvailable,
                    ]}
                    onPress={() => setSelectedHour(item)}
                  >
                    <Text style={styles.hourText}>{item}</Text>
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
      {/* BOTÃO CONFIRMAR... */}
      {selectedHour && (
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() =>
              console.log(
                `Agendamento confirmado: ${day?.dateString} às ${selectedHour}`
              )
            }
          >
            <Text style={styles.confirmText}>Confirmar Agendamento</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
