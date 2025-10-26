import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  calendar: {
    borderRadius: 12,
    marginBottom: 30,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  hourReserved: {
    backgroundColor: "#ffffffff",
  },
  hourAvailable: {
    backgroundColor: "#b6f7b6",
  },
  hourSelected: {
    backgroundColor: "#364effff",
  },
  hourText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "500",
  },
  statusReserved: {
    color: "#555",
  },
  statusAvailable: {
    color: "#000000ff",
  },
  confirmButton: {
    backgroundColor: "#006400",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fixedButtonContainer: {
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
});
