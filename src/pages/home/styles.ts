import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: themas.colors.textDark || "#333",
    marginBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: themas.colors.grey,
    borderRadius: 16,
    width: "85%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  arrow: {
    fontSize: 24,
    color: "#aaa",
    marginRight: 10,
  },
});
